module.exports = {
    test: {
        client: 'mysql',
        connection: { //migrations
            host: '127.0.0.1',
            user: 'sxs',
            password: '123456789s',
            database: 'site-test',
            charset: 'utf8'
        },
        migrations: {
            directory: '../db/migrations',
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: '../db/seeds/test'
        }
    },
    development: {
        client: 'mysql',
        connection: { //migrations
            host: '127.0.0.1',
            user: 'sxs',
            password: '123456789s',
            database: 'site-dev',
            charset: 'utf8'
        },
        migrations: {
            directory: '../db/migrations',
            tableName: 'knex_migrations'

        },
        seeds: {
            directory: '../db/seeds/development'
        }
    },
    production: {
        client: 'mysql',
        connection: { //migrations
            host: '127.0.0.1',
            user: 'sxs',
            password: '123456789s',
            database: 'site-prod',
            charset: 'utf8'
        },
        migrations: {
            directory: '../db/migrations',
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: '../db/seeds/production'
        }
    },
    pool: { min: 2, max: 5 }
}