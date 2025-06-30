
module deliveryescrow::escrowpayment {
    use sui::clock::{Clock, timestamp_ms};
    use sui::event::emit;
    use sui::package;
    use sui::coin::Coin;
    use std::string::{String, utf8};
    use sui::transfer::{public_transfer, transfer};

    // Constants
    const ERR_WRONG_SELLER: u64 = 0;
    const ERR_WRONG_BUYER: u64 = 1;
    const ERR_WRONG_COURIER: u64 = 2;
    const ERR_INSUFFICIENT_PAYMENT: u64 = 3;
    const ERR_EXPIRED: u64 = 4;
    const ERR_ALREADY_PICKED_UP: u64 = 5;
    const ERR_NOT_PICKED_UP: u64 = 6;
    const ERR_ALREADY_CONFIRMED: u64 = 8;
    const ERR_INVALID_STATUS: u64 = 9;

    // Transaction fee: 1.5%
    const TRANSACTION_FEE_BASIS_POINTS: u64 = 150;
    const BASIS_POINTS_DIVISOR: u64 = 10000;
    const PLATFORM_FEE_RECIPIENT: address = @0x1;

    // 24 hours for pickup, 72 hours total for delivery
    const PICKUP_TIMEOUT_MS: u64 = 24 * 60 * 60 * 1000;
    const DELIVERY_TIMEOUT_MS: u64 = 72 * 60 * 60 * 1000;

    // Status constants
    const STATUS_PENDING: u8 = 0;
    const STATUS_PICKED_UP: u8 = 1;
    const STATUS_DELIVERED: u8 = 2;
    const STATUS_CONFIRMED: u8 = 3;

    // Structs
    public struct DeliveryStatus has copy, drop, store {
        value: u8
    }

    #[allow(lint(coin_field))]
    public struct DeliveryOrder<phantom T> has key, store {
        id: UID,
        seller: address,
        buyer: address,
        courier: address,
        // Order details
        order_description: String,
        total_amount: u64,
        delivery_fee: u64,
        pickup_location: String,
        pickup_contact: String,
        delivery_location: String,
        delivery_contact: String,
        // Status and timing
        status: DeliveryStatus,
        verification_code: String,
        created_at: u64,
        pickup_deadline: u64,
        delivery_deadline: u64,
        // Payment holding
        buyer_payment: Coin<T>,
    }

    public struct AdminCap has key, store {
        id: UID,
        owner: address,
    }

    public struct ESCROWPAYMENT has drop {}

    // Events
    public struct OrderCreated has copy, drop {
        order_id: ID,
        seller: address,
        buyer: address,
        total_amount: u64,
        delivery_fee: u64,
        verification_code: String,
    }

    public struct OrderPickedUp has copy, drop {
        order_id: ID,
        courier: address,
        pickup_time: u64,
    }

    public struct OrderDelivered has copy, drop {
        order_id: ID,
        delivery_time: u64,
        courier: address,
    }

    public struct OrderCancelled has copy, drop {
        order_id: ID,
        cancelled_by: address,
        reason: String,
    }

    public struct PaymentReleased has copy, drop {
        order_id: ID,
        seller_amount: u64,
        courier_amount: u64,
        platform_fee: u64,
    }

    // Initialize function
    fun init(otw: ESCROWPAYMENT, ctx: &mut TxContext) {
        public_transfer(package::claim(otw, ctx), ctx.sender());
        public_transfer(
            AdminCap {
                id: object::new(ctx),
                owner: ctx.sender(),
            },
            ctx.sender(),
        );
    }

    // Helper functions
    fun create_verification_code(order_id: &ID): String {
        let id_bytes = object::id_to_bytes(order_id);
        let len = id_bytes.length();
        let start = if (len >= 6) len - 6 else 0;
        
        // Create a slice manually since std::vector::slice doesn't exist
        let mut code_bytes = vector::empty<u8>();
        let mut i = start;
        while (i < len && i < start + 6) {
            code_bytes.push_back(*id_bytes.borrow(i));
            i = i + 1;
        };
        
        let hex_chars = b"0123456789ABCDEF";
        let mut result = vector::empty<u8>();
        let mut i = 0;
        while (i < code_bytes.length() && i < 3) {
            let byte = *code_bytes.borrow(i);
            result.push_back(*hex_chars.borrow(((byte >> 4) as u64)));
            result.push_back(*hex_chars.borrow(((byte & 0xF) as u64)));
            i = i + 1;
        };
        utf8(result)
    }

    fun calculate_platform_fee(amount: u64): u64 {
        (amount * TRANSACTION_FEE_BASIS_POINTS) / BASIS_POINTS_DIVISOR
    }

    fun create_status(value: u8): DeliveryStatus {
        DeliveryStatus { value }
    }

    // Main functions
    entry fun create_order<T>(
        buyer: address,
        courier: address,
        order_description: vector<u8>,
        delivery_fee: u64,
        pickup_location: vector<u8>,
        pickup_contact: vector<u8>,
        delivery_location: vector<u8>,
        delivery_contact: vector<u8>,
        buyer_payment: Coin<T>,
        clock: &Clock,
        ctx: &mut TxContext,
    ) {
        let seller = ctx.sender();
        let total_amount = buyer_payment.value();
        assert!(total_amount > delivery_fee, ERR_INSUFFICIENT_PAYMENT);
        assert!(buyer != seller, ERR_WRONG_BUYER);

        let current_time = timestamp_ms(clock);
        let order_id = object::new(ctx);
        let verification_code = create_verification_code(&object::uid_to_inner(&order_id));

        let order = DeliveryOrder<T> {
            id: order_id,
            seller,
            buyer,
            courier,
            order_description: utf8(order_description),
            total_amount,
            delivery_fee,
            pickup_location: utf8(pickup_location),
            pickup_contact: utf8(pickup_contact),
            delivery_location: utf8(delivery_location),
            delivery_contact: utf8(delivery_contact),
            status: create_status(STATUS_PENDING),
            verification_code,
            created_at: current_time,
            pickup_deadline: current_time + PICKUP_TIMEOUT_MS,
            delivery_deadline: current_time + DELIVERY_TIMEOUT_MS,
            buyer_payment,
        };

        emit(OrderCreated {
            order_id: object::id(&order),
            seller,
            buyer,
            total_amount,
            delivery_fee,
            verification_code,
        });

        transfer(order, seller);
    }

