const amqp = require('amqplib');
const config = require('../config');
const queue = config.rabbitMQ.exchangeName;
const url = config.rabbitMQ.url;

class Producer {
    async publishMessage(message){
        let connection;
        try {
          connection = await amqp.connect(url);
          const channel = await connection.createChannel();
      
          await channel.assertQueue(queue, { durable: false });
          channel.sendToQueue(queue, Buffer.from(message));
          console.log(" [x] Sent '%s'", message);
          await channel.close();
        } catch (err) {
          console.warn(err);
        }
    }
    
}

module.exports = Producer;