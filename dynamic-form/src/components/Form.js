import React, { useState } from 'react';
import Section from './Section';
import { formData } from '../data/formData';
import { validatePercentages } from '../utils/validation';
import axios from 'axios';

const Form = () => {
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({});
  const [salarySlipRequired, setSalarySlipRequired] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleInputChange = (field, value) => {
    setFormState({ ...formState, [field]: value });

    // Determine if salary slip is required
    if (field === 'annualIncome') {
      setSalarySlipRequired(parseFloat(value) > 50000);
    }
  };

  // Handle file upload
  const handleFileUpload = (field, file) => {
    setFormState({ ...formState, [field]: file });
  };

  // Validate a specific section
  const validateSection = (section) => {
    const sectionFields = formData.sections[section];
    let sectionErrors = {};

    sectionFields.forEach((field) => {
      const question = formData.questions[field];
      const value = formState[field];

      if (question.mandatory && !value) {
        sectionErrors[field] = `${question.label} is required.`;
      } else if (
        question.type === 'text' &&
        question.label === 'Email' &&
        !/\S+@\S+\.\S+/.test(value)
      ) {
        sectionErrors[field] = `Please enter a valid email address.`;
      } else if (
        question.type === 'number' &&
        question.mandatory &&
        isNaN(value)
      ) {
        sectionErrors[field] = `${question.label} must be a valid number.`;
      }
    });

    // Additional validations for specific sections
    if (section === 'membersAllocation') {
      const percentages = [
        formState.member1Percentage,
        formState.member2Percentage,
        formState.member3Percentage,
      ];
      const percentageError = validatePercentages(percentages);
      if (percentageError) {
        sectionErrors.membersAllocation = percentageError;
      }
    }

    return sectionErrors;
  };

  // Validate the entire form
  const validateForm = () => {
    let validationErrors = {};

    // Validate each section
    Object.keys(formData.sections).forEach((section) => {
      const sectionErrors = validateSection(section);
      validationErrors = { ...validationErrors, ...sectionErrors };
    });

    // Additional validation for salary slip
    if (salarySlipRequired && !formState.salarySlipUploaded) {
      validationErrors.salarySlipUploaded = 'Salary slip is required.';
    }

    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = new FormData();
      Object.keys(formState).forEach((key) => {
        submissionData.append(key, formState[key]);
      });

      console.log('Submitting form data:', formState);

      const response = await axios.post(
        'http://localhost:5000/submit-form',
        submissionData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response.data);
      alert('Form submitted successfully!');
      setFormState({});
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData.sections).map((section) => (
        <Section
          key={section}
          section={section}
          fields={formData.sections[section]}
          questions={formData.questions}
          onChange={handleInputChange}
        />
      ))}

      {salarySlipRequired && (
        <div>
          <label>Upload Salary Slip</label>
          <input
            type="file"
            onChange={(e) =>
              handleFileUpload('salarySlipUploaded', e.target.files[0])
            }
          />
        </div>
      )}

      {Object.keys(errors).length > 0 && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          <ul>
            {Object.keys(errors).map((field) => (
              <li key={field}>{errors[field]}</li>
            ))}
          </ul>
        </div>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default Form;
