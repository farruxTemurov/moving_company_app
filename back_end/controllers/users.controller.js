let userService = require('../services/users.service');

let signUp = async (req, res) => {
    try {
        let user = req.body;
        let result = await userService.signUp(user);
        res.status(201).json({ msg: "Account created successfully" });
    } catch (error) {
        console.error("Error inside signUp controller:", error);
        if (error.status === 409) {
            // Email conflict
            res.status(409).json({ msg: error.message });
        } else {
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }
};

let signIn = async (req, res) => {
    try {
        const user = req.body;
        const token = await userService.signIn(user);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = {
    signUp, signIn
}
