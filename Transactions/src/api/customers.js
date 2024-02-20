const CustomersService = require('../services/customers-service');
// const userAuth = require('./middlewares/auth');
const mongo = require('mongodb');

module.exports = (app) => {
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
    app.get("/costumer/makedeposit", async (req,res) => {
        try{
            const {name,amount,} = req.body;
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



