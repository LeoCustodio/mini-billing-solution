const { Int32, Decimal128, ObjectId } = require('mongodb')
let mongoose = require('mongoose')

let receiptSchema = new mongoose.Schema({
    transactionID:{
        type: ObjectId,
        require: true
    },
    content:{
        type: String,
        require:true
    }
})

module.exports = mongoose.model('Receipt', receiptSchema)