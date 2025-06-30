module logistics::quotes {
    
    use sui::clock::{Self, Clock};
    use sui::event;
    use std::string::{Self, String};
    
    // Error constants
    const E_INVALID_PRICE: u64 = 1;
    const E_EMPTY_DESCRIPTION: u64 = 2;
    const E_QUOTE_EXPIRED: u64 = 3;
    //const E_QUOTE_ALREADY_ACCEPTED: u64 = 4;
    const E_INVALID_STATUS: u64 = 5;
    const E_UNAUTHORIZED_ACCESS: u64 = 6;
    const E_INVALID_WEIGHT: u64 = 7;
    const E_INVALID_DIMENSIONS: u64 = 8;
    //const E_INVALID_DISTANCE: u64 = 9;
    const E_QUOTE_NOT_PENDING: u64 = 10;

    // Status constants
    //const STATUS_DRAFT: vector<u8> = b"DRAFT";
    const STATUS_PENDING: vector<u8> = b"PENDING";
    const STATUS_ACCEPTED: vector<u8> = b"ACCEPTED";
    const STATUS_REJECTED: vector<u8> = b"REJECTED";
    const STATUS_EXPIRED: vector<u8> = b"EXPIRED";
    const STATUS_CANCELLED: vector<u8> = b"CANCELLED";
    const STATUS_REVISED: vector<u8> = b"REVISED";

    // Service type constants
    const SERVICE_STANDARD: vector<u8> = b"STANDARD";
    const SERVICE_EXPRESS: vector<u8> = b"EXPRESS";
    const SERVICE_OVERNIGHT: vector<u8> = b"OVERNIGHT";
    const SERVICE_SAME_DAY: vector<u8> = b"SAME_DAY";
    const SERVICE_FREIGHT: vector<u8> = b"FREIGHT";

    // Quote validity period (7 days in milliseconds)
    const DEFAULT_VALIDITY_PERIOD: u64 = 604800000;

    // Main quote struct
    public struct Quote has key, store {
        id: UID,
        quote_number: String,
        customer_id: address,
        provider_id: address,
        service_type: String,
        status: String,
        
        // Shipment details
        origin: Location,
        destination: Location,
        package_details: PackageDetails,
        
        // Pricing breakdown
        base_price: u64,
        fuel_surcharge: u64,
        insurance_cost: u64,
        handling_fees: u64,
        taxes: u64,
        total_price: u64,
        currency: String,
        
        // Timing
        estimated_delivery_days: u8,
        created_at: u64,
        updated_at: u64,
        expires_at: u64,
        accepted_at: Option<u64>,
        
        // Additional information
        description: String,
        special_requirements: vector<String>,
        terms_conditions: String,
        valid_until: u64,
        
        // Tracking
        revision_count: u8,
        parent_quote_id: Option<ID>,
        notes: vector<QuoteNote>,
    }

    // Location information
    public struct Location has store, copy, drop {
        address: String,
        city: String,
        state: String,
        country: String,
        postal_code: String,
        coordinates: Option<Coordinates>,
    }

    // GPS coordinates
    public struct Coordinates has store, copy, drop {
        latitude: u64,  // Scaled by 1000000 for precision
        longitude: u64, // Scaled by 1000000 for precision
    }

    // Package details
    public struct PackageDetails has store, copy, drop {
        weight_kg: u64,
        length_cm: u64,
        width_cm: u64,
        height_cm: u64,
        volume_cm3: u64,
        package_count: u64,
        package_type: String,
        declared_value: u64,
        hazardous: bool,
        fragile: bool,
        perishable: bool,
    }

    // Quote notes for communication
    public struct QuoteNote has store, copy, drop {
        author: address,
        content: String,
        timestamp: u64,
        is_internal: bool,
    }

    // Quote template for standardized pricing
    public struct QuoteTemplate has key, store {
        id: UID,
        name: String,
        service_type: String,
        base_rate_per_kg: u64,
        base_rate_per_km: u64,
        fuel_surcharge_rate: u64, // Percentage * 100
        insurance_rate: u64,      // Percentage * 100
        handling_fee: u64,
        tax_rate: u64,           // Percentage * 100
        min_price: u64,
        max_weight_kg: u64,
        created_by: address,
        is_active: bool,
    }

    // Capability for quote management
    public struct QuoteManagerCap has key, store {
        id: UID,
    }

    // Events
    public struct QuoteCreated has copy, drop {
        quote_id: ID,
        quote_number: String,
        customer_id: address,
        provider_id: address,
        total_price: u64,
        service_type: String,
        timestamp: u64,
    }

    public struct QuoteStatusUpdated has copy, drop {
        quote_id: ID,
        old_status: String,
        new_status: String,
        updated_by: address,
        timestamp: u64,
    }

    public struct QuoteAccepted has copy, drop {
        quote_id: ID,
        customer_id: address,
        provider_id: address,
        total_price: u64,
        timestamp: u64,
    }

    public struct QuoteRevised has copy, drop {
        quote_id: ID,
        old_quote_id: ID,
        new_total_price: u64,
        revision_count: u8,
        timestamp: u64,
    }

    // Initialize function
    fun init(ctx: &mut TxContext) {
        let manager_cap = QuoteManagerCap {
            id: object::new(ctx),
        };
        transfer::transfer(manager_cap, tx_context::sender(ctx));
    }

    // Create a comprehensive quote
    public fun create_quote(
        customer_id: address,
        service_type: String,
        origin: Location,
        destination: Location,
        package_details: PackageDetails,
        description: String,
        special_requirements: vector<String>,
        clock: &Clock,
        ctx: &mut TxContext
    ): Quote {
        // Validate inputs
        assert!(!string::is_empty(&description), E_EMPTY_DESCRIPTION);
        assert!(is_valid_service_type(&service_type), E_INVALID_STATUS);
        assert!(package_details.weight_kg > 0, E_INVALID_WEIGHT);
        assert!(package_details.length_cm > 0 && package_details.width_cm > 0 && 
                package_details.height_cm > 0, E_INVALID_DIMENSIONS);
        
        let current_time = clock::timestamp_ms(clock);
        let provider_id = tx_context::sender(ctx);
        let quote_id = object::new(ctx);
        let quote_obj_id = object::uid_to_inner(&quote_id);
        
        // Generate quote number
        let quote_number = generate_quote_number(current_time);
        
        // Calculate pricing (simplified calculation)
        let base_price = calculate_base_price(&service_type, &package_details, &origin, &destination);
        let fuel_surcharge = base_price * 15 / 100; // 15% fuel surcharge
        let insurance_cost = if (package_details.declared_value > 0) {
            package_details.declared_value * 2 / 100 // 2% of declared value
        } else { 0 };
        let handling_fees = 50; // Fixed handling fee
        let taxes = (base_price + fuel_surcharge + insurance_cost + handling_fees) * 10 / 100; // 10% tax
        let total_price = base_price + fuel_surcharge + insurance_cost + handling_fees + taxes;
        
        // Calculate estimated delivery days
        let estimated_delivery_days = calculate_delivery_days(&service_type);
        
        let expires_at = current_time + DEFAULT_VALIDITY_PERIOD;
        
        let quote = Quote {
            id: quote_id,
            quote_number,
            customer_id,
            provider_id,
            service_type,
            status: string::utf8(STATUS_PENDING),
            origin,
            destination,
            package_details,
            base_price,
            fuel_surcharge,
            insurance_cost,
            handling_fees,
            taxes,
            total_price,
            currency: string::utf8(b"USD"),
            estimated_delivery_days,
            created_at: current_time,
            updated_at: current_time,
            expires_at,
            accepted_at: option::none(),
            description,
            special_requirements,
            terms_conditions: string::utf8(b"Standard terms and conditions apply"),
            valid_until: expires_at,
            revision_count: 0,
            parent_quote_id: option::none(),
            notes: vector::empty(),
        };

        // Emit creation event
        event::emit(QuoteCreated {
            quote_id: quote_obj_id,
            quote_number,
            customer_id,
            provider_id,
            total_price,
            service_type,
            timestamp: current_time,
        });

        quote
    }

    // Create quote from template
    public fun create_quote_from_template(
        template: &QuoteTemplate,
        customer_id: address,
        origin: Location,
        destination: Location,
        package_details: PackageDetails,
        description: String,
        clock: &Clock,
        ctx: &mut TxContext
    ): Quote {
        assert!(template.is_active, E_INVALID_STATUS);
        assert!(package_details.weight_kg <= template.max_weight_kg, E_INVALID_WEIGHT);
        
        let distance_km = calculate_distance(&origin, &destination);
        let base_price = (template.base_rate_per_kg * package_details.weight_kg) + 
                        (template.base_rate_per_km * distance_km);
        let total_with_template = calculate_price_from_template(template, base_price, &package_details);
        
        // Use the existing create_quote function but override pricing
        let mut quote = create_quote(
            customer_id,
            template.service_type,
            origin,
            destination,
            package_details,
            description,
            vector::empty(),
            clock,
            ctx
        );
        
        // Override with template pricing
        quote.total_price = total_with_template;
        quote
    }

    // Accept quote
    public fun accept_quote(
        quote: &mut Quote,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(quote.status == string::utf8(STATUS_PENDING), E_QUOTE_NOT_PENDING);
        assert!(tx_context::sender(ctx) == quote.customer_id, E_UNAUTHORIZED_ACCESS);
        
        let current_time = clock::timestamp_ms(clock);
        assert!(current_time <= quote.expires_at, E_QUOTE_EXPIRED);
        
        let old_status = quote.status;
        quote.status = string::utf8(STATUS_ACCEPTED);
        quote.accepted_at = option::some(current_time);
        quote.updated_at = current_time;

        // Emit events
        event::emit(QuoteStatusUpdated {
            quote_id: object::uid_to_inner(&quote.id),
            old_status,
            new_status: quote.status,
            updated_by: tx_context::sender(ctx),
            timestamp: current_time,
        });

        event::emit(QuoteAccepted {
            quote_id: object::uid_to_inner(&quote.id),
            customer_id: quote.customer_id,
            provider_id: quote.provider_id,
            total_price: quote.total_price,
            timestamp: current_time,
        });
    }

    // Reject quote
    public fun reject_quote(
        quote: &mut Quote,
        reason: String,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(quote.status == string::utf8(STATUS_PENDING), E_QUOTE_NOT_PENDING);
        assert!(tx_context::sender(ctx) == quote.customer_id, E_UNAUTHORIZED_ACCESS);
        
        let current_time = clock::timestamp_ms(clock);
        let old_status = quote.status;
        
        quote.status = string::utf8(STATUS_REJECTED);
        quote.updated_at = current_time;
        
        // Add rejection note
        let note = QuoteNote {
            author: tx_context::sender(ctx),
            content: reason,
            timestamp: current_time,
            is_internal: false,
        };
        vector::push_back(&mut quote.notes, note);

        event::emit(QuoteStatusUpdated {
            quote_id: object::uid_to_inner(&quote.id),
            old_status,
            new_status: quote.status,
            updated_by: tx_context::sender(ctx),
            timestamp: current_time,
        });
    }

    // Revise quote (create new version)
    public fun revise_quote(
        original_quote: &Quote,
        new_total_price: u64,
        new_description: String,
        clock: &Clock,
        ctx: &mut TxContext
    ): Quote {
        assert!(tx_context::sender(ctx) == original_quote.provider_id, E_UNAUTHORIZED_ACCESS);
        assert!(original_quote.status == string::utf8(STATUS_REJECTED) || 
                original_quote.status == string::utf8(STATUS_PENDING), E_INVALID_STATUS);
        assert!(new_total_price > 0, E_INVALID_PRICE);
        
        let current_time = clock::timestamp_ms(clock);
        let quote_id = object::new(ctx);
        let quote_obj_id = object::uid_to_inner(&quote_id);
        let original_quote_id = object::uid_to_inner(&original_quote.id);
        
        // Create revised quote
        let quote_number = generate_quote_number(current_time);
        let new_revision_count = original_quote.revision_count + 1;
        
        let revised_quote = Quote {
            id: quote_id,
            quote_number,
            customer_id: original_quote.customer_id,
            provider_id: original_quote.provider_id,
            service_type: original_quote.service_type,
            status: string::utf8(STATUS_REVISED),
            origin: original_quote.origin,
            destination: original_quote.destination,
            package_details: original_quote.package_details,
            base_price: new_total_price * 70 / 100, // Assume 70% is base price
            fuel_surcharge: new_total_price * 15 / 100,
            insurance_cost: new_total_price * 5 / 100,
            handling_fees: new_total_price * 5 / 100,
            taxes: new_total_price * 5 / 100,
            total_price: new_total_price,
            currency: original_quote.currency,
            estimated_delivery_days: original_quote.estimated_delivery_days,
            created_at: current_time,
            updated_at: current_time,
            expires_at: current_time + DEFAULT_VALIDITY_PERIOD,
            accepted_at: option::none(),
            description: new_description,
            special_requirements: original_quote.special_requirements,
            terms_conditions: original_quote.terms_conditions,
            valid_until: current_time + DEFAULT_VALIDITY_PERIOD,
            revision_count: new_revision_count,
            parent_quote_id: option::some(original_quote_id),
            notes: vector::empty(),
        };

        event::emit(QuoteRevised {
            quote_id: quote_obj_id,
            old_quote_id: original_quote_id,
            new_total_price,
            revision_count: new_revision_count,
            timestamp: current_time,
        });

        revised_quote
    }

    // Add note to quote
    public fun add_note(
        quote: &mut Quote,
        content: String,
        is_internal: bool,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let current_time = clock::timestamp_ms(clock);
        let author = tx_context::sender(ctx);
        
        let note = QuoteNote {
            author,
            content,
            timestamp: current_time,
            is_internal,
        };
        
        vector::push_back(&mut quote.notes, note);
        quote.updated_at = current_time;
    }

    // Expire quote
    public fun expire_quote(
        quote: &mut Quote,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(quote.status == string::utf8(STATUS_PENDING), E_QUOTE_NOT_PENDING);
        
        let current_time = clock::timestamp_ms(clock);
        assert!(current_time > quote.expires_at, E_QUOTE_EXPIRED);
        
        let old_status = quote.status;
        quote.status = string::utf8(STATUS_EXPIRED);
        quote.updated_at = current_time;

        event::emit(QuoteStatusUpdated {
            quote_id: object::uid_to_inner(&quote.id),
            old_status,
            new_status: quote.status,
            updated_by: tx_context::sender(ctx),
            timestamp: current_time,
        });
    }

    // Create quote template
    public fun create_quote_template(
        _: &QuoteManagerCap,
        name: String,
        service_type: String,
        base_rate_per_kg: u64,
        base_rate_per_km: u64,
        fuel_surcharge_rate: u64,
        insurance_rate: u64,
        handling_fee: u64,
        tax_rate: u64,
        min_price: u64,
        max_weight_kg: u64,
        ctx: &mut TxContext
    ): QuoteTemplate {
        let template = QuoteTemplate {
            id: object::new(ctx),
            name,
            service_type,
            base_rate_per_kg,
            base_rate_per_km,
            fuel_surcharge_rate,
            insurance_rate,
            handling_fee,
            tax_rate,
            min_price,
            max_weight_kg,
            created_by: tx_context::sender(ctx),
            is_active: true,
        };
        
        template
    }

    // Getter functions
    public fun get_id(quote: &Quote): ID {
        object::uid_to_inner(&quote.id)
    }

    public fun get_quote_number(quote: &Quote): &String {
        &quote.quote_number
    }

    public fun get_total_price(quote: &Quote): u64 {
        quote.total_price
    }

    public fun get_status(quote: &Quote): &String {
        &quote.status
    }

    public fun get_customer_id(quote: &Quote): address {
        quote.customer_id
    }

    public fun get_provider_id(quote: &Quote): address {
        quote.provider_id
    }

    public fun get_service_type(quote: &Quote): &String {
        &quote.service_type
    }

    public fun get_estimated_delivery_days(quote: &Quote): u8 {
        quote.estimated_delivery_days
    }

    public fun is_expired(quote: &Quote, clock: &Clock): bool {
        let current_time = clock::timestamp_ms(clock);
        current_time > quote.expires_at
    }

    public fun is_accepted(quote: &Quote): bool {
        quote.status == string::utf8(STATUS_ACCEPTED)
    }

    public fun get_package_details(quote: &Quote): &PackageDetails {
        &quote.package_details
    }

    public fun get_notes(quote: &Quote): &vector<QuoteNote> {
        &quote.notes
    }

    // Private helper functions
    fun is_valid_service_type(service_type: &String): bool {
        *service_type == string::utf8(SERVICE_STANDARD) ||
        *service_type == string::utf8(SERVICE_EXPRESS) ||
        *service_type == string::utf8(SERVICE_OVERNIGHT) ||
        *service_type == string::utf8(SERVICE_SAME_DAY) ||
        *service_type == string::utf8(SERVICE_FREIGHT)
    }

    fun generate_quote_number(timestamp: u64): String {
        // Simple quote number generation: QT + timestamp
        let prefix = b"QT";
        let mut number_bytes = vector::empty<u8>();
        vector::append(&mut number_bytes, prefix);
        
        // Convert timestamp to string representation (simplified)
        let timestamp_str = timestamp / 1000; // Convert to seconds
        let suffix = timestamp_str % 1000000; // Take last 6 digits
        
        // Add suffix bytes (simplified conversion)
        vector::push_back(&mut number_bytes, ((suffix / 100000) % 10 + 48) as u8);
        vector::push_back(&mut number_bytes, ((suffix / 10000) % 10 + 48) as u8);
        vector::push_back(&mut number_bytes, ((suffix / 1000) % 10 + 48) as u8);
        vector::push_back(&mut number_bytes, ((suffix / 100) % 10 + 48) as u8);
        vector::push_back(&mut number_bytes, ((suffix / 10) % 10 + 48) as u8);
        vector::push_back(&mut number_bytes, ((suffix) % 10 + 48) as u8);
        
        string::utf8(number_bytes)
    }

    fun calculate_base_price(
        service_type: &String,
        package_details: &PackageDetails,
        _origin: &Location,
        _destination: &Location
    ): u64 {
        let base_rate = if (*service_type == string::utf8(SERVICE_SAME_DAY)) {
            100
        } else if (*service_type == string::utf8(SERVICE_OVERNIGHT)) {
            50
        } else if (*service_type == string::utf8(SERVICE_EXPRESS)) {
            30
        } else {
            20
        };
        
        // Base calculation: rate * weight
        base_rate * package_details.weight_kg
    }

    fun calculate_delivery_days(service_type: &String): u8 {
        if (*service_type == string::utf8(SERVICE_SAME_DAY)) {
            0
        } else if (*service_type == string::utf8(SERVICE_OVERNIGHT)) {
            1
        } else if (*service_type == string::utf8(SERVICE_EXPRESS)) {
            2
        } else {
            5
        }
    }

    fun calculate_distance(_origin: &Location, _destination: &Location): u64 {
        // Simplified distance calculation - in real implementation, 
        // this would use coordinates to calculate actual distance
        500 // Default 500km
    }

    fun calculate_price_from_template(
        template: &QuoteTemplate,
        base_price: u64,
        package_details: &PackageDetails
    ): u64 {
        let fuel_surcharge = base_price * template.fuel_surcharge_rate / 10000;
        let insurance = package_details.declared_value * template.insurance_rate / 10000;
        let subtotal = base_price + fuel_surcharge + insurance + template.handling_fee;
        let taxes = subtotal * template.tax_rate / 10000;
        let total = subtotal + taxes;
        
        if (total < template.min_price) {
            template.min_price
        } else {
            total
        }
    }

    // Test functions
    #[test_only]
    public fun test_create_quote(ctx: &mut TxContext): Quote {
        use sui::clock;
        let clock = clock::create_for_testing(ctx);
        
        let origin = Location {
            address: string::utf8(b"123 Origin St"),
            city: string::utf8(b"Origin City"),
            state: string::utf8(b"OS"),
            country: string::utf8(b"Origin Country"),
            postal_code: string::utf8(b"12345"),
            coordinates: option::none(),
        };
        
        let destination = Location {
            address: string::utf8(b"456 Dest Ave"),
            city: string::utf8(b"Dest City"),
            state: string::utf8(b"DS"),
            country: string::utf8(b"Dest Country"),
            postal_code: string::utf8(b"67890"),
            coordinates: option::none(),
        };
        
        let package_details = PackageDetails {
            weight_kg: 10,
            length_cm: 30,
            width_cm: 20,
            height_cm: 15,
            volume_cm3: 9000,
            package_count: 1,
            package_type: string::utf8(b"BOX"),
            declared_value: 1000,
            hazardous: false,
            fragile: false,
            perishable: false,
        };
        
        let quote = create_quote(
            @0x2,
            string::utf8(SERVICE_STANDARD),
            origin,
            destination,
            package_details,
            string::utf8(b"Test quote"),
            vector::empty(),
            &clock,
            ctx
        );
        
        clock::destroy_for_testing(clock);
        quote
    }

    #[test_only]
    public fun destroy_quote_for_testing(quote: Quote) {
        let Quote { 
            id,
            quote_number: _,
            customer_id: _,
            provider_id: _,
            service_type: _,
            status: _,
            origin: _,
            destination: _,
            package_details: _,
            base_price: _,
            fuel_surcharge: _,
            insurance_cost: _,
            handling_fees: _,
            taxes: _,
            total_price: _,
            currency: _,
            estimated_delivery_days: _,
            created_at: _,
            updated_at: _,
            expires_at: _,
            accepted_at: _,
            description: _,
            special_requirements: _,
            terms_conditions: _,
            valid_until: _,
            revision_count: _,
            parent_quote_id: _,
            notes: _,
        } = quote;
        object::delete(id);
    }
}