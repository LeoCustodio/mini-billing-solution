const TransactionRepository  = require('../database/repository/transaction-repository');

//Business logic
class TransactionService {
    constructor(){
        this.repository = new TransactionRepository();
    }    

    async SubscribeEvents(payload){
        payload = JSON.parse(payload);
        console.log(payload);
        const {event, customerName, amount, transactionId} = payload;
        const message = {
            customerName: customerName,
            amount: amount,
            datetime: new Date(),
            transactionId: transactionId
        };
        console.log(event);
        switch(event){
            case 'MAKE_TRANSACTION':
                this.CreateTransaction(message);
            default:
                break;
        }
    }

    async CreateTransaction(message){
        try{
            console.log('messagemessagemessage',message);
            await this.repository.CreateTransaction(message);
        }catch(err){
            throw err;
        }
    }

    async GetTransactionsByName(customerName){
        try{
            if(customerName){
                return await this.repository.GetTransactionsByName(customerName);
            }else{
                return "No transactions Found"
            }
        }catch(err){
            throw err;
        }
    }
}

module.exports = TransactionService;