const ampqlib = require('amqplib');
const {rabbitMQ} = require('../config');

/* =========================== Message Broker ===========================*/

//create channel
module.exports.CreateChannel = async () => {
    try{
        const connection = await ampqlib.connect(rabbitMQ.url);
        const channel = await connection.createChannel();
        await channel.assertExchange(rabbitMQ.RECEIPT_EXCHANGENAME, 'direct', false);
        return channel;
    }catch(err){
        throw err;
    }
}

//publish message

module.exports.PublishMessage = async (channel, binding_key, message) => {
    try{
        await channel.publish(channel, binding_key, Buffer.from(message));
        console.log('Message has been sent');
    }catch(err){
        throw err;  
    }
}


//subscribe message
module.exports.SubscribeMessage = async (channel, service) => {
    const appQueue = await channel.assertQueue(rabbitMQ.RECEIPT_QUEUENAME);

    channel.bindQueue(appQueue.queue, rabbitMQ.RECEIPT_EXCHANGENAME, rabbitMQ.RECEIPT_BINDINGKEY);

    channel.consume(appQueue.queue,data => {
        console.log('received data');
        console.log(data.content.toString());
        service.SubscribeEvents(data.content.toString());
        channel.ack(data);
    })
}