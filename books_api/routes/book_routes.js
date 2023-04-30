const express = require('express');
// import custom books
let books = require('../data/books');

// import model of database
const Book = require('../models/Book');

//importing book controller
const book_controller = require('../controller/book_controller')

//import review controller
const review_controller = require('../controller/review_controller')

// express.Router() --> is used to handle different routes moudalizer
const router = express.Router();

// this is main route for /api/books
router.route('/')

    // get all books 
    .get(book_controller.getAllBooks)

    // add a book in the books list

    .post(book_controller.createBook)

    .put((req, res, next) => {
        res.status(405).json({ error: "PUT request is not allowed" });
    })
    .delete(book_controller.deleteBook);


// path for /api/books/:book_id
router.route('/:book_id')

    // get only specific book
    .get(book_controller.getABook)

    // update particular book
    .put(book_controller.updateABook)

    // delete particular book
    .delete(book_controller.deleteABook)
    .post((req, res) => {
        res.status(405).json({ error: "POST method is not allowed here" });
    });

// routes for reviews

router.route('/:book_id/reviews')
    .get(review_controller.getAllReviews)
    .post(review_controller.createReview)

    .delete(review_controller.deleteReview)
    .put((req, res) => {
        res.status(405).json({ error: "PUT method is not allowed here" });
    });

router.route('/:book_id/reviews/:review_id')

    .get(review_controller.getAReviews)
    .post((req, res) => {
        res.status(405).json({ error: "POST method is not allowed here" });
    })
    .put(review_controller.updateReview)

    .delete(review_controller.deleteAReview);



// export it to use in other file
module.exports = router;