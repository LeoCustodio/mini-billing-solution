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
        url:process.env.RABBITMQ_URL,
        rabbitMQ_url:process.env.RABBITMQ_URL_PROD,
        tranexchangename:'transaction_exchange',
        tranqueue: 'transaction_queue',
        tranbindingKey: 'transaction_service',
        recqueuename: 'receipt_queue',
        recbindingkey: 'receipt_service',
    },
    PORT : process.env.PORT,
    DB_URL: process.env.MONGODB_URL,
    APP_SECRET: process.env.APP_SECRET,
    TRANSACTIONSERVICEURL : process.env.TRANSACTIONSERVICEURL,
}