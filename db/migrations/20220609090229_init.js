// npx knex migrate:make init --migrations-directory db/migrations
// npx knex migrate:latest --knexfile db/knexfile.js
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
      .createTable('category', tbl => {
          tbl.increments('id')
               .primary()
               .unsigned()
          tbl.string('module_name', 40)
              .notNullable()
          tbl.string('name', 40)
              .notNullable()
          tbl.string('name_rus', 40)
              .notNullable()
      })
      .createTable('users', tbl => {
          tbl.increments('id')
              .primary()
              .unsigned()
          tbl.string('nickname', 40)
              .notNullable()
          tbl.index(['nickname'], 'idx_users_nickname');
          tbl.string('full_name', 80)
          tbl.integer('roles_id')
              .references('id')
              .inTable('roles')
              .unsigned()
          tbl.string('email', 40)
              .notNullable()
          tbl.string('password', 200)
              .notNullable()
          tbl.timestamps(true, true)
      })
      .createTable('news', tbl => {
          tbl.increments('id')
              .primary()
              .unsigned()
          tbl.string('title', 100).notNullable()
          tbl.index(['title'], 'idx_news_title');
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
     .dropTable('roles')
     .dropTable('users')
     .dropTable('category')
     .dropTable('movies')
     .dropTable('news')
     .dropTable('comments')

};
