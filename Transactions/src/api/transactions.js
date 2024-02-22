const TransactionService = require('../services/transaction-service');
const { SubscribeMessage } = require('../util');


module.exports = (app,channel) => {

    const service = new TransactionService();
    SubscribeMessage(channel, service);

    app.get('/', async (req, res) => {
        res.send("Index Endpoint.");
    })

    //Make Deposit
    app.get("/transaction/GetTransactionsByName", async (req,res) => {
        try{
            const { customerName} = req.body;
            console.log( customerName );
            const transactionResult = await service.GetTransactionsByName(customerName);
            if(transactionResult){
                res.json(transactionResult);
            }
            else{
                res.sendStatus(404);
            }
        }catch(err){
            throw err;
        }

    })
}



