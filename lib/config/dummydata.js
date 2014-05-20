'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Thing = mongoose.model('Thing'),
    Gift = mongoose.model('Gift');

/**
 * Populate database with sample application data
 */

 // Clear old users, then add a default user
 User.find({}).remove(function() {
 User.create({
 provider: 'local',
 name: 'Test User',
 email: 'test@test.com',
 password: 'test'
 }, function() {
 console.log('finished populating users');
 }
 );
 });

Gift.find({}).remove(function () {
    Gift.create({
            name: 'Dinner Plate Set of 12',
            owner: {
                email: 'test1@test.com',
                name: 'Joe Schmoe'
            },
            description: 'A set of plates for dinner',
            url: 'http://matthewfoxx.com'
        }, {
            name: 'Lazy Boi Sofa',
            owner: {
                email: 'test3@test.com',
                name: 'Sally Smith'
            },
            description: 'Dah comfiest',
            url: 'http://matthewfoxx.com'
        },
        {
            name:'Washer/Dryer Combo',
            owner:{
                email:'test3@test.com',
                name:'Bryan Hill'
            },
            description:'Something to wash the clothes with',
            url:'http://matthewfoxx.com'
        },
        {
            name:'Curtain Set',
            owner:{
                email:'test3@test.com',
                name:'Mack Kay'
            },
            description:'Set of nice curtains for the windows',
            url:'http://matthewfoxx.com'
        },
        {
            name:'46" Flat Screen TV',
            owner:{
                email:'test4@test.com',
                name:'Joe Schmoe'
            },
            description:'Big screen tv for watching the game',
            url:'http://matthewfoxx.com'
        }
    )
});
