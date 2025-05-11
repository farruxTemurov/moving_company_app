let userService = require('../services/users.service');


let signUp = async (req, res) => {
    try {
        let user = req.body;
        let result = await userService.signUp(user);
        res.json({ "msg": "Account created successfully" })
    } catch (error) {
        res.json({ "msg": error.message })
    }
}

let signIn = async (req, res) => {
    try {
        let user = req.body;
        let token = await userService.signIn(user);
        res.json({ "msg": "successful login", "token": token })
    } catch (error) {
        res.json({ "msg": error.message })
    }
}

module.exports = {
    signUp, signIn
}