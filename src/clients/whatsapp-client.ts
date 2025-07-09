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

    if (process.env.PUPPETEER_EXECUTABLE_PATH) {
      clientOptions.puppeteer!.executablePath =
        process.env.PUPPETEER_EXECUTABLE_PATH;
    }
    this.client = new Client(clientOptions);
  }

  public async initialize(): Promise<void> {
    console.log("Initializing WhatsApp client...");

    if (!process.env.PUPPETEER_EXECUTABLE_PATH) {
      this.client.on("qr", (qr: string) => {
        qrcode.generate(qr, { small: true });
      });
    }

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
