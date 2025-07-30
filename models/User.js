const mongoose = require('mongoose')

const DateNow = new Date().getDate()
const Validator = require('validator')
const Roles = ['user', 'admin']
const UserSchema =  new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: [50 , "Name cant be more than 50 characters"]
    },
    email :{
        type: String,
        required: true,
        unique: true,
        // match:[
        //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        //     "Email is invalid"
        // ],
        //using validator library and not regex 
        validate: {
        validator: function(v){
            return Validator.isEmail(v)
        },
        message:  props => `email is not valid ${props.value}`
    },
    },
    passwordHash:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum : Roles,
        default: 'user',
        required: true
    },
    cart:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Cart'
    },

    orders:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders',
    },
    createdAt:{
          type: Date,
          default: DateNow | Date.now,
          
     },


},{timestamps: true})
module.exports = mongoose.model("Users", UserSchema)