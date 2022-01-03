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

    const message = {
        text: req.body.text,
        userId: req.body.userId,
       // groupId: 0
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

exports.findAll = (req, res) => {
    Message.findAll()
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