# whatsapp-web.js wrapper

This is a wrapper around the famous `whatsapp-web.js` library that gives a base structure for processing incoming messages via an external API and sending responses back.

## Features

- Receives WhatsApp messages
- Processes messages using an external API
- Sends responses back to the user

## Getting Started with Docker

This is the recommended way to run the application.

### Prerequisites

- Docker

### Running the application

1.  Clone the repository:
    ```bash
    git clone https://github.com/GadCoder/Expenses-ChatBot.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd Expenses-ChatBot
    ```
3.  Start the application using Docker Compose:
    ```bash
    docker compose up -d
    ```
    The `docker compose` command will build the Docker image, which includes installing all necessary dependencies, and start the application.

## Running without Docker (for development)

### Prerequisites

- Node.js
- NPM

### Installation and Running

1.  Clone the repository:
    ```bash
    git clone https://github.com/GadCoder/Expenses-ChatBot.git
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the services (see `package.json` scripts for more options):
    ```bash
    npm run start:gateway
    ```

## Environment Variables

The following environment variables are required to run the application:

- `API_URL`: The URL of the external API
- `API_TOKEN`: The token for the external API
- `EXTERNAL_API_ENDPOINT`: The endpoint of the external API

When using Docker, these variables can be set in the `docker-compose.yml` file. When running locally, you can set them in your shell environment.
