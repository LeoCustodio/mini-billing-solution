const { ReceiptRepository } = require('../database');
const config = require('../config');

//Business logic
class ReceiptService {
    constructor(){
        this.repository = new ReceiptRepository();
    }    

    async SubscribeEvents(payload){
        payload = JSON.parse(payload);
        const {event, data} = payload;
        console.log('payload.customerName',payload.customerName);
        const message = {
            content: payload.content,
            datetime: new Date(),
            customerName: payload.customerName,
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

    async GetReceiptById(id){
        try{
            return await this.repository.GetReceiptById(id);
        }catch(err){
            throw err;
        }
    }
}

module.exports = ReceiptService;