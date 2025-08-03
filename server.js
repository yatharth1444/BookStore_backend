require("dotenv").config()
const cors = require('cors')
const connectDb = require('./database/db')
const express = require('express')
const BooksRoutes = require('./routes/BooksRoute')
const UserRoutes = require('./routes/UserRoutes')
const CartRoutes = require('./routes/CartRoute')
const app = express()
connectDb()
app.use(cors())

app.use(express.json())

app.use('/api/forBooks', BooksRoutes )
app.use('/api/users', UserRoutes )
app.use('/api/cart', CartRoutes)
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`app starting on port ${PORT}`);
})

