const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const FormData = require('./models/formDataModel'); // Import form data model
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON requests
app.use(express.static('uploads')); // Serve uploaded files statically

// Set up MongoDB connection (local MongoDB)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to local MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Multer setup for file upload (Salary Slip)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_DIR); // Directory for file storage
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique file names
  },
});
const upload = multer({ storage: storage });

// POST route to handle form submission
app.post('/submit-form', upload.single('salarySlipUploaded'), async (req, res) => {
  console.log(req);
  try {
    // Destructure form data from the request body
    const {
      name,
      dateOfBirth,
      mobile,
      email,
      occupation,
      gender,
      annualIncome,
      address1,
      address2,
      zipcode,
      state,
      district,
      city,
      member1Percentage,
      member2Percentage,
      member3Percentage,
    } = req.body;

    // Construct form data object
    const formData = new FormData({
      name,
      dateOfBirth,
      mobile,
      email,
      occupation,
      gender,
      annualIncome,
      address1,
      address2,
      zipcode,
      state,
      district,
      city,
      memberPercentages: {
        member1: member1Percentage,
        member2: member2Percentage,
        member3: member3Percentage,
      },
      salarySlip: req.file ? req.file.path : '', // Store the file path in the DB
    });

    // Save the form data to the database
    let data = await formData.save();
    console.log(data);

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Error saving form data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
