const db = require("../models");
const passport = require("passport");
const User = db.user;
const Op = db.Sequelize.Op;

exports.getCurrentUser = (req, res) => {
    return res.send(req.user)
}

exports.login = (req, res, next) => {
    const callback = function (err, user, info) {
        if (err) {
            return res.status(500).send({message: info && info.message || "Unknown error"});
        }
        if (!user) {
            return res.status(401).send({
                message: info && info.message || "Login failure",
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.send()
        });
    }
    const authenticate = passport.authenticate('local', callback)
    authenticate(req, res, next);
}

exports.create = (req, res, next) => {
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
            req.logIn(user, function (err) {
                if (err) {
                    next(err)
                } else {
                    res.send(data);
                }
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
}
