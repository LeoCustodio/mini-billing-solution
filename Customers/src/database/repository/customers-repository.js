const customersSchema = require('../models/customersModel');

class CustomersRepository {

    async MakeDeposit(message){
        try{
            

        }catch(err){
            throw err;
        }
    }

    async CreateCustomer(name,balance){
        try{
            const customer = new customersSchema({
                name,
                balance
                });
            const customerResult = customer.save();
            return customerResult;
        }catch(err){
            throw err;
        }
    }

    async GetCustomers(){
        try{
            const customerResult = customersSchema.find();
            return customerResult;
        }catch(err){
            throw err;
        }
    }

    async GetCustomerByName(name){
        try{
            const customerResult = customersSchema.findOne({'name': name});
            return customerResult;
        }catch(err){
            throw err;
        }
    }

    async UpdateCustomerByName(customer){
        try{
            await customersSchema.updateOne(
                {"name": customer.name},
                    {"$set":{"balance": customer.balance}});
        }catch(err){
            throw err;
        }
    }

    async DeleteBookById(id, data){
        try{
            customersSchema.findById(data);
        }catch(err){
            throw err;
        }
    }
}

module.exports = CustomersRepository;