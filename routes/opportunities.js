const express = require('express');
const router = express.Router();
const Opportunity = require('../models/Opportunity');

// Endpoint to fetch all opportunities
router.get('/', async (req, res) => {
    try {
        const opportunities = await Opportunity.find();
        res.json(opportunities);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to add a new opportunity
router.post('/', async (req, res) => {
    try {
        const { profile_name, company_name, stipend, location, duration, start_date } = req.body;
        const newOpportunity = new Opportunity({
            profile_name,
            company_name,
            stipend,
            location,
            duration,
            start_date
        });
        await newOpportunity.save();
        res.status(201).json({ message: 'Opportunity added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add opportunity' });
    }
});

module.exports = router;
