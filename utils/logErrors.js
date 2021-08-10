const logger = require('./logging')

module.exports = (error, req, res, next) => {
    logger.error({message: error.message})
    next(error)
}
