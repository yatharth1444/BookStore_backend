const Books = require("../models/Books")

const getAllBooks = async (req, res) => {
    try {
        const AllBooks = await Books.find({})
        if(AllBooks.length > 0){
           res.status(200).json({
            success: true,
            data: AllBooks,
            message: `books found`
           })
        }else{
            res.status(400).json({
                success: false,
                message: `books cant be found `
            })
        }
    } catch (error) {
        console.log("Error fetching books", error)
        res.status(500).json({
            success: false,
            message: `the books cant be fetched due to some internal error`,
        })
    }
}


  
// const addOneBook = async (req, res) => {
//             try {
//                 const addBook = req.body
//                 const newlyAddBook = await Books.create(addBook)
//                 if(newlyAddBook){
//                     res.status(200).json({
//                         success:true,
//                         message:`added book successfully`,
//                         data: newlyAddBook
//                     })
//                 }else{
//                     res.status(400).json({
//                         success: false,
//                         message: `there was an error adding the book`
//                     })
//                 }
//             } catch (error) {
//     if (error.name === 'ValidationError') {
//         return res.status(400).json({
//             success: false,
//             message: error.message,
//             errors: error.errors,
//         });
//     }
//     res.status(500).json({
//         success: false,
//         message: "Some internal error"
//     });
// }         
//      }
const addOneBook = async (req, res) => {
    try {
        // Optionally: you can sanitize or pick only allowed fields here

        const bookToAdd = req.body;

        const createdBook = await Books.create(bookToAdd);

        res.status(201).json({
            success: true,
            message: 'Book added successfully',
            data: createdBook
        });
    } catch (error) {
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error while adding book',
                errors: error.errors // Contains field-specific messages
            });
        }
        // Handle Mongo duplicate key (e.g. unique ISBN)
        if (error.code && error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'Duplicate field value',
                errors: error.keyValue // Contains which field is duplicated
            });
        }
        // For all other errors
        console.error('Error adding the book:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error while adding book'
        });
    }
};


const removeItem = async (req, res) => {
  console.log('Request body:', req.body);
  try {
    // Extract deletion criteria from request body
    const criteria = req.body;

    // Extra validation: Ensure that criteria isn't empty to prevent accidental full collection deletion!
    if (!criteria || Object.keys(criteria).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No deletion criteria provided. Refusing to proceed.',
      });
    }

    // Find one book matching the criteria and delete it
    const deletedBook = await Books.findOneAndDelete(criteria);

    if (deletedBook) {
      return res.status(200).json({
        success: true,
        data: deletedBook,
        message: 'Book deleted successfully.',
      });
    } else {
      // No book matching provided criteria was found
      return res.status(404).json({
        success: false,
        message: 'No book matches the provided criteria.',
      });
    }
  } catch (error) {
    // Log error and return a 500 Internal Server Error
    console.error('Error deleting book:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while trying to delete the book.',
      error: error.message,
    });
  }
};


  

module.exports = {getAllBooks, addOneBook, removeItem}