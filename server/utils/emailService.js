const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  post: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendThankYouEmail = async (to, applicantName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Thank You for Applying!',
    text: `Dear ${applicantName},\n\nThank you for applying for the job through our career portal.  This email is to confirm that we have received your application.
\n\n
We appreciate your interest in joining our team and will carefully review your qualifications & experience. If your profile matches our requirements, we will reach out to you for further evaluation.
\n\n
Please note that due to the high volume of applications we receive, it may take some time to process them all. We kindly ask for your patience during this process.
\n\n
Best Regards,
\n
DevMitra Solutions Hiring Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Thank you email sent to', to);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendThankYouEmail };