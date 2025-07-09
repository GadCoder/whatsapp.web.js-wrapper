// src/services/WhatsAppGatewayService.ts
import { createClient } from "redis";
import { Message } from "whatsapp-web.js";

import whatsAppClient from "../clients/whatsapp-client";

async function startGateway() {
  console.log("[Gateway] Starting service...");

  let isClientReady = false;

  const redisHost = process.env.REDIS_HOST || "localhost";
  const publisher = createClient({ url: `redis://${redisHost}:6379` });
  const subscriber = createClient({ url: `redis://${redisHost}:6379` });

  await Promise.all([publisher.connect(), subscriber.connect()]);
  console.log("[Gateway] Connected to Redis.");

  await subscriber.subscribe("commands:send:reply", async (message) => {
    if (!isClientReady) {
      console.warn(
        "[Gateway] Command received, but client is not ready. Ignoring command.",
      );
      return;
    }
    try {
      const { chatId, replyText } = JSON.parse(message);
      console.log(`[Gateway] Received command to send reply to ${chatId}`);
      await whatsAppClient.client.sendMessage(chatId, replyText);
      console.log(`[Gateway] Successfully sent reply to ${chatId}`);
    } catch (error) {
      console.error("[Gateway] Error processing send:reply command:", error);
    }
  });

  await whatsAppClient.initialize();
  isClientReady = true;
  console.log("[Gateway] WhatsApp client is ready. Now accepting commands.");

  whatsAppClient.client.on("message", async (message: Message) => {
    console.log(`[Gateway] Received message from ${message.from}`);
    const eventPayload = JSON.stringify({
      chatId: message.from,
      text: message.body,
      timestamp: new Date(),
    });

    await publisher.publish("events:message:received", eventPayload);
    console.log("[Gateway] Published message:received event.");
  });
  console.log("Holaa");

  console.log("[Gateway] Service is running and listening for messages.");
}

startGateway().catch((err) => {
  console.error("[Gateway] Fatal error:", err);
  process.exit(1);
});
