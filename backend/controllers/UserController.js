const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/genrateToken");

/***************register user*********************** */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }

    // check user exists

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),

        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});
/********************auth user********************** */

const authUser   = asyncHandler(async (req,res)=>{


    const {email, password} = req.body;
    const user  = await User.findOne({email});

    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),

        });
    } else {
        res.status(400);
        throw new Error("Invalid crediantials");
    }

});


/*********************get All users with query /api/user? search ="rakesh" ****************** */

const allUsers   = asyncHandler(async (req,res)=>{
        const keyword = req.query.search ? {
            $or:
            [
                {name:{$regex:req.query.search,$options:"i"}},
                {email:{$regex:req.query.search,$options:"i"}}

            ]

        }:{}

        const users = await User.find(keyword).find({_id:{$ne:req.user._id}});
        res.status(200).json({
            users,
            message:'list of users fetch successfully'
        })
       
});

module.exports  ={registerUser,authUser,allUsers};