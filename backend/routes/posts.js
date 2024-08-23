const express = require('express');
const Post = require('../models/post');
const router = express.Router();

//fetching the data from db
//middleware
router.get('', (req, res, next) => {
    Post.find() //return a promise
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                message: 'Posts fetched succesfully',
                posts: docs
            });
        });
});

//saving the data in db
//respond only for 'post'
router.post('', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then((result) => {
        console.log(post);
        res.status(201).json({
            message: 'Post added',
            postId: result._id
        });
    }); //mongoose methods
})

//To edit the existing record
router.put('/:id', (req, res, next) => {
    const post = new Post({
        _id: req.params.id, //fetching id from url
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({ _id: req.params.id }, post).then((result) => {
        console.log(result);
        res.status(200).json({
            message: 'Post updated!',
            // postId: result._id
        });
    }); //mongoose methods
})

//delete the row/post
router.delete('/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Posts deleted succesfully',
            });
        });
});

module.exports = router;