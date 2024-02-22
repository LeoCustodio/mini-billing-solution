const CustomersService = require('../services/customers-service');
const {verifyToken} = require('../middleware/authMiddleware');

module.exports = (app, channel) => {
    const service = new CustomersService();

    app.get('/', async (req, res) => {
        res.send("Index Endpoint.");
    })

    //Make Deposit
    app.post("/customer/makedeposit", verifyToken ,async (req,res) => {
        try{           
            const paymentType = "deposit"; 
            const transactionResult = await service.CreateTransactionAndReceipt(channel,req.body,paymentType);
            res.status(200).json(transactionResult);
        }catch(err){
            throw err;
        }
    })

    //Make Payment
    app.post("/customer/makepayment", verifyToken ,async (req,res) => {
        try{
            const paymentType = "payment";
            const transactionResult = await service.CreateTransactionAndReceipt(channel,req.body,paymentType);
            res.status(200).json(transactionResult);
        }catch(err){
            throw err;
        }

    })

    //Get all Customers
    app.get("/customer/searchcustomers", verifyToken, async (req,res) => {
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
    app.post("/customer/create", verifyToken, async (req, res, next) => {
        try{
            const {name} = req.body;
            const data = await service.CreateCustomer(name,0);
            return res.json(data);
        }catch(err){
            next(err);
        }
    })

    //Get Customer by Name
    app.get("/customer/searchcustomer/name", verifyToken, async (req,res) => {
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

    //Get all Customers Transactions
    app.get("/customer/gettransactions", verifyToken, async (req,res) => {
        try{
            const transactionResult = await service.GetCustomerTransactions(req.body.customerName);
            res.status(200).json(transactionResult);
        }catch(err){
            throw err;
        }
        
    })
    
}



