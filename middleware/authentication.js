// const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors')
const authenticationMiddleware = async (req, res, next) => {
    // Check headers for token
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided') 
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.userInfo = { userId : payload.userId }
        // req.userInfo = payload >>> send this user ID to next middleware (items/jobs routes...)
        next()
    } catch(error){
        throw new UnauthenticatedError('Not authorized to access route / Token not verified') 
    }
}
module.exports = authenticationMiddleware