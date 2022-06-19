const cluster = require("cluster")
const logger = require('./logger')
const os = require("os")
//const {userQueueDB} = require('./db/db')


const start = async function startServer() {
    if (cluster.isPrimary) {
        let numCPUs = os.cpus().length
        logger.info(`CPUs: ${numCPUs}`)
        if (numCPUs > 0) numCPUs--
        logger.info(`Master ${process.pid} is running. Start ${numCPUs} worker...`)

        for (let i = 0; i < numCPUs; i++) {
                cluster.fork()
        }


        cluster.on("exit", (worker, code) => {
            console.log(`A worker with ID ${worker.process.pid} died. Code ${code}`)
            if (code === 1) {
                cluster.fork()
            }
        });
    } else {
        require('./app')
        //kill -s SIGUSR2 pid
        cluster.on("SIGUSR2", async (worker, code) => {
            console.log(`Signal is ${worker.process.pid} SIGUSR2. Code ${code}`)
            //await userQueueDB.obliterate({ force: true });
            process.exit(1)//передаем code 1 в on(exit)
        });
        
    }
}

start()