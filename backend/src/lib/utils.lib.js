import jwt from 'jsonwebtoken'

export const generateWebToken = (userId, res) => {
    try {
        const token = jwt.sign({userId}, process.env.JWT_SECRET,{
            expiresIn: "1d",
            algorithm: "HS256" // Explicitly specify algorithm to prevent algorithm confusion attacks (self-added)

        })
        res.cookie("jwt",token,{
            maxAge: 1*24*60*60*1000,//milliseconds
            httpOnly: true,//prevents XSS attacks (cross-site scripting attacks)
            sameSite: "strict",//prevents CSRF attacks (cross-site request forgery attacks)
            secure: process.env.NODE_ENV !== 'development'
        })
        return token
    } catch (error) {
        console.log("JWT generation error: ", error)
        throw new Error('Failed to generate token')
    }
}