const jwt = require('jsonwebtoken')
const getTokenFrom = require('../helpers.js/tokenExtractor')

const loginMiddleware = (request, response, next) => {
    const token = getTokenFrom(request)
    if (token) {
         jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
               console.log(err)
               return response.status(401).send( "eroor: access denied: token invalid" )
             }
            request.userId = decoded.id
            next()
        })
    } else {
        return response.status(401).send('eroor: access denied: token missing')
    }

    
}

module.exports = loginMiddleware