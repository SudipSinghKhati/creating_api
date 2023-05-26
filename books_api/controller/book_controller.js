const Book = require('../models/Book')


const getAllBooks = async (req, res) => {
    // convert JSON code to string for readable to the network
    // res.json(books);

    // get books data from db --> find() is an async function
    // so, use either then or asyn/awiat

    // method 1 - using Promise i.e. then/catch
    // Book.find()
    // .then(books => res.json(books))
    // .catch(err => console.log(err));

    // method 2 - using asyn/await 

    try {
        const books = await Book.find();
        res.json(books);
    }
    catch (error) {
        console.log(error);
    }

}
//creating a book
const createBook = (req, res, next) => {
    Book.create(req.body)
        .then(book => res.status(201).json(book))
        .catch(next);
}
//deleting all books
const deleteBook = (req, res) => {
    Book.deleteMany()
        .then(() => res.status(201).json({ "message": "Deleted all successfully" }))
        .catch(next);
}
// getting book by id
const getABook = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then(book => {
            // send this error handling if the book is not found
            if (!book) {
                res.status(404).json({ error: "Book not found" });
            }
            res.json(book);
        })
        .catch(next);
}
// updating a book by id 
const updateABook =(req, res, next) => {
    Book.findByIdAndUpdate(
        req.params.book_id,  // find this id book
        { $set: req.body },  // update the changed data
        { new: true }  // return updated data not old one
    )
        .then(updatedBook => res.status(200).json(updatedBook))
        .catch(next)
}
//deleting a book by id
const deleteABook =(req, res, next) => {
    Book.findByIdAndDelete(
        req.params.book_id
    )
        .then((deletedBook) => {
            if (!deletedBook) res.status(404).json({ erorr: "No found" });
            res.status(202).end();
        })
        .catch(err => {
            console.log(err);
            next(err);
        })
}

module.exports = {
    getAllBooks,
    createBook,
    deleteBook,
    getABook,
    updateABook,
    deleteABook
}