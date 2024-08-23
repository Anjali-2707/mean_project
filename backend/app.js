const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    next();
});

//call all posts routes here in main file
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;