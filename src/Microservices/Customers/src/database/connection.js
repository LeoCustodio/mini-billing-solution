const mongoose = require('mongoose');
const {DB_URL} = require('../config');

class dbConnection {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(DB_URL)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports = dbConnection