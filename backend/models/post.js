//post schema-creayed by mongoose in mongodb
const mongoose = require('mongoose');

//blueprint of model
const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
});

module.exports = mongoose.model('Post', postSchema);
//'post' will be the collection for storing posts in mean_db