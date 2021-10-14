// Require the necessary packages.
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

// Uses environment port, or 3000 if environment port not specified.
const PORT = process.env.PORT || 3000;
const app = express();
app.use(logger('dev'));

// Middleware for the front-end and for parsing application/json and urlencoded data.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Setting up the MongoDB.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Accessing the routes.
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// Starting the server.
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
