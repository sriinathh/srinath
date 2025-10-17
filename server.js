const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ Missing EMAIL_USER or EMAIL_PASS in .env file');
    console.log('Please check your .env file and make sure both EMAIL_USER and EMAIL_PASS are set');
    process.exit(1);
}

console.log(`📧 Email configured for: ${process.env.EMAIL_USER}`);
console.log(`📧 App password length: ${process.env.EMAIL_PASS?.length || 0} characters`);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (your portfolio)
app.use(express.static(path.join(__dirname)));

// Nodemailer configuration for Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Verify email configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('❌ Email configuration error:', error);
    } else {
        console.log('✅ Email server is ready to send messages');
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Email to Srinath (portfolio owner)
        const ownerMailOptions = {
            from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
            to: 'nithiinsrinu@gmail.com',
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; overflow: hidden;">
                    <div style="background: white; margin: 2px; border-radius: 8px;">
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; text-align: center;">
                            <h1 style="margin: 0; font-size: 24px;">💼 New Contact Form Submission</h1>
                            <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone reached out through your portfolio!</p>
                        </div>
                        
                        <div style="padding: 30px;">
                            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                                <h2 style="color: #2d3748; margin: 0 0 15px 0; font-size: 18px;">👤 Contact Details</h2>
                                <p style="margin: 8px 0; color: #4a5568;"><strong>Name:</strong> ${name}</p>
                                <p style="margin: 8px 0; color: #4a5568;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></p>
                                <p style="margin: 8px 0; color: #4a5568;"><strong>Subject:</strong> ${subject}</p>
                            </div>
                            
                            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
                                <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 16px;">💬 Message</h3>
                                <p style="color: #4a5568; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                            </div>
                            
                            <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                                <a href="mailto:${email}?subject=Re: ${subject}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                                    📧 Reply to ${name}
                                </a>
                            </div>
                        </div>
                        
                        <div style="background: #f8fafc; padding: 15px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0; color: #718096; font-size: 12px;">
                                Sent from your portfolio contact form • ${new Date().toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            `,
            replyTo: email
        };

        // Confirmation email to the user
        const userMailOptions = {
            from: `"Srinath Potharaju" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '✅ Message Received - Thank You for Reaching Out!',
            html: `
                <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); border-radius: 10px; overflow: hidden;">
                    <div style="background: white; margin: 2px; border-radius: 8px;">
                        <div style="background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); color: white; padding: 25px; text-align: center;">
                            <h1 style="margin: 0; font-size: 24px;">🎉 Thank You, ${name}!</h1>
                            <p style="margin: 10px 0 0 0; opacity: 0.9;">Your message has been received successfully</p>
                        </div>
                        
                        <div style="padding: 30px;">
                            <div style="text-align: center; margin-bottom: 25px;">
                                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 24px;">
                                    ✅
                                </div>
                                <h2 style="color: #2d3748; margin: 0; font-size: 20px;">Message Delivered!</h2>
                            </div>
                            
                            <div style="background: #f0fdfc; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #4ecdc4;">
                                <p style="color: #0f766e; margin: 0; line-height: 1.6;">
                                    Hi ${name},<br><br>
                                    Thank you for reaching out through my portfolio! I'm <strong>Srinath Potharaju</strong>, a passionate <strong>Full Stack Web Developer</strong>, and I'm excited to hear from you.
                                </p>
                            </div>
                            
                            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                                <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 16px;">📝 Your Message Summary</h3>
                                <p style="margin: 8px 0; color: #4a5568;"><strong>Subject:</strong> ${subject}</p>
                                <p style="margin: 8px 0; color: #4a5568;"><strong>Received:</strong> ${new Date().toLocaleString()}</p>
                            </div>
                            
                            <div style="background: #fffbeb; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                                <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 16px;">⏰ What's Next?</h3>
                                <ul style="color: #78350f; margin: 0; padding-left: 20px; line-height: 1.6;">
                                    <li>I'll review your message carefully</li>
                                    <li>You can expect a response within 24-48 hours</li>
                                    <li>I'll get back to you at this email address</li>
                                </ul>
                            </div>
                            
                            <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                                <p style="color: #4a5568; margin-bottom: 15px;">Let's connect on social media!</p>
                                <div style="display: inline-block;">
                                    <a href="https://github.com/sriinathh" style="display: inline-block; margin: 0 10px; color: #4a5568; text-decoration: none;">
                                        🐙 GitHub
                                    </a>
                                    <a href="https://www.linkedin.com/in/srinath-potharaju/" style="display: inline-block; margin: 0 10px; color: #4a5568; text-decoration: none;">
                                        💼 LinkedIn
                                    </a>
                                    <a href="https://x.com/NithiinSrinu" style="display: inline-block; margin: 0 10px; color: #4a5568; text-decoration: none;">
                                        🐦 Twitter
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0 0 10px 0; color: #2d3748; font-weight: bold;">Srinath Potharaju</p>
                            <p style="margin: 0 0 5px 0; color: #4a5568;">Full Stack Web Developer</p>
                            <p style="margin: 0; color: #718096; font-size: 12px;">
                                📧 <a href="mailto:nithiinsrinu@gmail.com" style="color: #667eea;">nithiinsrinu@gmail.com</a> • 📍 Hyderabad, India
                            </p>
                        </div>
                    </div>
                </div>
            `
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(ownerMailOptions),
            transporter.sendMail(userMailOptions)
        ]);

        console.log(`✅ Emails sent successfully for contact from: ${name} (${email})`);

        res.json({
            success: true,
            message: 'Message sent successfully! Thank you for reaching out.'
        });

    } catch (error) {
        console.error('❌ Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Contact form server is running',
        timestamp: new Date().toISOString()
    });
});

// Default route - serve portfolio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'portfolio.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 Contact form API available at http://localhost:${PORT}/api/contact`);
    console.log(`🏠 Portfolio available at http://localhost:${PORT}`);
});

module.exports = app;