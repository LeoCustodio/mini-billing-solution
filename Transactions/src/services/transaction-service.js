const TransactionRepository  = require('../database/repository/transaction-repository');

//Business logic
class TransactionService {
    constructor(){
        this.repository = new TransactionRepository();
    }    

    async SubscribeEvents(payload){
        payload = JSON.parse(payload);
        const {event, data} = payload;
        const message = {
            customerName: payload.customerName,
            amount: payload.amount,
            datetime: new Date(),
        };
        switch(event){
            case 'MAKE_TRANSACTION':
                this.CreateTransaction(message);
            default:
                break;
        }
    }

    async CreateTransaction(message){
        try{
            console.log(message);
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