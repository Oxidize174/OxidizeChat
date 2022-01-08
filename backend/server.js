const express = require("express");
const session = require("express-session")
const cors = require("cors");
const passport = require("passport")
const app = express();
const {loginStrategy} = require("./config/auth.config")
const flash = require("connect-flash")
const websocket = require('./config/ws.config')

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser(function (user, done) {
    const userWithoutPassword = {...user}
    delete userWithoutPassword.password
    done(null, userWithoutPassword)
})

app.use(cors({
    origin: 'http://localhost',
    credentials: true,
}));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

const sessionParser = session({secret: 'RANDOM_SECRET_KEY', resave: false, saveUninitialized: true})
app.use(sessionParser)
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

passport.use(loginStrategy);

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to application."});
});

const db = require("./models");
db.sequelize.sync({force: true}).then(() => {
    console.log("Drop and re-sync db.");
    require("./models/test-data")(db);
});

require("./routes")(app);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

websocket({server, sessionParser})
