const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Name can not be empty!"
        });
        return;
    }
    if (!req.body.login) {
        res.status(400).send({
            message: "Login can not be empty!"
        });
        return;
    }
    if (!req.body.password) {
        res.status(400).send({
            message: "Password can not be empty!"
        });
        return;
    }

    const user = {
        name: req.body.name,
        login: req.body.login,
        password: req.body.password
    };

    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};
