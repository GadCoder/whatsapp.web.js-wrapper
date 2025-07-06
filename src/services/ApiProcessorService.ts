import { createClient } from "redis";

import apiClient from "../clients/apiClient";

async function startProcessor() {
    const redisHost = process.env.REDIS_HOST || "localhost";
    const subscriber = createClient({
        url: `redis://${redisHost}:6379`,
    });
    const publisher = createClient({
        url: `redis://${redisHost}:6379`,
    });
    await Promise.all([subscriber.connect(), publisher.connect()]);

    console.log("[Processor] Service is running");

    await subscriber.subscribe("events:message:received", async (message) => {
        const eventData = JSON.parse(message);
        console.log(
            `[Processor] Received message:received event for chat ${eventData.chatId}`,
        );

        try {
            const replyText = await apiClient.processMessage(eventData.text);

            const commandPayload = JSON.stringify({
                chatId: eventData.chatId,
                replyText: replyText,
            });

            await publisher.publish("commands:send:reply", commandPayload);
            console.log("[Processor] Published send:reply command.");
        } catch (error) {
            console.error(
                `[Processor] Error processing message for chat ${eventData.chatId}:`,
                error,
            );
        }
    });
}

startProcessor();
