const TransactionService = require('../services/transaction-service');
// const userAuth = require('./middlewares/auth');
const {SubscribeMessage} = require('../util');


module.exports = (app,channel) => {

    const service = new TransactionService();
    SubscribeMessage(channel, service);

    app.get('/', async (req, res) => {
        res.send("Index Endpoint.");
    })

    //Make Deposit
    app.get("/transaction/makedeposit", async (req,res) => {
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



