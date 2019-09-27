exports.up = function(knex) {
  return knex.schema
    .createTable("roles", roles => {
      // id (pk), name
      roles.increments();
      roles.string("name");
    })
    .createTable("users", users => {
      // id (pk), email, password, name, role_id (fk)
      users.increments();
      users
        .string("email")
        .unique()
        .notNullable();
      users.string("password").notNullable();
      users.string("name").notNullable();
      users
        .integer("role_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("roles")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("events", events => {
      // id (pk), created_by (fk - users.id), name, description, budget, location, start_date, end_date
      events.increments();
      events
        .integer("created_by")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      events.string("name").notNullable();
      events.string("description");
      events.decimal("budget").notNullable();
      events.string("location");
      events.date("start_date").notNullable();
      events.date("end_date"); // Maybe change later to have a default value
    })
    .createTable("users_events", users_events => {
      // id (pk), user_id (fk - users.id), event_id (fk - events.id)
      users_events.increments();
      users_events
        .integer("event_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("events")
        .onDelete("CASCADE") // change this?
        .onUpdate("CASCADE");
      users_events
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        // .onDelete("SET NULL")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      users_events.unique(["event_id", "user_id"]);
    })
    .createTable("vendors", vendors => {
      // id (pk), name, type
      vendors.increments();
      vendors
        .string("name")
        .unique()
        .notNullable();
      vendors.string("type");
    })
    .createTable("budget_items", items => {
      // id (pk), name, cost, completed, event_id (fk - events.id), vendor_id (fk can be null - vendors.id)
      items.increments();
      items.string("name").notNullable();
      items.integer("quantity").defaultTo(1);
      items.decimal("cost").notNullable();
      items
        .boolean("completed")
        .notNullable()
        .defaultTo(false);
      items
        .integer("event_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("events")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      items
        .integer("vendor_id")
        .unsigned()
        .references("id")
        .inTable("vendors")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  // drop tables with foreign key before table it references
  return knex.schema
    .dropTableIfExists("budget_items")
    .dropTableIfExists("vendors")
    .dropTableIfExists("users_events")
    .dropTableIfExists("events")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
};
