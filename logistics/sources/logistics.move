module logistics::shipments {
    
    use sui::clock::{Self, Clock};
    use sui::event;
    use std::string::{Self, String};

    // Error constants
    const E_INVALID_STATUS: u64 = 1;
    const E_EMPTY_DESCRIPTION: u64 = 2;
    const E_INVALID_STATUS_TRANSITION: u64 = 3;
    //const E_UNAUTHORIZED_ACCESS: u64 = 4;

    // Status constants
    const STATUS_PENDING: vector<u8> = b"PENDING";
    const STATUS_IN_TRANSIT: vector<u8> = b"IN_TRANSIT";
    const STATUS_DELIVERED: vector<u8> = b"DELIVERED";
    const STATUS_CANCELLED: vector<u8> = b"CANCELLED";
    const STATUS_RETURNED: vector<u8> = b"RETURNED";

    // Main shipment struct
    public struct Shipment has key, store {
        id: UID,
        description: String,
        status: String,
        created_at: u64,
        updated_at: u64,
        creator: address,
        tracking_history: vector<TrackingEntry>,
    }

    // Tracking history entry
    public struct TrackingEntry has store, copy, drop {
        status: String,
        timestamp: u64,
        notes: String,
    }

    // Capability for shipment management
    public struct ShipmentManagerCap has key, store {
        id: UID,
    }

    // Events
    public struct ShipmentCreated has copy, drop {
        shipment_id: ID,
        creator: address,
        description: String,
        timestamp: u64,
    }

    public struct ShipmentStatusUpdated has copy, drop {
        shipment_id: ID,
        old_status: String,
        new_status: String,
        timestamp: u64,
        updater: address,
    }

    // Initialize function to create manager capability
    fun init(ctx: &mut TxContext) {
        let manager_cap = ShipmentManagerCap {
            id: object::new(ctx),
        };
        transfer::transfer(manager_cap, tx_context::sender(ctx));
    }

    // Create a new shipment with validation
    public fun create_shipment(
        description: String,
        clock: &Clock,
        ctx: &mut TxContext
    ): Shipment {
        // Validate description is not empty
        assert!(!string::is_empty(&description), E_EMPTY_DESCRIPTION);
        
        let current_time = clock::timestamp_ms(clock);
        let sender = tx_context::sender(ctx);
        let shipment_id = object::new(ctx);
        let shipment_obj_id = object::uid_to_inner(&shipment_id);
        
        let initial_status = string::utf8(STATUS_PENDING);
        
        let tracking_entry = TrackingEntry {
            status: initial_status,
            timestamp: current_time,
            notes: string::utf8(b"Shipment created"),
        };
        
        let mut tracking_history = vector::empty<TrackingEntry>();
        vector::push_back(&mut tracking_history, tracking_entry);
        
        let shipment = Shipment {
            id: shipment_id,
            description,
            status: initial_status,
            created_at: current_time,
            updated_at: current_time,
            creator: sender,
            tracking_history,
        };

        // Emit creation event
        event::emit(ShipmentCreated {
            shipment_id: shipment_obj_id,
            creator: sender,
            description: shipment.description,
            timestamp: current_time,
        });

        shipment
    }

    // Update shipment status with validation and history tracking
    public fun update_status(
        shipment: &mut Shipment,
        new_status: String,
        notes: String,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        // Validate status
        assert!(is_valid_status(&new_status), E_INVALID_STATUS);
        
        // Validate status transition
        assert!(is_valid_transition(&shipment.status, &new_status), E_INVALID_STATUS_TRANSITION);
        
        let current_time = clock::timestamp_ms(clock);
        let updater = tx_context::sender(ctx);
        let old_status = shipment.status;
        
        // Update shipment
        shipment.status = new_status;
        shipment.updated_at = current_time;
        
        // Add to tracking history
        let tracking_entry = TrackingEntry {
            status: new_status,
            timestamp: current_time,
            notes,
        };
        vector::push_back(&mut shipment.tracking_history, tracking_entry);

        // Emit status update event
        event::emit(ShipmentStatusUpdated {
            shipment_id: object::uid_to_inner(&shipment.id),
            old_status,
            new_status,
            timestamp: current_time,
            updater,
        });
    }

    // Privileged function to cancel shipment (requires manager capability)
    public fun cancel_shipment(
        _: &ShipmentManagerCap,
        shipment: &mut Shipment,
        reason: String,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let cancel_status = string::utf8(STATUS_CANCELLED);
        update_status(shipment, cancel_status, reason, clock, ctx);
    }

    // Getter functions
    public fun get_id(shipment: &Shipment): ID {
        object::uid_to_inner(&shipment.id)
    }

    public fun get_description(shipment: &Shipment): &String {
        &shipment.description
    }

    public fun get_status(shipment: &Shipment): &String {
        &shipment.status
    }

    public fun get_created_at(shipment: &Shipment): u64 {
        shipment.created_at
    }

    public fun get_updated_at(shipment: &Shipment): u64 {
        shipment.updated_at
    }

    public fun get_creator(shipment: &Shipment): address {
        shipment.creator
    }

    public fun get_tracking_history(shipment: &Shipment): &vector<TrackingEntry> {
        &shipment.tracking_history
    }

    // Utility functions
    public fun is_delivered(shipment: &Shipment): bool {
        shipment.status == string::utf8(STATUS_DELIVERED)
    }

    public fun is_cancelled(shipment: &Shipment): bool {
        shipment.status == string::utf8(STATUS_CANCELLED)
    }

    public fun is_in_transit(shipment: &Shipment): bool {
        shipment.status == string::utf8(STATUS_IN_TRANSIT)
    }

    // Private helper functions
    fun is_valid_status(status: &String): bool {
        *status == string::utf8(STATUS_PENDING) ||
        *status == string::utf8(STATUS_IN_TRANSIT) ||
        *status == string::utf8(STATUS_DELIVERED) ||
        *status == string::utf8(STATUS_CANCELLED) ||
        *status == string::utf8(STATUS_RETURNED)
    }

    fun is_valid_transition(current_status: &String, new_status: &String): bool {
        let current = *current_status;
        let new = *new_status;
        
        // Define valid transitions
        if (current == string::utf8(STATUS_PENDING)) {
            new == string::utf8(STATUS_IN_TRANSIT) || 
            new == string::utf8(STATUS_CANCELLED)
        } else if (current == string::utf8(STATUS_IN_TRANSIT)) {
            new == string::utf8(STATUS_DELIVERED) || 
            new == string::utf8(STATUS_RETURNED) ||
            new == string::utf8(STATUS_CANCELLED)
        } else if (current == string::utf8(STATUS_DELIVERED)) {
            new == string::utf8(STATUS_RETURNED)
        } else {
            // CANCELLED and RETURNED are terminal states
            false
        }
    }

    // Test functions
    #[test_only]
    public fun test_create_shipment(ctx: &mut TxContext): Shipment {
        use sui::clock;
        let clock = clock::create_for_testing(ctx);
        let shipment = create_shipment(
            string::utf8(b"Test shipment"),
            &clock,
            ctx
        );
        clock::destroy_for_testing(clock);
        shipment
    }

    #[test_only]
    public fun destroy_shipment_for_testing(shipment: Shipment) {
        let Shipment { 
            id, 
            description: _, 
            status: _, 
            created_at: _, 
            updated_at: _, 
            creator: _, 
            tracking_history: _ 
        } = shipment;
        object::delete(id);
    }
}