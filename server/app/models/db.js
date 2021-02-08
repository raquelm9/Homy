const config = require('../config');
const mongoose = require('mongoose');



mongoose.connect(
    config.MONGO.URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
const db = mongoose.connection;
db.once('open', (_) =>
    console.log('MongoDB is now connected:', config.MONGO.URI)
);
db.on('error', (err) => console.error('MongoDB connection error!', err));

module.exports = mongoose