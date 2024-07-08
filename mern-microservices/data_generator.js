const OpenAI = require('openai');
require('dotenv').config();
const fs = require('fs');
const readline = require('readline');
const { MongoClient } = require('mongodb');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function generateData(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating data:', error);
    throw error;
  }
}

function filterValidEntries(entries) {
  return entries.filter(entry => entry.name && entry.description);
}

async function createRegulations(location, industry) {
  const prompt = `List well-known regulations such as HIPAA, SOX, GDPR, etc., that are relevant to the ${industry} industry in ${location}. Include a brief description of each regulation.`;
  const data = await generateData(prompt);
  console.log('Generated regulations data:', data);
  
  const regulations = data.split('\n').map(description => {
    const [name, ...descParts] = description.split(':');
    return {
      id: generateId(),
      name: name ? name.trim() : '',
      description: descParts.length > 0 ? descParts.join(':').trim() : '',
      location,
      industry,
      type: 'regulation'
    };
  });

  return filterValidEntries(regulations);
}

async function createDirectives(location, industry) {
  const prompt = `List well-known directives relevant to the ${industry} industry in ${location}. Include a brief description of each directive.`;
  const data = await generateData(prompt);
  console.log('Generated directives data:', data);

  const directives = data.split('\n').map(description => {
    const [name, ...descParts] = description.split(':');
    return {
      id: generateId(),
      name: name ? name.trim() : '',
      description: descParts.length > 0 ? descParts.join(':').trim() : '',
      location,
      industry,
      type: 'directive'
    };
  });

  return filterValidEntries(directives);
}

async function createRisk(location, industry) {
  const prompt = `Generate a risk description for ${industry} industry in ${location} with severity, likelihood, and impact.`;
  const data = await generateData(prompt);
  console.log('Generated risk data:', data);

  return {
    id: generateId(),
    description: data,
    severity: 'High',
    likelihood: 'Likely',
    impact: 'Critical',
    location,
    industry,
  };
}

async function createControl(riskId) {
  const prompt = 'Generate a control description.';
  const data = await generateData(prompt);
  console.log('Generated control data:', data);

  return {
    id: generateId(),
    description: data,
    risk_id: riskId,
  };
}

async function createTestProcedure(controlId) {
  const prompt = 'Generate a test procedure description with steps.';
  const data = await generateData(prompt);
  console.log('Generated test procedure data:', data);

  return {
    id: generateId(),
    description: data,
    control_id: controlId,
    steps: ['Step 1', 'Step 2', 'Step 3'],
  };
}

async function createApplicationRisk(application) {
  const prompt = `Generate a risk description for the application ${application}. Include severity, likelihood, and impact.`;
  const data = await generateData(prompt);
  console.log('Generated application risk data:', data);

  return {
    id: generateId(),
    description: data,
    application,
    severity: 'High',
    likelihood: 'Likely',
    impact: 'Critical',
  };
}

async function createVendorRisk(vendor) {
  const prompt = `Generate a risk description for the vendor ${vendor}. Include severity, likelihood, and impact.`;
  const data = await generateData(prompt);
  console.log('Generated vendor risk data:', data);

  return {
    id: generateId(),
    description: data,
    vendor,
    severity: 'High',
    likelihood: 'Likely',
    impact: 'Critical',
  };
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function readExistingData() {
  if (fs.existsSync('data.json')) {
    const rawData = fs.readFileSync('data.json');
    return JSON.parse(rawData);
  }
  return null;
}

function saveData(data) {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

async function main() {
  const location = await prompt('Enter the location: ');
  const industry = await prompt('Enter the industry: ');

  console.log('Generating regulations and directives...');
  const regulations = await createRegulations(location, industry);
  const directives = await createDirectives(location, industry);

  console.log('Regulations:', JSON.stringify(regulations, null, 2));
  console.log('Directives:', JSON.stringify(directives, null, 2));

  const proceed = await prompt('Do you want to proceed with adding applications and vendors? (yes/no): ');

  if (proceed.toLowerCase() !== 'yes') {
    console.log('Exiting...');
    rl.close();
    return;
  }

  const applicationsInput = await prompt('Enter the applications (comma separated): ');
  const vendorsInput = await prompt('Enter the vendors (comma separated): ');

  const applications = applicationsInput.split(',').map(app => app.trim());
  const vendors = vendorsInput.split(',').map(vendor => vendor.trim());

  let existingData = readExistingData();

  if (existingData) {
    console.log('Using existing data...');
  } else {
    console.log('Generating new data...');

    const risks = await Promise.all(regulations.map(() => createRisk(location, industry)));
    const controls = await Promise.all(risks.map(risk => createControl(risk.id)));
    const testProcedures = await Promise.all(controls.map(control => createTestProcedure(control.id)));

    const applicationRisks = await Promise.all(applications.map(app => createApplicationRisk(app)));
    const vendorRisks = await Promise.all(vendors.map(vendor => createVendorRisk(vendor)));

    const applicationControls = await Promise.all(applicationRisks.map(risk => createControl(risk.id)));
    const vendorControls = await Promise.all(vendorRisks.map(risk => createControl(risk.id)));

    const applicationTestProcedures = await Promise.all(applicationControls.map(control => createTestProcedure(control.id)));
    const vendorTestProcedures = await Promise.all(vendorControls.map(control => createTestProcedure(control.id)));

    existingData = {
      regulations,
      directives,
      risks,
      controls,
      testProcedures,
      applicationRisks,
      applicationControls,
      applicationTestProcedures,
      vendorRisks,
      vendorControls,
      vendorTestProcedures,
    };

    saveData(existingData);
  }

  console.log('Data:', JSON.stringify(existingData, null, 2));
  rl.close();
}

main();
