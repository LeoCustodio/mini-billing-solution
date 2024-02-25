const dotEnv = require("dotenv");

if(process.env.NODE_ENV !== 'prod'){
    let env = process.env.NODE_ENV;
    const configFile = `./.env.dev`;
    dotEnv.config({path:configFile});
}
else{
    dotEnv.config();
}

module.exports = {
    rabbitMQ :{
        url:process.env.RABBITMQ_URL_PROD,
        RECEIPT_EXCHANGENAME:'transaction_exchange',
        RECEIPT_QUEUENAME: 'receipt_queue',
        RECEIPT_BINDINGKEY: 'receipt_service'
    },
    PORT : process.env.PORT,
    DB_URL: process.env.MONGODB_URL,
    APP_SECRET: process.env.APP_SECRET,
    TRANSACTIONSERVICEURL: process.env.TRANSACTIONSERVICEURL
}