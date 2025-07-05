import { Client, LocalAuth } from "whatsapp-web.js";
import * as qrcode from "qrcode-terminal";

class WhatsAppClient {
  private static instance: WhatsAppClient;
  public readonly client: Client;

  private constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      webVersionCache: {
        type: "local",
      },
    });
  }

  public async initialize(): Promise<void> {
    console.log("Initializing WhatsApp client...");

    this.client.on("qr", (qr: string) => {
      qrcode.generate(qr, { small: true });
    });

    this.client.on("ready", () => {
      console.log("Client is ready!");
    });

    await this.client.initialize();
  }

  public static getInstance(): WhatsAppClient {
    if (!WhatsAppClient.instance) {
      WhatsAppClient.instance = new WhatsAppClient();
    }
    return WhatsAppClient.instance;
  }
}

export default WhatsAppClient.getInstance();
