const ReceiptService = require('../services/receipt-service');
// const userAuth = require('./middlewares/auth');
const {SubscribeMessage} = require('../util');
const verifyToken = require('../middleware/authMiddleware');


module.exports = (app,channel) => {

    const service = new ReceiptService();
    SubscribeMessage(channel, service);

    app.get('/', async (req, res) => {
        res.send("Index Endpoint.");
    })

    //Make Deposit
    app.get("/receipt/GetReceiptById/:customerName", async (req,res) => {
        try{
            const customerName = req.params.customerName;
            const receiptResult = await service.GetReceiptById(customerName);
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

    //Make Deposit
    app.get("/receipt/GetReceiptByTransactionId/:id", async (req,res) => {
        try{
            const id = req.params.id;
            const receiptResult = await service.GetReceiptByTransactionId(id);
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



