const db = require("../models");
const passport = require("passport");
const User = db.user;

exports.getCurrentUser = (req, res) => {
    return res.send(req.user)
}

exports.logout = (req, res) => {
    req.logout()
    return res.send()
}

exports.login = (req, res, next) => {
    const callback = function (err, user, info) {
        if (err) {
            return res.status(500).send({message: info && info.message || "Неизвестная ошибка"});
        }
        if (!user) {
            return res.status(401).send({
                message: info && info.message || "Ошибка входа",
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
            message: "Имя не может быть пустым"
        });
        return;
    }
    if (!req.body.login) {
        res.status(400).send({
            message: "Логин не может быть пустым"
        });
        return;
    }
    if (!req.body.password) {
        res.status(400).send({
            message: "Пароль не может быть пустым"
        });
        return;
    }
    const user = {
        name: req.body.name,
        login: req.body.login,
        password: req.body.password
    };
    User.findOne({
        where: {
            login: user.login
        }
    }).then(data => {
        if (data) {
            res.status(400).send({
                message: "Пользователь уже существует"
            })
        } else {
            User.create(user)
                .then(data => {
                    req.logIn(data, function (err) {
                        if (err) {
                            next(err)
                        } else {
                            res.send(data);
                        }
                    })
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Произошла ошибка при создании пользователя."
                    });
                });
        }
    })
};

exports.findAll = (req, res) => {
    User.scope("withoutPassword").findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Произошла ошибка при получении пользователей."
            });
        });
}
