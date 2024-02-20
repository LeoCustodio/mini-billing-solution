const CustomersService = require('../services/customers-service');
// const userAuth = require('./middlewares/auth');
const {rabbitMQ} = require('../config');
const {PublishMessage} = require('../util');

module.exports = (app, channel) => {
    const service = new CustomersService();

    app.get('/', async (req, res) => {
        res.send("Index Endpoint.");
    })

    //Make Deposit
    app.post("/customer/makedeposit", async (req,res) => {
        try{            
            const message = {
                customerName: req.body.customerName,
                amount: req.body.amount,
                datetime: new Date(),
                event:req.body.event
            }; 
            console.log(JSON.stringify(message));
            await PublishMessage(channel,rabbitMQ.bindingKey, JSON.stringify(message));
            await service.MakeDeposit(message);
            res.sendStatus(200);
        }catch(err){
            throw err;
        }

    })

    //Get all Customers
    app.get("customer/searchcustomers", async (req,res) => {
        try{
            const constumers = await service.GetCustomers();
            if(constumers){
                res.json(constumers);
            }
            else{
                res.sendStatus(404);
            }
        }catch(err){
            throw err;
        }
    })


    //Create Customer
    app.post('/customer/create', async (req, res, next) => {
        try{
            const {name} = req.body;
            const data = await service.CreateCustomer(name,0);
            return res.json(data);
        }catch(err){
            next(err);
        }
    })

    //Get Customer by Name
    app.get("customer/searchcustomer/name", async (req,res) => {
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
}



