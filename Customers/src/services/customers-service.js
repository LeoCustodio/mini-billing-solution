const { CustomersRepository } = require('../database');
const axios = require('axios');
const {rabbitMQ} = require('../config');
const {PublishMessage} = require('../util');
//Business logic
class CustomerService {
    constructor(){
        this.repository = new CustomersRepository();
    }    
    
    async CreateTransactionAndReceipt(channel, message, paymentType){
        try{
            const transaction = {
                customerName: message.customerName,
                amount: message.amount,
                datetime: new Date(),
                event: message.event
            };
            const receipt = {
                content: `Receipt has been generated - Customer Name: ${message.customerName} - Amount: -${message.amount} - Create Date ${new Date()}`,
                customerName: message.customerName,
                datetime: new Date(),
                event: message.event
            };

            await PublishMessage(channel, rabbitMQ.tranbindingKey, JSON.stringify(transaction));
            await PublishMessage(channel, rabbitMQ.recbindingkey, JSON.stringify(receipt));
            return await this.MakePayment(message, paymentType);
        }catch(err){
            throw err;
        }

    }
    
    async GetCustomerTransactions(customerName){
        const options = {
            method: 'GET',
            url: `http://localhost:8001/transaction/GetTransactionsByName`,
            params: { 'api-version': '3.0' },
            headers: {
                'content-type': 'application/json'
            },
            data:
                {
                    customerName: customerName,
                },
        };

        const res = await axios.request(options).then(function(response){
            console.log(response.data);
            return response.data;
        }).catch(function (err){
            console.log(err);
        })
        return res;
    }

    async MakePayment(message, paymentType){
        try{
            const customerResult = await this.repository.GetCustomerByName(message.customerName);
            if(paymentType === "deposit"){      
                console.log(paymentType);          
                const customerBalance = parseFloat(customerResult.balance) + parseFloat(message.amount);
                customerResult.balance = customerBalance;
            }else if(paymentType === "payment"){
                const customerBalance = parseFloat(customerResult.balance) - parseFloat(message.amount);
                customerResult.balance = customerBalance;
            }
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