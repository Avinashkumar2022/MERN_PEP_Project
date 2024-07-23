const mongoose = require('mongoose');
const Opportunity = require('../models/Opportunity');
const opportunities = require('./opportunities.json');
require('dotenv').config();

const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Database connected');
        await Opportunity.deleteMany({});
        await Opportunity.insertMany(opportunities);
        console.log('Database seeded');
        mongoose.disconnect();
    })
    .catch(error => {
        console.error('Database connection error:', error);
    });
