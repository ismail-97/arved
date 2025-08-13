const getTokenFrom = require('../helpers.js/tokenExtractor')
const User = require('../models/user')


const adminAuthMiddleware = async (request, response, next) => {
    const token = getTokenFrom(request)
    const userId = request.userId
    const user = await User.findById(userId)
    if (!user || user.role !== "admin") {
        return response.status(401)
            .send("eroor: only admins has access to those pages.")        
    }
    next()
}

module.exports = adminAuthMiddleware