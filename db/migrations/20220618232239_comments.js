/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('comments', tbl => {
            tbl.increments('id')
                .primary()
                .unsigned()
            tbl.integer('news_id')
                .references('id')
                .inTable('news')
                .unsigned()
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            tbl.integer('movies_id')
                .references('id')
                .inTable('movies')
                .unsigned()
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            tbl.string('module_name', 40)
                .notNullable()
            tbl.integer('user_id')
                .references('id')
                .inTable('users')
                .unsigned() //нужен для integer и increment
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
                .notNullable()
            tbl.string('text')
                .notNullable()
            tbl.timestamps(true, true)
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('comments')
};
