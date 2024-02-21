const ReceiptService = require('../services/receipt-service');
// const userAuth = require('./middlewares/auth');
const {SubscribeMessage} = require('../util');


module.exports = (app,channel) => {

    const service = new ReceiptService();
    SubscribeMessage(channel, service);

    app.get('/', async (req, res) => {
        res.send("Index Endpoint.");
    })

    //Make Deposit
    app.get("/receipt/GetReceiptById", async (req,res) => {
        try{
            const {id} = req.body;
            console.log(customerName);
            const receiptResult = await service.GetReceiptById(id);
            if(receiptResult){
                res.status(200).json(receiptResult);
            }
            else{
                res.status(404);
            }
        }catch(err){
            throw err;
        }

    })
}



