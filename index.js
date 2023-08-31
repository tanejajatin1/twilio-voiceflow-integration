require('dotenv').config();
const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const bodyParser = require('body-parser');
const { interact, getState } = require('./voiceflowHelper');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sendMessage = inputText => ({
    action: {
        type: 'text',
        payload: inputText,
    },
});

const launchConversation = () => ({
    action: {
        type: 'launch',
        payload: '',
    },
});

const formatMessage = dmAPIResponse => {
    const textMessages = dmAPIResponse.filter(item => item.type === 'text');

    if (textMessages.length > 0) {
        return textMessages.map(textMessage => textMessage.payload.message).join('. ');
    }

    return '';
};

function generateTwilioResponse(messageToSpeak, endOfConversation = false) {
    const twiml = new VoiceResponse();

    if (endOfConversation) {
        twiml.say(messageToSpeak);
        twiml.hangup();
    } else {
        twiml.gather({
            action: '/continue',
            method: 'POST',
            input: 'speech',
            enhanced: true,
            speechModel: 'phone_call'
        }).say(messageToSpeak);
    }

    return twiml.toString();
}

const checkEndOfConversation = dmAPIResponse => dmAPIResponse.some(message => message.type === 'end');

app.post('/start', async (request, response) => {
    const callSID = request.body.CallSid;
    const dmAPIResponse = await interact(launchConversation(), callSID);
    const messageToSpeak = formatMessage(dmAPIResponse);
    response.type('text/xml');
    response.send(generateTwilioResponse(messageToSpeak));
});

app.post('/continue', async (request, response) => {
    const callSID = request.body.CallSid;
    const userLastMessage = (request.body.SpeechResult && request.body.SpeechResult.trim()) || '';

    if (userLastMessage !== '') {
        const dmAPIResponse = await interact(sendMessage(userLastMessage), callSID);
        await getState(callSID);
        const endOfConversation = checkEndOfConversation(dmAPIResponse);
        const messageToSpeak = formatMessage(dmAPIResponse);
        
        response.type('text/xml');
        response.send(generateTwilioResponse(messageToSpeak, endOfConversation));
    } else {
        response.type('text/xml');
        response.send(generateTwilioResponse(`I'm sorry I didn't here you. Can you please try again`));
    }
});

app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
});
