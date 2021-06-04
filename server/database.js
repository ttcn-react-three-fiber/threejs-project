'use strict'
const mongoose = require('mongoose')

module.exports = () => {
  mongoose
    .connect('mongodb://localhost:27017/up', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    .then(() => console.log('Connected to Mongodb successful'))
}
