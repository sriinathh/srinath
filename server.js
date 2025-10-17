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
            subject: `📬 New Portfolio Contact: ${subject}`,
            html: `
                <div style="max-width: 650px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
                    <div style="background: white; margin: 3px; border-radius: 12px; overflow: hidden;">
                        <!-- Header -->
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; position: relative;">
                            <div style="background: rgba(255,255,255,0.1); width: 70px; height: 70px; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 30px;">
                                💼
                            </div>
                            <h1 style="margin: 0; font-size: 26px; font-weight: 600;">New Contact Form Submission</h1>
                            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Someone is interested in working with you!</p>
                            <div style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 20px; font-size: 12px;">
                                🔔 New Message
                            </div>
                        </div>
                        
                        <!-- Content -->
                        <div style="padding: 35px;">
                            <!-- Contact Card -->
                            <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 5px solid #667eea; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                                    <div style="background: #667eea; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 18px;">
                                        👤
                                    </div>
                                    <h2 style="color: #2d3748; margin: 0; font-size: 20px; font-weight: 600;">Contact Information</h2>
                                </div>
                                <div style="grid-template-columns: 1fr 1fr; gap: 15px; display: block;">
                                    <div style="margin-bottom: 12px;">
                                        <span style="color: #718096; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</span>
                                        <p style="margin: 5px 0; color: #2d3748; font-size: 16px; font-weight: 600;">${name}</p>
                                    </div>
                                    <div style="margin-bottom: 12px;">
                                        <span style="color: #718096; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</span>
                                        <p style="margin: 5px 0;"><a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-size: 16px; font-weight: 500;">${email}</a></p>
                                    </div>
                                    <div style="margin-bottom: 0;">
                                        <span style="color: #718096; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Subject</span>
                                        <p style="margin: 5px 0; color: #2d3748; font-size: 16px; font-weight: 500;">${subject}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Message -->
                            <div style="background: #ffffff; padding: 25px; border-radius: 12px; border: 2px solid #e2e8f0; margin-bottom: 25px;">
                                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                    <div style="background: #10b981; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 16px;">
                                        💬
                                    </div>
                                    <h3 style="color: #2d3748; margin: 0; font-size: 18px; font-weight: 600;">Message Content</h3>
                                </div>
                                <div style="background: #f7fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
                                    <p style="color: #4a5568; line-height: 1.7; margin: 0; white-space: pre-wrap; font-size: 15px;">${message}</p>
                                </div>
                            </div>
                            
                            <!-- Action Buttons -->
                            <div style="text-align: center; margin-top: 30px;">
                                <a href="mailto:${email}?subject=Re: ${subject}&body=Hi ${name},%0D%0A%0D%0AThank you for reaching out through my portfolio. I'm Srinath, a Full Stack Web Developer.%0D%0A%0D%0A" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; margin: 5px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3); transition: all 0.3s ease;">
                                    📧 Reply to ${name.split(' ')[0]}
                                </a>
                                <br>
                                <a href="tel:" style="background: #10b981; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: 500; font-size: 14px; display: inline-block; margin: 5px;">
                                    📞 Schedule a Call
                                </a>
                            </div>
                        </div>
                        
                        <!-- Footer -->
                        <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0 0 10px 0; color: #2d3748; font-weight: 600; font-size: 14px;">
                                🚀 Srinath Potharaju - Full Stack Web Developer
                            </p>
                            <p style="margin: 0; color: #718096; font-size: 12px;">
                                📅 Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' })} IST
                            </p>
                            <p style="margin: 5px 0 0 0; color: #a0aec0; font-size: 11px;">
                                Sent via Portfolio Contact Form • Auto-generated email
                            </p>
                        </div>
                    </div>
                </div>
            `,
            replyTo: email
        };

        // Confirmation email to the user
        const userMailOptions = {
            from: `"Srinath Potharaju - Full Stack Developer" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `✅ Thank you for contacting me, ${name.split(' ')[0]}! - Message Received`,
            html: `
                <div style="max-width: 650px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); border-radius: 15px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
                    <div style="background: white; margin: 3px; border-radius: 12px; overflow: hidden;">
                        <!-- Header -->
                        <div style="background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); color: white; padding: 35px; text-align: center; position: relative;">
                            <div style="background: rgba(255,255,255,0.15); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 35px;">
                                🎉
                            </div>
                            <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Thank You, ${name}!</h1>
                            <p style="margin: 15px 0 5px 0; opacity: 0.95; font-size: 16px;">Your message has been received successfully</p>
                            <div style="background: rgba(255,255,255,0.2); padding: 8px 15px; border-radius: 20px; display: inline-block; margin-top: 10px; font-size: 13px; font-weight: 500;">
                                ✨ Message Delivered ✨
                            </div>
                        </div>
                        
                        <!-- Content -->
                        <div style="padding: 40px;">
                            <!-- Welcome Message -->
                            <div style="text-align: center; margin-bottom: 30px;">
                                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 25px;">
                                    ✅
                                </div>
                                <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 24px; font-weight: 600;">Message Successfully Delivered!</h2>
                                <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">I'm excited to connect with you and discuss potential opportunities.</p>
                            </div>
                            
                            <!-- Personal Introduction -->
                            <div style="background: linear-gradient(135deg, #f0fdfc 0%, #e6fffa 100%); padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 5px solid #10b981;">
                                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                    <div style="background: #10b981; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 18px;">
                                        🚀
                                    </div>
                                    <h3 style="color: #1f2937; margin: 0; font-size: 18px; font-weight: 600;">About Me</h3>
                                </div>
                                <p style="color: #047857; margin: 0; line-height: 1.7; font-size: 15px;">
                                    Hi <strong>${name}</strong>!<br><br>
                                    I'm <strong>Srinath Potharaju</strong>, a passionate <strong>Full Stack Web Developer</strong> based in Hyderabad, India. I specialize in creating modern, responsive, and user-friendly web applications using cutting-edge technologies.<br><br>
                                    Thank you for taking the time to reach out through my portfolio. I truly appreciate your interest!
                                </p>
                            </div>
                            
                            <!-- Message Summary -->
                            <div style="background: #f8fafc; padding: 25px; border-radius: 12px; margin-bottom: 25px; border: 1px solid #e2e8f0;">
                                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                    <div style="background: #6366f1; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 16px;">
                                        📝
                                    </div>
                                    <h3 style="color: #1f2937; margin: 0; font-size: 16px; font-weight: 600;">Your Message Summary</h3>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #6366f1;">
                                    <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;"><strong>Subject:</strong> <span style="color: #1f2937;">${subject}</span></p>
                                    <p style="margin: 0; color: #6b7280; font-size: 14px;"><strong>Received:</strong> <span style="color: #1f2937;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })} IST</span></p>
                                </div>
                            </div>
                            
                            <!-- Next Steps -->
                            <div style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 5px solid #f59e0b;">
                                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                    <div style="background: #f59e0b; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 16px;">
                                        ⏰
                                    </div>
                                    <h3 style="color: #92400e; margin: 0; font-size: 18px; font-weight: 600;">What Happens Next?</h3>
                                </div>
                                <div style="background: rgba(255,255,255,0.7); padding: 20px; border-radius: 8px;">
                                    <ul style="color: #78350f; margin: 0; padding-left: 20px; line-height: 1.8; font-size: 15px;">
                                        <li><strong>Message Review:</strong> I'll carefully review your inquiry and requirements</li>
                                        <li><strong>Quick Response:</strong> Expect a personalized reply within 24-48 hours</li>
                                        <li><strong>Direct Contact:</strong> I'll respond directly to <strong>${email}</strong></li>
                                        <li><strong>Next Steps:</strong> We can schedule a call to discuss your project in detail</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <!-- Connect on Social Media -->
                            <div style="text-align: center; margin-bottom: 25px; padding: 25px; background: #f9fafb; border-radius: 12px;">
                                <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Let's Connect!</h3>
                                <p style="color: #6b7280; margin: 0 0 20px 0; font-size: 14px;">Follow me on social media for updates and insights</p>
                                <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                                    <a href="https://github.com/sriinathh" style="background: #24292e; color: white; padding: 10px 15px; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500; display: inline-flex; align-items: center; gap: 5px;">
                                        🐙 GitHub
                                    </a>
                                    <a href="https://www.linkedin.com/in/srinath-potharaju/" style="background: #0a66c2; color: white; padding: 10px 15px; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500; display: inline-flex; align-items: center; gap: 5px;">
                                        💼 LinkedIn
                                    </a>
                                    <a href="https://x.com/NithiinSrinu" style="background: #1d9bf0; color: white; padding: 10px 15px; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500; display: inline-flex; align-items: center; gap: 5px;">
                                        🐦 Twitter
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Footer -->
                        <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 25px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <div style="margin-bottom: 15px;">
                                <p style="margin: 0 0 5px 0; color: #1f2937; font-weight: 700; font-size: 16px;">
                                    🚀 Srinath Potharaju
                                </p>
                                <p style="margin: 0 0 10px 0; color: #6b7280; font-weight: 500; font-size: 14px;">
                                    Full Stack Web Developer | React | Node.js | Python | MongoDB
                                </p>
                            </div>
                            <div style="border-top: 1px solid #d1d5db; padding-top: 15px;">
                                <p style="margin: 0 0 5px 0; color: #374151; font-size: 13px;">
                                    📧 <a href="mailto:nithiinsrinu@gmail.com" style="color: #4f46e5; text-decoration: none; font-weight: 500;">nithiinsrinu@gmail.com</a> • 📍 Hyderabad, India
                                </p>
                                <p style="margin: 0; color: #9ca3af; font-size: 11px;">
                                    Auto-generated confirmation • Please do not reply to this email
                                </p>
                            </div>
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