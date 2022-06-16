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
            //new transports.Http({ host: 'localhost', port: 3000, path: '/log', format: format.json() } ),
            //new transports.File({ filename: 'logger/log/error.log', level: 'error' }),
            //new transports.File({ filename: 'logger/log/combined.log' }),
        ],
    });
}

module.exports = buildDevLogger;