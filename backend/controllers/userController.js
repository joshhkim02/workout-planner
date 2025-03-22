const db = require("../database/queries")

// const registerController = async (req, res) => {};
// const loginController = async (req, res) => {};
// const logoutController = async (req, res) => {};
const getUserController = async (req, res) => {
    const users = await db.getAllUsers();
    console.log("Users: ", users);
    res.send("Users: " + users.map(user => user.name).join(", "));
};

module.exports = {
    getUserController
}