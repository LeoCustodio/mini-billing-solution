const TransactionSchema = require('../models/transactionsModel');

class TransactionRepository {

    async MakeDeposit(message){
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
}

module.exports = TransactionRepository;