const receiptModel = require('../models/receiptModel');

class ReceiptRepository {

    async CreateReceipt(message){
        try{
            const receipt = new receiptModel({
                content: message.content,
                datetime: new Date(),
                customerName: message.customerName
                });
            const receiptResult = receipt.save();
            return receiptResult;
        }catch(err){
            throw err;
        }
    }
    async GetReceiptById(id){
        try{
            const receiptResult = receiptModel.findOne({"_id":id});
            return receiptResult;
        }catch(err){
            throw err;
        }
    }
}

module.exports = ReceiptRepository;