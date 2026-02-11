const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1. Define the transporter INSIDE the function
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Define what the email says
  const mailOptions = {
    from: `"RefuLearn Team" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3. Use the transporter to send the mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
