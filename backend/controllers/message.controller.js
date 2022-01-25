const db = require("../models");
const Message = db.message;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.text) {
        res.status(400).send({
            message: "Текст не может быть пустым"
        });
        return;
    }
    if (!req.body.companionUser) {
        res.status(400).send({
            message: "Пользователи не могут быть пустыми!"
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
                    err.message || "Произошла ошибка при создании сообщения."
            });
        });
};

exports.findGroup = (req, res) => {
    if (!req.query.companionUser) {
        res.status(400).send({
            message: "Пользователи не могут быть пустыми!"
        });
        return;
    }

    Message.findAll({
        order: [['createdAt', 'ASC']],
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
                    err.message || "Произошла ошибка при получении сообщений."
            });
        });
};
