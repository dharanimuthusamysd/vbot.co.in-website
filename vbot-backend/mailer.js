// mailer.js
// Sends a notification email via Gmail whenever a new demo is booked.

require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

/**
 * Sends a booking notification email to your inbox, and a confirmation
 * email back to the customer who booked the demo.
 */
async function sendBookingEmails(booking) {
  const { name, email, phone, company, notes, demo_date, demo_time } = booking;

  const internalHtml = `
    <h2>New Demo Booking</h2>
    <p><strong>Date:</strong> ${demo_date} at ${demo_time}</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || '—'}</p>
    <p><strong>Company:</strong> ${company || '—'}</p>
    <p><strong>Notes:</strong> ${notes || '—'}</p>
  `;

  const customerHtml = `
    <h2>Your Vbot demo is confirmed 🎉</h2>
    <p>Hi ${name},</p>
    <p>Your live demo is scheduled for <strong>${demo_date} at ${demo_time}</strong>.</p>
    <p>We'll walk you through the real Vbot dashboard — inbox, campaigns, leads CRM, and how Shopify orders flow into WhatsApp automatically.</p>
    <p>See you then!</p>
    <p>— The Vbot Team</p>
  `;

  // 1. Notify your team inbox
  await transporter.sendMail({
    from: `"Vbot Bookings" <${process.env.GMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: `New Demo Booking — ${name} (${demo_date}, ${demo_time})`,
    html: internalHtml
  });

  // 2. Confirmation back to the customer
  await transporter.sendMail({
    from: `"Vbot" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Your Vbot demo is confirmed — ${demo_date} at ${demo_time}`,
    html: customerHtml
  });
}

module.exports = { sendBookingEmails };
