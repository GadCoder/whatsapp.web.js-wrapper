class APIClient {
    private static instance: APIClient;
    private baseURL!: string;

    private() {
        this.baseURL = process.env.EXTERNAL_API_URL!;
        if (!this.baseURL) {
            throw new Error(
                "EXTERNAL_API_URL must be set in enviroment variables",
            );
        }
    }
    public static getInstance(): APIClient {
        if (!APIClient.instance) {
            APIClient.instance = new APIClient();
        }
        return APIClient.instance;
    }

    public async processMessage(text: string): Promise<string> {
        return "General Kenobi";
    }
}

export default APIClient.getInstance();
