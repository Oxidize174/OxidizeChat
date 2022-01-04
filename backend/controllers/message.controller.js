const db = require("../models");
const Message = db.message;
const Group = db.group;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.text) {
        res.status(400).send({
            message: "Text can not be empty!"
        });
        return;
    }
    if (!req.body.userMe || !req.body.userYou) {
        res.status(400).send({
            message: "Users can not be empty!"
        });
        return;
    }

    const message = {
        text: req.body.text,
        userFrom: req.body.userMe,
        userTo: req.body.userYou,
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
    if (!req.query.userMe || !req.query.userYou) {
        res.status(400).send({
            message: "Users can not be empty!"
        });
        return;
    }

    Message.findAll({
        // include: "users",
        where: {
            [Op.or]: [
                {
                    userTo: req.query.userMe,
                    userFrom: req.query.userYou,
                },
                {
                    userFrom: req.query.userMe,
                    userTo: req.query.userYou,
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