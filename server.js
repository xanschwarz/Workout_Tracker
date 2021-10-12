const express = require('express');
// const logger = require('morgan');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

// const db = require('./models');

const app = express();

// app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// const path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/populatedb', {
//   useNewUrlParser: true,
// });

// db.User.create({ name: 'Ernest Hemingway' })
//   .then((dbUser) => {
//     console.log(dbUser);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});