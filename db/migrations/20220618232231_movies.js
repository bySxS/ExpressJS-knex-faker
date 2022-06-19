/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('movies', tbl => {
            tbl.increments('id')
                .primary()
                .unsigned()
            tbl.string('title', 100).notNullable()
            tbl.index(['title'], 'idx_movies_title');
            tbl.integer('category_id')
                .references('id')
                .inTable('category')
                .unsigned()
            tbl.integer('user_id')
                .references('id')
                .inTable('users')
                .unsigned()
            tbl.string('text')

            tbl.timestamps(true, true)
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('movies')
};
