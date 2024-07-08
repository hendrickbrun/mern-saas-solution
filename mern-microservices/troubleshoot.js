const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
require("dotenv").config();

// Function to check if environment variables are set
function checkEnvironmentVariables() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("Error: OPENAI_API_KEY is not set in the environment variables.");
    process.exit(1);
  } else {
    console.log("Environment variable OPENAI_API_KEY is set.");
  }
}

// Function to check if the OpenAI package is installed
function checkNodeModules() {
  try {
    require.resolve('openai');
    console.log("OpenAI package is installed.");
  } catch (error) {
    console.error("OpenAI package is not installed. Run 'npm install openai'.");
    process.exit(1);
  }
}

// Function to check if the .env file exists
function checkEnvFile() {
  if (fs.existsSync(".env")) {
    console.log(".env file exists.");
  } else {
    console.error(".env file does not exist. Create a .env file with the OPENAI_API_KEY.");
    process.exit(1);
  }
}

// Function to test the OpenAI API connection
async function testOpenAIConnection() {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Hello, OpenAI!",
      max_tokens: 5,
    });
    console.log("OpenAI API call successful:", response.data.choices[0].text.trim());
  } catch (error) {
    console.error("Error making OpenAI API call:", error.message);
  }
}

// Function to check the Node.js version
function checkNodeVersion() {
  const version = process.version;
  console.log("Node.js version:", version);
  if (!version.startsWith('v18')) {
    console.warn("Warning: You are using Node.js version", version, ". It's recommended to use Node.js v18 for compatibility.");
  }
}

// Main function to run all checks
function main() {
  checkNodeVersion();
  checkEnvFile();
  checkEnvironmentVariables();
  checkNodeModules();
  testOpenAIConnection();
}

main();
