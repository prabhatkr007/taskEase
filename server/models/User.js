const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    username:{type:String,
         required:true, 
         min:4, 
         unique:true
        },

    password:{
        type:String, required:true
    },
    tokens:[
        {
            token: {
                type: String,
                required:true
            }
        }
    ]
});

// generating token

userSchema.methods.generateAuthToken = async function (){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch(err){
        console.log(err);
    }
}

userSchema.methods.logout = async function (tokenToLogout) {
    try {
        this.tokens = this.tokens.filter(tokenObj => tokenObj.token !== tokenToLogout);
        await this.save();
    } catch (err) {
        console.error(err);
    }
}

const UserModel = model('User', userSchema);

module.exports = UserModel;