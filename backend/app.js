const express = require('express');

const app = express();

//middleware
app.use('/api/posts', (req, res, next) => {
    const posts = [
        { id: 'abcd', title: '1st post', content: 'comin from server' },
        { id: 'efgh', title: '2nd post', content: 'comin from server!' }
    ];
    res.status(200).json({
        message: 'Posts fetched succesfully',
        posts: posts
    });
    next();
});

app.use((req, res, next) => {
    //to send response
    res.send('Hello from express')
});

module.exports = app;