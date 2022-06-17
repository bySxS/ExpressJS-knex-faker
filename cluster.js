const cluster = require("cluster")
const logger = require('./logger')
const os = require("os")


const start = async function startServer() {
    if (cluster.isPrimary) {
        let numCPUs = os.cpus().length
        logger.info(`CPUs: ${numCPUs}`)
        if (numCPUs > 0) numCPUs--
        logger.info(`Master ${process.pid} is running. Start ${numCPUs} worker...`)

        for (let i = 0; i < numCPUs; i++) {
                cluster.fork()
        }


        cluster.on("exit", (worker) => {
            console.log(`A worker with ID ${worker.process.pid} died.`)
            cluster.fork()
        });
    }
    if (cluster.isWorker){
        require('./app')
    }
}

start()