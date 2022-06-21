require('dotenv').config()
const knex = require('knex')
const environment = process.env.NODE_ENV || 'development'
const knexFile = require('../db/knexfile')[environment]
const logger = require('../logger')
const {createClient} = require('redis')
const bluebird = require("bluebird")
const Queue = require('bull')

const db = knex(knexFile)

// abstract transactional batch update
async function knexTrxBatchUpdate({table, column}, collection) {
    const trx = await db.transaction()
    try {
        await Promise.all(collection.map(tuple => {
                db(table)
                    .where(column, '=', tuple[column])
                    .update(tuple)
                    .transacting(trx)
            })
        )
        await trx.commit()
    } catch (error) {
        await trx.rollback()
    }
}


const client = createClient({database: 1})

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


const cacheRedisDB = bluebird.promisifyAll(client);

const userQueueDB = new Queue('user-db-queue', 'redis://127.0.0.1:6379');

userQueueDB.process('update', async (job, done) => {
    //job.progress(0)
    try {
        const {id, nickname, fullName: full_name, email, password, roles_id} = job.data
        await db('users')
            .where('id', '=', id)
            .update({
                nickname,
                email,
                full_name,
                password,
                roles_id
            })
        done(null, {complete: true, message: `Пользователь ${job.data.nickname} успешно изменен`})
        logger.info(`Пользователь ${job.data.nickname} успешно изменен`)
    } catch (err){
        console.log(err)
    }

    //job.progress(100)

});

userQueueDB.start()


module.exports = {db, userQueueDB, cacheRedisDB}