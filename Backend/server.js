const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected."))
    .catch((err) => console.error(err));

app.use(cors({
    origin: ["http://localhost:5173", "https://your-vercel-site.vercel.app"], 
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Server is running!");
});

const contactRoute = require("./routes/contact");
app.use("/api/contact", contactRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));