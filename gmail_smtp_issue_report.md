# Gmail SMTP Authentication Issue Report

## Overview
We are trying to set up an Express API server with `nodemailer` to send form submissions from a React frontend via a Gmail account (`johnpfoster25@gmail.com`). However, Google's SMTP server is consistently rejecting the login attempts with a `535-5.7.8 Username and Password not accepted` error.

## Tech Stack
* **Frontend**: React + Vite
* **Backend**: Express (running via `tsx watch server/index.ts` on port 4000)
* **Email Library**: `nodemailer`
* **Environment Loader**: `dotenv/config`

## Current Configuration
**Server Code (`server/index.ts`)**:
```typescript
import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';

const PORT = process.env.API_PORT || 4000;
const gmailUser = process.env.GMAIL_USER || '';
// Stripping spaces just in case the app password formatting included them
const gmailPass = (process.env.GMAIL_APP_PASS || '').replace(/\s/g, '');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: gmailUser,
    pass: gmailPass,
  },
});
```

**Environment Variables (`.env`)**:
```env
GMAIL_USER=johnpfoster25@gmail.com
GMAIL_APP_PASS="auzj umzz onrn vhrd"
API_PORT=4000
```
*(Note: We verified that the environment variables are being successfully loaded into the Node process via diagnostic `console.log` statements showing a 16-character password length).*

## The Error
When a form submission triggers `transporter.sendMail(...)`, Node logs the following error:

```
Email send error: Error: Invalid login: 535-5.7.8 Username and Password not accepted. For more information, go to
535 5.7.8  https://support.google.com/mail/?p=BadCredentials 6a1803df08f44-8b02ae97347sm15578456d6.41 - gsmtp
    at SMTPConnection._formatError (...\node_modules\nodemailer\lib\smtp-connection\index.js:887:19)
    ...
  code: 'EAUTH',
  response: '535-5.7.8 Username and Password not accepted...',
  responseCode: 535,
  command: 'AUTH PLAIN'
}
```

## What We Have Tried
1. **Verifying Credentials**: Ensured the email matches exactly and the app password was copied properly.
2. **Password Formatting**:
    * Tried the raw 16-character string without spaces globally: `auzjumzzonrnvhrd`
    * Tried the spaced string: `auzj umzz onrn vhrd`
    * Tried quoting the value in `.env` so `dotenv` parses it correctly.
    * Added `.replace(/\s/g, '')` in Node to dynamically strip down to extreme raw characters preventing unseen whitespace issues.
3. **Transport Configuration**:
    * Tried the shorthand: `{ service: 'gmail', auth: {...} }`
    * Tried explicit host routing: `{ host: 'smtp.gmail.com', port: 465, secure: true, auth: {...} }`
4. **Port Conflicts**: Ensured the server was cleanly shut down and restarted without cached environmental states.

## Speculation & Potential Causes

Based on the persistent `EAUTH` failure despite proper code implementation, the issue lies firmly on the Google Account configuration side.

1. **Incorrect Google Account**: The app password might have been generated while logged into a different Google account (e.g., a personal account instead of a workspace account, or vice-versa) than `johnpfoster25@gmail.com`.
2. **Account Security Flags**: Google might be blocking the login attempt due to perceived suspicious activity (e.g., logging in from an unknown server IP or new Node.js client).
    * *Fix*: The user may need to visit https://myaccount.google.com/displayunlockcaptcha while logged into that account to clear the invisible security captcha holding the block.
3. **Revoked/Stale App Password**: App passwords can sometimes fail to register immediately, or become invalidated if account security settings are tweaked shortly after creation.
    * *Fix*: Delete the current app password and generate a brand new one.
4. **Workspace Restrictions (If G-Suite/Workspace)**: If `johnpfoster25@gmail.com` is managed by a Google Workspace admin (despite having the `@gmail.com` domain, which is rare but possible through aliases), SMTP may be disabled globally at the domain level.
5. **IMAP/SMTP Disabled**: Sometimes SMTP access will fail if IMAP/POP is not enabled in the Gmail settings.
    * *Fix*: Go to Gmail -> Settings -> Forwarding and POP/IMAP -> Enable IMAP.

## Next Steps for Claude Code
1. Verify the app password is newly generated explicitly for `johnpfoster25@gmail.com`.
2. Suggest the user visit the Google Unlock Captcha link.
3. Test using a completely isolated Node script (`test-email.js`) to decouple the issue from the Express server lifecycle and `dotenv` setup.
