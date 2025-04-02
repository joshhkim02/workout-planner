require('dotenv').config({ path: '../env' })
const db = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) return res.sendStatus(401); // No token

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token
        req.user = user;
        next();
    });
}

const registerController = async (req, res) => {
    try {
        console.log("req.body: ", req.body);
        const { name, email, password } = req.body;

        const existing = await db.getUser(email);
        if (existing) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (!name || !email || !password) {
            return res.status(400).send("Missing required fields: name, email, password");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await db.createUser(name, email, hashedPassword);
        console.log("User created: ", result);

        const token = jwt.sign(
            {
                id: result.user_id,
                email: result.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            user: {
                id: result.user_id,
                name: result.name,
                email: result.email
            }
        });
    } catch (err) {
        console.log("Error creating user: ", err);
        res.status(500).send("Error creating user: " + err.message);
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.getUser(email);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            {
                id: user.user_id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.user_id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const deleteUserController = async (req, res) => {
    try {
        console.log("req.body: ", req.body);
        const { email } = req.body;

        if (!email) {
            return res.status(400).send("Missing required field: email");
        }

        const user = await db.deleteUser(email);
        console.log("User deleted: ", user);
        res.status(201).json({
            message: "User deleted successfully",
            user: user
        });
    } catch (err) {
        console.log("Error deleting user: ", err);
        res.status(500).send("Error deleting user: " + err.message);
    }
};

const getAllUsersController = async (req, res) => {
    try {
        const users = await db.getAllUsers();
        console.log("Users: ", users);
        res.send("Users: " + users.map(user => user.name).join(", "));
    } catch (err) {
        console.log("Error fetching users: ", err);
        res.status(500).send("Error fetching users: " + err.message);
    }

};

// TODO: IMPLEMENT REQ.PARAMS
const getUserController = async (req, res) => {
    try {
        console.log("req.body: ", req.body);
        const { email } = req.body;

        if (!email) {
            return res.status(400).send("Missing required field: email");
        }

        const user = await db.getUser(email);
        console.log("User retrieved: ", user);
        res.status(201).json({
            message: "User returned successfully",
            user: user
        });
    } catch (err) {
        console.log("Error returning user: ", err);
        res.status(500).send("Error returning user: " + err.message);
    }
}


module.exports = {
    getAllUsersController,
    registerController,
    getUserController,
    deleteUserController,
    loginController,
    authenticateToken,
}