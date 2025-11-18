# Email Setup Guide (Gmail)

## Quick Setup

To enable magic link emails, you need to configure Gmail SMTP in your `.env` file.

### Step 1: Create a Gmail App Password

1. **Enable 2-Step Verification first** (if not already enabled):
   - Go to https://myaccount.google.com/security
   - Click on **2-Step Verification** under "How you sign in to Google"
   - Follow the prompts to enable it

2. **Generate an App Password**:
   - Go directly to: https://myaccount.google.com/apppasswords
   - Or: Google Account → Security → Scroll down to "How you sign in to Google" → Click **2-Step Verification** → Scroll to bottom → Click **App passwords**
   - You'll be asked to sign in again
   - Under "Select app", choose **Mail**
   - Under "Select device", choose **Other (Custom name)**
   - Enter "Life Stories" as the custom name
   - Click **Generate**
   - Google will show you a 16-character password (like `abcd efgh ijkl mnop`)
   - **Copy this password** (remove the spaces when you paste it into .env)

### Step 2: Update .env File

Replace the placeholder values in your `.env`:

```env
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-actual-gmail@gmail.com"
EMAIL_SERVER_PASSWORD="your-16-char-app-password"
EMAIL_FROM="Life Stories <your-actual-gmail@gmail.com>"
```

### Step 3: Restart the Dev Server

```bash
npm run dev
```

## Testing

1. Go to http://localhost:5000
2. Enter any email address
3. Click "Continue with email"
4. Check the inbox of the email you entered
5. Click the magic link to sign in

## Troubleshooting

- **"Authentication failed"**: Double-check your Gmail address and app password
- **"Connection refused"**: Ensure port 587 is not blocked by your firewall
- **Email not arriving**: Check spam folder, verify Gmail account is active
- **"Less secure app access"**: You need to use App Passwords (see Step 1 above)

## Alternative Email Providers

If you prefer not to use Gmail, you can use any SMTP provider:

### SendGrid
```env
EMAIL_SERVER_HOST="smtp.sendgrid.net"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="apikey"
EMAIL_SERVER_PASSWORD="your-sendgrid-api-key"
```

### Mailgun
```env
EMAIL_SERVER_HOST="smtp.mailgun.org"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-mailgun-username"
EMAIL_SERVER_PASSWORD="your-mailgun-password"
```

### Amazon SES
```env
EMAIL_SERVER_HOST="email-smtp.us-east-1.amazonaws.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-ses-smtp-username"
EMAIL_SERVER_PASSWORD="your-ses-smtp-password"
```
