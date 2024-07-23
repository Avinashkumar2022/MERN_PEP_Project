const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    name: String,
    age: Number,
    date_of_birth: Date,
    image: String,
    appliedOpportunities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity' }],


});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
