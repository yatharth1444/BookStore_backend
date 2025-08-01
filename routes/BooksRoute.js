const express = require('express')
const {
       getAllBooks, 
       addOneBook,
       removeItem,
       updateBookByIsbn

} = require('../controllers/BookssController')
const router = express.Router()
router.get('/Allbooks', getAllBooks )
router.post('/addnewBook', addOneBook)
router.delete('/bookDelete', removeItem)
router.put('/update/:isbn', updateBookByIsbn)
module.exports = router