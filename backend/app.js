const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Post = require('./models/post');
const app = express();
app.use(cors());
//connect node app to mongodb
// -mean_db is the db
mongoose.connect('mongodb+srv://gurjaranjali2707:Chinz%402707@cluster-learnings.syrqq3s.mongodb.net/mean_db?retryWrites=true&w=majority&appName=Cluster-learnings')
    .then(() => {
        console.log('conneted to db');
    }).catch(() => {
        console.log('connection failed');
    })

//middleware to handle any request having payload.
//so used body parserm
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set headers: for error- can't manupulate the headers after sending.
//set header to remove cors error or add upper code of require cors.
//set headers according to our need.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader(
        'Access-Control-Allow-Headers',
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS', 'PATCH');
    next();
})

//saving the data in db
//respond only for 'post'
app.post('/api/posts', (req, res, next) => {
    // const post = req.body;
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save(); //mongoose methods
    console.log(post);
    res.status(201).json({
        message: 'Post added',
        // posts: posts
    });
    // next();
})

//fetching the data from db
//middleware
app.get('/api/posts', (req, res, next) => {
    Post.find() //return a promise
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                message: 'Posts fetched succesfully',
                posts: docs
            });
        });
    // next();
});

app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Posts deleted succesfully',
            });
        });
});

// app.use((req, res, next) => {
//     //to send response
//     res.status(200).json({
//         message: 'Posts fetched succesfully',
//     });
// });

module.exports = app;