const cluster = "<clusterName>";
const authSource = "<authSource>";
const authMechanism = "<authMechanism>";
const uri = "mongodb+srv://leoccustodio:yhei8752@cluster0.pye9k1p.mongodb.net/?retryWrites=true&w=majority";

let mongoose = require('mongoose');

class dbConnection {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(uri)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports = new dbConnection()