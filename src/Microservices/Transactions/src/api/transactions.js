const TransactionService = require('../services/transaction-service');
const { SubscribeMessage } = require('../util');


module.exports = (app,channel) => {

    const service = new TransactionService();
    SubscribeMessage(channel, service);

    app.get('/', async (req, res) => {
        res.send("Index Endpoint.");
    })

    //Get Transction by customerName
    app.get("/transaction/GetTransactionsByName/:customerName", async (req,res) => {
        try{
            const customerName = req.params.customerName;
            console.log("req.paramsreq.params",req.params);
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



