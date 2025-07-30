
require('dotenv').config()
const mongoose = require('mongoose')


const connectDb = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log("Database connected succesfully");
      
        
    } catch (error) {
        console.log("Error connecting database",error);
        process.exit(1)
        
    }
    mongoose.connection.on('disconnected', ()=>{
      console.warn("Database disconnected. Attempting reconnection...")
    })
}
module.exports = connectDb