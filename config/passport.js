const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email", passwordField: "password" },
            async function(username, password, done) {
                const user = await User.findOne({ email: username }).select(
                    "+password"
                );
                if (!user) {
                    console.log("no user");
                    return done(null, false);
                }
                try {
                    if (password == user.password) {
                        console.log("working");
                        return done(null, user);
                    }
                    const validLogin = await bcrypt.compare(password, user.password);
                    if (validLogin) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                } catch (e) {
                    return done(e);
                }
            }
        )
    );
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};