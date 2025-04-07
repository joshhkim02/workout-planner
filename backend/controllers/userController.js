require('dotenv').config({ path: '../.env' })
const db = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/*  
    Certain routes will require an authenticated token before performing any database operations
    Check for token, then verify it based on the secret key in the .env file
*/
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

/*
    Create a user based on their name, email and password if information doesn't already exist.
    Salt and hash the password before storing all information.
    Assigns a JWT token that expires in an hour.
*/
const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send("Missing required fields: name, email, password");
        }

        const existing = await db.getUser(email);
        if (existing) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await db.createUser(name, email, hashedPassword);

        const token = jwt.sign(
            {
                id: result.id,
                email: result.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            token,
            user: {
                id: result.id,
                name: result.name,
                email: result.email
            }
        });
    } catch (error) {
        console.error("Error creating user: ", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

/*
    Allow an existing user to login to their account.
    Makes sure provided email matches up to one in the database.
    Compares passwords to make sure they are the same, then assigns a token.
*/
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await db.getUser(email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    registerController,
    loginController,
    authenticateToken,
}