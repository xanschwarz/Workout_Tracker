const express = require('express');
// const logger = require('morgan');
const mongoose = require('mongoose');
// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;
// const db = require('./models');

// app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require('./routes/apiRoutes');
require('./routes/htmlRoutes');

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
