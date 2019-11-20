const passport = require('passport');
const checkValidation = require('./checkValidation');

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google'),
    (req, res) => {
      res.redirect('/api');
    });

  app.post('/api/auth',
    checkValidation(['username', 'password']),
    passport.authenticate('local', {
      successRedirect: '/api',
      failureRedirect: '/',
      failureFlash: true
    }));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email', 'public_profile']
  }));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/api',
      failureRedirect: '/'
    }),
    function (req, res) {
      res.redirect('/');
    });
}