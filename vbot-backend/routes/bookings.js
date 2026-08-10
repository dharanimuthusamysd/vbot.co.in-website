// routes/bookings.js
const express = require('express');
const { pool } = require('../db');
const { sendBookingEmails } = require('../mailer');

const router = express.Router();

/**
 * POST /api/bookings
 * Saves a new demo booking to MySQL, then emails a notification.
 * Body: { name, email, phone, company, notes, date, time }
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, notes, date, time } = req.body;

    // Basic validation — mirrors the required fields in the Angular form
    if (!name || !email || !date || !time) {
      return res.status(400).json({
        error: 'name, email, date, and time are required.'
      });
    }

    const [result] = await pool.query(
      `INSERT INTO bookings (name, email, phone, company, notes, demo_date, demo_time)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone || null, company || null, notes || null, date, time]
    );

    const booking = {
      id: result.insertId,
      name,
      email,
      phone,
      company,
      notes,
      demo_date: date,
      demo_time: time
    };

    // Send emails, but don't fail the whole request if email sending
    // has a hiccup — the booking is already safely saved at this point.
    try {
      await sendBookingEmails(booking);
    } catch (emailErr) {
      console.error('Booking saved, but email failed to send:', emailErr);
    }

    return res.status(201).json({ success: true, booking });
  } catch (err) {
    console.error('Error saving booking:', err);
    return res.status(500).json({ error: 'Failed to save booking.' });
  }
});

/**
 * GET /api/bookings
 * Lists all bookings, most recent first. Useful for a simple admin view.
 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, email, phone, company, notes, demo_date, demo_time, created_at
       FROM bookings
       ORDER BY created_at DESC`
    );
    return res.json({ bookings: rows });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    return res.status(500).json({ error: 'Failed to fetch bookings.' });
  }
});

module.exports = router;
