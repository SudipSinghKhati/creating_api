const express = require('express')
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/user')


router.post('/register',(req,res,next)=> {
    const {username, password, fullname,email} = req.body
    User.findOne({username:username})
    .then((user) => {
        if(user) return res.status(400).json({error: 'Duplicate Username'})
        bcrypt.hash(password, 10, (err,hash) => {
            if(err) return res.status(500).json({error: err.message})
            User.create({username,password : hash ,fullname,email})
            .then((user) => {
                res.status(201).json(user)
            }).catch(next)
        })
    }).catch(next)
   
})
router.post('/login', (req, res, next)=>{
    User.findOne({username: req.body.username})
    .then((user) => {
        if(!user) res.status(400).json({error: 'user is not registered'})
        bcrypt.compare(req.body.password, user.password, (err, success) => {
            if(err) return res.status(500).json({error: err.message})
            if(!success) return res.status(400).json({error: 'password does not match'})
            const payload = {
                id: user.id,
                username: user.username,
                fullname: user.fullname,
                role: user.role
            }
            jwt.sign(
                payload,process.env.SECRET,
                 {expiresIn: '1d'},
                 (err,token ) => {
                    if(err) return res.status(500).json({error:err.message})
                    res.json({status: 'success', token :token})
                 })                 
            
        })
    }).catch(next)
})

module.exports = router;