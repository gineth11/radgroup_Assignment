const passport= require("passport");
const mongoose= require("../db.js")
const passportLocal = require("passport-local")
const bcrypt =require("bcrypt");
const session = require("express-session");
const MongoStore = require('connect-mongo')
const App= require('../App');


let connection = mongoose.client.then((client) => {
    return client.connection;
})
    const client=mongoose.Database.getClient();
    const options = {
        client,
        dbName: "pet",
        collection: 'sessions',
        ttl: 20,
    }
    App.use(session({
        secret: "veryGood",
        resave: false,
        saveUninitialized: true,
        store: new MongoStore(options),
    }))


App.use(passport.initialize(undefined))
App.use(passport.session(undefined))
passport.serializeUser(function (user, done) {
    done(null, user._id)
})
passport.deserializeUser(async function (id, done) {
    const result = await mongoose.Database.collection("users").findById("users", id)
    if (result) done(null, result)
    else done(null, false)
})
//Use the express router
const LocalStrategy = passportLocal.Strategy
passport.use("local", new LocalStrategy({}, function (username, password, done) {
    mongoose.Database.collection("users").findOne({username: username}, async function (err, user) {
            if (err) return done(err)
            if (!user) return done(null, false, {message: 'Incorrect username'})
            bcrypt.compare(password, user.password, function (err, res) {
                    if (err) return done(err)
                    if (res) return done(null, user)
                    else return done(null, false, {message: 'Incorrect password'})
                }
            )
        }
    )
}));

module.exports= passport