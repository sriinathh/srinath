const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const path = require('path');
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
    'https://srinath-potharaju-zsv4.onrender.com',
    'https://srinath-potharaju.vercel.app',
    'file://' // Allow file:// protocol for local development
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve static files
app.use(express.static(__dirname));

// Serve portfolio.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'portfolio.html'));
});

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

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Srinath Portfolio <onboarding@resend.dev>',
      to: 'psrinath821@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Client Inquiry</title>
</head>

<body style="margin:0;padding:0;background:#060912;font-family:Arial,Helvetica,sans-serif;">

<!-- OUTER WRAPPER -->
<table width="100%" cellpadding="0" cellspacing="0" style="padding:50px 12px;">
<tr>
<td align="center">

<!-- MAIN CONTAINER -->
<table width="680" cellpadding="0" cellspacing="0"
style="background:#0f172a;border-radius:28px;overflow:hidden;
box-shadow:0 40px 120px rgba(0,0,0,0.9);">

<!-- ================= HERO HEADER ================= -->
<tr>
<td align="center"
style="background:linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899);
padding:80px 40px;color:#ffffff;">

<div style="
background:rgba(255,255,255,0.15);
display:inline-block;
padding:12px 32px;
border-radius:999px;
font-size:13px;
font-weight:bold;
letter-spacing:1px;
margin-bottom:26px;">
🔥 PRIORITY PORTFOLIO CONTACT
</div>

<img src="https://res.cloudinary.com/notes1/image/upload/WhatsApp_Image_2026-02-07_at_21.52.36_vm8roo.jpg"
width="140" height="140"
style="
border-radius:50%;
border:6px solid rgba(255,255,255,0.35);
display:block;
margin:0 auto 24px;" />

<h1 style="
margin:0;
font-size:44px;
font-weight:800;
letter-spacing:0.4px;">
New Client Inquiry
</h1>

<p style="
margin:20px 0 8px;
font-size:18px;
opacity:0.95;">
Someone wants to collaborate with
<b style="
background:#fde047;
color:#000;
padding:5px 12px;
border-radius:10px;">
Srinath
</b>
Potharaju
</p>

<p style="
margin:0;
font-size:15px;
opacity:0.9;">
Full Stack Developer • React • Node.js • Python • MongoDB • AWS
</p>

<div style="
margin-top:28px;
background:rgba(0,0,0,0.25);
display:inline-block;
padding:14px 34px;
border-radius:999px;
font-size:14px;">
⚡ Message received just now
</div>

</td>
</tr>

<!-- ================= CLIENT INFORMATION ================= -->
<tr>
<td style="padding:48px 42px;background:#020617;color:#e5e7eb;">

<h2 style="
text-align:center;
margin:0 0 32px;
font-size:28px;
color:#ffffff;
letter-spacing:0.5px;">
👤 Client Information
</h2>

<table width="100%" cellpadding="0" cellspacing="0"
style="border-collapse:separate;border-spacing:0 18px;">

