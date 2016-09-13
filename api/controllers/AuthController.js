var rp = require('request-promise');

/**
 * AuthController
 * @description :: Server-side logic for manage user's authorization
 */
var passport = require('passport');
/**
 * Triggers when user authenticates via passport
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} error Error object
 * @param {Object} user User profile
 * @param {Object} info Info if some error occurs
 * @private
 */
function _onPassportAuth(req, res, error, user, info) {
  if (error) return res.serverError(error);
  if (!user) return res.unauthorized(null, info && info.code, info && info.message);

  return res.ok({
    // TODO: replace with new type of cipher service
    token: authService.createToken(user),
    data: user
  });
}

module.exports = {
  /**
   * Sign up in system
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  signup: function(req, res) {
    User
      .create(_.omit(req.allParams(), 'id'))
      .then(function(user) {
        return {
          // TODO: replace with new type of cipher service
          token: authService.createToken(user),
          data: user
        };
      })
      .then(res.created)
      .catch(res.serverError);
  },

  /**
   * Sign in by local strategy in passport
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  signin: function(req, res) {
    passport.authenticate('local',
      _onPassportAuth.bind(this, req, res))(req, res);
  },

  fbLogin: function(req, res) {
    var user = req.allParams();
    console.dir(user);
    rp(`https://graph.facebook.com/v2.7/debug_token?input_token=${user.token}&access_token=${sails.config.fbSettings.appId}|${sails.config.fbSettings.appSecret}`)
      .then(response => {
        'use strict';
        let findUser = require('bluebird').promisify(User.findOne);
        findUser({
            login: user.login
          })
          .then(user => {
            if (user) {
              return res.created({
                token: authService.createToken(user),
                data: user
              });
            }

            return User.create({
                login: user.login,
                password: sails.config.jwtSettings.secret
              })
              .then(user => res.created({
                token: authService.createToken(user),
                data: user
              }))
          })

      })
      .catch(error => {
        console.dir(error)
        return res.badRequest({
          message: 'Use not found'
        });
      })
  },

  facebook: function(req, res, next) {
    return passport.authenticate('facebook')(req, res, next);
  },

  facebookCallback: function(req, res, next) {
    return passport.authenticate('facebook', function(err, user, info) {
      console.dir('CALLBACK', err);
      if (err && err.type === "OAuthException") {
        return res.redirect('/auth/facebook');
      }
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(new Error('User not found'));
      }

      return res.created({
        token: authService.createToken(user),
        data: user
      });
    })(req, res, next);


  }
};
