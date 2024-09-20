// config/db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/microblogging', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose;
