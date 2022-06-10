

module.exports = {
    // development: {
    //     client: 'sqlite3',
    //     connection: { //migrations
    //         filename: "./db/data.sqlite3"
    //     },
    //     useNullAsDefault: true
    // },



    development: {
      client: 'mysql',
      connection: { //migrations
          host: '127.0.0.1',
          user: 'sxs',
          password: '123456789s',
          database: 'site-test2',
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