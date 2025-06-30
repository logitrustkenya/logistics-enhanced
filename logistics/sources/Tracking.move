module logistics::tracking {
    
    use sui::event;
    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::clock::{Self, Clock};
    use std::string::{Self, String};
    use std::vector;

    // Error codes
    const EInvalidStatus: u64 = 0;
    const EUnauthorized: u64 = 1;
    const EInvalidLocation: u64 = 2;
    const EEmptyData: u64 = 3;

    // Status constants
    const STATUS_CREATED: vector<u8> = b"CREATED";
    const STATUS_IN_TRANSIT: vector<u8> = b"IN_TRANSIT";
    const STATUS_OUT_FOR_DELIVERY: vector<u8> = b"OUT_FOR_DELIVERY";
    const STATUS_DELIVERED: vector<u8> = b"DELIVERED";
    const STATUS_EXCEPTION: vector<u8> = b"EXCEPTION";

    public struct TrackingRecord has key, store {
        id: UID,
        shipment_id: ID,
        location: String,
        status: String,
        timestamp: u64,
        carrier: String,
        notes: String,
        created_by: address,
        last_updated: u64,
        tracking_history: vector<TrackingEvent>,
    }

    public struct TrackingEvent has store, copy, drop {
        location: String,
        status: String,
        timestamp: u64,
        notes: String,
    }

    public struct TrackingCap has key, store {
        id: UID,
        shipment_id: ID,
    }

    // Events
    public struct TrackingRecordCreated has copy, drop {
        id: ID,
        shipment_id: ID,
        created_by: address,
        timestamp: u64,
    }

    public struct StatusUpdated has copy, drop {
        id: ID,
        old_status: String,
        new_status: String,
        timestamp: u64,
    }

    public struct LocationUpdated has copy, drop {
        id: ID,
        old_location: String,
        new_location: String,
        timestamp: u64,
    }

    public fun create_tracking_record(
        shipment_id: ID, 
        location: vector<u8>, 
        status: vector<u8>,
        carrier: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ): (TrackingRecord, TrackingCap) {
        assert!(!vector::is_empty(&location), EEmptyData);
        assert!(!vector::is_empty(&status), EEmptyData);
        assert!(is_valid_status(&status), EInvalidStatus);

        let tracking_id = object::new(ctx);
        let cap_id = object::new(ctx);
        let timestamp = clock::timestamp_ms(clock);
        let sender = tx_context::sender(ctx);

        let initial_event = TrackingEvent {
            location: string::utf8(location),
            status: string::utf8(status),
            timestamp,
            notes: string::utf8(b"Initial tracking record created"),
        };

        let record = TrackingRecord {
            id: tracking_id,
            shipment_id,
            location: string::utf8(location),
            status: string::utf8(status),
            timestamp,
            carrier: string::utf8(carrier),
            notes: string::utf8(b""),
            created_by: sender,
            last_updated: timestamp,
            tracking_history: vector::singleton(initial_event),
        };

        let cap = TrackingCap {
            id: cap_id,
            shipment_id,
        };

        event::emit(TrackingRecordCreated {
            id: object::uid_to_inner(&record.id),
            shipment_id,
            created_by: sender,
            timestamp,
        });

        (record, cap)
    }

    public fun update_status(
        record: &mut TrackingRecord, 
        _cap: &TrackingCap,
        new_status: vector<u8>,
        notes: vector<u8>,
        clock: &Clock,
        _ctx: &mut TxContext
    ) {
        assert!(is_valid_status(&new_status), EInvalidStatus);
        assert!(record.shipment_id == _cap.shipment_id, EUnauthorized);

        let old_status = record.status;
        let new_status_string = string::utf8(new_status);
        let timestamp = clock::timestamp_ms(clock);

        record.status = new_status_string;
        record.last_updated = timestamp;
        record.notes = string::utf8(notes);

        let tracking_event = TrackingEvent {
            location: record.location,
            status: new_status_string,
            timestamp,
            notes: string::utf8(notes),
        };

        vector::push_back(&mut record.tracking_history, tracking_event);

        event::emit(StatusUpdated {
            id: object::uid_to_inner(&record.id),
            old_status,
            new_status: new_status_string,
            timestamp,
        });
    }

    public fun update_location(
        record: &mut TrackingRecord, 
        _cap: &TrackingCap,
        new_location: vector<u8>,
        notes: vector<u8>,
        clock: &Clock,
        _ctx: &mut TxContext
    ) {
        assert!(!vector::is_empty(&new_location), EEmptyData);
        assert!(record.shipment_id == _cap.shipment_id, EUnauthorized);

        let old_location = record.location;
        let new_location_string = string::utf8(new_location);
        let timestamp = clock::timestamp_ms(clock);

        record.location = new_location_string;
        record.last_updated = timestamp;
        record.notes = string::utf8(notes);

        let tracking_event = TrackingEvent {
            location: new_location_string,
            status: record.status,
            timestamp,
            notes: string::utf8(notes),
        };

        vector::push_back(&mut record.tracking_history, tracking_event);

        event::emit(LocationUpdated {
            id: object::uid_to_inner(&record.id),
            old_location,
            new_location: new_location_string,
            timestamp,
        });
    }

    public fun update_location_and_status(
        record: &mut TrackingRecord,
        _cap: &TrackingCap,
        new_location: vector<u8>,
        new_status: vector<u8>,
        notes: vector<u8>,
        clock: &Clock,
        _ctx: &mut TxContext
    ) {
        assert!(!vector::is_empty(&new_location), EEmptyData);
        assert!(is_valid_status(&new_status), EInvalidStatus);
        assert!(record.shipment_id == _cap.shipment_id, EUnauthorized);

        let old_location = record.location;
        let old_status = record.status;
        let new_location_string = string::utf8(new_location);
        let new_status_string = string::utf8(new_status);
        let timestamp = clock::timestamp_ms(clock);

        record.location = new_location_string;
        record.status = new_status_string;
        record.last_updated = timestamp;
        record.notes = string::utf8(notes);

        let tracking_event = TrackingEvent {
            location: new_location_string,
            status: new_status_string,
            timestamp,
            notes: string::utf8(notes),
        };

        vector::push_back(&mut record.tracking_history, tracking_event);

        event::emit(LocationUpdated {
            id: object::uid_to_inner(&record.id),
            old_location,
            new_location: new_location_string,
            timestamp,
        });

        event::emit(StatusUpdated {
            id: object::uid_to_inner(&record.id),
            old_status,
            new_status: new_status_string,
            timestamp,
        });
    }

    public fun add_note(
        record: &mut TrackingRecord,
        _cap: &TrackingCap,
        note: vector<u8>,
        clock: &Clock
    ) {
        assert!(record.shipment_id == _cap.shipment_id, EUnauthorized);
        
        record.notes = string::utf8(note);
        record.last_updated = clock::timestamp_ms(clock);
    }

    // View functions
    public fun get_current_status(record: &TrackingRecord): String {
        record.status
    }

    public fun get_current_location(record: &TrackingRecord): String {
        record.location
    }

    public fun get_shipment_id(record: &TrackingRecord): ID {
        record.shipment_id
    }

    public fun get_carrier(record: &TrackingRecord): String {
        record.carrier
    }

    public fun get_created_by(record: &TrackingRecord): address {
        record.created_by
    }

    public fun get_last_updated(record: &TrackingRecord): u64 {
        record.last_updated
    }

    public fun get_tracking_history(record: &TrackingRecord): &vector<TrackingEvent> {
        &record.tracking_history
    }

    public fun get_notes(record: &TrackingRecord): String {
        record.notes
    }

    public fun is_delivered(record: &TrackingRecord): bool {
        record.status == string::utf8(STATUS_DELIVERED)
    }

    public fun has_exception(record: &TrackingRecord): bool {
        record.status == string::utf8(STATUS_EXCEPTION)
    }

    // Transfer functions
    public fun transfer_tracking_record(record: TrackingRecord, recipient: address) {
        transfer::transfer(record, recipient);
    }

    public fun transfer_tracking_cap(cap: TrackingCap, recipient: address) {
        transfer::transfer(cap, recipient);
    }

    // Helper functions
    #[allow(implicit_const_copy)]
    fun is_valid_status(status: &vector<u8>): bool {
        status == &STATUS_CREATED ||
        status == &STATUS_IN_TRANSIT ||
        status == &STATUS_OUT_FOR_DELIVERY ||
        status == &STATUS_DELIVERED ||
        status == &STATUS_EXCEPTION
    }

    // Destroy functions
    public fun destroy_tracking_cap(cap: TrackingCap) {
        let TrackingCap { id, shipment_id: _ } = cap;
        object::delete(id);
    }

    #[test_only]
    public fun create_for_testing(
        shipment_id: ID,
        location: vector<u8>,
        status: vector<u8>,
        carrier: vector<u8>,
        ctx: &mut TxContext
    ): (TrackingRecord, TrackingCap) {
        let tracking_id = object::new(ctx);
        let cap_id = object::new(ctx);
        let sender = tx_context::sender(ctx);

        let initial_event = TrackingEvent {
            location: string::utf8(location),
            status: string::utf8(status),
            timestamp: 0,
            notes: string::utf8(b"Test record"),
        };

        let record = TrackingRecord {
            id: tracking_id,
            shipment_id,
            location: string::utf8(location),
            status: string::utf8(status),
            timestamp: 0,
            carrier: string::utf8(carrier),
            notes: string::utf8(b""),
            created_by: sender,
            last_updated: 0,
            tracking_history: vector::singleton(initial_event),
        };

        let cap = TrackingCap {
            id: cap_id,
            shipment_id,
        };

        (record, cap)
    }
}