const CustomersService = require('../services/customers-service');
const Producer = require('../util/producer');
const producer = new Producer();
const {PublishMessage} = require('../util');
// const userAuth = require('./middlewares/auth');
const {rabbitMQ} = require('../config');

module.exports = (app, channel) => {
    const service = new CustomersService();

    app.get('/', async (req, res) => {
        res.send("Index Endpoint.");
    })

    //Get all Customers
    app.get("/searchcustomers", async (req,res) => {
        try{
            const books = await service.GetCustomers();
            if(books){
                res.json(books);
            }
            else{
                res.sendStatus(404);
            }
        }catch(err){
            throw err;
        }
    })


    //Create Customer
    app.post('/customers/create', async (req, res, next) => {
        try{
            const {name} = req.body;
            const data = await service.CreateCustomer(name,0);
            return res.json(data);
        }catch(err){
            next(err);
        }
    })

    //Get Customer by Name
    app.get("/searchcustomers/name", async (req,res) => {
        try{
            const {name} = req.body;
            const customer = await service.GetCustomerByName(name);
            if(customer){
                res.json(customer.name);
            }
            else{
                res.sendStatus(404);
            }
        }catch(err){
            throw err;
        }

    })

    
    //Make Deposit
    app.post("/costumer/makedeposit", async (req,res) => {
        try{            
            const message = {
                customerName: req.body.customerName,
                amount: req.body.amount,
                datetime: new Date()
            } 
            PublishMessage(channel,rabbitMQ.bindingKey, JSON.stringify(message));
            // await service.MakeDeposit(JSON.stringify(message));
            res.sendStatus(200);
        }catch(err){
            throw err;
        }

    })
}



