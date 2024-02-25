const receiptSchema = require('../models/receiptModel');

class ReceiptRepository {

    async CreateReceipt(message){
        try{
            const receipt = new receiptSchema({
                content: message.content,
                datetime: new Date(),
                customerName: message.customerName,
                token: message.token,
                transactionId: message.transactionId
                });
            const receiptResult = receipt.save();
            return receiptResult;
        }catch(err){
            throw err;
        }
    }
    async GetReceiptById(customerName){
        try{
            const receipts = receiptSchema.find({"customerName":customerName});

            return receipts;
        }catch(err){
            throw err;
        }
    }

    async GetReceipGetReceiptByTransactionIdtById(id){
        try{
            const receipts = receiptSchema.find({"transactionId":id});

            return receipts;
        }catch(err){
            throw err;
        }
    }
    GetReceipGetReceiptByTransactionIdtById
}

module.exports = ReceiptRepository;