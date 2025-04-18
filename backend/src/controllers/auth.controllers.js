import { generateWebToken } from '../lib/utils.lib.js'
import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import cloudinary from '../lib/cloudinary.lib.js'

export const signup = async (req, res) => {
   const {fullName, email, password} = req.body
   try {
    if(!fullName || !email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    if(password.length < 6 || password.length > 52){
        return res.status(400).json({
            success: false,
            message: "Password must be atleast 6-52 characters long"
        })
    }

    // Password complexity regex (requires: 1 uppercase, 1 lowercase, 1 number, 1 special char)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%_*?&])[A-Za-z\d@$!%_*?&]{6,52}$/;
    if(!passwordRegex.test(password)){
        return res.status(400).json({
            success: false,
            message: "Password must contain:\n" +
                         "- 1 uppercase letter\n" +
                         "- 1 lowercase letter\n" +
                         "- 1 number\n" +
                         "- 1 special character (@$!%*?_&)"
        })
    }

    const user = await User.findOne({email})
    if(user){
        return res.status(409).json({
            success: false,
            message: "Email already registered"
        })
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        fullName,//fullName: fullName, we can write only fullName => Both are same
        email,
        password: hashedPassword
    })

    if(newUser){
        //since user is saved in the databse generate JWT token
        generateWebToken(newUser._id, res)
        await newUser.save()

        res.status(201).json({
            success: true,
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic
        })

    }else{
        console.log("Error in signup controller: ",error.message)
        return res.status(400).json({
            success: false,
            message: "Invalid user data"
        })
    }

   } catch (error) {
        console.error("Error in signup controller:", error);
        return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
    });
   }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        generateWebToken(user._id, res)
        res.status(200).json({
            success: true,
            _id:user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("Error in login controller\n",error.message)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const logout = (req, res) => {
    try{
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    }catch(error){
        console.log("Error in logout controller\n",error.message)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body
        const userId = req.user._id //Possible b/c of the protectRoute
        if(!profilePic){
            return res.status(400).json({
                success: false,
                message: "Profile is required "
            })
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic: uploadResponse.secure_url},{new: true})
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
          })
        /**
         * By default, findOneAndUpdate() returns the document as it was before update was applied. 
         * If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
         */
    } catch (error) {
        console.log("Error in updating profile picture")
        return res.status(400).json({
            success: false,
            message: "Internal server error"
        })
    }
}

//this controller will be called whenever we will be refreshing our application
export const checkAuth = (req, res) => {
    try {
        //console.log("Req.user", req.user);
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in check athentication controller\n", error.message)
        return res.status(400).json({
            success: false,
            message: "Internal server error"
        })
    }
}