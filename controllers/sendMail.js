const nodemailer = require('nodemailer')

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

// Send email
const sendMail = (req, res) => {
  const { to, friendName, referralLink } = req.body
  const mailOptions = {
    from: 'accredian6@gmail.com',
    to,
    subject: 'Your friend shared an Accredian discount with you!',
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Exclusive Accredian Invitation</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f4f4f4;
      }
      .container {
        background-color: #ffffff;
        border-radius: 8px;
        padding: 30px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #2c3e50;
        font-size: 24px;
        margin-bottom: 20px;
      }
      ul {
        padding-left: 20px;
      }
      .cta-button {
        display: inline-block;
        background-color: #3498db;
        color: #ffffff;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 5px;
        font-weight: bold;
        margin-top: 20px;
        transition: background-color 0.3s ease;
      }
      .cta-button:hover {
        background-color: #2980b9;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        color: #7f8c8d;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Exclusive Invitation: Join Accredian Today!</h1>
      <p>
        Dear ${friendName || 'Valued Friend'},
      </p>
      <p>
        We're thrilled to inform you that you've been personally invited to join Accredian, the premier online learning platform. As a token of our appreciation, we're offering you an exclusive discount to kickstart your learning journey.
      </p>
      <p>Sign up now and unlock these premium benefits:</p>
      <ul>
        <li><strong>20% off</strong> your first course purchase</li>
        <li>Access to <strong>1000+ expert-led</strong> courses</li>
        <li>Flexible learning - anytime, anywhere</li>
        <li>Earn industry-recognized certificates</li>
      </ul>
      <p>
        This exclusive offer is only available for a limited time. Don't miss your chance to invest in your future at an unbeatable price!
      </p>
      <a href="${referralLink}" class="cta-button">Claim Your 20% Discount Now!</a>
    </div>
    <div class="footer">
      <p>© 2024 Accredian. All rights reserved. Terms and conditions apply.</p>
    </div>
  </body>
</html>`,
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error)
      return res.status(500).json({ message: 'Failed to send the Mail.' })
    } else {
      console.log('Email sent:', info.response)
      return res.status(200).json({ message: 'Mail sent successfully.' })
    }
  })
}

module.exports = sendMail
