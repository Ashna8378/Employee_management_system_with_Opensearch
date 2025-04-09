import express from 'express';
import client from '../database.js';

const auth = express.Router();


auth.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const response = await client.search({
            index: 'users',
            body: { query: { match: { email } } }
        });

        if (response.body.hits.hits.length === 0) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const user = response.body.hits.hits[0]._source;

        if (user.password !== password) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        res.json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

auth.post("/register", async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ error: "Missing email, password, or name" });
    }

    try {
        const existingUser = await client.search({
            index: 'users',
            body: { query: { match: { email } } }
        });

        if (existingUser.body.hits.hits.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }

        await client.index({
            index: 'users',
            body: { name, email, password }
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { auth };

