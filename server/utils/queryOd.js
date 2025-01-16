require('dotenv').config();
const axios = require('axios');

async function queryOd(sessionId,plugin,query) {
  try {
    const response = await axios.post(
      `https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`,
      {
        endpointId: 'predefined-openai-gpt4o',
        query: query,
        pluginIds: [plugin],
        responseMode: 'sync'
      },
      {
        headers: {
          apikey: process.env.OD_KEY
        }
      }
    );
    if (response.status === 200) {
      const answer = response.data.data.answer.replace(/\\/g, "").replace(/```json|```/g, "");
      const parsedData = JSON.parse(answer);
      return parsedData;

    } else {
      console.error('Failed to submit query');
    }
  } catch (error) {
    console.error('Error submitting query:', error.message);
  }
}

module.exports = queryOd;
