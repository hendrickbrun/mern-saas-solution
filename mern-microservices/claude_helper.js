const axios = require('axios');
require('dotenv').config();

const claudeApiKey = process.env.CLAUDE_API_KEY;

if (!claudeApiKey) {
  console.error("CLAUDE_API_KEY is not set in your environment variables.");
  process.exit(1);
}

const claudeInstance = axios.create({
  baseURL: 'https://api.anthropic.com/v1', // Verify this endpoint with the official documentation
  headers: {
    'Authorization': `Bearer ${claudeApiKey}`,
    'Content-Type': 'application/json',
  },
});

async function getClaudeHelp(prompt) {
  try {
    const response = await claudeInstance.post('/complete', { // Verify this endpoint with the official documentation
      model: 'claude-v1', // Ensure the model name is correct and you have access to it
      prompt: prompt,
      max_tokens: 500,
      stop: ['\n'],
      temperature: 0.7,
    });

    const reply = response.data.choices[0].text;
    console.log("Claude's Response:");
    console.log(reply);
  } catch (error) {
    console.error("Error communicating with Claude API:", error.response ? error.response.data : error.message);
  }
}

async function main() {
  const prompt = `
    I am working on a MERN stack project with the following microservices:
    - User Service
    - Business Service
    - Risk Assessment Service
    - Notification Service
    - Admin Service

    Each microservice interacts with MongoDB instances. The frontend is built with React.

    1. Review my project structure and suggest any improvements.
    2. Help me with any boilerplate code that might be needed for common tasks.
    3. Assist me in generating and maintaining documentation for my project.
    4. Provide debugging assistance for any potential issues in my code.

    Current project structure:
    - /mern-microservices
      - /client
      - /server
      - /services
        - /user-service
        - /business-service
        - /risk-assessment-service
        - /notification-service
        - /admin-service
      - .env
      - docker-compose.yml
      - package.json

    Please provide detailed instructions and suggestions based on the above information.
  `;

  await getClaudeHelp(prompt);
}

main();
