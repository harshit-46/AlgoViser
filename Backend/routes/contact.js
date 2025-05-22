const express = require("express");
const router = express.Router();
const Message = require("../models/message");

router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const newMessage = new Message({ name, email, message });
        await newMessage.save();
        res.status(201).json({ success: true, message: "Message saved!" });
    } catch (err) {
        res.status(500).json({ error: "Server error." });
    }
});

module.exports = router;
