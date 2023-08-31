# Twilio Voiceflow Integration

This repository contains code for integrating Twilio with Voiceflow to create interactive voice-based applications. The code is designed to handle incoming calls and responses through the Twilio API and connect them with Voiceflow's conversational design capabilities.

## Prerequisites

- Set up twilio number with a webhook URL
- Voiceflow API Key

## Getting Started

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Rename the `.env.example` file to `.env`.
4. Fill in the necessary environment variables in the `.env` file:
   - `PORT`: Port number to run the server on.
   - `VOICEFLOW_API_KEY`: Your Voiceflow API Key.
   - `GENERAL_SERVICE_ENDPOINT`: Add "https://general-runtime.voiceflow.com/" here.
5. Run the application using `npm start`.

## Usage

- **`/start` Endpoint**: Use this endpoint to start a new conversation. It interacts with Voiceflow and responds with the initial message.
- **`/continue` Endpoint**: Use this endpoint to continue the conversation. It processes the user's response, interacts with Voiceflow, and generates appropriate responses.

## Extending Functionality

Feel free to extend the functionality of this application to fit your needs:

- Customize the conversation flow by adjusting the logic in the `/continue` route.
- Integrate additional APIs or services to enhance the user experience.

