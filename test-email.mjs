// Run: node test-email.mjs
// Tests Gmail SMTP directly, bypassing Express and dotenv.
// Paste your credentials below temporarily to isolate the issue.

import nodemailer from 'nodemailer';

const GMAIL_USER = 'johnpfoster25@gmail.com';
const GMAIL_APP_PASS = 'auzjumzzonrnvhrd'; // 16-char app password, no spaces

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: { user: GMAIL_USER, pass: GMAIL_APP_PASS },
});

console.log('Verifying SMTP credentials...');
transporter.verify((err, success) => {
  if (err) {
    console.error('FAILED:', err.message);
    console.log('\nChecklist:');
    console.log('  1. Is 2-Step Verification ON for', GMAIL_USER, '?');
    console.log('  2. Was this app password generated while logged into', GMAIL_USER, '?');
    console.log('  3. Is IMAP enabled? Gmail → Settings → Forwarding and POP/IMAP');
    console.log('  4. Visit: https://accounts.google.com/DisplayUnlockCaptcha');
    console.log('  5. Regenerate app password: https://myaccount.google.com/apppasswords');
  } else {
    console.log('SUCCESS: SMTP auth passed — credentials are valid.');
    console.log('Sending test email...');
    transporter.sendMail({
      from: `"Test" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      subject: 'SMTP Test',
      text: 'If you received this, Gmail SMTP is working correctly.',
    }).then(info => {
      console.log('Email sent:', info.messageId);
    }).catch(e => {
      console.error('Send failed:', e.message);
    });
  }
});
