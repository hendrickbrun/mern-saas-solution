const OpenAI = require('openai');
const mongoose = require('mongoose');
require('dotenv').config();
const readline = require('readline');

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/risk_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema and model
const regulationSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
});

const controlSchema = new mongoose.Schema({
  name: String,
  description: String,
  framework: String,
});

const testProcedureSchema = new mongoose.Schema({
  name: String,
  description: String,
  framework: String,
});

const mappingSchema = new mongoose.Schema({
  control: { type: mongoose.Schema.Types.ObjectId, ref: 'Control' },
  relatedControls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Control' }],
});

const Regulation = mongoose.model('Regulation', regulationSchema);
const Control = mongoose.model('Control', controlSchema);
const TestProcedure = mongoose.model('TestProcedure', testProcedureSchema);
const Mapping = mongoose.model('Mapping', mappingSchema);

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function promptUser(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function generateData(prompt) {
  try {
    const response = await openai.completions.create({
      model: 'text-davinci-002',
      prompt,
      max_tokens: 150,
    });

    return response.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating data:', error.message);
  }
}

async function main() {
  const location = await promptUser('Enter the location: ');
  const industry = await promptUser('Enter the industry: ');

  const regulationsPrompt = `List the regulations and directives applicable for ${industry} industry in ${location}. Examples include HIPAA, SOX, etc.`;
  const controlsPrompt = `List controls from frameworks like NIST, ISO, or CIS for ${industry} industry in ${location}.`;
  const testProceduresPrompt = `List test procedures from frameworks like NIST, ISO, or CIS for ${industry} industry in ${location}.`;
  const risksPrompt = `List risks from frameworks like NIST, ISO, or CIS for ${industry} industry in ${location}.`;

  const regulations = await generateData(regulationsPrompt);
  const controls = await generateData(controlsPrompt);
  const testProcedures = await generateData(testProceduresPrompt);
  const risks = await generateData(risksPrompt);

  let controlEntries = [];

  if (regulations) {
    const regulationEntries = regulations.split('\n').filter(entry => entry.trim() !== '').map(entry => {
      return new Regulation({ name: entry, description: 'Description not provided', type: 'Regulation' });
    });

    await Regulation.insertMany(regulationEntries);
  }

  if (controls) {
    controlEntries = controls.split('\n').filter(entry => entry.trim() !== '').map(entry => {
      return new Control({ name: entry, description: 'Description not provided', framework: 'NIST/ISO/CIS' });
    });

    await Control.insertMany(controlEntries);
  }

  if (testProcedures) {
    const testProcedureEntries = testProcedures.split('\n').filter(entry => entry.trim() !== '').map(entry => {
      return new TestProcedure({ name: entry, description: 'Description not provided', framework: 'NIST/ISO/CIS' });
    });

    await TestProcedure.insertMany(testProcedureEntries);
  }

  // Create mappings between controls based on their names
  for (let i = 0; i < controlEntries.length; i++) {
    const control = await Control.findOne({ name: controlEntries[i].name });
    const relatedControls = await Control.find({ name: { $ne: controlEntries[i].name } });

    const relatedControlIds = relatedControls.map(rc => rc._id);

    const mapping = new Mapping({
      control: control._id,
      relatedControls: relatedControlIds,
    });

    await mapping.save();
  }

  console.log('Data generated and stored successfully.');
}

main().catch(err => {
  console.error('Error:', err.message);
  mongoose.disconnect();
});
