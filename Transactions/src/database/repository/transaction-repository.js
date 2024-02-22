const TransactionSchema = require('../models/transactionsModel');

class TransactionRepository {

    async CreateTransaction(message){
        try{
            console.log(message);
            var transaction = new TransactionSchema({
                customerName:message.customerName,
                amount:message.amount,
                datetime: message.datetime
            });
            const transactionResult = transaction.save();
            return transactionResult;
        }catch(err){
            throw err;
        }

    }
    async GetTransactionsByName(customerName){

        const transactions =  TransactionSchema.find({ "customerName": customerName });

        return transactions;
    }
}

module.exports = TransactionRepository;