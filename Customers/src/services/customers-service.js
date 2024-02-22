const { CustomersRepository } = require('../database');
const { PublishMessage, VerifyTokenReceipt, CreateTokenReceipt } = require('../util');
const { MakeAxiosRequest } = require('../util/axios');
const { rabbitMQ, RECEIPTSERVICEURL, TRANSACTIONSERVICEURL } = require('../config');

//Business logic
class CustomerService {
    constructor(){
        this.repository = new CustomersRepository();
    }    
    
    async CreateTransactionAndReceipt(channel, message, paymentType){
        try{
            const token = CreateTokenReceipt();
            
            const customerResult = await this.CustomerBalance(message, paymentType);

            const transaction = {
                customerName: message.customerName,
                amount: message.amount,
                datetime: new Date(),
                event: message.event
            };

            const receipt = {
                content: `Receipt has been generated - Customer Name: ${message.customerName} - Amount: ${message.amount} - Balance ${customerResult.balance} - Create Date ${new Date()}`,
                customerName: message.customerName,
                datetime: new Date(),
                event: message.event,
                token: token
            };

            //send tranasction message
            await PublishMessage(channel, rabbitMQ.tranbindingKey, JSON.stringify(transaction));
            //send receipt message
            await PublishMessage(channel, rabbitMQ.recbindingkey, JSON.stringify(receipt));

            return await this.MakePayment(customerResult);
        }catch(err){
            throw err;
        }

    }
    
    async GetCustomerTransactions(customerName){
        const transactions = await this.GetTransactionsByName(customerName);

        const receipts = await this.GetReceiptByName(customerName);
        
        //Test receipt token
        if(receipts){

            receipts.forEach(receipt => {

                if(!VerifyTokenReceipt(receipt.token)){
                    console.log(receipt.token);
                    receipt.token = false;
                }

            });
        }

        const returnTransaction = {
            transactions: transactions,
            receipts: receipts
        };

        return returnTransaction;
    }

    async GetReceiptByName(customerName){
        const data = {
            customerName: customerName
        }
        const url = `${RECEIPTSERVICEURL}/receipt/GetReceiptById`;
        const res  = MakeAxiosRequest(url,data);
        return res;
    }

    async GetTransactionsByName(customerName){
        const data = {
            customerName: customerName
        }
        const url = `${TRANSACTIONSERVICEURL}/transaction/GetTransactionsByName`;
        const res  = MakeAxiosRequest(url,data);
        return res;
    }

    async MakePayment(data){
        try{
            await this.repository.UpdateCustomerByName(data);

            return data;
        }catch(err){
            throw err;
        } 
    }

    async CustomerBalance(message, paymentType){
        let customerResult = await this.repository.GetCustomerByName(message.customerName);

        if(paymentType === "deposit"){      
            const customerBalance = parseFloat(customerResult.balance) + parseFloat(message.amount);

            customerResult.balance = customerBalance;

        }else if(paymentType === "payment"){
            const customerBalance = parseFloat(customerResult.balance) - parseFloat(message.amount);

            customerResult.balance = customerBalance;
        }
        return customerResult;
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
            return await this.repository.GetCustomers();
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