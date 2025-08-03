const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');

const opportunityRoutes = require('./routes/opportunityRoutes');
const authRoutes = require('./routes/authRoutes'); // 🔑 Add auth

dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'supersecrettracker',
  resave: false,
  saveUninitialized: false
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 🔐 Middleware to protect routes
function requireLogin(req, res, next) {
  if (!req.session.userId) return res.redirect('/login');
  next();
}

app.use(authRoutes);
app.use('/', requireLogin, opportunityRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
