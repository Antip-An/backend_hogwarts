exports.up = async (knex) => {
    await knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.string("login").unique().notNullable();
        table.string("email").unique();
        table.boolean("email_is_confirmed").notNullable().defaultTo(false);
        table.string("email_confirmation_code", 6);
        table.string("password");
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        table.boolean("active").notNullable().defaultTo(true);
        table
            .enu("role", ["user", "admin"])
            .notNullable()
            .defaultTo("user");
    });

    await knex.schema.createTable("courses", (table) => {
        table.increments("id");
        table.string("title").unique().notNullable();
        table.text("description").notNullable();
    });

    await knex.schema.createTable("user_course", (table) => {
        table.integer('id_course').notNullable();
        table.integer('id_user').notNullable();
        table
            .enu("status", ["nothing", "start", "end"])
            .notNullable()
        table.boolean('selected')
        table.foreign("id_course").references('courses.id');
        table.foreign("id_user").references('users.id');
    });

    await knex.schema.createTable("lessons", (table) => {
        table.increments("id");
        table.string("title").notNullable();
        table.text("description").notNullable();
        table.text("lesson").notNullable();
        table.string("photo");
        table.integer('id_course').notNullable();
        table.foreign("id_course").references('courses.id');
    });

    await knex.schema.createTable("user_lessons", (table) => {
        table.integer('id_lesson').notNullable();
        table.integer('id_user').notNullable();
        table
            .enu("status", ["start", "end"])
            .notNullable()
            .defaultTo("start");
        table.foreign("id_lesson").references('lessons.id');
        table.foreign("id_user").references('users.id');
    });

    await knex.schema.createTable("tests", (table) => {
        table.increments("id");
        table.string("title").notNullable();
        table.text("description").notNullable();
        table.integer("id_lessons").notNullable();
        table.foreign("id_lessons").references('lessons.id');
    });

    await knex.schema.createTable("user_tests", (table) => {
        table.integer('id_test').notNullable();
        table.integer('id_user').notNullable();
        table
            .enu("status", ["start", "end"])
            .notNullable()
            .defaultTo("start");
        table.integer("mark")
        table.foreign("id_test").references('tests.id');
        table.foreign("id_user").references('users.id');
    });

    await knex.schema.createTable("progress", (table) => {
        table.increments("id");
        table.string("title").notNullable();
        table.text("description").notNullable();
        table.string("photo");
        table.integer("id_test").notNullable();
        table.foreign("id_test").references('tests.id');
    });

    await knex.schema.createTable("user_progress", (table) => {
        table.integer('id_user').notNullable();
        table.integer('id_progress').notNullable();
        table.foreign("id_user").references('users.id');
        table.foreign("id_progress").references('progress.id');
    })

    await knex.schema.createTable("tasks", (table) => {
        table.increments("id");
        table.text("question").notNullable();
        table.string("photo");
        table.integer("mark").notNullable();
        table
            .enu("type_test", ["text", "option"])
            .notNullable();
        table.string("right_answer");
        table.integer("id_test").notNullable();
        table.foreign("id_test").references('tests.id');
    });

    await knex.schema.createTable("options", (table) => {
        table.increments("id");
        table.string("answer").notNullable();
        table.bool("right_answer").notNullable();
        table.integer("id_task").notNullable();
        table.foreign("id_task").references('tasks.id');
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTableIfExists("user_course");
    await knex.schema.dropTableIfExists("user_lessons");
    await knex.schema.dropTableIfExists("user_progress");
    await knex.schema.dropTableIfExists("user_tests");
    await knex.schema.dropTableIfExists("progress");
    await knex.schema.dropTableIfExists("options");
    await knex.schema.dropTableIfExists("tasks");
    await knex.schema.dropTableIfExists("tests");
    await knex.schema.dropTableIfExists("lessons");
    await knex.schema.dropTableIfExists("users");
    await knex.schema.dropTableIfExists("courses");
};