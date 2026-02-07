const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmailConfiguration() {
    console.log('🧪 Testing Complete Email Configuration...');
    console.log('=' .repeat(50));
    
    // Check environment variables
    console.log('📋 Environment Variables:');
    console.log(`📧 EMAIL_USER: ${process.env.EMAIL_USER || 'NOT SET'}`);
    console.log(`🔑 EMAIL_PASS: ${process.env.EMAIL_PASS ? '***HIDDEN***' : 'NOT SET'}`);
    console.log(`📨 SENDGRID_API_KEY: ${process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY.substring(0, 10) + '...' : 'NOT SET'}`);
    console.log('=' .repeat(50));
    
    let transporter;
    let emailService;
    
    // Test SendGrid first (production preference)
    if (process.env.SENDGRID_API_KEY) {
        console.log('🚀 Testing SendGrid Configuration...');
        emailService = 'SendGrid';
        
        transporter = nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
                user: 'apikey',
                pass: process.env.SENDGRID_API_KEY
            }
        });
        
        try {
            await transporter.verify();
            console.log('✅ SendGrid transporter verified successfully!');
            
            // Test sending email
            const testMailOptions = {
                from: 'psrinath821@gmail.com', // Must be verified in SendGrid
                to: 'psrinath821@gmail.com',
                subject: '🧪 SendGrid Test - Portfolio Contact Form',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #667eea;">🧪 SendGrid Configuration Test</h2>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p><strong>✅ Status:</strong> SendGrid is working correctly!</p>
                            <p><strong>⏰ Time:</strong> ${new Date().toLocaleString()}</p>
                            <p><strong>📧 From:</strong> psrinath821@gmail.com</p>
                            <p><strong>📬 To:</strong> psrinath821@gmail.com</p>
                        </div>
                        <hr>
                        <small style="color: #666;">Sent from Srinath's Portfolio Contact Form Test</small>
                    </div>
                `
            };
            
            console.log('📧 Sending SendGrid test email...');
            const result = await transporter.sendMail(testMailOptions);
            console.log('🎉 SendGrid test email sent successfully!');
            console.log(`📬 Message ID: ${result.messageId}`);
            console.log(`📨 Response: ${result.response}`);
            
        } catch (error) {
            console.log('❌ SendGrid test failed:', error.message);
            console.log('🔍 This usually means the sender email is not verified in SendGrid');
            console.log('👉 Please verify psrinath821@gmail.com in your SendGrid dashboard');
        }
        
    } else {
        console.log('⚠️ SENDGRID_API_KEY not found, testing Gmail fallback...');
        
        // Test Gmail configuration
        emailService = 'Gmail';
        
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log('❌ Gmail credentials not found in environment variables');
            console.log('👉 Please set EMAIL_USER and EMAIL_PASS in your .env file');
            return;
        }
        
        transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false,
                ciphers: 'SSLv3'
            },
            connectionTimeout: 60000,
            greetingTimeout: 30000,
            socketTimeout: 75000,
            pool: true,
            maxConnections: 5,
            maxMessages: 10
        });
        
        try {
            console.log('🔍 Verifying Gmail transporter...');
            await transporter.verify();
            console.log('✅ Gmail transporter verified successfully!');
            
            // Test sending email
            const testMailOptions = {
                from: `"🚀 Portfolio Test" <${process.env.EMAIL_USER}>`,
                to: 'psrinath821@gmail.com',
                subject: '🧪 Gmail Test - Portfolio Contact Form',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #10b981;">🧪 Gmail Configuration Test</h2>
                        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p><strong>✅ Status:</strong> Gmail SMTP is working correctly!</p>
                            <p><strong>⏰ Time:</strong> ${new Date().toLocaleString()}</p>
                            <p><strong>📧 From:</strong> ${process.env.EMAIL_USER}</p>
                            <p><strong>📬 To:</strong> psrinath821@gmail.com</p>
                        </div>
                        <hr>
                        <small style="color: #666;">Sent from Srinath's Portfolio Contact Form Test</small>
                    </div>
                `
            };
            
            console.log('📧 Sending Gmail test email...');
            const result = await transporter.sendMail(testMailOptions);
            console.log('🎉 Gmail test email sent successfully!');
            console.log(`📬 Message ID: ${result.messageId}`);
            
        } catch (error) {
            console.log('❌ Gmail test failed:', error.message);
            console.log('🔍 This usually means you need to:');
            console.log('   1. Enable 2-Step Verification in your Google Account');
            console.log('   2. Generate an App Password for Mail');
            console.log('   3. Use the App Password (not your regular password) in EMAIL_PASS');
        }
    }
    
    console.log('=' .repeat(50));
    console.log(`🏁 Email test completed using ${emailService}`);
    console.log('=' .repeat(50));
}

// Run the test
testEmailConfiguration().catch(console.error);