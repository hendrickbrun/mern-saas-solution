const OpenAI = require('openai');
require('dotenv').config();

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function checkGPT4Access() {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Do I have access to GPT-4?' },
      ],
    });
    console.log('GPT-4 Access Test Successful');
    console.log('Response:', response.choices[0].message.content.trim());
  } catch (error) {
    if (error.code === 'model_not_found' || error.code === 'invalid_request_error') {
      console.error('Error: You do not have access to the GPT-4 model.');
    } else {
      console.error('Error:', error);
    }
  }
}

checkGPT4Access();
