const CustomerService = require('../services/customers-service');

module.exports = (app) => {
    const service = new CustomerService();

    app.use('/app-eventes', async (req,res,next) => {
        const {payload} = req.body;
        service.SubscribeEventes(payload);

        console.log('============ Customer Service Event ==========');
        return res.status(200).json(payload);
    })
}