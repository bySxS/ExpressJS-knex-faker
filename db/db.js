const knex = require('knex')
const knexFile = require('../db/knexfile')
const logger = require('../logger')
const { createClient } = require('redis')
const bluebird = require("bluebird");
require('dotenv').config()


const client = createClient({database: 1})

const promiseClientRedis = bluebird.promisifyAll(client);

client.connect()

client.on('error', (err) => {logger.error('error redis ' + err)})
// client.on('connect', function() {
//     console.log('Connected redis!')
// })
// client.on('disconnect', function() {
//     console.log('disconnect redis!')
// })


const db = knex(knexFile.development)

module.exports = {db, promiseClientRedis}