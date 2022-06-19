/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('roles', tbl => {
            tbl.increments('id')
                .primary()
                .unsigned()
            tbl.string('name', 40)
                .notNullable()
                .unique()
            tbl.string('name_rus', 40)
                .notNullable()
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('roles')
};
