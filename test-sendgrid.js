const nodemailer = require('nodemailer');
require('dotenv').config();

async function testSendGrid() {
    console.log('🧪 Testing SendGrid configuration...');
    
    // Check if API key exists
    if (!process.env.SENDGRID_API_KEY) {
        console.log('❌ SENDGRID_API_KEY not found in environment variables');
        return;
    }
    
    console.log('✅ SendGrid API Key found');
    console.log('🔑 API Key preview:', process.env.SENDGRID_API_KEY.substring(0, 10) + '...');
    
    // Create transporter
    const transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY
        }
    });
    
    // Verify configuration
    try {
        console.log('🔍 Verifying transporter...');
        await transporter.verify();
        console.log('✅ SendGrid transporter verified successfully!');
    } catch (error) {
        console.log('❌ SendGrid verification failed:', error.message);
        return;
    }
    
    // Test email
    const testMailOptions = {
        from: 'psrinath821@gmail.com', // Must be verified sender in SendGrid
        to: 'psrinath821@gmail.com',
        subject: 'SendGrid Test - Portfolio Contact Form',
        html: `
            <h2>🧪 SendGrid Configuration Test</h2>
            <p>This is a test email to verify SendGrid integration.</p>
            <p><strong>Status:</strong> ✅ SendGrid is working correctly!</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <hr>
            <small>Sent from Srinath's Portfolio Contact Form</small>
        `
    };
    
    try {
        console.log('📧 Sending test email...');
        const result = await transporter.sendMail(testMailOptions);
        console.log('✅ Test email sent successfully!');
        console.log('📬 Message ID:', result.messageId);
        console.log('📨 Response:', result.response);
    } catch (error) {
        console.log('❌ Failed to send test email:', error.message);
        console.log('🔍 Error details:', error);
    }
}

testSendGrid();