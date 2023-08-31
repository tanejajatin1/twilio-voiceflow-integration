const axios = require('axios');
const apiKey = process.env.API_KEY;
const generalServiceEndpoint = process.env.GENERAL_SERVICE_ENDPOINT;

async function interact(body, userID) {
  try {
    const response = await axios({
      method: 'POST',
      baseURL: generalServiceEndpoint,
      url: `/state/user/${userID}/interact`,
      headers: {
        Authorization: apiKey,
        versionID: 'development',
      },
      data: body,
    });

    return response.data;
  } catch (error) {
    console.log(`Error ${error}`);
  }
}

async function getState(userID) {
  try {
    const response = await axios({
      method: 'Get',
      baseURL: generalServiceEndpoint,
      url: `/state/user/${userID}`,
      headers: {
        Authorization: apiKey,
        versionID: 'development',
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(`Error ${error}`);
  }
}

module.exports = { interact, getState };