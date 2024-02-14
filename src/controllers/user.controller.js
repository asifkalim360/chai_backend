import { asyncHandler } from "../utils/asyncHandler.js"; 
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js" 
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
const registerUser = asyncHandler( async(req, res) => {
    // get user details from frontend 
    // validation - not empty 
    // check if user already exists: username, email
    // check for images, check for avatar 
    // upload them to cloudinary, avatar 
    // create user Object - create entry in DB 
    // remove password and refresh token field from res (response) 
    // check for user creation 
    // return res (response)
    
    
    const {fullname, email, username, password } = req.body 
    console.log(`EMAIL:${email}, FULLNAME: ${fullname}, USERNAME:${username}, PASSWORD:${password}`)
    
    if([fullname, email, username, password].some( (fields) => fields?.trim() === ""))
    {
        throw new ApiError(400, "All fields are required!!!")
    }

    const existedUser = User.findOne({
        $or: [{username},{email}]
    })
    console.log("--------------------------------------------------------------------------------------------");
    // console.log(existedUser);

    if(existedUser)
    {
        throw new ApiError(409, "User with email or username already exists")
    }
    console.log("--------------------------------------------------------------------------------------------");

    const avatarLocalPath = req.files?.avatar[0]?.path;     // local path of avatar
    console.log(avatarLocalPath);

    const coverImageLocalPath = req.files?.coverImage[0]?.path;     // local path of cover Images.
    console.log(avatarLocalPath); 

    if(avatarLocalPath)
    {
        throw new ApiError(400, "Avatar files is required")
    }
 
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar)
    {
        throw new ApiError(400, "Avatar file is required!!!")
    }

    const user = await User.create({
        fullname, 
        avatar:avatar.url, 
        coverImage: coverImage?.url || "", 
        email, 
        password, 
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser)
    {
        throw new ApiError(500, "Something went wrong while registration the user!!!")
    }
    
    res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )


}) 


export { registerUser }