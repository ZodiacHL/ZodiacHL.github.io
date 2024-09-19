const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  debug: true,
  logger: true,
});

const mailOptions = {
  from: process.env.EMAIL,  // Use your own email for both sender and receiver
  to: process.env.EMAIL,
  subject: 'Test Email',
  text: 'This is a test email to check if the server can send emails.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
