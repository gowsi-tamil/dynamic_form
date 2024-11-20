import React from 'react';
import Field from './Field';

const Section = ({ section, fields, questions, onChange }) => {
  return (
    <div>
      <h2>{section}</h2>
      {fields.map((field) => (
        <Field
          key={field}
          field={field}
          question={questions[field]}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default Section;
