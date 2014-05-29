'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Gift Schema
 */
var GiftSchema = new Schema({
    name: String,
    owner: {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },
        email: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: false
        }
    },
    description: String,
    url: String
},{
    toObject:{
        virtuals:true
    },
    toJSON:{
        virtuals: true
    }
});

GiftSchema
    .virtual('isClaimed')
    .get(function(){
       return (this.owner.name !== undefined || this.owner.user !== undefined)
    });

GiftSchema.pre('save', function (next) {
    if(this._doc.owner !== undefined)
    {
        var getPropertyNames = Object.getOwnPropertyNames || function (obj) {
            var propNames = [];
            for (var propName in obj) {
                if (obj.hasOwnProperty(propName)) {
                    propNames.push(propName);
                }
            }
            return propNames;
        };
        if(getPropertyNames(this._doc.owner).length == 0 || (this._doc.owner.user !== undefined || (this._doc.owner.email != undefined && this._doc.owner.name !== undefined)))
        {
            next();
        }
        else{
            console.log('save error');
            next(new Error('Must be logged in or input email/name to claim a gift.'));
        }
    }
    else{
        next();
    }
});
mongoose.model('Gift', GiftSchema);
