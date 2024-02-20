const customersSchema = require('../models/customersModel');
const Producer = require('../../util/producer');
const producer = new Producer();
class CustomersRepository {

    async MakeDeposit(message){
        try{
            await producer.publishMessage(message);
        }catch(err){
            throw err;
        }
    }

    async CreateCustomer(name,balance){
        try{
            var customer = new customersSchema({
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

    async DeleteBookById(id, data){
        try{
            customersSchema.findById(data);
        }catch(err){
            throw err;
        }
    }
}

module.exports = CustomersRepository;