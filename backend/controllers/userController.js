const db = require("../database/queries")

const registerController = async (req, res) => {
    try {
        console.log("req.body: ", req.body);
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send("Missing required fields: name, email, password");
        }

        const result = await db.createUser(name, email, password);
        console.log("User created: ", result);
        res.status(201).json({
            message: "User created successfully",
            user: result
        });
    } catch (err) {
        console.log("Error creating user: ", err);
        res.status(500).send("Error creating user: " + err.message);
    }
};
// const loginController = async (req, res) => {};
// const logoutController = async (req, res) => {};
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
}