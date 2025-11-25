# Contact Form Setup Instructions

## What Changed

Your website now has a secure contact form that protects your email from spam bots and scammers. Here's what was added:

### New Files Created:
1. **contact.html** - The contact form page with bilingual support
2. **contact-form.css** - Styling for the contact form (matches your site's design)
3. **contact-form.js** - Form submission handler
4. **submit-form.php** - PHP backend that processes form submissions
5. **CONTACT_FORM_SETUP.md** - This file

### Modified Files:
1. **index.html** - The email link in the footer now redirects to the contact form page

## How It Works

The contact form uses your **Web Host Canada** hosting service to send emails directly from your server. The PHP script processes form submissions and sends them to contact@pierre-paulg.ca without exposing your email address in the HTML. This prevents spam bots from harvesting your email.

## Setup Instructions

### Step 1: Upload Files to Your Web Host Canada Server

Upload these files to your website's root directory (usually `public_html` or `www`):
- `contact.html`
- `contact-form.css`
- `contact-form.js`
- `submit-form.php`
- Updated `index.html`

### Step 2: Configure PHP Email (if needed)

Most Web Host Canada plans have PHP mail() configured by default, but you may need to verify:

1. Log into your Web Host Canada control panel (cPanel)
2. Check that PHP mail() function is enabled
3. If using a custom "From" address, you may need to create an email account:
   - Go to Email Accounts in cPanel
   - Create `noreply@pierre-paulg.ca` (optional, for cleaner "From" headers)

### Step 3: Test the Form

1. Visit your website: https://pierre-paulg.ca/contact.html
2. Fill out and submit a test message
3. Check your email (contact@pierre-paulg.ca) for the submission
4. Check your spam folder if you don't see it

## Features

✅ **Spam Protection** - Your email is never exposed in the HTML
✅ **Rate Limiting** - Prevents spam by limiting submissions to 1 per minute per user
✅ **Input Validation** - Server-side validation prevents malformed submissions
✅ **Spam Filtering** - Blocks common spam keywords automatically
✅ **Security Headers** - Protection against XSS and clickjacking attacks
✅ **Referer Check** - Only accepts submissions from your domain
✅ **Bilingual** - Full English and French support
✅ **Accessible** - WCAG compliant with proper ARIA labels
✅ **Mobile Responsive** - Works great on all devices
✅ **User Friendly** - Clear feedback messages and loading states
✅ **No Monthly Limits** - Uses your own hosting, no third-party limits
✅ **Free** - No additional costs beyond your existing hosting

## Troubleshooting

**Form doesn't submit:**
- Check browser console for JavaScript errors
- Verify `submit-form.php` is uploaded to the server
- Check that PHP is enabled on your hosting plan
- Look at your server error logs in cPanel

**Not receiving emails:**
- Check your spam/junk folder
- Verify PHP mail() is enabled in cPanel
- Check server logs for mail errors
- Try creating a `noreply@pierre-paulg.ca` email account
- Contact Web Host Canada support if mail() function is disabled

**"Method not allowed" error:**
- Ensure the form is using POST method
- Check that `submit-form.php` has read permissions (644)

**Rate limiting triggers too often:**
- Edit `submit-form.php` line 10 to adjust the rate limit:
  ```php
  define('RATE_LIMIT_SECONDS', 60); // Change to desired seconds
  ```

**Styling issues:**
- Clear your browser cache
- Make sure `contact-form.css` is loaded
- Check for CSS conflicts with existing styles

## Security Notes

- Rate limiting prevents spam submissions (1 per minute per user)
- Server-side validation prevents injection attacks
- Referer checking blocks external form submissions
- Common spam keywords are automatically filtered
- Security headers protect against XSS and clickjacking
- No email address is exposed in the HTML source code
- Form inputs are sanitized before sending

## Advanced Configuration

### Customize Email Format
Edit `submit-form.php` lines 92-101 to customize the email body

### Add More Spam Keywords
Edit `submit-form.php` line 72 to add keywords to the spam filter

### Change Rate Limit
Edit `submit-form.php` line 10 to adjust the time between submissions

### Add Email CC/BCC
Add to the headers array in `submit-form.php` line 104:
```php
'Cc: another@email.com',
'Bcc: backup@email.com'
```

## Need Help?

If you need assistance with the setup:
1. Contact Web Host Canada support for PHP mail() configuration
2. Test the form after uploading to your server
3. Review browser console and server logs for errors
4. Check cPanel for email delivery issues

---

**Note:** This setup uses your existing Web Host Canada infrastructure. No third-party services or API keys required!
