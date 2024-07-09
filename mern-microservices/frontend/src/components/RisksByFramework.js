import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RisksByFramework = ({ framework }) => {
  const [risks, setRisks] = useState([]);

  useEffect(() => {
    const fetchRisks = async () => {
      const response = await axios.get(`/api/framework/${framework}/risks`);
      setRisks(response.data);
    };
    fetchRisks();
  }, [framework]);

  return (
    <div>
      <h2>Risks for Framework: {framework}</h2>
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
  );
};

export default RisksByFramework;
