const { ReceiptRepository } = require('../database');
const config = require('../config');

//Business logic
class ReceiptService {
    constructor(){
        this.repository = new ReceiptRepository();
    }    

    async SubscribeEvents(payload){
        payload = JSON.parse(payload);
        const {event, content, customerName, token, transactionId } = payload;
        const message = {
            content: content,
            datetime: new Date(),
            customerName: customerName,
            token: token,
            transactionId: transactionId
        };
        switch(event){
            case 'MAKE_TRANSACTION':
                this.CreateReceipt(message);
            default:
                break;
        }
    }


    async CreateReceipt(message){
        try{
            return await this.repository.CreateReceipt(message);
        }catch(err){
            throw err;
        }
    }

    async GetReceiptById(customerName){
        try{
            return await this.repository.GetReceiptById(customerName);
        }catch(err){
            throw err;
        }
    }
    
    async GetReceiptByTransactionId(id){
        try{
            return await this.repository.GetReceipGetReceiptByTransactionIdtById(id);
        }catch(err){
            throw err;
        }
    }

}

module.exports = ReceiptService;