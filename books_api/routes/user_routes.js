const express = require('express')
var bcrypt = require('bcryptjs');

const router = express.Router()

const User = require('../models/user')


router.post('/register',(req,res,next)=> {
    const {username, password, fullname,email} = req.body
    User.find({username:username})
    .then((user) => {
        if(!user) return res.status(400).json({error: 'Duplicate Username'})
        bcrypt.hash(password, 10, (err,hash) => {
            if(err) return res.status(500).json({error: err.message})
            User.create({username,password : hash ,fullname,email})
            .then((user) => {
                res.status(201).json(user)
            }).catch(next)
        })
    }).catch(next)
   
})

module.exports = router