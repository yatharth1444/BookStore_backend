const express = require('express')
const isAdmin = require('../middleware/isAdmin')
const {
       getAllBooks, 
       addOneBook,
       removeItem,
       updateBookByIsbn

} = require('../controllers/BookssController')
const router = express.Router()
router.get('/Allbooks', getAllBooks )
router.post('/addnewBook', addOneBook)
router.delete('/bookDelete',isAdmin, removeItem)
router.put('/update/:isbn',isAdmin, updateBookByIsbn)
module.exports = router