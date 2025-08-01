const mongoose = require('mongoose')
const currentYear  = new Date().getFullYear()
const genres = ['Fiction', 'Non-Fiction', 'Biography', 'Science', 'Romance', 'Comedy', 'RomCom', 'Ideologies', 'Philosphy', 'Sports', 'Drama', 'Technology', 'Other']
const URLregex =  /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/i
const Books = new mongoose.Schema({

    title:{
        type: String,
        required: [true,"title is required"],
        maxlength: [100, "the max length of the title is 100"],
        trim: true
    },
    description:{
        type: String,
        maxlength: [1000, "Provide a description within 1000 limit"],
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(?=(?:[^0-9]*[0-9]){10}(?:(?:[^0-9]*[0-9]){3})?$)[\d-]+$/,
            'invalid ISBN Format'
        ],

    },
    price:{
        type: Number,
        required: true,
        min: 0,
    },
    category:{
        type: String,
        enum: genres,
        trim: true,

    },
    customCategory:{
        type: String,
        trim: true,
        required : function(){
            return this.category === 'Other'
        }
    },
    inventory:{
        type: Number,
        required: true,
        min: [0, 'inventory must be a non negative number']
        
    },
    image:{
        type: String,
        validate: {
          validator:   function(v){
            if(!v) return true
            return URLregex.test(v)
        },
        message: props => `invalid URL format ${props.value}`, 
       }
    },
    year:{
        type: Number,
        min: 1000,
        max: currentYear,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },


},{timestamps:true})
module.exports = mongoose.model("Books", Books)

