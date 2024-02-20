const { CustomersRepository } = require('../database');

//Business logic
class CustomerService {
    constructor(){
        this.repository = new CustomersRepository();
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