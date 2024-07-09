const mongoose = require('mongoose');
const { Risk } = require('./models');

const risks = [
  {
    companyId: null, // Will be set dynamically based on the company
    risk: 'Data Breach',
    control: 'Implement encryption',
    testProcedure: 'Verify that all sensitive data is encrypted at rest and in transit.',
    framework: 'NIST',
    bestPractice: 'Encrypt sensitive data to protect it from unauthorized access.'
  },
  // Add more risks aligned with various frameworks
];

async function seedDatabase() {
  await mongoose.connect('mongodb://localhost:27017/mern-saas-solution', { useNewUrlParser: true, useUnifiedTopology: true });
  await Risk.insertMany(risks);
  console.log('Database seeded!');
  mongoose.disconnect();
}

seedDatabase();
