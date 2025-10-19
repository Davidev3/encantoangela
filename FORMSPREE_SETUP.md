# 📧 Formspree Setup Guide - Encanto da Ângela

## 🚀 **What is Formspree?**
Formspree is the **best free form service** that handles form submissions and sends real emails. It's:
- ✅ **100% Free** for up to 50 submissions per month
- ✅ **No coding required** - just works
- ✅ **Spam protection** built-in
- ✅ **Reliable** - used by millions of websites
- ✅ **Professional** - sends beautiful HTML emails

## 📋 **Setup Steps:**

### **Step 1: Create Formspree Account**
1. Go to: https://formspree.io
2. Click "Get Started" or "Sign Up"
3. Create account with your email
4. Verify your email address

### **Step 2: Create New Form**
1. In your Formspree dashboard, click "New Form"
2. Give it a name: "Encanto da Ângela Contact Form"
3. Copy the form endpoint URL (looks like: `https://formspree.io/f/xxxxxxxx`)

### **Step 3: Update Your Website**
Replace the form action in `encanto-da-angela.html`:

**Find this line:**
```html
<form class="contact-form" id="contact-form" action="https://formspree.io/f/xpwnqkqr" method="POST">
```

**Replace with your actual Formspree URL:**
```html
<form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR_ACTUAL_FORM_ID" method="POST">
```

### **Step 4: Configure Email Settings**
In your Formspree dashboard:
1. Go to your form settings
2. Set **Email To**: `angelagalindo78@yahoo.com.br`
3. Set **Subject**: `Nova mensagem do site Encanto da Ângela`
4. Enable **Reply-To**: Yes (so you can reply directly)
5. Enable **Spam Protection**: Yes

### **Step 5: Test Your Form**
1. Open your website
2. Fill out the contact form
3. Submit it
4. Check your email at `angelagalindo78@yahoo.com.br`
5. You should receive a beautiful HTML email!

## 📧 **What You'll Receive:**

When someone submits the form, you'll get an email like this:

```
Subject: Nova mensagem do site Encanto da Ângela

From: customer@example.com
Reply-To: customer@example.com

Name: Maria Silva
Email: maria@example.com
Message: Olá! Gostaria de saber mais sobre os sabonetes artesanais...

[Formspree will also include IP address, timestamp, etc.]
```

## 🎯 **Features Included:**

- ✅ **Real email delivery** to your Yahoo inbox
- ✅ **Spam protection** - blocks spam automatically
- ✅ **Reply-to functionality** - you can reply directly to customers
- ✅ **Form validation** - prevents empty submissions
- ✅ **Mobile-friendly** - works on all devices
- ✅ **Professional appearance** - beautiful success messages
- ✅ **Analytics** - see how many people contact you

## 🔧 **Advanced Settings (Optional):**

### **Custom Thank You Page:**
1. Create a page called `obrigado.html`
2. In Formspree settings, set redirect URL to your thank you page
3. Update the `_next` field in the form

### **Email Templates:**
1. In Formspree dashboard, go to "Email Templates"
2. Customize the email design to match your brand
3. Add your logo and colors

### **Webhooks (Advanced):**
If you want to save form data to a database, you can set up webhooks in Formspree.

## 🆓 **Free Plan Limits:**
- **50 submissions per month** (perfect for small business)
- **Spam protection** included
- **Email notifications** included
- **Basic analytics** included

## 💰 **Upgrade Options:**
If you need more than 50 submissions per month:
- **Gold Plan**: $10/month for 1,000 submissions
- **Platinum Plan**: $20/month for 5,000 submissions

## 🚨 **Important Notes:**

1. **Replace the form action URL** with your actual Formspree endpoint
2. **Test the form** before going live
3. **Check spam folder** initially to make sure emails arrive
4. **Keep your Formspree account active** - don't let it expire

## ✅ **Ready to Use!**

Once you complete these steps, your contact form will:
- Send real emails to `angelagalindo78@yahoo.com.br`
- Work on all devices (mobile, tablet, desktop)
- Look professional and trustworthy
- Protect against spam
- Provide great user experience

**No coding required - just works!** 🎉
