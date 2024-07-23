const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./routes/userr");
const opportunityRouter = require("./routes/opportunities");
const env = require("dotenv");
const cookieParser = require("cookie-parser");

env.config();
const dbURI = process.env.MONGODB_URI;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));

mongoose.connect(dbURI).then(() => {
    console.log("connected to database");
}).catch(err => console.log(err));

app.use("/auth", userRouter);
app.use("/api/opportunities", opportunityRouter);

app.use(express.static(path.join(__dirname, 'Frontend/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend/client/build', 'index.html'));
});

app.listen(4000, () => {
    console.log("server is running on port 4000");
});
