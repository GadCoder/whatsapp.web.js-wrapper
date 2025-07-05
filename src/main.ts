import whatsAppClient from './whatsapp-client';
import { Message } from 'whatsapp-web.js';

const client = whatsAppClient.client;

client.on("message", async (message: Message) => {
  const sender = await message.getContact();
  const senderNumber: string = sender.number.trim();
  console.log(senderNumber);
  if (senderNumber === "960946343" || senderNumber === "51960946343") {
    message.reply("pong" + senderNumber);
  }
});

// Initialize the singleton client
whatsAppClient.initialize();
