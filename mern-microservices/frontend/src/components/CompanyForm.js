import React, { useState } from 'react';
import axios from 'axios';

const CompanyForm = () => {
  const [company, setCompany] = useState({ name: '', industry: '', location: '', publicOrPrivate: '', numberOfEmployees: '' });
  const [risks, setRisks] = useState([]);

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/companies', company);
    const risksResponse = await axios.get(`/api/companies/${response.data._id}/risks`);
    setRisks(risksResponse.data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="name" value={company.name} onChange={handleChange} placeholder="Name" />
        <input name="industry" value={company.industry} onChange={handleChange} placeholder="Industry" />
        <input name="location" value={company.location} onChange={handleChange} placeholder="Location" />
        <input name="publicOrPrivate" value={company.publicOrPrivate} onChange={handleChange} placeholder="Public or Private" />
        <input name="numberOfEmployees" value={company.numberOfEmployees} onChange={handleChange} placeholder="Number of Employees" />
        <button type="submit">Submit</button>
      </form>
      <div>
        {risks.map((risk, index) => (
          <div key={index}>
            <h3>{risk.risk}</h3>
            <p><strong>Control:</strong> {risk.control}</p>
            <p><strong>Test Procedure:</strong> {risk.testProcedure}</p>
            <p><strong>Framework:</strong> {risk.framework}</p>
            <p><strong>Best Practice:</strong> {risk.bestPractice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyForm;

