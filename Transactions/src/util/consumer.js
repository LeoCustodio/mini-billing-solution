const amqp = require('amqplib');
const config = require('../config');

async function consumeFunction(){
    try {
      const connection = await amqp.connect(config.rabbitMQ.url);
      const channel = await connection.createChannel();
  
      await channel.assertQueue(config.rabbitMQ.exchangeName, { durable: false });
      channel.consume(config.rabbitMQ.exchangeName, (msg) => {
        console.log(`Received : ${msg.content.toString()}`);
        // channel.ack(msg);
      });
    //   console.log(" [x] Sent '%s'", text);
    //   await channel.close();
    } catch (err) {
      console.warn(err);
    }
}


consumeFunction();