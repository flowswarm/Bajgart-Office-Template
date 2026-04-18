import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

const PORT = process.env.API_PORT || 4000;
const gmailUser = process.env.GMAIL_USER || '';
const gmailPass = (process.env.GMAIL_APP_PASS || '').replace(/\s/g, '');

console.log(`📧 Gmail user: ${gmailUser}`);
console.log(`🔑 App password loaded: ${gmailPass ? `${gmailPass.length} chars` : 'MISSING!'}`);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: gmailUser,
    pass: gmailPass,
  },
});

// ─── Start a Project ────────────────────────────────────────────────
app.post('/api/start-project', async (req, res) => {
  const { fullName, email, companyName, companyDescription, serviceType, projectVision, timeline } = req.body;

  if (!email || !companyDescription || !serviceType || !timeline) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#f9f9f9;border-radius:12px;">
      <h2 style="color:#2563eb;margin-bottom:4px;">🚀 New Project Inquiry</h2>
      <p style="color:#888;font-size:13px;margin-top:0;">Submitted via Foster Brand Development website</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;"/>

      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <tr><td style="padding:8px 0;color:#555;width:180px;"><strong>Full Name</strong></td><td style="padding:8px 0;">${fullName || '—'}</td></tr>
        <tr style="background:#f3f4f6;"><td style="padding:8px;color:#555;"><strong>Email</strong></td><td style="padding:8px;"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#555;"><strong>Company</strong></td><td style="padding:8px 0;">${companyName || '—'}</td></tr>
        <tr style="background:#f3f4f6;"><td style="padding:8px;color:#555;"><strong>About the Company</strong></td><td style="padding:8px;">${companyDescription}</td></tr>
        <tr><td style="padding:8px 0;color:#555;"><strong>Service</strong></td><td style="padding:8px 0;"><span style="background:#dbeafe;color:#2563eb;padding:3px 10px;border-radius:20px;font-size:13px;">${serviceType}</span></td></tr>
        <tr style="background:#f3f4f6;"><td style="padding:8px;color:#555;"><strong>Project Vision</strong></td><td style="padding:8px;">${projectVision || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#555;"><strong>Timeline</strong></td><td style="padding:8px 0;">${timeline}</td></tr>
      </table>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;"/>
      <p style="font-size:12px;color:#aaa;text-align:center;">Foster Brand Development · fosterbranddevelopment.com</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Foster Brand Development" <${process.env.GMAIL_USER}>`,
      to: 'johnpfoster25@gmail.com',
      subject: `New Project Inquiry — ${companyName || fullName || 'New Lead'}`,
      html,
      replyTo: email,
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email. Check server logs.' });
  }
});

// ─── Book a Call ────────────────────────────────────────────────────
app.post('/api/book-call', async (req, res) => {
  const { fullName, email, phone, companyName, topic, preferredTime, message } = req.body;

  if (!fullName || !email || !topic) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#f9f9f9;border-radius:12px;">
      <h2 style="color:#2563eb;margin-bottom:4px;">📞 New Call Request</h2>
      <p style="color:#888;font-size:13px;margin-top:0;">Submitted via Foster Brand Development website</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;"/>

      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <tr><td style="padding:8px 0;color:#555;width:180px;"><strong>Full Name</strong></td><td style="padding:8px 0;">${fullName}</td></tr>
        <tr style="background:#f3f4f6;"><td style="padding:8px;color:#555;"><strong>Email</strong></td><td style="padding:8px;"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#555;"><strong>Phone</strong></td><td style="padding:8px 0;">${phone || '—'}</td></tr>
        <tr style="background:#f3f4f6;"><td style="padding:8px;color:#555;"><strong>Company</strong></td><td style="padding:8px;">${companyName || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#555;"><strong>Topic</strong></td><td style="padding:8px 0;"><span style="background:#dbeafe;color:#2563eb;padding:3px 10px;border-radius:20px;font-size:13px;">${topic}</span></td></tr>
        <tr style="background:#f3f4f6;"><td style="padding:8px;color:#555;"><strong>Preferred Time</strong></td><td style="padding:8px;">${preferredTime || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#555;"><strong>Additional Notes</strong></td><td style="padding:8px 0;">${message || '—'}</td></tr>
      </table>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;"/>
      <p style="font-size:12px;color:#aaa;text-align:center;">Foster Brand Development · fosterbranddevelopment.com</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Foster Brand Development" <${process.env.GMAIL_USER}>`,
      to: 'johnpfoster25@gmail.com',
      subject: `Call Request — ${companyName || fullName}`,
      html,
      replyTo: email,
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email. Check server logs.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ API server running on http://localhost:${PORT}`);
  transporter.verify((err) => {
    if (err) {
      console.error('❌ SMTP auth failed:', err.message);
      console.error('   → Regenerate your Gmail App Password at: https://myaccount.google.com/apppasswords');
      console.error('   → Then visit: https://accounts.google.com/DisplayUnlockCaptcha');
    } else {
      console.log('✅ Gmail SMTP ready');
    }
  });
});
