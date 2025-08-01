const jwt = require('jsonwebtoken')
const authMiddleware = async (req, res, next, err) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if(!token){
        res.status(400).json({
            success: false,
            message: `token not provided`
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({error})
    }



}
module.exports = authMiddleware