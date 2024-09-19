// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (if any) like your portfolio page
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

// POST route to handle contact form submissions
app.post('/contact', (req, res) => {
  console.log('Form submitted:', req.body); // Log incoming form data
  const { name, email, message } = req.body;

  // Validate form fields
  if (!name || !email || !message) {
    console.log('Form validation failed'); // Log validation failure
    return res.status(400).send('Please fill out all fields.');
  }

  console.log('Sending email...'); // Log email send attempt

  // Create transporter for sending email using Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Email service provider
    auth: {
      user: process.env.EMAIL, // Your email address
      pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
    },
    debug: true,  // Enable SMTP connection debugging
    logger: true  // Enable detailed logging
  });

  // Setup email data
  const mailOptions = {
    from: email, // Sender address (from the form)
    to: process.env.EMAIL, // Your email address (where you want to receive form data)
    subject: `Contact Form Submission from ${name}`,
    text: `You have a new contact form submission from ${name} (${email}):\n\n${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error); // Log email send error
      return res.status(500).send('Error sending message, please try again later.');
    }
    console.log('Email sent successfully:', info.response); // Log success
    res.status(200).send('Message sent successfully!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
