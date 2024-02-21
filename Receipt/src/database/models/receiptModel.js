const { Int32, Decimal128, ObjectId } = require('mongodb')
let mongoose = require('mongoose')

let receiptSchema = new mongoose.Schema({
    content:{
        type: String,
        require:true
    },
    datetime:{
        type: Date,
        require: true
    },
    customerName:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Receipt', receiptSchema)