
const express = require('express');
// import custom books
let books = require('../data/books');

// import model of database
const Book = require('../models/Book');

// express.Router() --> is used to handle different routes moudalizer
const router = express.Router();

// this is main route for /api/books
router.route('/')

    // get all books 
    .get(async (req, res) => {
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
            console.log(error)}

    })

    // add a book in the books list

    .post((req, res, next) => {

       Book.create(req.body)
       .then((book) => res.status(201).json(book))
       .catch((err) => next(err))
    })

    .put((req, res) => {
        res.status(405).json({ "error": "PUT request is not allowed" });
    })
    .delete((req, res, next) => {
       Book.deleteMany()
       .then(reply=> res.json(reply))
       .catch(next)
    });


// path for /api/books/:book_id
router.route('/:book_id')

    // get only specific book
    .get((req, res, next) => {
      Book.findById(req.params.book_id)
      .then((book)=> {
        if(!book){
            res.status(404).json({error: 'book not found'})
        }
        
        res.json(book)})
      .catch(next)
    })

    // update particular book
    .put((req, res, next) => {
        Book.findByIdAndUpdate(
            req.params.book_id,
            {$set: req.body},
            {new: true}
            )
            .then(updated => res.json(updated))
            .catch(next)
         
    })

    // delete particular book
    .delete((req, res, next) => {
        Book.findByIdAndDelete(req.params.book_id)
        .then(reply => res.status(204).end())
        .catch(next)
    })
    .post((req, res) => {
        res.status(405).json({ "error": "POST method is not allowed here" });
    });


// export it to use in other file
module.exports = router;
