require('dotenv').config()
const knex = require('knex')
const environment = process.env.NODE_ENV || 'development'
const knexFile = require('../db/knexfile')[environment]
const logger = require('../logger')
const {createClient} = require('redis')
const bluebird = require("bluebird");
const Queue = require('bull');



const db = knex(knexFile)

const client = createClient({database: 1})

const cacheRedisDB = bluebird.promisifyAll(client);

client.connect()

client.on('error', (err) => {
    logger.error('error redis ' + err)
})
// client.on('connect', function() {
//     console.log('Connected redis!')
// })
// client.on('disconnect', function() {
//     console.log('disconnect redis!')
// })

const userQueueDB = new Queue('user-db-queue', 'redis://127.0.0.1:6379');

userQueueDB.process('update', async (job, done) => {
    job.progress(0)
    //console.log('process ===============start', job.data)
    try {
        const {id, nickname, fullName, email, password, roles_id} = job.data
        await db('users')
            .where('id', '=', id)
            .update({
                nickname,
                email,
                full_name: fullName,
                password,
                roles_id
            })

        done(null, {complete: true, message: `Пользователь ${nickname} успешно изменен`})
        logger.info(`Пользователь ${nickname} успешно изменен`)


    } catch (e) {
        logger.error('error' + e, {db: 'userQueueDB'})
    }
    job.progress(100)

});

userQueueDB.start()


module.exports = {db, userQueueDB, cacheRedisDB}