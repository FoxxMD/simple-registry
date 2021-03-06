'use strict';

var index = require('./controllers'),
    users = require('./controllers/users'),
    gifts = require('./controllers/gifts'),
    session = require('./controllers/session'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes

  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword)
    .get(middleware.isAdmin, users.getAll);
  app.route('/api/users/me')
    .get(users.me);
  app.route('/api/users/:id')
    .get(middleware.isAdmin, users.show);
  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);
  app.route('/api/gifts')
      .get(middleware.checkAuth, gifts.getAll);
  app.route('/api/gifts')
      .post(middleware.isAdmin, gifts.create);
  app.route('/api/gifts/:id')
      .delete(middleware.isAdmin, gifts.deleteGift)
      .post(middleware.isAdmin, gifts.update)
      .put(middleware.isAdmin, gifts.update);
  app.route('/api/gifts/:id/claim')
      .post(gifts.claim)
      .put(gifts.claim);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);
};