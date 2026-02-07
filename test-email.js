require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🧪 Testing email configuration...\n');

// Check environment variables
console.log(`📧 EMAIL_USER: ${process.env.EMAIL_USER}`);
console.log(`🔑 EMAIL_PASS length: ${process.env.EMAIL_PASS?.length || 0} characters`);
console.log(`🔑 EMAIL_PASS starts with: ${process.env.EMAIL_PASS?.substring(0, 4)}...`);

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ Missing email credentials in .env file');
    process.exit(1);
}

// Test different configurations
const configs = [
    {
        name: 'Gmail with service',
        config: {
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        }
    },
    {
        name: 'Gmail with manual SMTP',
        config: {
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
        }
    }
];

async function testConfig(name, config) {
    console.log(`\n🔍 Testing: ${name}`);
    
    try {
        const transporter = nodemailer.createTransport(config);
        
        // Verify connection
        const verified = await transporter.verify();
        console.log(`✅ ${name}: Connection verified`);
        
        // Send test email
        const info = await transporter.sendMail({
            from: `"Portfolio Test" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Send to yourself
            subject: '🧪 Email Test - Portfolio Contact Form',
            text: `This is a test email sent on ${new Date().toISOString()}`,
            html: `
                <div style="padding: 20px; font-family: Arial, sans-serif;">
                    <h2>🎉 Email Test Successful!</h2>
                    <p>Your email configuration is working properly.</p>
                    <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
                    <p><strong>Configuration:</strong> ${name}</p>
                </div>
            `
        });
        
        console.log(`✅ ${name}: Test email sent successfully!`);
        console.log(`📧 Message ID: ${info.messageId}`);
        
        return true;
    } catch (error) {
        console.log(`❌ ${name}: Failed`);
        console.log(`   Error: ${error.message}`);
        
        if (error.code === 'EAUTH') {
            console.log('   💡 This is likely an authentication issue');
            console.log('   💡 Make sure you are using a Gmail App Password, not your regular password');
        }
        
        return false;
    }
}

async function runTests() {
    let successCount = 0;
    
    for (const {name, config} of configs) {
        const success = await testConfig(name, config);
        if (success) successCount++;
    }
    
    console.log(`\n📊 Test Results: ${successCount}/${configs.length} configurations successful`);
    
    if (successCount === 0) {
        console.log('\n🆘 Troubleshooting steps:');
        console.log('1. ✅ Make sure you have enabled 2-Factor Authentication on Gmail');
        console.log('2. ✅ Generate a Gmail App Password (not your regular password)');
        console.log('3. ✅ Check that EMAIL_USER is your complete Gmail address');
        console.log('4. ✅ Check that EMAIL_PASS is the 16-character App Password');
        console.log('5. ✅ Make sure the .env file is in the same directory as this script');
        console.log('6. ✅ Go to https://myaccount.google.com/apppasswords to generate App Password');
    }
}

runTests().catch(console.error);