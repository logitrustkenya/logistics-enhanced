module logistics::disputes {
    
    use sui::clock::{Self, Clock};
    use sui::event;
    use std::string::{Self, String};
    use std::option::{Self, Option};

    // Error constants
    const E_INVALID_STATUS: u64 = 1;
    const E_EMPTY_ISSUE: u64 = 2;
    const E_DISPUTE_ALREADY_RESOLVED: u64 = 3;
    const E_INVALID_RESOLUTION: u64 = 4;
    const E_INVALID_PRIORITY: u64 = 6;
    const E_DISPUTE_NOT_OPEN: u64 = 7;

    // Status constants
    const STATUS_OPEN: vector<u8> = b"OPEN";
    const STATUS_INVESTIGATING: vector<u8> = b"INVESTIGATING";
    const STATUS_PENDING_RESPONSE: vector<u8> = b"PENDING_RESPONSE";
    const STATUS_RESOLVED: vector<u8> = b"RESOLVED";
    const STATUS_CLOSED: vector<u8> = b"CLOSED";
    const STATUS_ESCALATED: vector<u8> = b"ESCALATED";

    // Priority constants
    const PRIORITY_LOW: u8 = 1;
    const PRIORITY_MEDIUM: u8 = 2;
    const PRIORITY_HIGH: u8 = 3;
    const PRIORITY_URGENT: u8 = 4;

    // Resolution type constants
    const RESOLUTION_REFUND: vector<u8> = b"REFUND";
    const RESOLUTION_REPLACEMENT: vector<u8> = b"REPLACEMENT";
    const RESOLUTION_PARTIAL_REFUND: vector<u8> = b"PARTIAL_REFUND";
    const RESOLUTION_NO_ACTION: vector<u8> = b"NO_ACTION";
    const RESOLUTION_ESCALATED: vector<u8> = b"ESCALATED";

    // Main dispute struct
    public struct Dispute has key, store {
        id: UID,
        shipment_id: ID,
        issue_description: String,
        issue_category: String,
        status: String,
        priority: u8,
        created_at: u64,
        updated_at: u64,
        resolved_at: Option<u64>,
        created_by: address,
        assigned_to: Option<address>,
        resolution: Option<Resolution>,
        comments: vector<Comment>,
        attachments: vector<String>,
    }

    // Resolution details
    public struct Resolution has store, copy, drop {
        resolution_type: String,
        description: String,
        compensation_amount: Option<u64>,
        resolved_by: address,
        resolved_at: u64,
    }

    // Comment for dispute communication
    public struct Comment has store, copy, drop {
        author: address,
        content: String,
        timestamp: u64,
        is_internal: bool,
    }

    // Capability for dispute management
    public struct DisputeManagerCap has key, store {
        id: UID,
    }

    // Capability for dispute assignment
    public struct DisputeAgentCap has key, store {
        id: UID,
        agent_id: address,
    }

    // Events
    public struct DisputeCreated has copy, drop {
        dispute_id: ID,
        shipment_id: ID,
        created_by: address,
        issue_category: String,
        priority: u8,
        timestamp: u64,
    }

    public struct DisputeStatusUpdated has copy, drop {
        dispute_id: ID,
        old_status: String,
        new_status: String,
        updated_by: address,
        timestamp: u64,
    }

    public struct DisputeResolved has copy, drop {
        dispute_id: ID,
        resolution_type: String,
        resolved_by: address,
        timestamp: u64,
    }

    public struct DisputeAssigned has copy, drop {
        dispute_id: ID,
        assigned_to: address,
        assigned_by: address,
        timestamp: u64,
    }

    // Initialize function
    fun init(ctx: &mut TxContext) {
        let manager_cap = DisputeManagerCap {
            id: object::new(ctx),
        };
        transfer::transfer(manager_cap, tx_context::sender(ctx));
    }

    // Create a new dispute with comprehensive validation
    public fun create_dispute(
        shipment_id: ID,
        issue_description: String,
        issue_category: String,
        priority: u8,
        clock: &Clock,
        ctx: &mut TxContext
    ): Dispute {
        // Validate inputs
        assert!(!string::is_empty(&issue_description), E_EMPTY_ISSUE);
        assert!(is_valid_priority(priority), E_INVALID_PRIORITY);
        
        let current_time = clock::timestamp_ms(clock);
        let creator = tx_context::sender(ctx);
        let dispute_id = object::new(ctx);
        let dispute_obj_id = object::uid_to_inner(&dispute_id);
        
        let dispute = Dispute {
            id: dispute_id,
            shipment_id,
            issue_description,
            issue_category,
            status: string::utf8(STATUS_OPEN),
            priority,
            created_at: current_time,
            updated_at: current_time,
            resolved_at: option::none(),
            created_by: creator,
            assigned_to: option::none(),
            resolution: option::none(),
            comments: vector::empty(),
            attachments: vector::empty(),
        };

        // Emit creation event
        event::emit(DisputeCreated {
            dispute_id: dispute_obj_id,
            shipment_id,
            created_by: creator,
            issue_category,
            priority,
            timestamp: current_time,
        });

        dispute
    }

    // Update dispute status with proper validation
    public fun update_status(
        dispute: &mut Dispute,
        new_status: String,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(is_valid_status(&new_status), E_INVALID_STATUS);
        assert!(dispute.status != string::utf8(STATUS_CLOSED), E_DISPUTE_ALREADY_RESOLVED);
        
        let current_time = clock::timestamp_ms(clock);
        let updater = tx_context::sender(ctx);
        let old_status = dispute.status;
        
        dispute.status = new_status;
        dispute.updated_at = current_time;

        event::emit(DisputeStatusUpdated {
            dispute_id: object::uid_to_inner(&dispute.id),
            old_status,
            new_status,
            updated_by: updater,
            timestamp: current_time,
        });
    }

    // Assign dispute to an agent (requires manager capability)
    public fun assign_dispute(
        _: &DisputeManagerCap,
        dispute: &mut Dispute,
        agent_address: address,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(dispute.status != string::utf8(STATUS_CLOSED), E_DISPUTE_ALREADY_RESOLVED);
        
        let current_time = clock::timestamp_ms(clock);
        let assigner = tx_context::sender(ctx);
        
        dispute.assigned_to = option::some(agent_address);
        dispute.updated_at = current_time;
        
        // Update status to investigating if currently open
        if (dispute.status == string::utf8(STATUS_OPEN)) {
            dispute.status = string::utf8(STATUS_INVESTIGATING);
        };

        event::emit(DisputeAssigned {
            dispute_id: object::uid_to_inner(&dispute.id),
            assigned_to: agent_address,
            assigned_by: assigner,
            timestamp: current_time,
        });
    }

    // Resolve dispute with comprehensive resolution details
    public fun resolve_dispute(
        dispute: &mut Dispute,
        resolution_type: String,
        description: String,
        compensation_amount: Option<u64>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(is_valid_resolution_type(&resolution_type), E_INVALID_RESOLUTION);
        assert!(dispute.status != string::utf8(STATUS_CLOSED), E_DISPUTE_ALREADY_RESOLVED);
        
        let current_time = clock::timestamp_ms(clock);
        let resolver = tx_context::sender(ctx);
        
        let resolution = Resolution {
            resolution_type,
            description,
            compensation_amount,
            resolved_by: resolver,
            resolved_at: current_time,
        };
        
        dispute.resolution = option::some(resolution);
        dispute.status = string::utf8(STATUS_RESOLVED);
        dispute.resolved_at = option::some(current_time);
        dispute.updated_at = current_time;

        event::emit(DisputeResolved {
            dispute_id: object::uid_to_inner(&dispute.id),
            resolution_type,
            resolved_by: resolver,
            timestamp: current_time,
        });
    }

    // Add comment to dispute
    public fun add_comment(
        dispute: &mut Dispute,
        content: String,
        is_internal: bool,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let current_time = clock::timestamp_ms(clock);
        let author = tx_context::sender(ctx);
        
        let comment = Comment {
            author,
            content,
            timestamp: current_time,
            is_internal,
        };
        
        vector::push_back(&mut dispute.comments, comment);
        dispute.updated_at = current_time;
    }

    // Add attachment reference
    public fun add_attachment(
        dispute: &mut Dispute,
        attachment_url: String,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(dispute.status != string::utf8(STATUS_CLOSED), E_DISPUTE_ALREADY_RESOLVED);
        
        vector::push_back(&mut dispute.attachments, attachment_url);
        dispute.updated_at = clock::timestamp_ms(clock);
    }

    // Escalate dispute (requires manager capability)
    public fun escalate_dispute(
        _: &DisputeManagerCap,
        dispute: &mut Dispute,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(dispute.status != string::utf8(STATUS_CLOSED), E_DISPUTE_ALREADY_RESOLVED);
        
        dispute.status = string::utf8(STATUS_ESCALATED);
        dispute.priority = PRIORITY_URGENT;
        dispute.updated_at = clock::timestamp_ms(clock);
    }

    // Close dispute (final status)
    public fun close_dispute(
        _: &DisputeManagerCap,
        dispute: &mut Dispute,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(dispute.status == string::utf8(STATUS_RESOLVED), E_DISPUTE_NOT_OPEN);
        
        dispute.status = string::utf8(STATUS_CLOSED);
        dispute.updated_at = clock::timestamp_ms(clock);
    }

    // Getter functions
    public fun get_id(dispute: &Dispute): ID {
        object::uid_to_inner(&dispute.id)
    }

    public fun get_shipment_id(dispute: &Dispute): ID {
        dispute.shipment_id
    }

    public fun get_issue_description(dispute: &Dispute): &String {
        &dispute.issue_description
    }

    public fun get_status(dispute: &Dispute): &String {
        &dispute.status
    }

    public fun get_priority(dispute: &Dispute): u8 {
        dispute.priority
    }

    public fun get_created_by(dispute: &Dispute): address {
        dispute.created_by
    }

    public fun get_assigned_to(dispute: &Dispute): &Option<address> {
        &dispute.assigned_to
    }

    public fun get_resolution(dispute: &Dispute): &Option<Resolution> {
        &dispute.resolution
    }

    public fun get_comments(dispute: &Dispute): &vector<Comment> {
        &dispute.comments
    }

    public fun is_resolved(dispute: &Dispute): bool {
        dispute.status == string::utf8(STATUS_RESOLVED) || 
        dispute.status == string::utf8(STATUS_CLOSED)
    }

    public fun is_high_priority(dispute: &Dispute): bool {
        dispute.priority >= PRIORITY_HIGH
    }

    // Private helper functions
    fun is_valid_status(status: &String): bool {
        *status == string::utf8(STATUS_OPEN) ||
        *status == string::utf8(STATUS_INVESTIGATING) ||
        *status == string::utf8(STATUS_PENDING_RESPONSE) ||
        *status == string::utf8(STATUS_RESOLVED) ||
        *status == string::utf8(STATUS_CLOSED) ||
        *status == string::utf8(STATUS_ESCALATED)
    }

    fun is_valid_priority(priority: u8): bool {
        priority >= PRIORITY_LOW && priority <= PRIORITY_URGENT
    }

    fun is_valid_resolution_type(resolution_type: &String): bool {
        *resolution_type == string::utf8(RESOLUTION_REFUND) ||
        *resolution_type == string::utf8(RESOLUTION_REPLACEMENT) ||
        *resolution_type == string::utf8(RESOLUTION_PARTIAL_REFUND) ||
        *resolution_type == string::utf8(RESOLUTION_NO_ACTION) ||
        *resolution_type == string::utf8(RESOLUTION_ESCALATED)
    }
}