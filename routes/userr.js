const express = require("express");
const UserModel = require("../models/user");
const AppliedOpportunity = require("../models/Applied");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();


// User Signup
router.post("/signup", async (req, res) => {
    const { username, email, password, role } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
        username,
        email,
        password: hashedPass,
        role: role || 'user'
    });
    await newUser.save();
    return res.json({ status: true, message: "User Created" });
});

// User Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: "Password is Incorrect" });
    }
    const token = jwt.sign({ email: user.email, role: user.role }, "jwtkey", { expiresIn: "4h" });
    res.cookie("token", token);
    return res.json({ status: true, message: "Login Successful", token });
});

const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; // Bearer Token
        if (!token) {
            return res.status(401).json({ status: false, message: "Auth Failed" });
        }
        const decoded = await jwt.verify(token, "jwtkey");
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ status: false, message: "Auth Failed" });
    }
};

router.get("/opportunities", verifyUser, async (req, res) => {
    console.log("Fetching opportunities for user:", req.user);
    try {
        const opportunities = await OpportunityModel.find({});
        res.json(opportunities);
    } catch (error) {
        console.error("Error fetching opportunities:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Updating details
router.post("/update", verifyUser, async (req, res) => {
    try {
        const { name, age, date_of_birth, image } = req.body;
        const updatedUser = await UserModel.findOneAndUpdate(
            { email: req.user.email },
            { name, age, date_of_birth, image },
            { new: true }
        );
        if (updatedUser) {
            res.json({ message: "Details updated successfully", user: updatedUser });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



// Fetch user details
router.get("/dashboard", verifyUser, async (req, res) => {
    try {
        console.log("User details request:", req.user);
        const user = await UserModel.findOne({ email: req.user.email }).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});





// Apply for an Opportunity
router.post("/apply", verifyUser, async (req, res) => {
    try {
        console.log("User:", req.user);
        console.log("Request Body:", req.body);
        const { opportunity } = req.body;
        const applyOpportunity = new AppliedOpportunity({
            userId: req.user.email,
            id: opportunity.id,
            profile_name: opportunity.profile_name,
            stipend: opportunity.stipend,
            company_name: opportunity.company_name,
            duration: opportunity.duration,
            start_date: opportunity.start_date
        });
        await applyOpportunity.save();
        res.status(201).json({ message: "Opportunity applied successfully" });
    } catch (error) {
        console.error("Error saving opportunity:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


//Applied Opportunities
router.get("/applied-opportunities", verifyUser, async (req, res) => {
    try {
        const appliedOpportunities = await AppliedOpportunity.find({ userId: req.user.email });
        res.json(appliedOpportunities);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

// Verify User
router.get("/verify", verifyUser, (req, res) => {
    return res.json({ status: true, message: "Auth Successful", user: req.user });
});

// Logout
router.get("/logout", (req, res) => {
    res.clearCookie('token');
    return res.json({ status: true, message: "Logged out successfully" });
});

module.exports = router;
