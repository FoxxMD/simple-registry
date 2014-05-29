'use strict';

/**
 * Custom middleware used by the application
 */
module.exports = {

  /**
   *  Protect routes on your api from unauthenticated access
   */
  auth: function auth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send(401);
  },
    isAdmin: function(req,res,next){
        if(req.user.userInfo.role == 'admin')
        {
            return next();
        }
        res.send(401);
    },
    checkAuth: function(req, res, next){
      if(req.isAuthenticated())
      {
          req.role = req.user.userInfo.role;
      }
        else{
          req.role = 'anonymous';
      }
        return next();
    },

  /**
   * Set a cookie for angular so it knows we have an http session
   */
  setUserCookie: function(req, res, next) {
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.userInfo));
    }
    next();
  }
};