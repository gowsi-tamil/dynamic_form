export const formData = {
  questions: {
    name: { type: 'text', label: 'Name', mandatory: true },
    dateOfBirth: { type: 'date', label: 'Date of Birth', mandatory: true },
    mobile: { type: 'number', label: 'Mobile', mandatory: true },
    email: { type: 'text', label: 'Email', mandatory: true },
    occupation: { type: 'select', label: 'Occupation', mandatory: false },
    gender: { type: 'select', label: 'Select Gender', mandatory: false },
    annualIncome: { type: 'number', label: 'Annual Income', mandatory: true },
    address1: { type: 'text', label: 'Address Line 1', mandatory: true },
    address2: { type: 'text', label: 'Address Line 2', mandatory: false },
    zipcode: { type: 'text', label: 'Zip Code', mandatory: true },
    state: { type: 'select', label: 'State', mandatory: true },
    district: { type: 'select', label: 'District', mandatory: true },
    city: { type: 'text', label: 'City', mandatory: true },
    member1Percentage: {
      type: 'number',
      label: 'Member 1 Percentage',
      mandatory: true,
    },
    member2Percentage: {
      type: 'number',
      label: 'Member 2 Percentage',
      mandatory: true,
    },
    member3Percentage: {
      type: 'number',
      label: 'Member 3 Percentage',
      mandatory: true,
    },
  },
  sections: {
   // primaryDetails: ['name', 'email', 'dateOfBirth'],
    otherDetails: ['annualIncome', 'occupation'],
   // addressDetails: ['district', 'city'],
    membersAllocation: [
      'member1Percentage',
      'member2Percentage',
      'member3Percentage',
    ],
  },
};
