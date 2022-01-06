const {mustBeAuthenticated} = require("../config/auth.config")

module.exports = app => {
    const message = require("../controllers/message.controller.js");
    const user = require("../controllers/user.controller.js");
    const router = require("express").Router();

    router.post("/messages/create", mustBeAuthenticated, message.create);
    router.get("/messages/grouped", mustBeAuthenticated, message.findGroup)

    router.post("/user/signup", user.create);
    router.post('/user/signin', user.login)
    router.get("/users/get", mustBeAuthenticated, user.findAll)

    app.use('/api', router);
};
