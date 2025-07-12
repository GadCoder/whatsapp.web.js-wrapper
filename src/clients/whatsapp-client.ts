import * as qrcode from "qrcode-terminal";
import { Client, ClientOptions, LocalAuth } from "whatsapp-web.js";

class WhatsAppClient {
  private static instance: WhatsAppClient;
  public readonly client: Client;

  private constructor() {
    const clientOptions: ClientOptions = {
      authStrategy: new LocalAuth(),
      webVersionCache: { type: "local" },
      puppeteer: {
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
        ],
      },
    };

    this.client = new Client(clientOptions);
  }

  public async initialize(): Promise<void> {
    console.log("Initializing WhatsApp client...");

    this.client.on("qr", (qr: string) => {
      qrcode.generate(qr, { small: true });
    });

    await this.client.initialize();

    await new Promise<void>((resolve) => {
      this.client.once("authenticated", () => {
        console.log("Client authenticated");
        resolve();
      });
    });

    await new Promise<void>((resolve) => {
      this.client.once("ready", () => {
        console.log("Client is ready!");
        resolve();
      });
    });
  }

  public static getInstance(): WhatsAppClient {
    if (!WhatsAppClient.instance) {
      WhatsAppClient.instance = new WhatsAppClient();
    }
    return WhatsAppClient.instance;
  }
}

export default WhatsAppClient.getInstance();
