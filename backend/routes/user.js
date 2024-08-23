const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const router = express.Router();

//to save the user info on signup
//apply bcrypt hash to encode the password 
//the encoded pass will be stored in db
router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save().then((result) => {
                    console.log(result);
                    res.status(201).json({
                        message: 'User added',
                        result
                    });
                }) //mongoose methods
                .catch((error) => {
                    res.status(500).json((
                        error
                    ));
                });
        });
});

//login user by checking the email and password
//without decoding the password compare and find the encoded.
router.post("/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                })
            }
            fetchedUser = user;
            //unhash the password saved in db
            return bcrypt.compare(req.body.password, user.password)
        }).then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            //create the JWT token if result === true
            //sign() method is use to create the token
            //secret_this_should_be_longer --> secret/private key
            //token expires in 1 hour
            const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, 'secret_this_should_be_longer', { expiresIn: '1h' });
            res.status(200).json({
                token
            })

        }).catch(error => {
            return res.status(401).json({
                message: "Auth failed"
            })
        })
})

module.exports = router;