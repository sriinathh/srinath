const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

// Initialize Resend
const resend = new Resend(RESEND_API_KEY);

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    'http://localhost:5500',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5500',
    'https://srinath-potharaju.onrender.com',
    'https://srinath-potharaju.vercel.app',
    'file://' // Allow file:// protocol for local development
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('Validation failed: Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, email, subject, message'
      });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed: Invalid email format');
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    console.log(`Sending email from ${name} (${email}) with subject: ${subject}`);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Srinath Portfolio <onboarding@resend.dev>',
      to: 'psrinath821@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Portfolio Contact - Srinath Potharaju</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              color: #333;
              padding: 20px;
            }
            .container {
              max-width: 800px;
              width: 100%;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 60px 40px;
              text-align: center;
              color: white;
              position: relative;
            }
            .profile-section {
              display: table;
              margin: 0 auto;
            }
            .profile-image {
              width: 120px;
              height: 120px;
              border-radius: 50%;
              border: 5px solid rgba(255, 255, 255, 0.3);
              margin-bottom: 20px;
              display: block;
              margin-left: auto;
              margin-right: auto;
            }
            .greeting {
              font-size: 2.5rem;
              font-weight: 700;
              margin-bottom: 10px;
            }
            .subtitle {
              font-size: 1.2rem;
              opacity: 0.9;
              font-weight: 300;
            }
            .content {
              padding: 50px 40px;
            }
            .contact-details {
              background: #f8f9fa;
              padding: 40px;
              border-radius: 15px;
              margin-bottom: 40px;
              border-left: 5px solid #667eea;
            }
            .contact-details h3 {
              font-size: 1.5rem;
              color: #333;
              margin-bottom: 20px;
              text-align: center;
            }
            .contact-grid {
              display: table;
              width: 100%;
              border-collapse: collapse;
            }
            .contact-row {
              display: table-row;
            }
            .contact-cell {
              display: table-cell;
              padding: 15px;
              vertical-align: top;
              width: 25%;
            }
            .contact-item {
              background: white;
              padding: 20px;
              border-radius: 10px;
              text-align: center;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }
            .contact-item h4 {
              color: #667eea;
              margin-bottom: 10px;
              font-size: 1.1rem;
            }
            .contact-item p {
              color: #666;
              font-size: 0.9rem;
              line-height: 1.5;
              margin: 0;
            }
            .contact-item a {
              color: #667eea;
              text-decoration: none;
              font-weight: 500;
            }
            .message-section {
              background: white;
              padding: 40px;
              border-radius: 15px;
              margin-bottom: 40px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              border-left: 5px solid #764ba2;
            }
            .message-section h3 {
              font-size: 1.5rem;
              color: #333;
              margin-bottom: 20px;
              text-align: center;
            }
            .message-content {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 10px;
              border-left: 4px solid #667eea;
              font-style: italic;
              line-height: 1.6;
              color: #555;
              white-space: pre-wrap;
              font-size: 14px;
            }
            .about-section {
              background: #f8f9fa;
              padding: 40px;
              border-radius: 15px;
              margin-bottom: 40px;
              border-left: 5px solid #667eea;
            }
            .about-section h3 {
              font-size: 1.5rem;
              color: #333;
              margin-bottom: 20px;
              text-align: center;
            }
            .about-section p {
              line-height: 1.7;
              color: #555;
              margin-bottom: 15px;
              text-align: center;
            }
            .skills-grid {
              display: table;
              width: 100%;
              border-collapse: collapse;
            }
            .skills-row {
              display: table-row;
            }
            .skills-cell {
              display: table-cell;
              padding: 10px;
              width: 25%;
            }
            .skill-item {
              background: white;
              padding: 20px;
              border-radius: 10px;
              text-align: center;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }
            .skill-item h4 {
              color: #667eea;
              margin-bottom: 10px;
              font-size: 1.1rem;
            }
            .skill-item p {
              color: #666;
              font-size: 0.9rem;
              line-height: 1.5;
            }
            .actions {
              text-align: center;
              margin: 40px 0;
            }
            .action-button {
              display: inline-block;
              padding: 15px 30px;
              background: linear-gradient(135deg, #667eea, #764ba2);
              color: white;
              text-decoration: none;
              border-radius: 25px;
              font-weight: 600;
              margin: 0 10px 10px 0;
              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            }
            .footer {
              background: #333;
              color: white;
              padding: 30px 40px;
              text-align: center;
            }
            .footer h3 {
              font-size: 1.5rem;
              margin-bottom: 5px;
            }
            .footer p {
              opacity: 0.8;
              font-size: 0.9rem;
            }
            .timestamp {
              font-size: 0.8rem;
              opacity: 0.6;
              margin-top: 15px;
            }
            @media only screen and (max-width: 600px) {
              .container {
                margin: 10px;
                border-radius: 10px;
              }
              .header {
                padding: 30px 20px;
              }
              .greeting {
                font-size: 1.8rem;
              }
              .content {
                padding: 20px;
              }
              .contact-cell {
                display: block;
                width: 100%;
                margin-bottom: 10px;
              }
              .skills-cell {
                display: block;
                width: 100%;
                margin-bottom: 10px;
              }
              .actions {
                text-align: center;
              }
              .action-button {
                display: block;
                margin: 0 0 10px 0;
                text-align: center;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="profile-section">
                <img src="https://res.cloudinary.com/notes1/image/upload/WhatsApp_Image_2026-02-07_at_21.52.36_vm8roo.jpg"
                     alt="Srinath Potharaju"
                     class="profile-image">
                <h1 class="greeting">New Portfolio Contact!</h1>
                <p class="subtitle">Someone wants to connect with you</p>
              </div>
            </div>

            <div class="content">
              <div class="contact-details">
                <h3>Contact Information</h3>
                <div class="contact-grid">
                  <div class="contact-row">
                    <div class="contact-cell">
                      <div class="contact-item">
                        <h4>Name</h4>
                        <p>${name}</p>
                      </div>
                    </div>
                    <div class="contact-cell">
                      <div class="contact-item">
                        <h4>Email</h4>
                        <p><a href="mailto:${email}">${email}</a></p>
                      </div>
                    </div>
                    <div class="contact-cell">
                      <div class="contact-item">
                        <h4>Subject</h4>
                        <p>${subject}</p>
                      </div>
                    </div>
                    <div class="contact-cell">
                      <div class="contact-item">
                        <h4>Date</h4>
                        <p>${new Date().toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="message-section">
                <h3>Message</h3>
                <div class="message-content">${message}</div>
              </div>

              <div class="about-section">
                <h3>About Me</h3>
                <p>Hi! I'm Srinath Potharaju, a passionate Full Stack Developer and Computer Science student. I love creating innovative web solutions and exploring the latest technologies.</p>
                <div class="skills-grid">
                  <div class="skills-row">
                    <div class="skills-cell">
                      <div class="skill-item">
                        <h4>Frontend</h4>
                        <p>React, JavaScript, HTML5, CSS3</p>
                      </div>
                    </div>
                    <div class="skills-cell">
                      <div class="skill-item">
                        <h4>Backend</h4>
                        <p>Node.js, Express, Python</p>
                      </div>
                    </div>
                    <div class="skills-cell">
                      <div class="skill-item">
                        <h4>Database</h4>
                        <p>MongoDB, PostgreSQL</p>
                      </div>
                    </div>
                    <div class="skills-cell">
                      <div class="skill-item">
                        <h4>DevOps</h4>
                        <p>Docker, AWS, Git</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="actions">
                <a href="mailto:${email}?subject=Re: ${subject}" class="action-button">📧 Reply to ${name}</a>
                <a href="https://www.linkedin.com/in/srinath-potharaju/" class="action-button" target="_blank">💼 View LinkedIn</a>
                <a href="https://github.com/sriinathh" class="action-button" target="_blank">💻 View GitHub</a>
              </div>
            </div>

            <div class="footer">
              <h3>Srinath Potharaju</h3>
              <p>Full Stack Web Developer</p>
              <div class="timestamp">Message received: ${new Date().toLocaleString()}</div>
            </div>
          </div>
        </body>
        </html>
      `,
      reply_to: email
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send email. Please try again later.'
      });
    }

    console.log('Email sent successfully:', data);
    res.status(200).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.'
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service: Resend`);
  console.log(`🌐 CORS enabled for portfolio domains`);
});
