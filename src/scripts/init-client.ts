// src/scripts/init-client.ts
import whatsAppClient from "../clients/whatsapp-client";

/**
 * This script is used to initialize the WhatsApp client and handle the
 * initial QR code scan. It will exit gracefully once the client is ready.
 */
async function initializeClient() {
  console.log("Starting WhatsApp client initialization...");

  // The `initialize` method is already configured to show the QR code
  // in the terminal.
  await whatsAppClient.initialize();

  

  whatsAppClient.client.on("auth_failure", (msg) => {
    console.error("Authentication failure:", msg);
    process.exit(1);
  });

  // Keep the script running until the user manually stops it
  // This ensures the session file is written correctly.
  process.stdin.resume();
}

initializeClient().catch((err) => {
  console.error("Failed to initialize client:", err);
  process.exit(1);
});
