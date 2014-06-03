'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    Gift = mongoose.model('Gift');

/**
 * Get Gifts
 */
    exports.getAll = function (req, res) {
        if(req.role == 'admin')
        {
            return Gift.find()
                .populate({
                    path:'owner.user',
                    model:'User'})
                .exec(function (err, gifts) {
                    if (!err) {
                        return res.json(gifts);
                    } else {
                        return res.send(err);
                    }
                });
        }
        else{
        return Gift.find({})
            .exec(function(err,gifts){
                if(!err)
                {
                    //this is terrible but i can't figure out how to scrub the data and also keep "isClaimed" working
                    gifts.forEach(function(gift){
                       if(gift.owner.name !== undefined){
                           gift.owner.name = "name";
                           gift.owner.email = "email";
                       }
                    });
                    return res.json(gifts);
                }
                else{
                    return res.send(err);
                }
            });
        }
    };

exports.create = function(req, res, next)
{
    var newGift = new Gift(req.body);
    newGift.save(function(err, gift){
      if(err) return res.json(400,err);
        res.json(gift);
    });
};

exports.deleteGift = function(req, res, next)
{
    Gift.findByIdAndRemove(req.params.id, function(err){
        if(err) return res.json(400,err);
        res.send(200);
    })
};

exports.claim = function(req, res, next)
{
    Gift.findById(req.params.id, function(err,gift){
       gift.owner = req.body.owner;
        gift.save(function(err){
            if(err)
            {
                return res.json(400,err);
            }
            res.send(200);
        })
    });
};


exports.update = function(req,res,next)
{
  Gift.findById(req.params.id, function(err, gift){
     gift.owner = req.body.owner;
     gift.name = req.body.name;
     gift.description = req.body.description;
     gift.url = req.body.url;
      gift.save(function(err){
          if(err) return res.json(400,err);
          res.send(200);
      });
  });
};