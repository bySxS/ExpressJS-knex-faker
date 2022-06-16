const { format, createLogger, transports } = require('winston');
const { timestamp, combine, errors, json } = format;

function buildProdLogger() {
    return createLogger({
        format: combine(timestamp(), errors({ stack: true }), json()),
        defaultMeta: { service: 'user-service' },
        transports: [
            new transports.Console(),
            new transports.File({ filename: 'logger/log/error.log', level: 'error', format: format.json() }),
            new transports.File({ filename: 'logger/log/combined.log', format: format.json() }),
        ],
    });
}

module.exports = buildProdLogger;