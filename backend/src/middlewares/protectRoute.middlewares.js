import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if(!token){
           return res.status(401).json({
                success: false,
                message: "Unauthorized! no token provided"
            })
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if(!decodedToken){
            return res.status(401).json({
                success: false,
                message: "Unauthorized! Invalid token"
            })
        }
        const user = await User.findById(decodedToken.userId).select("-password")
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found !"
            })
        }
        //if all the above checks are passed
        req.user = user
        next()
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}