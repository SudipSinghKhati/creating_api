
const mongoose = require('mongoose');



//creating review scheman 
const reviewSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
        miniLength: 10
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    }
})

reviewSchema.set('toJSON',{
    transform:(document,returnDocument) => {
        returnDocument.id = document._id.toString()
        delete returnDocument._id
    }
})

 
// create Schema  --> build strcture to store data
const bookSchema = new mongoose.Schema({

    title : {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    //invadaing review schema in book 
    photo:{
        type:String,
    },
    reviews:[reviewSchema] 
}, {timestamps: true});  // timestamps --> track when the book is added/updated

bookSchema.set('toJSON',{
    transform:(document,returnDocument) => {
        returnDocument.id = document._id.toString();
        delete returnDocument._id
        delete returnDocument__v
    }
})
// we use model to use database not by Schema
module.exports = mongoose.model('Book', bookSchema);


 // Book --> is collection in Singular but, Mongdb makes plural

