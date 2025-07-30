const { default: mongoose } = require("mongoose");
const CartSchemaItems = new mongoose.Schema({
        book:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Books",
            required : [true, "book reference is required"]
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, "minimum one item is required"]
        }
     
})
const  Cart = new mongoose.Schema({
     user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'User reference is required'],
        unique: true,
     },
     items:[CartSchemaItems]
},{timestamps: true})
module.exports = mongoose.model("Cart", Cart)
