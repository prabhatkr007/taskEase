const jwt = require ("jsonwebtoken");
const User = require("../models/User");



const Authentication=async (req,res,next)=>{
    try{
        const token=req.cookies.jwtoken;


        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
       

        const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token})

        if(!rootUser){throw new Error("User not found")}

        req.token=token;
        req.user=rootUser;

        next();

    }catch(err){
        res.status(401).send("no token found");
        console.log(err);
    }
}
module.exports=Authentication;