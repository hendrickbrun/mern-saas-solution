const OpenAI = require('openai');
require("dotenv").config();

// MongoDB client
const { MongoClient } = require('mongodb');

async function checkEnvironmentVariables() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("Error: OPENAI_API_KEY is not set.");
    return false;
  }
  console.log("Environment variable OPENAI_API_KEY is set.");
  return true;
}

async function checkOpenAIPackage() {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    console.log("OpenAI package is installed.");
    return true;
  } catch (error) {
    console.error("Error: OpenAI package is not installed correctly.");
    return false;
  }
}

async function testOpenAIConnection() {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Test connection to OpenAI API" },
      ],
    });
    console.log("OpenAI connection test successful.");
    console.log("Response:", response.choices[0].message.content.trim());
  } catch (error) {
    console.error("Error testing OpenAI connection:", error);
  }
}

async function main() {
  const envSet = await checkEnvironmentVariables();
  const openaiInstalled = await checkOpenAIPackage();
  if (envSet && openaiInstalled) {
    await testOpenAIConnection();
  }
}

main().catch(console.error);
