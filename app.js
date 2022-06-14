const express = require('express')
const router = require('./routes')
const cors = require('cors')
const logger = require('./logger')

const corsOptions  = {
    origin: `*`,
    optionsSuccessStatus: 200
}

const port = 3000

const app = express()

app.use(cors(corsOptions))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    next();
});

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(function(req, res) {
    res.status(404).send('Sorry cant find that!');
});


app.listen(port, () => {
    logger.info(`App listening on port ${port}`)
})