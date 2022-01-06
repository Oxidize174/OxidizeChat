const db = require("../models");
const Message = db.message;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.text) {
        res.status(400).send({
            message: "Text can not be empty!"
        });
        return;
    }
    if (!req.body.companionUser) {
        res.status(400).send({
            message: "Users can not be empty!"
        });
        return;
    }

    const message = {
        text: req.body.text,
        userFrom: req.user.id, // Текущий авторизованный пользователь
        userTo: req.body.companionUser, // Собеседник
    };
    Message.create(message)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Message."
            });
        });
};

exports.findGroup = (req, res) => {
    if (!req.query.companionUser) {
        res.status(400).send({
            message: "Users can not be empty!"
        });
        return;
    }

    Message.findAll({
        where: {
            [Op.or]: [
                {
                    userTo: req.user.id, // Текущий авторизованный пользователь
                    userFrom: req.query.companionUser, // Собеседник
                },
                {
                    userFrom: req.user.id,
                    userTo: req.query.companionUser,
                },
            ]
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving messages."
            });
        });
};
