const passport = require("passport");
const user = require("../controllers/user.controller");

module.exports = app => {
    const message = require("../controllers/message.controller.js");
    const user = require("../controllers/user.controller.js");
    const auth = require("../controllers/auth.controller.js");
    const router = require("express").Router();

    router.post("/messages/create", message.create);
    router.get("/messages/grouped", message.findGroup)

    router.post("/user/signup", user.create);
    router.post('/user/signin', passport.authenticate('local'), auth.login)
    router.get("/users/get", user.findAll)

    app.use('/api', router);
};