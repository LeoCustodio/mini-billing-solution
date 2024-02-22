const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
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
    },
    token:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Receipt', receiptSchema)