const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLenght: 8,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    fullname: {
        type: String,
        require: true

    },
    email:{ 
        type: String,
        required: true,
        unique: true
    }
})

userSchema.set('toJSON',{
    transform: (document,returnDocument) =>{
        returnDocument.id = document._id.toString(),
        delete returnDocument._id;
        delete returnDocument.__v
        delete returnDocument.password;
    }
})

module.exports = new mongoose.model('User', userSchema)