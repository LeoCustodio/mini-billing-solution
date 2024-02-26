const { CustomersRepository } = require('../database');
const { PublishMessage, VerifyTokenReceipt, CreateTokenReceipt } = require('../util');
const { MakeAxiosRequest } = require('../util/axios');
const { rabbitMQ, RECEIPTSERVICEURL, TRANSACTIONSERVICEURL } = require('../config');

//Business logic
class CustomerService {
    constructor() {
        this.repository = new CustomersRepository();
    }

    async CreateTransactionAndReceipt(channel, message, paymentType) {
        try {
            const crypto = require("crypto");

            const id = crypto.randomBytes(16).toString("hex");

            const token = CreateTokenReceipt();

            const customerResult = await this.CustomerBalance(message, paymentType);
            if(customerResult){
                const transaction = {
                    customerName: message.name,
                    amount: message.amount,
                    datetime: new Date(),
                    event: message.action,
                    transactionId: id
                };
    
                const receipt = {
                    content: `Receipt has been generated - Customer Name: ${message.name} - Amount: ${message.amount} - Balance ${customerResult.balance} - Create Date ${new Date()}`,
                    customerName: message.name,
                    datetime: new Date(),
                    event: message.action,
                    token: token,
                    transactionId: id
                };
    
                //send tranasction message
                await PublishMessage(channel, rabbitMQ.tranbindingKey, JSON.stringify(transaction));
                //send receipt message
                await PublishMessage(channel, rabbitMQ.recbindingkey, JSON.stringify(receipt));
    
                return await this.MakePayment(customerResult);
            }else{
                return false;
            }

        } catch (err) {
            throw err;
        }

    }

    async GetCustomerTransactions(customerName) {
        let transactionReceipt = [];
        const transactions = await this.GetTransactionsByName(customerName);

        const receipts = await this.GetReceiptByName(customerName);

        const customer = await this.GetCustomerByName(customerName);

        console.log('transactionstransactions',transactions);

        //Test receipt token
        if (receipts) {

            receipts.map(receipt => {

                if (!VerifyTokenReceipt(receipt.token)) {
                    receipt.token = false;
                }

            });
        }
        transactions.forEach(tran => {
            receipts.forEach(rec => {
                if (rec.transactionId == tran.transactionId) {
                    const payment = {
                        amount: tran.amount,
                        customerName: tran.customerName,
                        transactionId: tran.transactionId,
                        content: rec.content,
                        receiptValid: rec.token,
                        balance: customer.balance
                    }
                    transactionReceipt.push(payment);
                }
            });
        });
        console.log("transactionReceipt", transactionReceipt);

        return transactionReceipt;
    }

    async GetReceiptByName(customerName) {
        const data = {
            customerName: customerName
        }
        const url = `${RECEIPTSERVICEURL}/receipt/GetReceiptById/${customerName}`;
        const res = MakeAxiosRequest(url, data);
        return res;
    }

    async GetTransactionsByName(customerName) {
        const data = {
            customerName: customerName
        }
        console.log(TRANSACTIONSERVICEURL);
        const url = `${TRANSACTIONSERVICEURL}/transaction/GetTransactionsByName/${customerName}`;
        console.log(url);
        const res = MakeAxiosRequest(url, data);
        return res;
    }

    async MakePayment(data) {
        try {
            await this.repository.UpdateCustomerByName(data);

            return data;
        } catch (err) {
            throw err;
        }
    }

    async CustomerBalance(message, paymentType) {
        let customerResult = await this.repository.GetCustomerByName(message.name);
        if(customerResult){
            if (paymentType === "deposit") {
                const customerBalance = parseFloat(customerResult.balance) + parseFloat(message.amount);
    
                customerResult.balance = customerBalance;
    
            } else if (paymentType === "payment") {
                const customerBalance = parseFloat(customerResult.balance) - parseFloat(message.amount);
    
                customerResult.balance = customerBalance;
            }
            return customerResult;
        }else{
            return false;
        }


    }

    async CreateCustomer(name, balance) {
        try {
            return await this.repository.CreateCustomer(name, balance);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async GetCustomers() {
        try {
            return await this.repository.GetCustomers();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async GetCustomerByName(name) {
        try {
            return await this.repository.GetCustomerByName(name);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async DeleteBookById(id, data) {
        try {
            await this.repository.DeleteBookById(data);
            return true;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

module.exports = CustomerService;