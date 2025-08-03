const express = require('express');
const router = express.Router();
const Opportunity = require('../models/Opportunity');

// Show all opportunities
router.get('/', async (req, res) => {
    const opportunities = await Opportunity.find().sort({ createdAt: -1 });
    res.render('index', { opportunities });
});

// Show form to add new
router.get('/add', (req, res) => {
    res.render('add');
});

// Add opportunity
router.post('/add', async (req, res) => {
    await Opportunity.create(req.body);
    res.redirect('/');
});

// Show edit form
router.get('/edit/:id', async (req, res) => {
    const opportunity = await Opportunity.findById(req.params.id);
    res.render('edit', { opportunity });
});

// Update opportunity
router.post('/edit/:id', async (req, res) => {
    await Opportunity.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
});

// Delete opportunity
router.post('/delete/:id', async (req, res) => {
    await Opportunity.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;
