const { Decimal128 } = require('mongodb')
let mongoose = require('mongoose')

let transactionSchema = new mongoose.Schema({
    customerName:{
        type: String,
        require: true
    },
    amount:{
        type:Decimal128,
        require:true
    },
    datetime:{
        type:Date,
        require:true
    }
})

module.exports = mongoose.model('transactions', transactionSchema)