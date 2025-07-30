const { default: mongoose } = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books",
    },
    rating:{
        type: Number,
        required: true,
        min: [1,"minimum rating"],
        max: [5, " maximum rating is 5"],  
    },
    comment:{
        type: String,
        max:[50, "Maximum 50 characters"],
        trim: true,
    }
},{timestamps: true})
module.exports = mongoose.model("Review", ReviewSchema)