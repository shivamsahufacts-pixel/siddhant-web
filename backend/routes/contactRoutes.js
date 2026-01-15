// const express = require('express');
// const router = express.Router();
// const contactController = require('../controllers/contactController');
// const { validateContact } = require('../middleware/validation');
// const rateLimit = require('express-rate-limit');

// // Rate limiting for contact form (5 requests per 15 minutes)
// const contactLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 5,
//     message: {
//         success: false,
//         message: 'Too many contact attempts. Please try again after 15 minutes.'
//     },
//     standardHeaders: true,
//     legacyHeaders: false
// });

// // Public routes
// router.post('/submit', contactLimiter, validateContact, contactController.submitContact);
// router.get('/test-email', contactController.testEmailService);



// module.exports = router;


const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { validateContact } = require("../middleware/validation");
const rateLimit = require("express-rate-limit");

// Rate limit
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many contact attempts. Try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});

// ===== PUBLIC =====
router.post(
  "/submit",
  contactLimiter,
  validateContact,
  contactController.submitContact
);

// ===== ADMIN =====
router.get(
  "/admin",
  contactController.getAllContacts
);

router.patch(
  "/admin/:id/read",
  contactController.markAsRead
);

// ===== TEST =====
router.get("/test-email", contactController.testEmailService);

module.exports = router;
