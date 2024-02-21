const ampqlib = require('amqplib');
const config = require('../config');

/* =========================== Message Broker ===========================*/

//create channel
module.exports.CreateChannel = async () => {
    try{
        const connection = await ampqlib.connect(config.rabbitMQ.url);
        const channel = await connection.createChannel();
        await channel.assertExchange(config.rabbitMQ.exchangeName,'direct', false);
        return channel;
    }catch(err){
        throw err;
    }
}

//publish message

module.exports.PublishMessage = async (channel, binding_key, message) => {
    try{
        await channel.publish(config.rabbitMQ.exchangeName, binding_key, Buffer.from(message));
        console.log('Message has been sent');
    }catch(err){
        throw err;  
    }
}


//subscribe message
module.exports.SubscribeMessage = async (channel, service) => {
    console.log();
    const appQueue = await channel.assertQueue(config.rabbitMQ.queueName);

    channel.bindQueue(appQueue.queue, config.rabbitMQ.exchangeName, config.rabbitMQ.bindingKey);

    channel.consume(appQueue.queue,data => {
        console.log('received data');
        console.log(data.content.toString());
        service.SubscribeEvents(data.content.toString());
        channel.ack(data);
    })
}