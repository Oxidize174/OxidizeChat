const localStrategy = require("passport-local").Strategy;
const db = require("../models");

const loginStrategy = new localStrategy(
    {
        usernameField: 'login',
        passwordField: 'password',
    },
    function (username, password, done) {
        console.log('localStrategy > username, password', username, password)
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

module.exports = loginStrategy