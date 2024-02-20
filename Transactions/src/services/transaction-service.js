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
            case 'MAKE_DEPOSIT':
                this.MakeDeposit(message);
            default:
                break;
        }
    }

    async MakeDeposit(message){
        try{
            console.log(message);
            await this.repository.MakeDeposit(message);
        }catch(err){
            throw err;
        }
    }
}

module.exports = TransactionService;