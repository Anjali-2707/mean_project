const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
app.use(cors());

//set headers: for error- can't manupulate the headers after sending.
app.use((req, res, next) => {

})

//middleware
app.use('/api/posts', (req, res, next) => {
    const posts = [
        { id: 'abcd', title: '1st post', content: 'coming from server' },
        { id: 'efgh', title: '2nd post', content: 'coming from server!' }
    ];
    res.status(200).json({
        message: 'Posts fetched succesfully',
        posts: posts
    });
    // next();
});

// app.use((req, res, next) => {
//     //to send response
//     res.send('Hello from express')
// });

module.exports = app;