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
    git clone https://github.com/GadCoder/whatsapp.web.js-wrapper.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd whatsapp.web.js-wrapper
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
    git clone https://github.com/GadCoder/whatsapp.web.js-wrapper.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd whatsapp.web.js-wrapper
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Build the TypeScript code:
    ```bash
    npm run build
    ```
5.  Start the services. You will need two separate terminals for this.

    In the first terminal, start the WhatsApp Gateway Service:
    ```bash
    npm run start:gateway
    ```

    In the second terminal, start the API Processor Service:
    ```bash
    npm run start:processor
    ```

## Environment Variables

The following environment variables are required to run the application:

- `API_URL`: The URL of the external API
- `API_TOKEN`: The token for the external API
- `EXTERNAL_API_ENDPOINT`: The endpoint of the external API

When using Docker, these variables can be set in the `docker-compose.yml` file. When running locally, you can set them in your shell environment.
