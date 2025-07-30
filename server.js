require("dotenv").config()
const connectDb = require('./database/db')
const express = require('express')
const app = express()
connectDb()
app.use(express.json())
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`app starting on port ${process.env.PORT}`);
})