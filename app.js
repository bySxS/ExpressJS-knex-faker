require('dotenv').config()
const express = require('express')
const router = require('./routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('./logger')
const cluster = require("cluster")
const numCPUs = require("os").cpus().length;

const corsOptions  = {origin: `*`, optionsSuccessStatus: 200}
const PORT = process.env.PORT || 3000

const app = express()


const start = function startServer() {
    logger.info(cluster.isPrimary)
    if (cluster.isPrimary) {
        console.log(`Master ${process.pid} is running.`)

        for (let i = 0; i < numCPUs; i += 1) {
            cluster.fork()
        }

        cluster.on("exit", worker => {
            console.log(`A worker with ID ${worker.process.pid} died.`)
        });
    } else {


        app.use(express.urlencoded({extended: true}))
        app.use(express.json())
        app.use(cookieParser())
        app.use(cors(corsOptions))
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", '*');
            next();
        })

        app.use(router)

        app.get('/', (req, res) => {
            res.send('Hello World!')
        })

        app.use(function (req, res) {
            logger.error(`${req.method} - 404 - ${req.path} - ${req.ip}`, {page: 'notFound'})
            res.status(404).send(`${req.method} - 404 - ${req.path}`);
        })

        app.listen(PORT, () => {
            logger.info(`App listening on port ${PORT}`)
        })


    }
}

start()