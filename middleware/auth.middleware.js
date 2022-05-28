const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
         next()
        return
    }

    try{
        const token = (req.headers.authorization || Object.values(req.headers).find(h=> h.slice?.(0, 6) === 'Bearer'))?.split(' ')[1]
        // console.log(Object.values(req.headers).find(h=> h.slice?.(0, 6) === 'Bearer'))
        if(!token) {
            return  res.status(401).json({message: 'Auth error1'})
        }
        // console.log(token)
        const decoded = jwt.verify(token, config.get('secretKey'))
        req.user = decoded
        next()
    }
    catch (e) {
        return  res.status(401).json({message: 'Auth error2'})
    }
}