const buildDevLogger = require('./dev-logger');
const buildProdLogger = require('./prod-logger');

let logger = null
if (process.env.NODE_ENV === 'development') {
    logger = buildDevLogger();
} else {
    logger = buildProdLogger();
}

module.exports = logger;

// logger.info('text info', { meta: 1 });
// logger.warn('text warn');
// logger.error('text error');
// logger.error(new Error('something went wrong'));