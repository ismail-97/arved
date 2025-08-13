
const getTokenFrom = require('../helpers.js/tokenExtractor')

const User = require('../models/user')

const verifiyMiddleware = async (request, response, next) => {
    const token = getTokenFrom(request)
    const user = await User.findById(request.userId)
    if (!user.isVerified) 
        return response.status(401)
            .send("eroor: user Is not verified yet by the admin")
    next()
}


module.exports = verifiyMiddleware