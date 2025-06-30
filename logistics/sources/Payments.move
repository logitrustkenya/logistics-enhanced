module logistics::payments {
    use sui::clock::{Self, Clock};
    use sui::event;
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance::{Self, Balance};
    use std::string::{Self, String};
    use std::vector;
    use std::option::{Self, Option};

    // Error constants
    const E_INVALID_STATUS: u64 = 1;
    const E_INVALID_AMOUNT: u64 = 2;
    const E_PAYMENT_ALREADY_COMPLETED: u64 = 3;
    const E_INSUFFICIENT_FUNDS: u64 = 4;
    const E_INVALID_PAYMENT_METHOD: u64 = 5;
    const E_UNAUTHORIZED_ACCESS: u64 = 6;
    const E_PAYMENT_EXPIRED: u64 = 7;
    const E_INVALID_REFUND: u64 = 8;
    const E_INVALID_STATUS_TRANSITION: u64 = 9;

    // Status constants
    const STATUS_PENDING: vector<u8> = b"PENDING";
    const STATUS_PROCESSING: vector<u8> = b"PROCESSING";
    const STATUS_COMPLETED: vector<u8> = b"COMPLETED";
    const STATUS_FAILED: vector<u8> = b"FAILED";
    const STATUS_CANCELLED: vector<u8> = b"CANCELLED";
    const STATUS_REFUNDED: vector<u8> = b"REFUNDED";
    const STATUS_PARTIALLY_REFUNDED: vector<u8> = b"PARTIALLY_REFUNDED";
    const STATUS_EXPIRED: vector<u8> = b"EXPIRED";

    // Payment method constants
    const METHOD_COIN: vector<u8> = b"COIN";
    const METHOD_ESCROW: vector<u8> = b"ESCROW";
    const METHOD_CREDIT: vector<u8> = b"CREDIT";

    // Payment type constants
    const TYPE_SHIPMENT: vector<u8> = b"SHIPMENT";
    const TYPE_REFUND: vector<u8> = b"REFUND";
    const TYPE_PENALTY: vector<u8> = b"PENALTY";
    const TYPE_INSURANCE: vector<u8> = b"INSURANCE";

    // Payment expiration time (24 hours in milliseconds)
    const PAYMENT_EXPIRY_MS: u64 = 86400000;

    // Main payment struct
    public struct Payment has key, store {
        id: UID,
        shipment_id: Option<ID>,
        amount: u64,
        currency: String,
        status: String,
        payment_method: String,
        payment_type: String,
        payer: address,
        payee: address,
        created_at: u64,
        updated_at: u64,
        completed_at: Option<u64>,
        expires_at: Option<u64>,
        transaction_hash: Option<String>,
        refund_amount: u64,
        fees: u64,
        metadata: PaymentMetadata,
        balance: Balance<SUI>, // For escrow functionality
    }

    // Payment metadata for additional information
    public struct PaymentMetadata has store, copy, drop {
        reference_id: Option<String>,
        description: String,
        external_payment_id: Option<String>,
        gateway_response: Option<String>,
    }

    // Payment receipt for completed payments
    public struct PaymentReceipt has key, store {
        id: UID,
        payment_id: ID,
        amount: u64,
        fees: u64,
        net_amount: u64,
        completed_at: u64,
        payer: address,
        payee: address,
    }

    // Capability for payment management
    public struct PaymentManagerCap has key, store {
        id: UID,
    }

    // Treasury for managing platform fees
    public struct Treasury has key {
        id: UID,
        balance: Balance<SUI>,
        total_fees_collected: u64,
    }

    // Events
    public struct PaymentCreated has copy, drop {
        payment_id: ID,
        payer: address,
        payee: address,
        amount: u64,
        payment_type: String,
        timestamp: u64,
    }

    public struct PaymentStatusUpdated has copy, drop {
        payment_id: ID,
        old_status: String,
        new_status: String,
        updated_by: address,
        timestamp: u64,
    }

    public struct PaymentCompleted has copy, drop {
        payment_id: ID,
        amount: u64,
        fees: u64,
        net_amount: u64,
        payer: address,
        payee: address,
        timestamp: u64,
    }

    public struct PaymentRefunded has copy, drop {
        payment_id: ID,
        refund_amount: u64,
        refunded_to: address,
        timestamp: u64,
    }

    // Initialize function
    fun init(ctx: &mut TxContext) {
        let manager_cap = PaymentManagerCap {
            id: object::new(ctx),
        };
        
        let treasury = Treasury {
            id: object::new(ctx),
            balance: balance::zero(),
            total_fees_collected: 0,
        };
        
        transfer::transfer(manager_cap, tx_context::sender(ctx));
        transfer::share_object(treasury);
    }

    // Create a new payment with comprehensive validation
    public fun create_payment(
        shipment_id: Option<ID>,
        amount: u64,
        currency: String,
        payment_method: String,
        payment_type: String,
        payee: address,
        description: String,
        reference_id: Option<String>,
        clock: &Clock,
        ctx: &mut TxContext
    ): Payment {
        // Validate inputs
        assert!(amount > 0, E_INVALID_AMOUNT);
        assert!(is_valid_payment_method(&payment_method), E_INVALID_PAYMENT_METHOD);
        
        let current_time = clock::timestamp_ms(clock);
        let payer = tx_context::sender(ctx);
        let payment_id = object::new(ctx);
        let payment_obj_id = object::uid_to_inner(&payment_id);
        
        let expires_at = if (payment_method == string::utf8(METHOD_COIN)) {
            option::some(current_time + PAYMENT_EXPIRY_MS)
        } else {
            option::none()
        };
        
        let metadata = PaymentMetadata {
            reference_id,
            description,
            external_payment_id: option::none(),
            gateway_response: option::none(),
        };
        
        let payment = Payment {
            id: payment_id,
            shipment_id,
            amount,
            currency,
            status: string::utf8(STATUS_PENDING),
            payment_method,
            payment_type,
            payer,
            payee,
            created_at: current_time,
            updated_at: current_time,
            completed_at: option::none(),
            expires_at,
            transaction_hash: option::none(),
            refund_amount: 0,
            fees: 0,
            metadata,
            balance: balance::zero(),
        };

        // Emit creation event
        event::emit(PaymentCreated {
            payment_id: payment_obj_id,
            payer,
            payee,
            amount,
            payment_type,
            timestamp: current_time,
        });

        payment
    }

    // Process payment with coin
    public fun process_coin_payment(
        payment: &mut Payment,
        mut coin: Coin<SUI>,
        treasury: &mut Treasury,
        clock: &Clock,
        ctx: &mut TxContext
    ): PaymentReceipt {
        assert!(payment.status == string::utf8(STATUS_PENDING), E_PAYMENT_ALREADY_COMPLETED);
        assert!(coin::value(&coin) >= payment.amount, E_INSUFFICIENT_FUNDS);
        
        let current_time = clock::timestamp_ms(clock);
        
        // Check if payment has expired
        if (option::is_some(&payment.expires_at)) {
            assert!(current_time <= *option::borrow(&payment.expires_at), E_PAYMENT_EXPIRED);
        };
        
        // Calculate fees (2% platform fee)
        let fees = payment.amount * 2 / 100;
        let net_amount = payment.amount - fees;
        
        // Split coin for fees and payment
        let fee_coin = coin::split(&mut coin, fees, ctx);
        let payment_coin = coin;
        
        // Add fees to treasury
        let fee_balance = coin::into_balance(fee_coin);
        balance::join(&mut treasury.balance, fee_balance);
        treasury.total_fees_collected = treasury.total_fees_collected + fees;
        
        // Store payment balance in escrow
        let payment_balance = coin::into_balance(payment_coin);
        balance::join(&mut payment.balance, payment_balance);
        
        // Update payment status
        payment.status = string::utf8(STATUS_PROCESSING);
        payment.fees = fees;
        payment.updated_at = current_time;
        
        // Create receipt
        let receipt_id = object::new(ctx);
        let receipt = PaymentReceipt {
            id: receipt_id,
            payment_id: object::uid_to_inner(&payment.id),
            amount: payment.amount,
            fees,
            net_amount,
            completed_at: current_time,
            payer: payment.payer,
            payee: payment.payee,
        };

        receipt
    }

    // Complete payment and release funds
    public fun complete_payment(
        payment: &mut Payment,
        clock: &Clock,
        ctx: &mut TxContext
    ): Coin<SUI> {
        assert!(payment.status == string::utf8(STATUS_PROCESSING), E_INVALID_STATUS_TRANSITION);
        
        let current_time = clock::timestamp_ms(clock);
        let net_amount = payment.amount - payment.fees;
        
        // Update payment status
        payment.status = string::utf8(STATUS_COMPLETED);
        payment.completed_at = option::some(current_time);
        payment.updated_at = current_time;
        
        // Release funds to payee
        let payout_balance = balance::split(&mut payment.balance, net_amount);
        let payout_coin = coin::from_balance(payout_balance, ctx);

        // Emit completion event
        event::emit(PaymentCompleted {
            payment_id: object::uid_to_inner(&payment.id),
            amount: payment.amount,
            fees: payment.fees,
            net_amount,
            payer: payment.payer,
            payee: payment.payee,
            timestamp: current_time,
        });

        payout_coin
    }

    // Refund payment (full or partial)
    public fun refund_payment(
        payment: &mut Payment,
        refund_amount: u64,
        clock: &Clock,
        ctx: &mut TxContext
    ): Coin<SUI> {
        assert!(payment.status == string::utf8(STATUS_COMPLETED) || 
                payment.status == string::utf8(STATUS_PROCESSING), E_INVALID_REFUND);
        assert!(refund_amount <= (payment.amount - payment.refund_amount), E_INVALID_REFUND);
        
        let current_time = clock::timestamp_ms(clock);
        
        // Update refund amount
        payment.refund_amount = payment.refund_amount + refund_amount;
        payment.updated_at = current_time;
        
        // Update status based on refund amount
        if (payment.refund_amount == payment.amount) {
            payment.status = string::utf8(STATUS_REFUNDED);
        } else {
            payment.status = string::utf8(STATUS_PARTIALLY_REFUNDED);
        };
        
        // Create refund coin from balance
        let refund_balance = balance::split(&mut payment.balance, refund_amount);
        let refund_coin = coin::from_balance(refund_balance, ctx);

        // Emit refund event
        event::emit(PaymentRefunded {
            payment_id: object::uid_to_inner(&payment.id),
            refund_amount,
            refunded_to: payment.payer,
            timestamp: current_time,
        });

        refund_coin
    }

    // Cancel payment (only if pending)
    public fun cancel_payment(
        payment: &mut Payment,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(payment.status == string::utf8(STATUS_PENDING), E_PAYMENT_ALREADY_COMPLETED);
        
        let current_time = clock::timestamp_ms(clock);
        payment.status = string::utf8(STATUS_CANCELLED);
        payment.updated_at = current_time;

        event::emit(PaymentStatusUpdated {
            payment_id: object::uid_to_inner(&payment.id),
            old_status: string::utf8(STATUS_PENDING),
            new_status: string::utf8(STATUS_CANCELLED),
            updated_by: tx_context::sender(ctx),
            timestamp: current_time,
        });
    }

    // Mark payment as failed
    public fun fail_payment(
        _: &PaymentManagerCap,
        payment: &mut Payment,
        failure_reason: String,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(payment.status != string::utf8(STATUS_COMPLETED), E_PAYMENT_ALREADY_COMPLETED);
        
        let current_time = clock::timestamp_ms(clock);
        let old_status = payment.status;
        
        payment.status = string::utf8(STATUS_FAILED);
        payment.updated_at = current_time;
        payment.metadata.gateway_response = option::some(failure_reason);

        event::emit(PaymentStatusUpdated {
            payment_id: object::uid_to_inner(&payment.id),
            old_status,
            new_status: string::utf8(STATUS_FAILED),
            updated_by: tx_context::sender(ctx),
            timestamp: current_time,
        });
    }

    // Expire payment if past expiration time
    public fun expire_payment(
        payment: &mut Payment,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(payment.status == string::utf8(STATUS_PENDING), E_PAYMENT_ALREADY_COMPLETED);
        
        let current_time = clock::timestamp_ms(clock);
        
        if (option::is_some(&payment.expires_at)) {
            assert!(current_time > *option::borrow(&payment.expires_at), E_PAYMENT_EXPIRED);
        };
        
        payment.status = string::utf8(STATUS_EXPIRED);
        payment.updated_at = current_time;

        event::emit(PaymentStatusUpdated {
            payment_id: object::uid_to_inner(&payment.id),
            old_status: string::utf8(STATUS_PENDING),
            new_status: string::utf8(STATUS_EXPIRED),
            updated_by: tx_context::sender(ctx),
            timestamp: current_time,
        });
    }

    // Getter functions
    public fun get_id(payment: &Payment): ID {
        object::uid_to_inner(&payment.id)
    }

    public fun get_amount(payment: &Payment): u64 {
        payment.amount
    }

    public fun get_status(payment: &Payment): &String {
        &payment.status
    }

    public fun get_payer(payment: &Payment): address {
        payment.payer
    }

    public fun get_payee(payment: &Payment): address {
        payment.payee
    }

    public fun get_fees(payment: &Payment): u64 {
        payment.fees
    }

    public fun get_net_amount(payment: &Payment): u64 {
        payment.amount - payment.fees
    }

    public fun get_refund_amount(payment: &Payment): u64 {
        payment.refund_amount
    }

    public fun get_balance_value(payment: &Payment): u64 {
        balance::value(&payment.balance)
    }

    public fun is_completed(payment: &Payment): bool {
        payment.status == string::utf8(STATUS_COMPLETED)
    }

    public fun is_refundable(payment: &Payment): bool {
        (payment.status == string::utf8(STATUS_COMPLETED) || 
         payment.status == string::utf8(STATUS_PROCESSING)) &&
        payment.refund_amount < payment.amount
    }

    public fun is_expired(payment: &Payment, clock: &Clock): bool {
        if (option::is_none(&payment.expires_at)) {
            false
        } else {
            let current_time = clock::timestamp_ms(clock);
            current_time > *option::borrow(&payment.expires_at)
        }
    }

    // Treasury functions
    public fun get_treasury_balance(treasury: &Treasury): u64 {
        balance::value(&treasury.balance)
    }

    public fun get_total_fees_collected(treasury: &Treasury): u64 {
        treasury.total_fees_collected
    }

    // Withdraw fees from treasury (requires manager capability)
    public fun withdraw_fees(
        _: &PaymentManagerCap,
        treasury: &mut Treasury,
        amount: u64,
        ctx: &mut TxContext
    ): Coin<SUI> {
        assert!(balance::value(&treasury.balance) >= amount, E_INSUFFICIENT_FUNDS);
        
        let withdraw_balance = balance::split(&mut treasury.balance, amount);
        coin::from_balance(withdraw_balance, ctx)
    }

    // Private helper functions
    fun is_valid_payment_method(method: &String): bool {
        *method == string::utf8(METHOD_COIN) ||
        *method == string::utf8(METHOD_ESCROW) ||
        *method == string::utf8(METHOD_CREDIT)
    }

    // Test functions
    #[test_only]
    public fun test_create_payment(ctx: &mut TxContext): Payment {
        use sui::clock;
        let clock = clock::create_for_testing(ctx);
        let payment = create_payment(
            option::none(),
            1000,
            string::utf8(b"SUI"),
            string::utf8(METHOD_COIN),
            string::utf8(TYPE_SHIPMENT),
            @0x2,
            string::utf8(b"Test payment"),
            option::none(),
            &clock,
            ctx
        );
        clock::destroy_for_testing(clock);
        payment
    }

    #[test_only]
    public fun destroy_payment_for_testing(payment: Payment) {
        let Payment { 
            id, 
            shipment_id: _,
            amount: _,
            currency: _,
            status: _,
            payment_method: _,
            payment_type: _,
            payer: _,
            payee: _,
            created_at: _,
            updated_at: _,
            completed_at: _,
            expires_at: _,
            transaction_hash: _,
            refund_amount: _,
            fees: _,
            metadata: _,
            balance,
        } = payment;
        balance::destroy_zero(balance);
        object::delete(id);
    }

    #[test_only]
    public fun destroy_receipt_for_testing(receipt: PaymentReceipt) {
        let PaymentReceipt { 
            id, 
            payment_id: _,
            amount: _,
            fees: _,
            net_amount: _,
            completed_at: _,
            payer: _,
            payee: _,
        } = receipt;
        object::delete(id);
    }
}