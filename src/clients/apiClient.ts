class ApiClient {
  private static instance: ApiClient;
  private readonly baseUrl: string;
  private readonly apiKey: string;

  private constructor() {
    this.baseUrl = process.env.EXTERNAL_API_URL!;
    this.apiKey = process.env.EXTERNAL_API_KEY!;

    if (!this.baseUrl) {
      throw new Error("EXTERNAL_API_URL must be set in environment variables.");
    }
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  public async processMessage(chatId: string, text: string): Promise<string> {
    const endpoint = process.env.EXTERNAL_API_ENDPOINT;
    const url = `${this.baseUrl}${endpoint}`;

    try {
      console.log(`[ApiClient] Sending request to ${url}`);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({ chat_id: chatId, message: text }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(
          `[ApiClient] API request failed with status ${response.status}: ${errorBody}`,
        );
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = (await response.json()) as { reply: string };
      return data.reply;
    } catch (error) {
      console.error(
        "[ApiClient] An error occurred during the API call:",
        error,
      );
      throw error;
    }
  }
}

export default ApiClient.getInstance();
