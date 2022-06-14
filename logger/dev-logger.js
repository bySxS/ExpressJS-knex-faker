const { format, createLogger, transports } = require('winston');
const { timestamp, combine, printf, errors } = format;

function buildDevLogger() {
    const logFormat = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${stack || message}`;
    });

    return createLogger({
        format: combine(
            format.colorize(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            errors({ stack: true }),
            logFormat
        ),
        transports: [
            new transports.Console(),
            // new transports.File({ filename: 'logger/error.log', level: 'error', format: format.json() }),
            // new transports.File({ filename: 'logger/combined.log', format: format.json() }),
        ],
    });
}

module.exports = buildDevLogger;