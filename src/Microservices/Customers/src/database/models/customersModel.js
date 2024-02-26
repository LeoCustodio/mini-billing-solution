const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const customersSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    balance:{
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Customers', customersSchema)