    // Courier pickup confirmation
    entry fun confirm_pickup<T>(
        order: &mut DeliveryOrder<T>,
        clock: &Clock,
        _ctx: &TxContext,
    ) {
        assert!(_ctx.sender() == order.courier, ERR_WRONG_COURIER);
        assert!(order.status.value == STATUS_PENDING, ERR_ALREADY_PICKED_UP);
        let current_time = timestamp_ms(clock);
        assert!(current_time <= order.pickup_deadline, ERR_EXPIRED);

        order.status = create_status(STATUS_PICKED_UP);

        emit(OrderPickedUp {
            order_id: object::id(order),
            courier: order.courier,
            pickup_time: current_time,
        });
    }

    // Courier delivery confirmation
    entry fun confirm_delivery<T>(
        order: &mut DeliveryOrder<T>,
        clock: &Clock,
        _ctx: &TxContext,
    ) {
        assert!(_ctx.sender() == order.courier, ERR_WRONG_COURIER);
        assert!(order.status.value == STATUS_PICKED_UP, ERR_NOT_PICKED_UP);
        let current_time = timestamp_ms(clock);
        assert!(current_time <= order.delivery_deadline, ERR_EXPIRED);

        order.status = create_status(STATUS_DELIVERED);

        emit(OrderDelivered {
            order_id: object::id(order),
            courier: order.courier,
            delivery_time: current_time,
        });
    }

    // Buyer confirms receipt and releases payment
    entry fun confirm_receipt<T>(
        order: DeliveryOrder<T>,
        verification_code: vector<u8>,
        ctx: &mut TxContext,
    ) {
        assert!(ctx.sender() == order.buyer, ERR_WRONG_BUYER);
        assert!(order.status.value == STATUS_DELIVERED, ERR_INVALID_STATUS);
        assert!(order.verification_code == utf8(verification_code), ERR_INVALID_STATUS);

        let order_id = object::id(&order);
        let DeliveryOrder {
            id,
            seller,
            buyer: _,
            courier,
            order_description: _,
            total_amount,
            delivery_fee,
            pickup_location: _,
            pickup_contact: _,
            delivery_location: _,
            delivery_contact: _,
            status: _,
            verification_code: _,
            created_at: _,
            pickup_deadline: _,
            delivery_deadline: _,
            mut buyer_payment,
        } = order;

        // Calculate amounts
        let platform_fee = calculate_platform_fee(total_amount);
        let seller_amount = total_amount - delivery_fee - platform_fee;
        let courier_amount = delivery_fee;

        // Split the payment
        let platform_fee_coin = buyer_payment.split(platform_fee, ctx);
        let courier_payment = buyer_payment.split(courier_amount, ctx);

        // Transfer payments
        public_transfer(platform_fee_coin, PLATFORM_FEE_RECIPIENT);
        public_transfer(courier_payment, courier);
        public_transfer(buyer_payment, seller);

        object::delete(id);

        emit(PaymentReleased {
            order_id,
            seller_amount,
            courier_amount,
            platform_fee,
        });
    }

    // Cancel order if deadline is reached or seller cancels
    entry fun cancel_order<T>(
        order: DeliveryOrder<T>,
        reason: vector<u8>,
        clock: &Clock,
        _ctx: &TxContext,
    ) {
        let current_time = timestamp_ms(clock);
        let is_expired = current_time > order.delivery_deadline;
        let is_seller = _ctx.sender() == order.seller;
        let can_cancel = is_seller || is_expired;

        assert!(can_cancel, ERR_WRONG_SELLER);
        assert!(order.status.value != STATUS_CONFIRMED, ERR_ALREADY_CONFIRMED);

        let order_id = object::id(&order);
        let DeliveryOrder {
            id,
            seller: _,
            buyer,
            courier: _,
            order_description: _,
            total_amount: _,
            delivery_fee: _,
            pickup_location: _,
            pickup_contact: _,
            delivery_location: _,
            delivery_contact: _,
            status: _,
            verification_code: _,
            created_at: _,
            pickup_deadline: _,
            delivery_deadline: _,
            buyer_payment,
        } = order;

        // Return payment to buyer
        public_transfer(buyer_payment, buyer);
        object::delete(id);

        emit(OrderCancelled {
            order_id,
            cancelled_by: _ctx.sender(),
            reason: utf8(reason),
        });
    }

    // View function to get order details
    public fun get_order_details<T>(order: &DeliveryOrder<T>): (
        address, // seller
        address, // buyer
        address, // courier
        String,  // order description
        u64,     // total amount
        u64,     // delivery fee
        String,  // pickup location
        String,  // delivery location
        u8,      // status
        u64,     // created at
        String,  // verification code (masked)
    ) {
        let code_len = order.verification_code.length();
        let masked_code = if (code_len >= 3) {
            order.verification_code.substring(code_len - 3, code_len)
        } else {
            order.verification_code
        };

        (
            order.seller,
            order.buyer,
            order.courier,
            order.order_description,
            order.total_amount,
            order.delivery_fee,
            order.pickup_location,
            order.delivery_location,
            order.status.value,
            order.created_at,
            masked_code,
        )
    }
}