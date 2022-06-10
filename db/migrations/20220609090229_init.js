// npx knex migrate:make init --migrations-directory db/migrations
// npx knex migrate:latest --knexfile db/knexfile.js
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
      .createTable('users', tbl => {
          tbl.increments()
          tbl.string('nickname', 40).notNullable()
          tbl.string('full_name', 80)
          tbl.string('email', 40)
          tbl.index(['nickname'], 'idx_nickname');
          tbl.timestamps(true, true)
      })
      .createTable('category', tbl => {
          tbl.increments()
          tbl.string('name', 40).notNullable()
          tbl.string('name_rus', 40).notNullable()
      })
      .createTable('news', tbl => {
          tbl.increments('id')
          tbl.string('title', 100).notNullable()
          tbl.integer('category_id')
              .unsigned()
              .references('id')
              .inTable('category')
              //.onDelete('CASCADE')
              //.onUpdate('CASCADE')
          tbl.integer('user_id')
              .unsigned()
              .references('id')
              .inTable('users')
              //.onDelete('CASCADE')
              //.onUpdate('CASCADE')
          tbl.string('text')
          tbl.index(['title'], 'idx_title');
          tbl.timestamps(true, true)
      })
      .createTable('comments', tbl => {
          tbl.increments('id')
          tbl.integer('news_id')
              .unsigned()
              .references('id')
              .inTable('news')
              .onDelete('CASCADE')
              .onUpdate('CASCADE')
              .notNullable()
          tbl.integer('user_id')
              .unsigned()
              .references('id')
              .inTable('users')
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
     .dropTable('news')
     .dropTable('comments')
     .dropTable('category')
     .dropTable('users')
};
