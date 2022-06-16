

module.exports = {
     development: {
      client: 'mysql',
      connection: { //migrations
          host: '127.0.0.1',
          user: 'sxs',
          password: '123456789s',
          database: 'site-test',
          charset: 'utf8'
      },
      migrations: {
            tableName: 'knex_migrations'
      },
      // seeds: {
      //     directory: './db/migrations'
      // }
  }
}