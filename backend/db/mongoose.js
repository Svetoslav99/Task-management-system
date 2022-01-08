// This file will handle connection logic to the MongoDB database

const mongoose = require('mongoose');

// In order to use the javascript Promise instead.
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TaskManager', { useNewUrlParser: true }).then(() => {
    console.log('Connected to MongoDB successfully ...');
}).catch((e) => {
    console.log(`An error occured while attempting to connect to MongoDB: ${e}`);
});

module.exports = {
    mongoose
};