const dotEnv = require("dotenv");

if(process.env.NODE_ENV !== 'prod'){
    let env = process.env.NODE_ENV;
    const configFile = `./.env.dev`;
    const x = dotEnv.config({path:configFile});
}
else{
    dotEnv.config();
}

module.exports = {
    rabbitMQ :{
        url:process.env.RABBITMQ_URL_PROD,
        exchangeName:'transaction_exchange',
        queueName: 'transaction_queue',
        bindingKey: 'transaction_service'
    },
    PORT : process.env.PORT,
    DB_URL: process.env.MONGODB_URL,
    APP_SECRET: process.env.APP_SECRET
}