/**
 * Passport configuration file where you should configure strategies
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var EXPIRES_IN_MINUTES = 60 * 60 * 24;
var SECRET = process.env.SECRET || "4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM";
var ALGORITHM = "HS256";

/**
 * Configuration object for local strategy
 */
var LOCAL_STRATEGY_CONFIG = {
  usernameField: 'login',
  passwordField: 'password',
  passReqToCallback: false
};

/**
 * Triggers when user authenticates via local strategy
 */
function _onLocalStrategyAuth(login, password, next) {
  User.findOne({
      login: login
    })
    .exec(function(error, user) {
      if (error) return next(error, false, {});

      if (!user) return next(null, false, {
        code: 'E_USER_NOT_FOUND',
        message: login + ' is not found'
      });

      // TODO: replace with new cipher service type
      if (!authService.comparePassword(password, user))
        return next(null, false, {
          code: 'E_WRONG_PASSWORD',
          message: 'Password is wrong'
        });

      return next(null, user, {});
    });
}

/**
 * Triggers when user authenticates via JWT strategy
 */
function _onJwtStrategyAuth(payload, next) {
  var user = payload.user;
  return next(null, user, {});
}

passport.use(
  new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));

var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {
  secretOrKey: SECRET,
  passReqToCallback: false
};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  User.findOne({
    id: jwt_payload.id
  }, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
      // or you could create a new account
    }
  });
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID||'1',
    clientSecret: process.env.FB_CLIENT_SECRET||'1',
    callbackURL: (process.env.BASE_URL||'http://localhost:3030')+"/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    'use strict';

    let findUser = require('bluebird').promisify(User.findOne);
    let createUser = require('bluebird').promisify(User.create);

    findUser({ login: profile.displayName})
    .then(user=>{
      if (user){
        return cb(null, user);
      }

      return createUser({ login: profile.displayName, password: process.env.DEFAULT_PASSWORD || SECRET })
      .then(user=>cb(null, user))
    })
    .catch(err=>cb(err,null));
  }
));


module.exports.jwtSettings = {
  expiresIn: EXPIRES_IN_MINUTES,
  secret: SECRET,
  algorithm: ALGORITHM
};
