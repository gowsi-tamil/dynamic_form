const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    mobile: { type: String, required: false },
    email: { type: String, required: false },
    occupation: { type: String, required: false },
    gender: { type: String, required: false },
    annualIncome: { type: Number, required: false },
    address1: { type: String, required: false },
    address2: { type: String, required: false },
    zipcode: { type: String, required: false },
    state: { type: String, required: false },
    district: { type: String, required: false },
    city: { type: String, required: false },
    memberPercentages: {
      member1: { type: Number, required: true },
      member2: { type: Number, required: true },
      member3: { type: Number, required: true },
    },
    salarySlip: { type: String }, // Path to the uploaded file
  },
  { timestamps: true }
);

module.exports = mongoose.model('FormData', formDataSchema);
