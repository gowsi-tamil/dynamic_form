import React from 'react';

const Field = ({ field, question, onChange }) => {
  const handleChange = (e) => {
    onChange(field, e.target.value);
  };

  const renderSelectOptions = () => {
    switch (field) {
      case 'occupation':
        return (
          <>
            <option value="">Select Occupation</option>
            <option value="teacher">Teacher</option>
            <option value="developer">Developer</option>
            <option value="doctor">Doctor</option>
            <option value="engineer">Engineer</option>
          </>
        );
      case 'gender':
        return (
          <>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </>
        );
      case 'state':
        return (
          <>
            <option value="">Select State</option>
            <option value="tamilnadu">Tamil Nadu</option>
            <option value="kerala">Kerala</option>
            <option value="andhrapradesh">Andhra Pradesh</option>
            <option value="karnataka">Karnataka</option>
          </>
        );
      case 'district':
        return (
          <>
            <option value="">Select District</option>
            <option value="chennai">Chennai</option>
            <option value="trichy">Trichy</option>
            <option value="madurai">Madurai</option>
            <option value="salem">Salem</option>
          </>
        );
      default:
        return (
          <>
            <option value="">Select</option>
          </>
        );
    }
  };

  const renderMandatoryLabel = () => (
    <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
  );

  switch (question.type) {
    case 'text':
    case 'number':
      return (
        <div style={{ marginBottom: '15px' }}>
          <label>
            {question.label}
            {question.mandatory && renderMandatoryLabel()}
            <input
              type={question.type}
              onChange={handleChange}
              placeholder={`Enter your ${question.label.toLowerCase()}`}
              style={{ display: 'block', marginTop: '5px' }}
            />
          </label>
        </div>
      );
    case 'date':
      return (
        <div style={{ marginBottom: '15px' }}>
          <label>
            {question.label}
            {question.mandatory && renderMandatoryLabel()}
            <input
              type="date"
              onChange={handleChange}
              style={{ display: 'block', marginTop: '5px' }}
            />
          </label>
        </div>
      );
    case 'select':
      return (
        <div style={{ marginBottom: '15px' }}>
          <label>
            {question.label}
            {question.mandatory && renderMandatoryLabel()}
            <select
              onChange={handleChange}
              style={{ display: 'block', marginTop: '5px' }}
            >
              {renderSelectOptions()}
            </select>
          </label>
        </div>
      );
    case 'radio':
      return (
        <div style={{ marginBottom: '15px' }}>
          <label>
            {question.label}
            {question.mandatory && renderMandatoryLabel()}
          </label>
          <div>
            <input
              type="radio"
              name={field}
              value="male"
              onChange={handleChange}
            />{' '}
            Male
            <input
              type="radio"
              name={field}
              value="female"
              onChange={handleChange}
            />{' '}
            Female
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default Field;
