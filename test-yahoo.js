const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('🔍 Testing Yahoo Email Configuration...');
console.log(`📧 Email: ${process.env.EMAIL_USER}`);
console.log(`🔑 Password Length: ${process.env.EMAIL_PASS?.length} characters`);

// Test with Yahoo Mail configuration
const transporter = nodemailer.createTransport({
    service: 'yahoo',
    host: 'smtp.mail.yahoo.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    },
    debug: true, // Enable debug mode
    logger: true // Enable logging
});

console.log('🔧 Verifying connection...');

// First, verify the connection
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Connection verification failed:', error);
        
        // Provide specific troubleshooting based on error
        if (error.code === 'EAUTH') {
            console.log('\n🚨 AUTHENTICATION ERROR - Try these solutions:');
            console.log('1. Make sure 2-Step Verification is enabled on Yahoo');
            console.log('2. Generate a NEW app password specifically for this app');
            console.log('3. Use the app password, NOT your regular Yahoo password');
            console.log('4. Visit: https://login.yahoo.com/myaccount/security/');
        } else if (error.code === 'ECONNECTION') {
            console.log('\n🚨 CONNECTION ERROR - Try these solutions:');
            console.log('1. Check your internet connection');
            console.log('2. Try disabling firewall/antivirus temporarily');
            console.log('3. Check if your ISP blocks SMTP ports');
        }
        return;
    }
    
    console.log('✅ Connection verified successfully!');
    
    // If connection is good, send a test email
    const testEmail = {
        from: `"Portfolio Test" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // Send to yourself
        subject: 'Yahoo Configuration Test ✅',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px;">
                <h1>🎉 Success!</h1>
                <p>Your Yahoo email configuration is working perfectly!</p>
                <p><strong>Email:</strong> ${process.env.EMAIL_USER}</p>
                <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 5px; margin-top: 20px;">
                    <p>✅ SMTP Connection: Working</p>
                    <p>✅ Authentication: Success</p>
                    <p>✅ Email Delivery: Confirmed</p>
                </div>
            </div>
        `
    };
    
    console.log('📧 Sending test email...');
    
    transporter.sendMail(testEmail, (error, info) => {
        if (error) {
            console.error('❌ Test email failed:', error);
            
            if (error.responseCode === 550) {
                console.log('\n🚨 MAILBOX UNAVAILABLE ERROR - Try these solutions:');
                console.log('1. Verify your Yahoo email address is correct');
                console.log('2. Check if the email account is active and accessible');
                console.log('3. Make sure the "from" address matches your authenticated email');
                console.log('4. Try sending to a different email address first');
            }
        } else {
            console.log('✅ Test email sent successfully!');
            console.log('📬 Message ID:', info.messageId);
            console.log('📧 Response:', info.response);
            console.log('\n🎉 Your Yahoo configuration is working perfectly!');
            console.log('Now you can use your contact form with confidence.');
        }
        
        // Close the connection
        transporter.close();
    });
});