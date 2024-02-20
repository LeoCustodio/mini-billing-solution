const { Int32, Decimal128 } = require('mongodb')
let mongoose = require('mongoose')

let customersSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    balance:{
        type: Decimal128,
        require:true
    }
})

module.exports = mongoose.model('Customers', customersSchema)