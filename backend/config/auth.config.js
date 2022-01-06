const localStrategy = require("passport-local").Strategy;
const db = require("../models");

function mustBeAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({message: 'Authorization required'});
    }
    next();
}

const loginStrategy = new localStrategy(
    {
        usernameField: 'login',
        passwordField: 'password',
    },
    function (username, password, done) {
        db.user.findOne({
            where: {
                login: username
            }
        })
            .then(user => {
                console.log('findOne > user', user)
                if (!user) {
                    return done(null, false, {message: 'Incorrect username'});
                }
                if (password !== user.password) {
                    // TODO: Use encryption
                    return done(null, false, {message: 'Incorrect password'});
                }
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            });
    }
)

module.exports = {loginStrategy, mustBeAuthenticated}
