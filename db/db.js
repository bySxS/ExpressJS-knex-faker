const knex = require('knex')
const knexFile = require('../db/knexfile')

const db = knex(knexFile.development)

module.exports = db