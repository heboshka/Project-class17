import React from 'react';

const Report = ({ report }) => (
  <div>
    you insert {report.valid} valid houses and {report.invalid.count} invalid houses,

    <br />
    {report.invalid.items.map((data, index) => (
      <div key={index}>
        messages:<pre>{JSON.stringify(report.error)}</pre>
        raw:<pre>{JSON.stringify(data, null, 2)}</pre>
      </div>)
    )}
  </div>
);

export default Report;