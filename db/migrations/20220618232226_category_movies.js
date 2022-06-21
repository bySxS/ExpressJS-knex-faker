/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('category_movies', tbl => {
            tbl.increments('id')
                .primary()
                .unsigned()
            // tbl.string('module_name', 40)
            //     .notNullable()
            tbl.string('name', 40)
                .notNullable()
            tbl.string('name_rus', 40)
                .notNullable()
            tbl.string('url', 80)
                .notNullable()
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('category_movies')
};