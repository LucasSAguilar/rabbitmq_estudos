const amqp = require('amqplib');

async function send() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'hello';

  await channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from('Hello World!'));
  console.log(" [x] Sent 'Hello World!'");

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}

send().catch(console.error);
