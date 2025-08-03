const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// === SIGNUP ===
router.get('/signup', (req, res) => {
  res.render('auth/signup');  // Make sure views/auth/signup.ejs exists
});

router.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      password: hashedPassword
    });
    console.log("New user registered:", req.body.email);
    res.redirect('/login');
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).send("Signup failed");
  }
});

// === LOGIN ===
router.get('/login', (req, res) => {
  res.render('auth/login');  // Make sure views/auth/login.ejs exists
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    console.log("Login attempt");
    console.log("Email entered:", req.body.email);
    console.log("User found:", user);

    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);
      console.log("Password match:", match);

      if (match) {
        req.session.userId = user._id;
        console.log("Login successful, redirecting to /");
        return res.redirect('/');
      }
    }

    console.log("Invalid login triggered");
    res.send("Invalid login");
  } catch (err) {
    console.error(" Login error:", err.message);
    res.status(500).send("Login failed");
  }
});

// === LOGOUT ===
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    console.log("User logged out");
    res.redirect('/login');
  });
});

module.exports = router;
