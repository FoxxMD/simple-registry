'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    Gift = mongoose.model('Gift');

/**
 * Get Gifts
 */
exports.getAll = function (req, res) {
    return Gift.find(function (err, gift) {
        if (!err) {
            return res.json(gift);
        } else {
            return res.send(err);
        }
    });
};