const { CustomersRepository } = require('../database');

//Business logic
class CustomerService {
    constructor(){
        this.repository = new CustomersRepository();
    }    

    async SubscribeEvents(payload){
        payload = JSON.parse(payload);
        const {event, data} = payload;

        const message = {
            customerName: data.customerName,
            amount: data.amount,
            datetime: new Date(), 
        };

        switch(event){
            case 'MAKE_DEPOSIT':
                this.MakeDeposit(message);
            case 'CREATE_NEW_CUSTOMER':
                this.CreateCustomer(data.customerName, 0);
            default:
                break;
        }


    }

    async MakeDeposit(message){
        try{
            const customerResult = await this.repository.GetCustomerByName(message.customerName);
            const customerBalance = parseFloat(customerResult.balance) + parseFloat(message.amount);
            customerResult.balance = customerBalance;
            await this.repository.UpdateCustomerByName(customerResult);
            return message;
        }catch(err){
            throw err;
        } 
    }

    async CreateCustomer(name,balance){
        try{
            return await this.repository.CreateCustomer(name,balance);
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    async GetCustomers(){
        try{
            const costumer = await this.repository.GetCustomers();
            console.log(costumer);
            return costumer;
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    async GetCustomerByName(name){
        try{
            return await this.repository.GetCustomerByName(name);
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    async DeleteBookById(id, data){
        try{
            await this.repository.DeleteBookById(data);
            return true;
        }catch(err){
            console.log(err);
            throw err;
        }
    }
}

module.exports = CustomerService;