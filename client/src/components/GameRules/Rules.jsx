import React from 'react';
import rulesPDF from '../../files/Sagrada-Rules.pdf';

const Rules = () => {
  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <embed title="rules" src={rulesPDF} type="application/pdf" width="100%" height="100%"/>
    </div>
  );
};

export default Rules;