<!-- NAME -->
<tr>
<td style="
background:linear-gradient(135deg,#020617,#0f172a);
padding:22px;
border-radius:18px;
border:1px solid rgba(255,255,255,0.08);">

<div style="
font-size:12px;
color:#a5b4fc;
text-transform:uppercase;
letter-spacing:1.2px;
margin-bottom:8px;">
Full Name
</div>

<div style="
font-size:18px;
font-weight:600;
color:#ffffff;">
${name}
</div>

</td>
</tr>

<!-- EMAIL -->
<tr>
<td style="
background:linear-gradient(135deg,#020617,#0f172a);
padding:22px;
border-radius:18px;
border:1px solid rgba(255,255,255,0.08);">

<div style="
font-size:12px;
color:#93c5fd;
text-transform:uppercase;
letter-spacing:1.2px;
margin-bottom:8px;">
Email Address
</div>

<div style="font-size:16px;font-weight:600;">
<a href="mailto:${email}" style="color:#60a5fa;text-decoration:none;">
${email}
</a>
</div>

</td>
</tr>

<!-- SUBJECT -->
<tr>
<td style="
background:linear-gradient(135deg,#020617,#0f172a);
padding:22px;
border-radius:18px;
border:1px solid rgba(255,255,255,0.08);">

<div style="
font-size:12px;
color:#fbbf24;
text-transform:uppercase;
letter-spacing:1.2px;
margin-bottom:8px;">
Subject
</div>

<div style="
font-size:16px;
font-weight:600;
color:#ffffff;">
${subject}
</div>

</td>
</tr>

<!-- DATE -->
<tr>
<td style="
background:linear-gradient(135deg,#020617,#0f172a);
padding:22px;
border-radius:18px;
border:1px solid rgba(255,255,255,0.08);">

<div style="
font-size:12px;
color:#c084fc;
text-transform:uppercase;
letter-spacing:1.2px;
margin-bottom:8px;">
Received Time
</div>

<div style="font-size:14px;color:#cbd5e1;">
${new Date().toLocaleString()}
</div>

</td>
</tr>

</table>
</td>
</tr>

<!-- ================= MESSAGE SECTION ================= -->
<tr>
<td style="padding:48px 42px;background:#020617;color:#d1d5db;">

<h2 style="
text-align:center;
margin:0 0 26px;
font-size:28px;
color:#ffffff;">
💬 Client Message
</h2>

<div style="
background:linear-gradient(135deg,#020617,#0f172a);
border-left:6px solid #8b5cf6;
padding:26px;
border-radius:20px;
line-height:1.9;
font-size:16px;">
${message}
</div>

</td>
</tr>

<!-- ================= CTA ================= -->
<tr>
<td align="center" style="padding:52px;background:#020617;">

<a href="mailto:${email}?subject=Re: ${subject}"
style="
background:linear-gradient(135deg,#6366f1,#a855f7,#ec4899);
color:#ffffff;
text-decoration:none;
padding:20px 52px;
border-radius:999px;
font-weight:bold;
font-size:18px;
display:inline-block;
box-shadow:0 18px 50px rgba(168,85,247,0.6);">
📩 Reply to ${name}
</a>

</td>
</tr>

<!-- ================= ABOUT SECTION ================= -->
<tr>
<td style="padding:48px 42px;background:#0f172a;color:#e5e7eb;">

<h2 style="text-align:center;margin:0 0 24px;font-size:28px;">
🚀 About Srinath
</h2>

<p style="
text-align:center;
line-height:2;
font-size:16px;
margin:0 0 36px;
color:#cbd5e1;">
Passionate Full Stack Developer building scalable applications,
modern UI systems, and cloud-ready digital platforms
for real-world impact and innovation.
</p>

<table width="100%" cellpadding="0" cellspacing="0">

<tr>
<td width="50%" style="padding:10px;">
<div style="background:#020617;padding:22px;border-radius:18px;text-align:center;">
<b>💻 Frontend</b><br>
<span style="font-size:13px;color:#94a3b8;">React, JS, HTML, CSS, Tailwind</span>
</div>
</td>

<td width="50%" style="padding:10px;">
<div style="background:#020617;padding:22px;border-radius:18px;text-align:center;">
<b>⚙️ Backend</b><br>
<span style="font-size:13px;color:#94a3b8;">Node.js, Express, Python</span>
</div>
</td>
</tr>

<tr>
<td width="50%" style="padding:10px;">
<div style="background:#020617;padding:22px;border-radius:18px;text-align:center;">
<b>🗄 Database</b><br>
<span style="font-size:13px;color:#94a3b8;">MongoDB, PostgreSQL</span>
</div>
</td>

<td width="50%" style="padding:10px;">
<div style="background:#020617;padding:22px;border-radius:18px;text-align:center;">
<b>☁️ DevOps</b><br>
<span style="font-size:13px;color:#94a3b8;">AWS, Docker, Git</span>
</div>
</td>
</tr>

</table>
</td>
</tr>

<!-- ================= FOOTER ================= -->
<tr>
<td align="center" style="background:#020617;color:#94a3b8;padding:40px;">

<div style="font-size:22px;color:#ffffff;font-weight:bold;margin-bottom:8px;">
Srinath Potharaju
</div>

<div style="font-size:14px;margin-bottom:18px;">
Full Stack Web Developer • Hyderabad, India
</div>

<div style="margin-bottom:18px;">
<a href="https://github.com/sriinathh" style="color:#93c5fd;text-decoration:none;margin:0 12px;">GitHub</a> |
<a href="https://www.linkedin.com/in/srinath-potharaju/" style="color:#93c5fd;text-decoration:none;margin:0 12px;">LinkedIn</a> |
<a href="mailto:psrinath821@gmail.com" style="color:#93c5fd;text-decoration:none;margin:0 12px;">Email</a>
</div>

<div style="font-size:12px;opacity:0.6;">
🔒 Secure Portfolio Contact System • © ${new Date().getFullYear()} Srinath
</div>

</td>
</tr>

</table>
</td>
</tr>
</table>

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

    console.log('Email sent successfully to portfolio owner:', data);

    // Send thank you email to the submitter
    const thankYouEmail = await resend.emails.send({
      from: 'Srinath Portfolio <onboarding@resend.dev>',
      to: email,
      subject: 'Thank you for contacting me! 🚀',
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Thank You for Contacting Srinath!</title>
</head>

<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;">

<!-- OUTER WRAPPER -->
<table width="100%" cellpadding="0" cellspacing="0" style="padding:50px 12px;">
<tr>
<td align="center">

<!-- MAIN CONTAINER -->
<table width="680" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:28px;overflow:hidden;
box-shadow:0 40px 120px rgba(0,0,0,0.1);border:1px solid #e2e8f0;">

<!-- ================= HERO HEADER ================= -->
<tr>
<td align="center"
style="background:linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899);
padding:80px 40px;color:#ffffff;">

<div style="
background:rgba(255,255,255,0.15);
display:inline-block;
padding:12px 32px;
border-radius:999px;
font-size:13px;
font-weight:bold;
letter-spacing:1px;
margin-bottom:26px;">
🎉 MESSAGE RECEIVED!
</div>

<img src="https://res.cloudinary.com/notes1/image/upload/WhatsApp_Image_2026-02-07_at_21.52.36_vm8roo.jpg"
width="140" height="140"
style="
border-radius:50%;
border:6px solid rgba(255,255,255,0.35);
display:block;
margin:0 auto 24px;" />

<h1 style="
margin:0;
font-size:44px;
font-weight:800;
letter-spacing:0.4px;">
Thank You, ${name}!
</h1>

<p style="
margin:20px 0 8px;
font-size:18px;
opacity:0.95;">
Your message has been received and I'm excited to connect with you!
</p>

<p style="
margin:0;
font-size:15px;
opacity:0.9;">
Full Stack Developer • React • Node.js • Python • MongoDB • AWS
</p>

<div style="
margin-top:28px;
background:rgba(0,0,0,0.25);
display:inline-block;
padding:14px 34px;
border-radius:999px;
font-size:14px;">
✨ I'll get back to you within 24 hours
</div>

</td>
</tr>

<!-- ================= MESSAGE CONFIRMATION ================= -->
<tr>
<td style="padding:48px 42px;background:#f8fafc;color:#334155;">

<h2 style="
text-align:center;
margin:0 0 32px;
font-size:28px;
color:#1e293b;
letter-spacing:0.5px;">
📬 Message Confirmation
</h2>

<div style="
background:#ffffff;
border-left:6px solid #6366f1;
padding:26px;
border-radius:20px;
line-height:1.9;
font-size:16px;
box-shadow:0 4px 15px rgba(0,0,0,0.05);">
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
<p><strong>Your Message:</strong></p>
<p style="margin-top:15px;padding:15px;background:#f1f5f9;border-radius:10px;">${message}</p>
</div>

</td>
</tr>

<!-- ================= NEXT STEPS ================= -->
<tr>
<td style="padding:48px 42px;background:#ffffff;color:#334155;">

<h2 style="text-align:center;margin:0 0 24px;font-size:28px;">
🚀 What Happens Next?
</h2>

<table width="100%" cellpadding="0" cellspacing="0">

<tr>
<td width="33%" style="padding:10px;text-align:center;">
<div style="background:#f8fafc;padding:22px;border-radius:18px;">
<div style="font-size:32px;margin-bottom:10px;">📧</div>
<b>Review</b><br>
<span style="font-size:13px;color:#64748b;">I'll carefully review your message</span>
</div>
</td>

<td width="33%" style="padding:10px;text-align:center;">
<div style="background:#f8fafc;padding:22px;border-radius:18px;">
<div style="font-size:32px;margin-bottom:10px;">💭</div>
<b>Respond</b><br>
<span style="font-size:13px;color:#64748b;">Get back to you within 24 hours</span>
</div>
</td>

<td width="33%" style="padding:10px;text-align:center;">
<div style="background:#f8fafc;padding:22px;border-radius:18px;">
<div style="font-size:32px;margin-bottom:10px;">🤝</div>
<b>Connect</b><br>
<span style="font-size:13px;color:#64748b;">Let's discuss your project!</span>
</div>
</td>
</tr>

</table>
</td>
</tr>

<!-- ================= ABOUT SECTION ================= -->
<tr>
<td style="padding:48px 42px;background:#f8fafc;color:#334155;">

<h2 style="text-align:center;margin:0 0 24px;font-size:28px;">
👨‍💻 About Srinath Potharaju
</h2>

<p style="
text-align:center;
line-height:2;
font-size:16px;
margin:0 0 36px;
color:#475569;">
I'm a passionate Full Stack Developer specializing in modern web technologies.
I love building scalable applications and turning ideas into reality.
</p>

<table width="100%" cellpadding="0" cellspacing="0">

<tr>
<td width="50%" style="padding:10px;">
<div style="background:#ffffff;padding:22px;border-radius:18px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
<b>💻 Frontend</b><br>
<span style="font-size:13px;color:#64748b;">React, JavaScript, HTML, CSS, Tailwind</span>
</div>
</td>

<td width="50%" style="padding:10px;">
<div style="background:#ffffff;padding:22px;border-radius:18px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
<b>⚙️ Backend</b><br>
<span style="font-size:13px;color:#64748b;">Node.js, Express, Python, APIs</span>
</div>
</td>
</tr>

<tr>
<td width="50%" style="padding:10px;">
<div style="background:#ffffff;padding:22px;border-radius:18px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
<b>🗄 Database</b><br>
<span style="font-size:13px;color:#64748b;">MongoDB, PostgreSQL, MySQL</span>
</div>
</td>

<td width="50%" style="padding:10px;">
<div style="background:#ffffff;padding:22px;border-radius:18px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
<b>☁️ Cloud & DevOps</b><br>
<span style="font-size:13px;color:#64748b;">AWS, Docker, Git, CI/CD</span>
</div>
</td>
</tr>

</table>
</td>
</tr>

<!-- ================= CTA ================= -->
<tr>
<td align="center" style="padding:52px;background:#ffffff;">

<table cellpadding="0" cellspacing="0">
<tr>
<td style="padding:0 15px;">
<a href="https://srinath-potharaju-zsv4.onrender.com"
style="
background:linear-gradient(135deg,#6366f1,#8b5cf6);
color:#ffffff;
text-decoration:none;
padding:18px 36px;
border-radius:999px;
font-weight:bold;
font-size:16px;
display:inline-block;
box-shadow:0 12px 35px rgba(99,102,241,0.4);">
🌐 Visit My Portfolio
</a>
</td>

<td style="padding:0 15px;">
<a href="https://www.linkedin.com/in/srinath-potharaju/"
style="
background:#ffffff;
color:#0077b5;
text-decoration:none;
padding:18px 36px;
border-radius:999px;
font-weight:bold;
font-size:16px;
display:inline-block;
border:2px solid #0077b5;
box-shadow:0 8px 25px rgba(0,119,181,0.2);">
💼 Connect on LinkedIn
</a>
</td>
</tr>
</table>

</td>
</tr>

<!-- ================= FOOTER ================= -->
<tr>
<td align="center" style="background:#1e293b;color:#94a3b8;padding:40px;">

<div style="font-size:22px;color:#ffffff;font-weight:bold;margin-bottom:8px;">
Srinath Potharaju
</div>

<div style="font-size:14px;margin-bottom:18px;">
Full Stack Web Developer • Hyderabad, India
</div>

<div style="margin-bottom:18px;">
<a href="https://github.com/sriinathh" style="color:#93c5fd;text-decoration:none;margin:0 12px;">GitHub</a> |
<a href="https://www.linkedin.com/in/srinath-potharaju/" style="color:#93c5fd;text-decoration:none;margin:0 12px;">LinkedIn</a> |
<a href="mailto:psrinath821@gmail.com" style="color:#93c5fd;text-decoration:none;margin:0 12px;">Email</a>
</div>

<div style="font-size:12px;opacity:0.6;">
💝 Thank you for reaching out! • © ${new Date().getFullYear()} Srinath Potharaju
</div>

</td>
</tr>

</table>
</td>
</tr>
</table>

</body>
</html>
`,
      reply_to: 'psrinath821@gmail.com'
    });

    if (thankYouEmail.error) {
      console.error('Thank you email error:', thankYouEmail.error);
      // Don't fail the request if thank you email fails, just log it
    } else {
      console.log('Thank you email sent successfully to:', email);
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
