# 🚀 Portfolio Contact Form Backend Setup

This guide will help you set up the Node.js backend for your portfolio contact form with email functionality.

## 📋 Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Yahoo Email Account** for sending emails

## ⚙️ Setup Instructions

### 1. **Install Dependencies**

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages:
- `express` - Web server framework
- `nodemailer` - Email sending library
- `body-parser` - Parse request bodies  
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables management

### 2. **Create Environment File**

Copy the example environment file:

```bash
copy .env.example .env
```

Or create a new `.env` file manually with this content:

```env
# Email Configuration
EMAIL_USER=your_yahoo_email@yahoo.com
EMAIL_PASS=your_yahoo_app_password

# Server Configuration
PORT=5000
```

### 3. **Setup Yahoo Email App Password**

⚠️ **Important**: You cannot use your regular Yahoo password. You must create an App Password.

1. **Go to Yahoo Account Security**: https://account.yahoo.com/account/security
2. **Enable 2-Factor Authentication** (required for app passwords)
3. **Generate App Password**:
   - Click "Generate app password" or "App passwords"
   - Select "Other (custom name)"
   - Enter name: `Portfolio Contact Form`
   - Copy the generated password (16 characters, no spaces)

4. **Update your `.env` file**:
   ```env
   EMAIL_USER=your_actual_yahoo_email@yahoo.com
   EMAIL_PASS=your_16_character_app_password
   PORT=5000
   ```

### 4. **Test the Server**

Start the development server:

```bash
npm start
```

You should see:
```
🚀 Server running on http://localhost:5000
📧 Contact form API available at http://localhost:5000/api/contact
🏠 Portfolio available at http://localhost:5000
✅ Email server is ready to send messages
```

### 5. **Test Email Functionality**

Open your browser and navigate to: `http://localhost:5000`

Your portfolio should load and the contact form should now:
- ✅ Send emails to your Yahoo inbox
- ✅ Send confirmation emails to users
- ✅ Show success/error notifications
- ✅ Include beautiful HTML email templates

## 🐛 Troubleshooting

### Common Issues:

**❌ "Email configuration error"**
- Check that you're using an App Password, not your regular password
- Verify 2FA is enabled on your Yahoo account
- Make sure EMAIL_USER and EMAIL_PASS are correct in `.env`

**❌ "Failed to send message"**
- Verify your internet connection
- Check Yahoo account isn't locked/suspended
- Try regenerating the App Password

**❌ "Module not found"**
- Run `npm install` to install dependencies
- Make sure you're in the correct directory

**❌ "Port already in use"**
- Change PORT in `.env` to a different number (e.g., 3000, 8000)
- Or kill the process using that port

### Health Check

Test if the server is working:
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "status": "OK", 
  "message": "Contact form server is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## 📁 File Structure

```
your-portfolio/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (keep secret!)
├── .env.example          # Example environment file
├── portfolio.html        # Your portfolio HTML file
├── simple-main.js        # Updated JavaScript with API integration
└── SETUP_INSTRUCTIONS.md # This file
```

## 🚀 Production Deployment

For production deployment on services like **Heroku**, **Vercel**, or **Railway**:

1. **Environment Variables**: Set EMAIL_USER and EMAIL_PASS in your hosting service's environment variables section
2. **Port Configuration**: The server will automatically use `process.env.PORT` for deployment
3. **HTTPS**: Your hosting service should provide HTTPS automatically

## 📧 Email Templates

The server includes beautiful HTML email templates:

- **📬 Owner Email**: Professional notification with contact details and reply button
- **✅ Confirmation Email**: Thank you message to users with your branding and social links

## 💡 Tips

- **Keep `.env` secret**: Never commit it to version control
- **Test locally first**: Make sure everything works before deploying
- **Monitor emails**: Check your Yahoo inbox and spam folder
- **Backup**: Keep a backup of your App Password

## 🆘 Need Help?

If you encounter issues:

1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Test with a simple email first
4. Check Yahoo account security settings

---

**🎉 That's it!** Your portfolio contact form should now be fully functional with email capabilities!