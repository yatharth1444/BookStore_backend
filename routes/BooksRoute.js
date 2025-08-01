const express = require('express')
const {
       getAllBooks, 
       addOneBook,
       removeItem

} = require('../controllers/BookssController')
const router = express.Router()
router.get('/Allbooks', getAllBooks )
router.post('/addnewBook', addOneBook)
router.delete('/bookDelete', removeItem)
module.exports = router