const message = require("../controllers/message.controller");
module.exports = app => {
    const message = require("../controllers/message.controller.js");
    const user = require("../controllers/user.controller.js");
    const router = require("express").Router();

    router.post("/messages/create", message.create);
    router.get("/messages/get", message.findAll)

    router.post("/user/signup", user.create);
    router.get("/users/get", user.findAll)

    app.use('/api', router);
};