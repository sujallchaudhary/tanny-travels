require('dotenv').config();
const axios = require('axios');

async function createChatSession(plugin) {
  try {
    const response = await axios.post(
      'https://api.on-demand.io/chat/v1/sessions',
      {
        pluginIds: [plugin],
        externalUserId: 'sujalchaudhary63@gmail.com'
      },
      {
        headers: {
          apikey: process.env.OD_KEY
        }
      }
    );
    if (response.status === 201) {
      console.log('Chat session created successfully');
      return response.data.data.id;
    } else {
      console.error('Failed to create chat session');
    }
  } catch (error) {
    console.error('Error creating chat session:', error.message);
  }
}

module.exports = createChatSession;