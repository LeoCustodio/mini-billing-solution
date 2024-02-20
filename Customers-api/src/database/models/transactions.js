const { Int32 } = require('mongodb')
let mongoose = require('mongoose')

let transactionSchema = new mongoose.Schema({
    customerID:{
        type: String,
        require: true
    },
    amount:{
        type:Int32,
        require:true
    },
    date:{
        type:Date,
        require:true
    }
})

module.exports = mongoose.model('transactions', transactionSchema)