require("dotenv").config()
const connectDb = require('./database/db')
const express = require('express')
const BooksRoutes = require('./routes/BooksRoute')
const UserRoutes = require('./routes/UserRoutes')
const app = express()
connectDb()

app.use(express.json())

app.use('/api/forBooks', BooksRoutes )
app.use('/api/users', UserRoutes )
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`app starting on port ${process.env.PORT}`);
})

