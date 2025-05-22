let express = require("express");
let router = express.Router();
let userController = require("../controllers/users.controller");
let userRepository = require("../repositories/users.repository")


router.post("/signUp", userController.signUp); // Route to sign up user
// router.post("/signUp", async (req, res, next) => {
//     try {
//         console.log("Received signUp request with body:", req.body);
//         const result = await userRepository.signUp(req.body);
//         res.status(201).json(result);
//     } catch (err) {
//         console.error("Error in /signUp route:", err); // This will show the true backend error
//         next(err);
//     }
// });

router.post("/signIn", userController.signIn); // Route to sign up user

module.exports = {
    router
}