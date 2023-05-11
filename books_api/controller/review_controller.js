const getAllReviews = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then(book => {
            if (!book) res.status(404).json({ error: "Book not found" });
            res.json(book.reviews);
        })
        .catch(next);
}

const createReview = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then(book => {
            if (!book) res.status(404).json({ error: "Book not found" });

            const review = {
                text: req.body.text,
                user: req.user.id
            }

            book.reviews.push(review);
            // length of total 
            const reviewLength = book.reviews.length;
            book.save()
                .then((book) => res.status(201).json(book.reviews[reviewLength - 1]))
                .catch(next);
        })

        .catch(next);
}

const deleteReview = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then(book => {
            if (!book) res.status(400).json({ error: "Book not found" });

            // empty the review list
            book.reviews = [];

            // save it
            book.save()
                .then(book => res.status(204).end())
                .catch(next);
        })
        .catch(next);

}

const getAReviews = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then(book => {
            if (!book) res.status(400).json({ error: "Book not found" });
            // get review 
            const review = book.reviews.id(req.params.review_id);
            if (!review) res.status(400).json({ error: "Review not found" });

            res.json(review);

        })
        .catch(next);
}

const updateReview = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then(book => {
            if (!book) res.status(400).json({ error: "Book not found" });

            // update review by traversing 
            book.reviews = book.reviews.map(singleReview => {
                // update the review whose id  matches  , _id is an object so, == is used instead of ===
                if (singleReview.id == req.params.review_id) {
                    if(req.user == req.user.id){
                        singleReview.text = req.body.text
                    }
                    
                }
                return singleReview;
            })

            // since, reviews is not a model so it is not used for saving , instead of book which is a model 
            book.save().then(book => {
                res.json(book.reviews.id(req.params.review_id));
            })
                .catch(next);
        })
        .catch(next);
}
const deleteAReview = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then(book => {
            if (!book) res.status(400).json({ error: "Book not found" });

            // delete specific review only
            book.reviews = book.reviews.filter(singleReview => {
                    return (singleReview.id !== req.params.review_id &&
                        singleReview.user !==req.user.id)
                
            })
            // use save() when you create own algorithm to save without using methods of mongoose
            book.save()
                .then(book => res.status(204).end())
                .catch(next);

        })
        .catch(next);
}

module.exports = {
    getAllReviews,
    createReview,
    deleteReview,
    deleteAReview,
    updateReview,
    getAReviews,
}