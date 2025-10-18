const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Gmail SMTP Configuration for reliable email delivery
console.log('⚙️ Using Gmail SMTP for reliable email delivery');
console.log('📧 Contact form emails will be forwarded to: sri.nxth@yahoo.com');
console.log(`📧 Email configured for sending from: nithiinsrinu@gmail.com`);
console.log(`📧 Emails will be delivered to: sri.nxth@yahoo.com`);

// Middleware with CORS configuration
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:5000', 
        'http://127.0.0.1:3000',
        'https://srinath-potharaju.onrender.com',
        'https://srinath-potharaju.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (your portfolio)
app.use(express.static(path.join(__dirname)));

// Nodemailer configuration using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'nithiinsrinu@gmail.com',
        pass: 'iqfdigdzybcsvgig'
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

        // Email to Srinath (portfolio owner) - Ultra Stylish Version
        const ownerMailOptions = {
            from: `"🚀 Portfolio Notification" <nithiinsrinu@gmail.com>`,
            to: 'sri.nxth@yahoo.com',
            subject: `POTHARAJU SRINATH: New Client Inquiry - ${subject}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Portfolio Contact</title>
                    <style>
                        @keyframes glow {
                            0% { box-shadow: 0 15px 50px rgba(0,0,0,0.2), 0 0 20px rgba(102,126,234,0.3); }
                            100% { box-shadow: 0 15px 50px rgba(0,0,0,0.2), 0 0 40px rgba(102,126,234,0.6); }
                        }
                        @keyframes float {
                            0% { transform: translateY(0px) rotate(0deg); }
                            50% { transform: translateY(-10px) rotate(1deg); }
                            100% { transform: translateY(0px) rotate(0deg); }
                        }
                    </style>
                </head>
                <body style="margin: 0; padding: 20px; background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); min-height: 100vh; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;">
                    <div style="max-width: 700px; margin: 0 auto; background: rgba(255,255,255,0.95); border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.2);">
                        
                        <!-- Animated Header -->
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%, #f093fb 200%); padding: 0; position: relative; overflow: hidden;">
                            <!-- Background Pattern -->
                            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%); animation: float 6s ease-in-out infinite;"></div>
                            
                            <!-- Header Content -->
                            <div style="position: relative; z-index: 2; padding: 40px 30px; text-align: center; color: white;">
                                <!-- Priority Badge -->
                                <div style="display: inline-block; background: rgba(255,255,255,0.25); backdrop-filter: blur(10px); padding: 8px 20px; border-radius: 25px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.3);">
                                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">🔥 Priority Contact</span>
                                </div>
                                <!-- Profile Picture -->
                                <div style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 25px; border: 4px solid rgba(255,255,255,0.4); box-shadow: 0 12px 40px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3); overflow: hidden; position: relative;">
                                    <img src="https://res.cloudinary.com/dfeyi8eom/image/upload/picture_fnjvkj.jpg" alt="Srinath Potharaju - Full Stack Developer" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(1.1) contrast(1.1);">
                                    <div style="position: absolute; top: -2px; right: -2px; width: 25px; height: 25px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
                                        ✓
                                    </div>
                                </div>
                                
                                <!-- Title -->
                                <h1 style="margin: 0 0 15px 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">
                                    New Client Inquiry!
                                </h1>
                                <p style="margin: 0 0 8px 0; font-size: 18px; opacity: 0.95; font-weight: 500;">Someone wants to collaborate with Srinath Potharaju</p>
                                <p style="margin: 0; font-size: 16px; opacity: 0.85; font-weight: 300;">Full Stack Web Developer • React • Node.js • Python</p>
                                
                                <!-- Time Badge -->
                                <div style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); padding: 10px 15px; border-radius: 15px; font-size: 12px; border: 1px solid rgba(255,255,255,0.2);">
                                    ⚡ Just Now
                                </div>
                            </div>
                        </div>
                        
                        <!-- Main Content -->
                        <div style="padding: 45px 35px;">
                            <!-- Client Profile Card -->
                            <div style="background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%); border-radius: 16px; padding: 30px; margin-bottom: 30px; box-shadow: 0 8px 25px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7); border: 1px solid rgba(99,102,241,0.1);">
                                <div style="display: flex; align-items: center; margin-bottom: 25px;">
                                    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #6366f1, #8b5cf6); border-radius: 15px; display: flex; align-items: center; justify-content: center; margin-right: 20px; font-size: 22px; box-shadow: 0 4px 15px rgba(99,102,241,0.3);">
                                        👨‍💼
                                    </div>
                                    <div>
                                        <h2 style="margin: 0; color: #1f2937; font-size: 22px; font-weight: 700;">Client Information</h2>
                                        <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">Potential collaboration opportunity</p>
                                    </div>
                                </div>
                                
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                                    <div style="background: rgba(99,102,241,0.05); padding: 20px; border-radius: 12px; border-left: 4px solid #6366f1;">
                                        <label style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">Full Name</label>
                                        <p style="margin: 8px 0 0 0; color: #1f2937; font-size: 18px; font-weight: 700;">${name}</p>
                                    </div>
                                    <div style="background: rgba(16,185,129,0.05); padding: 20px; border-radius: 12px; border-left: 4px solid #10b981;">
                                        <label style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">Email Address</label>
                                        <p style="margin: 8px 0 0 0;"><a href="mailto:${email}" style="color: #10b981; text-decoration: none; font-size: 16px; font-weight: 600;">${email}</a></p>
                                    </div>
                                </div>
                                
                                <div style="background: rgba(245,158,11,0.05); padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b; margin-top: 20px;">
                                    <label style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">Subject</label>
                                    <p style="margin: 8px 0 0 0; color: #1f2937; font-size: 18px; font-weight: 600;">${subject}</p>
                                </div>
                            </div>
                            
                            <!-- Message Content -->
                            <div style="background: linear-gradient(135deg, #fefefe 0%, #f9fafb 100%); border-radius: 16px; padding: 30px; margin-bottom: 35px; border: 2px solid #e5e7eb; position: relative; overflow: hidden;">
                                <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%); border-radius: 50%; transform: translate(30px, -30px);"></div>
                                
                                <div style="position: relative; z-index: 2;">
                                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                                        <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 18px; font-size: 20px; box-shadow: 0 4px 15px rgba(16,185,129,0.3);">
                                            💬
                                        </div>
                                        <h3 style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 700;">Message Details</h3>
                                    </div>
                                    
                                    <div style="background: white; padding: 25px; border-radius: 12px; border-left: 4px solid #10b981; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                                        <p style="color: #374151; line-height: 1.8; margin: 0; font-size: 16px; white-space: pre-wrap;">${message}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Quick Actions -->
                            <div style="text-align: center; margin-bottom: 20px;">
                                <h3 style="color: #1f2937; margin-bottom: 20px; font-size: 18px; font-weight: 600;">⚡ Quick Actions</h3>
                                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                                    <a href="mailto:${email}?subject=Re: ${subject}&body=Hi ${name},%0D%0A%0D%0AThank you for reaching out! I'm Srinath Potharaju, a Full Stack Web Developer.%0D%0A%0D%0AI'm excited about your project. Let's schedule a call to discuss your requirements in detail.%0D%0A%0D%0ABest regards,%0D%0ASrinath" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 30px; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 8px 25px rgba(102,126,234,0.4); transition: all 0.3s ease; border: none;">
                                        📧 Reply Now
                                    </a>
                                    <a href="https://calendly.com/your-link" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 16px 25px; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 14px; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 8px 25px rgba(16,185,129,0.4);">
                                        📅 Schedule Call
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Professional Footer -->
                        <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 35px; text-align: center; border-top: 1px solid #e5e7eb; position: relative; overflow: hidden;">
                            <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #667eea, #764ba2, #667eea);"></div>
                            
                            <div style="margin-bottom: 25px;">
                                <!-- Mini Profile Section -->
                                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px; gap: 20px;">
                                    <div style="width: 60px; height: 60px; border-radius: 50%; border: 3px solid #667eea; box-shadow: 0 4px 15px rgba(102,126,234,0.3); overflow: hidden;">
                                        <img src="https://res.cloudinary.com/dfeyi8eom/image/upload/picture_fnjvkj.jpg" alt="Srinath Potharaju" style="width: 100%; height: 100%; object-fit: cover;">
                                    </div>
                                    <div style="text-align: left;">
                                        <h4 style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 800;">
                                            Srinath Potharaju
                                        </h4>
                                        <p style="margin: 2px 0; color: #667eea; font-size: 14px; font-weight: 600;">
                                            Full Stack Web Developer
                                        </p>
                                        <p style="margin: 2px 0; color: #6b7280; font-size: 12px;">
                                            React • Node.js • Python • MongoDB • AWS
                                        </p>
                                    </div>
                                </div>
                                
                                <!-- Contact Info -->
                                <div style="background: white; padding: 20px; border-radius: 12px; margin: 20px 0; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid rgba(102,126,234,0.1);">
                                    <p style="margin: 0 0 10px 0; color: #374151; font-size: 14px;">
                                        📧 <a href="mailto:nithiinsrinu@gmail.com" style="color: #667eea; text-decoration: none; font-weight: 600;">nithiinsrinu@gmail.com</a> • 📍 Hyderabad, India
                                    </p>
                                    <p style="margin: 0; color: #6b7280; font-size: 12px;">
                                        📅 <strong>Message Received:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'medium' })} IST
                                    </p>
                                </div>
                                
                                <!-- Social Links -->
                                <div style="display: flex; justify-content: center; gap: 15px; margin: 20px 0;">
                                    <a href="https://github.com/sriinathh" style="width: 35px; height: 35px; background: #24292e; border-radius: 8px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 16px; box-shadow: 0 2px 8px rgba(36,41,46,0.3);">🐙</a>
                                    <a href="https://www.linkedin.com/in/srinath-potharaju/" style="width: 35px; height: 35px; background: #0a66c2; border-radius: 8px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 16px; box-shadow: 0 2px 8px rgba(10,102,194,0.3);">💼</a>
                                    <a href="https://x.com/NithiinSrinu" style="width: 35px; height: 35px; background: #1d9bf0; border-radius: 8px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 16px; box-shadow: 0 2px 8px rgba(29,155,240,0.3);">🐦</a>
                                </div>
                            </div>
                            
                            <p style="margin: 0; color: #9ca3af; font-size: 11px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
                                🔒 Secure Portfolio Contact System • Powered by Srinath's Portfolio
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            replyTo: email
        };

        // Confirmation email to the user - Ultra Stylish Version
        const userMailOptions = {
            from: `"🚀 Srinath Potharaju" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: ` Thank you ${name.split(' ')[0]}! Your message is on its way to me`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Message Confirmation - Srinath Potharaju</title>
                    <style>
                        @keyframes glow {
                            0% { box-shadow: 0 6px 25px rgba(78,205,196,0.4), 0 0 15px rgba(78,205,196,0.2); }
                            100% { box-shadow: 0 6px 25px rgba(78,205,196,0.6), 0 0 30px rgba(78,205,196,0.4); }
                        }
                        @keyframes pulse {
                            0% { transform: scale(1); }
                            50% { transform: scale(1.08); }
                            100% { transform: scale(1); }
                        }
                        @keyframes bounce {
                            0%, 100% { transform: translateY(0); }
                            50% { transform: translateY(-5px); }
                        }
                        @keyframes shimmer {
                            0% { left: -100%; }
                            100% { left: 100%; }
                        }
                        @keyframes float {
                            0% { transform: translateY(0px) rotate(0deg); }
                            50% { transform: translateY(-15px) rotate(2deg); }
                            100% { transform: translateY(0px) rotate(0deg); }
                        }
                    </style>
                </head>
                <body style="margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%, #f093fb 200%); min-height: 100vh; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;">
                    <div style="max-width: 700px; margin: 0 auto; background: rgba(255,255,255,0.98); border-radius: 25px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.3);">
                        
                        <!-- Hero Header -->
                        <div style="background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); padding: 0; position: relative; overflow: hidden;">
                            <!-- Animated Background Elements -->
                            <div style="position: absolute; top: -50px; left: -50px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); border-radius: 50%; animation: float 8s ease-in-out infinite;"></div>
                            <div style="position: absolute; bottom: -30px; right: -30px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%); border-radius: 50%; animation: float 6s ease-in-out infinite reverse;"></div>
                            
                            <!-- Header Content -->
                            <div style="position: relative; z-index: 3; padding: 50px 35px; text-align: center; color: white;">
                                <!-- Success Badge with Animation -->
                                <div style="display: inline-block; background: linear-gradient(135deg, rgba(16,185,129,0.9) 0%, rgba(5,150,105,0.9) 100%); backdrop-filter: blur(20px); padding: 12px 35px; border-radius: 50px; margin-bottom: 30px; border: 2px solid rgba(255,255,255,0.4); box-shadow: 0 8px 30px rgba(16,185,129,0.4), inset 0 1px 0 rgba(255,255,255,0.3); position: relative; overflow: hidden;">
                                    <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); animation: shimmer 2s infinite;"></div>
                                    <span style="font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.2); position: relative; z-index: 2;">🎉 MISSION ACCOMPLISHED 🎉</span>
                                </div>
                                <!-- Profile Picture with Success Badge -->
                                <div style="position: relative; width: 110px; height: 110px; margin: 0 auto 30px;">
                                    <div style="width: 100px; height: 100px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.5); box-shadow: 0 15px 45px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.4); overflow: hidden;">
                                        <img src="https://res.cloudinary.com/dfeyi8eom/image/upload/picture_fnjvkj.jpg" alt="Srinath Potharaju - Full Stack Developer" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(1.15) contrast(1.1);">
                                    </div>
                                    <div style="position: absolute; bottom: -5px; right: -5px; width: 40px; height: 40px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; border: 3px solid white; box-shadow: 0 4px 15px rgba(16,185,129,0.4);">
                                        🎆
                                    </div>
                                </div>
                                
                                <!-- Ultra-Stylish Success Title -->
                                <div style="background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%); backdrop-filter: blur(25px); padding: 35px; border-radius: 25px; border: 2px solid rgba(255,255,255,0.4); margin-bottom: 20px; position: relative; overflow: hidden;">
                                    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(45deg, rgba(16,185,129,0.1), rgba(59,130,246,0.1), rgba(168,85,247,0.1)); opacity: 0.5;"></div>
                                    <div style="position: relative; z-index: 2; text-align: center;">
                                        <h1 style="margin: 0 0 20px 0; font-size: 48px; font-weight: 900; text-shadow: 0 4px 25px rgba(0,0,0,0.5); line-height: 1.1; background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #fef3c7 100%); -webkit-background-clip: text; background-clip: text; animation: glow 2s ease-in-out infinite alternate;">
                                            🎊 BOOM! ${name}! 🎊
                                        </h1>
                                        <div style="background: linear-gradient(135deg, rgba(16,185,129,0.9), rgba(5,150,105,0.9)); padding: 15px 25px; border-radius: 50px; margin: 15px 0; box-shadow: 0 8px 25px rgba(16,185,129,0.4); position: relative; overflow: hidden;">
                                            <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent); animation: shimmer 2s infinite;"></div>
                                            <p style="margin: 0; font-size: 22px; color: white; font-weight: 800; text-shadow: 0 2px 8px rgba(0,0,0,0.3); position: relative; z-index: 2;">🚀 MESSAGE SUCCESSFULLY LAUNCHED! 🚀</p>
                                        </div>
                                        <p style="margin: 0; font-size: 20px; opacity: 0.95; font-weight: 600; text-shadow: 0 2px 12px rgba(0,0,0,0.4); color: white;">Your epic project inquiry just landed in my VIP inbox! 💫</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Main Content Area -->
                        <div style="padding: 50px 40px;">
                            <!-- Success Confirmation -->
                            <div style="text-align: center; margin-bottom: 40px;">
                                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 20px; margin: 0 auto 25px; display: flex; align-items: center; justify-content: center; font-size: 35px; box-shadow: 0 8px 25px rgba(16,185,129,0.4), inset 0 1px 0 rgba(255,255,255,0.2); transform: rotate(3deg);">
                                    ✅
                                </div>
                                <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%); padding: 4px; border-radius: 20px; margin-bottom: 20px; position: relative; overflow: hidden;">
                                    <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); animation: shimmer 3s infinite;"></div>
                                    <div style="background: white; padding: 30px; border-radius: 16px; position: relative; z-index: 2;">
                                        <h2 style="color: transparent; margin: 0 0 25px 0; font-size: 36px; font-weight: 900; background: linear-gradient(135deg, #7c3aed, #ec4899, #f59e0b); -webkit-background-clip: text; background-clip: text; text-align: center; animation: pulse 2s ease-in-out infinite;">⚡ MISSION STATUS: LEGENDARY SUCCESS! ⚡</h2>
                                        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fecaca 100%); padding: 25px; border-radius: 20px; border: 3px solid #f59e0b; margin-top: 15px; position: relative; overflow: hidden;">
                                            <div style="position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; background: radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%); border-radius: 50%;"></div>
                                            <p style="color: #92400e; font-size: 22px; line-height: 1.8; margin: 0; max-width: 550px; margin: 0 auto; font-weight: 700; text-align: center; position: relative; z-index: 2;">🎯 INCREDIBLE! Your message just crashed into my priority inbox like a shooting star! I'm absolutely ELECTRIFIED and ready to transform your vision into digital magic! ✨🔥</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- About Me Section -->
                            <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 20px; padding: 35px; margin-bottom: 35px; position: relative; overflow: hidden; border: 1px solid rgba(59,130,246,0.1);">
                                <!-- Decorative Element -->
                                <div style="position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; background: radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%); border-radius: 50%;"></div>
                                
                                <div style="position: relative; z-index: 2;">
                                    <div style="display: flex; align-items: center; margin-bottom: 25px;">
                                        <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 18px; display: flex; align-items: center; justify-content: center; margin-right: 20px; font-size: 26px; box-shadow: 0 6px 20px rgba(59,130,246,0.4); transform: rotate(-3deg);">
                                            🚀
                                        </div>
                                        <div>
                                            <h3 style="margin: 0; color: #1e40af; font-size: 24px; font-weight: 700;">Meet Your Developer</h3>
                                            <p style="margin: 5px 0 0 0; color: #3b82f6; font-size: 14px; font-weight: 500;">Full Stack Web Development Expert</p>
                                        </div>
                                    </div>
                                    
                                    <div style="background: white; padding: 35px; border-radius: 15px; border-left: 6px solid #3b82f6; box-shadow: 0 4px 15px rgba(0,0,0,0.08); position: relative; overflow: hidden;">
                                        <div style="position: absolute; top: 15px; right: 15px; width: 50px; height: 50px; border-radius: 50%; border: 2px solid rgba(59,130,246,0.2); overflow: hidden;">
                                            <img src="https://res.cloudinary.com/dfeyi8eom/image/upload/picture_fnjvkj.jpg" alt="Srinath Potharaju" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.7;">
                                        </div>
                                        
                                        <div style="position: relative; z-index: 2;">
                                            <p style="color: #1e40af; margin: 0 0 20px 0; line-height: 1.8; font-size: 16px;">
                                                Hello <strong>${name}</strong>! 👋<br><br>
                                                I'm <strong>Srinath Potharaju</strong>, a passionate and dedicated Full Stack Web Developer based in the tech hub of Hyderabad, India. 🇮🇳
                                            </p>
                                            
                                            <div style="background: rgba(59,130,246,0.05); padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #3b82f6;">
                                                <h4 style="margin: 0 0 12px 0; color: #1e40af; font-size: 16px; font-weight: 700;">🚀 What I Do:</h4>
                                                <ul style="margin: 0; padding-left: 20px; color: #1e40af; line-height: 1.6;">
                                                    <li><strong>Frontend Magic:</strong> React.js, TypeScript, Tailwind CSS</li>
                                                    <li><strong>Backend Power:</strong> Node.js, Express, Python, Django</li>
                                                    <li><strong>Database Mastery:</strong> MongoDB, PostgreSQL, MySQL</li>
                                                    <li><strong>Cloud & DevOps:</strong> AWS, Docker, CI/CD Pipelines</li>
                                                </ul>
                                            </div>
                                            
                                            <p style="color: #1e40af; margin: 0; line-height: 1.8; font-size: 16px;">
                                                I specialize in creating <strong>modern, scalable, and user-centric web applications</strong> that drive business growth and deliver exceptional user experiences. From concept to deployment, I bring ideas to life with clean, efficient code and innovative solutions.<br><br>
                                                Your message means the world to me, and I'm genuinely thrilled about the opportunity to collaborate with you! Let's build something amazing together! 🎆✨
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Message Summary Card -->
                            <div style="background: linear-gradient(135deg, #fefefe 0%, #f8fafc 100%); border-radius: 18px; padding: 30px; margin-bottom: 35px; border: 2px solid #e2e8f0; box-shadow: 0 4px 15px rgba(0,0,0,0.06);">
                                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                                    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); border-radius: 15px; display: flex; align-items: center; justify-content: center; margin-right: 18px; font-size: 22px; box-shadow: 0 4px 15px rgba(139,92,246,0.3);">
                                        📝
                                    </div>
                                    <h3 style="color: #1f2937; margin: 0; font-size: 20px; font-weight: 700;">Your Message Details</h3>
                                </div>
                                
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                    <div style="background: rgba(139,92,246,0.05); padding: 20px; border-radius: 12px; border-left: 4px solid #8b5cf6;">
                                        <label style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Subject</label>
                                        <p style="margin: 8px 0 0 0; color: #1f2937; font-size: 16px; font-weight: 600;">${subject}</p>
                                    </div>
                                    <div style="background: rgba(16,185,129,0.05); padding: 20px; border-radius: 12px; border-left: 4px solid #10b981;">
                                        <label style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Received</label>
                                        <p style="margin: 8px 0 0 0; color: #1f2937; font-size: 14px; font-weight: 600;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })} IST</p>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- What's Next Section -->
                            <div style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border-radius: 20px; padding: 35px; margin-bottom: 35px; border-left: 6px solid #f59e0b; position: relative; overflow: hidden;">
                                <div style="position: absolute; top: -10px; right: -10px; width: 60px; height: 60px; background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%); border-radius: 50%;"></div>
                                
                                <div style="position: relative; z-index: 2;">
                                    <div style="display: flex; align-items: center; margin-bottom: 25px;">
                                        <div style="width: 55px; height: 55px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-right: 20px; font-size: 24px; box-shadow: 0 6px 20px rgba(245,158,11,0.4); transform: rotate(5deg);">
                                            ⏰
                                        </div>
                                        <h3 style="color: #92400e; margin: 0; font-size: 22px; font-weight: 700;">What Happens Next?</h3>
                                    </div>
                                    
                                    <div style="background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); padding: 25px; border-radius: 15px; border: 1px solid rgba(245,158,11,0.2);">
                                        <div style="display: grid; gap: 15px;">
                                            <div style="display: flex; align-items: center; gap: 15px;">
                                                <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; flex-shrink: 0;"></div>
                                                <p style="margin: 0; color: #78350f; font-size: 16px; font-weight: 500;"><strong>Message Review:</strong> I'll carefully analyze your requirements and project needs</p>
                                            </div>
                                            <div style="display: flex; align-items: center; gap: 15px;">
                                                <div style="width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; flex-shrink: 0;"></div>
                                                <p style="margin: 0; color: #78350f; font-size: 16px; font-weight: 500;"><strong>Quick Response:</strong> Expect a detailed, personalized reply within 24-48 hours</p>
                                            </div>
                                            <div style="display: flex; align-items: center; gap: 15px;">
                                                <div style="width: 8px; height: 8px; background: #8b5cf6; border-radius: 50%; flex-shrink: 0;"></div>
                                                <p style="margin: 0; color: #78350f; font-size: 16px; font-weight: 500;"><strong>Direct Contact:</strong> I'll reach out to <strong>${email}</strong> with next steps</p>
                                            </div>
                                            <div style="display: flex; align-items: center; gap: 15px;">
                                                <div style="width: 8px; height: 8px; background: #f59e0b; border-radius: 50%; flex-shrink: 0;"></div>
                                                <p style="margin: 0; color: #78350f; font-size: 16px; font-weight: 500;"><strong>Project Discussion:</strong> We'll schedule a call to dive deeper into your vision</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Social Connect Section -->
                            <div style="text-align: center; padding: 35px; background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-radius: 20px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
                                <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 22px; font-weight: 700;">🌐 Let's Stay Connected!</h3>
                                <p style="color: #6b7280; margin: 0 0 25px 0; font-size: 16px;">Follow my journey and get insights into web development</p>
                                
                                <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                                    <a href="https://github.com/sriinathh" style="background: linear-gradient(135deg, #24292e, #1b1f23); color: white; padding: 15px 20px; text-decoration: none; border-radius: 12px; font-size: 15px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 6px 20px rgba(36,41,46,0.3); transition: all 0.3s ease; border: none;">
                                        🐙 GitHub
                                    </a>
                                    <a href="https://www.linkedin.com/in/srinath-potharaju/" style="background: linear-gradient(135deg, #0a66c2, #084d91); color: white; padding: 15px 20px; text-decoration: none; border-radius: 12px; font-size: 15px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 6px 20px rgba(10,102,194,0.3); border: none;">
                                        💼 LinkedIn
                                    </a>
                                    <a href="https://x.com/NithiinSrinu" style="background: linear-gradient(135deg, #1d9bf0, #1a8cd8); color: white; padding: 15px 20px; text-decoration: none; border-radius: 12px; font-size: 15px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 6px 20px rgba(29,155,240,0.3); border: none;">
                                        🐦 Twitter
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Premium Footer -->
                        <div style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); padding: 40px; text-align: center; color: white; position: relative; overflow: hidden;">
                            <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #4ecdc4, #44a08d, #667eea, #764ba2);"></div>
                            <div style="margin-bottom: 20px;">
                                <!-- Profile Section -->
                                <div style="width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; border: 4px solid rgba(78,205,196,0.5); box-shadow: 0 8px 30px rgba(78,205,196,0.3); overflow: hidden; position: relative;">
                                    <img src="https://res.cloudinary.com/dfeyi8eom/image/upload/picture_fnjvkj.jpg" alt="Srinath Potharaju" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(1.1);">
                                    <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(78,205,196,0.1), rgba(68,160,141,0.1)); border-radius: 50%;"></div>
                                </div>
                                
                                <h4 style="margin: 0 0 10px 0; font-size: 26px; font-weight: 900; background: linear-gradient(135deg, #4ecdc4, #44a08d, #667eea); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-shadow: 0 2px 10px rgba(78,205,196,0.3);">
                                    Srinath Potharaju
                                </h4>
                                <p style="margin: 0 0 15px 0; color: #e5e7eb; font-size: 18px; font-weight: 600;">
                                    Full Stack Web Developer & Tech Innovator
                                </p>
                                <p style="margin: 0 0 20px 0; color: #9ca3af; font-size: 14px; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.5;">
                                    Crafting digital experiences with React • Node.js • Python • MongoDB • TypeScript • AWS
                                </p>
                                
                                <!-- Professional Stats -->
                                <div style="display: flex; justify-content: center; gap: 30px; margin: 25px 0; flex-wrap: wrap;">
                                    <div style="text-align: center;">
                                        <div style="color: #4ecdc4; font-size: 20px; font-weight: 800;">3+</div>
                                        <div style="color: #9ca3af; font-size: 12px;">Years Experience</div>
                                    </div>
                                    <div style="text-align: center;">
                                        <div style="color: #667eea; font-size: 20px; font-weight: 800;">50+</div>
                                        <div style="color: #9ca3af; font-size: 12px;">Projects Built</div>
                                    </div>
                                    <div style="text-align: center;">
                                        <div style="color: #44a08d; font-size: 20px; font-weight: 800;">100%</div>
                                        <div style="color: #9ca3af; font-size: 12px;">Client Satisfaction</div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Contact Information Card -->
                            <div style="background: rgba(255,255,255,0.08); backdrop-filter: blur(15px); padding: 25px; border-radius: 20px; margin: 25px 0; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
                                <h5 style="margin: 0 0 15px 0; color: #f3f4f6; font-size: 16px; font-weight: 700;">Get In Touch</h5>
                                <p style="margin: 0 0 15px 0; color: #f3f4f6; font-size: 15px;">
                                    📧 <a href="mailto:nithiinsrinu@gmail.com" style="color: #4ecdc4; text-decoration: none; font-weight: 600; border-bottom: 1px solid rgba(78,205,196,0.3);">nithiinsrinu@gmail.com</a>
                                </p>
                                <p style="margin: 0 0 15px 0; color: #d1d5db; font-size: 14px;">
                                    📍 Based in Hyderabad, India • Available for remote & on-site projects
                                </p>
                                
                                <!-- Enhanced Social Links -->
                                <div style="display: flex; justify-content: center; gap: 15px; margin: 20px 0;">
                                    <a href="https://github.com/sriinathh" style="width: 45px; height: 45px; background: linear-gradient(135deg, #24292e, #1b1f23); border-radius: 12px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 18px; box-shadow: 0 4px 15px rgba(36,41,46,0.4); border: 1px solid rgba(255,255,255,0.1); transition: all 0.3s ease;">🐙</a>
                                    <a href="https://www.linkedin.com/in/srinath-potharaju/" style="width: 45px; height: 45px; background: linear-gradient(135deg, #0a66c2, #084d91); border-radius: 12px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 18px; box-shadow: 0 4px 15px rgba(10,102,194,0.4); border: 1px solid rgba(255,255,255,0.1);">💼</a>
                                    <a href="https://x.com/NithiinSrinu" style="width: 45px; height: 45px; background: linear-gradient(135deg, #1d9bf0, #1a8cd8); border-radius: 12px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 18px; box-shadow: 0 4px 15px rgba(29,155,240,0.4); border: 1px solid rgba(255,255,255,0.1);">🐦</a>
                                </div>
                            </div>
                            
                            <!-- Footer Note -->
                            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 25px;">
                                <p style="margin: 0; color: #6b7280; font-size: 12px; line-height: 1.4;">
                                    🔒 Secure Auto-Confirmation System • Powered by Srinath's Portfolio<br>
                                    This is an automated message • Please do not reply to this email
                                </p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
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