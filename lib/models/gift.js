'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Gift Schema
 */
var GiftSchema = new Schema({
    name: String,
    owner:{
        userId:Number,
        email: String,
        name: String
    },
    description: String,
    url: String
});

mongoose.model('Gift', GiftSchema);
