const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
    profile_name: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    stipend: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    }
});

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

module.exports = Opportunity;
