const User=require("../models/User");
const bcrypt=require("bcryptjs");

const jwt=require("jsonwebtoken");
//register new User

exports.registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        //check if user already exists

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User aleady exists"});
        }

        //hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        //create user
       const user=await User.create({
        name,
        email,
        password:hashedPassword,
       });
      
       //response
       res.status(201).json({
        message:"User registeres succesfully",
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
        },
       });
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
};


//login

exports.loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        //check if user exist

        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        //compare password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        //generate JWT
        const token =jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRES_IN}
        );

        //response
        res.status(200).json({
            message:"Login successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            },
        });
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
};