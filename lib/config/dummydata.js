'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
/*    Thing = mongoose.model('Thing'),*/
    Gift = mongoose.model('Gift');

/**
 * Populate database with sample application data
 */

// Clear old users, then add a default user
 User.find({}).remove(function() {
 User.create({
 provider: 'local',
 name: 'Test User',
 role:'admin',
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
            description: 'A set of plates for dinner',
            url: 'http://matthewfoxx.com'
        }, {
            name: 'Lazy Boi Sofa',
            description: 'Dah comfiest',
            url: 'http://matthewfoxx.com'
        },
        {
            name: 'Washer/Dryer Combo',
            description: 'Something to wash the clothes with',
            url: 'http://matthewfoxx.com'
        },
        {
            name: 'Curtain Set',
            description: 'Set of nice curtains for the windows',
            url: 'http://matthewfoxx.com'
        },
        {
            name: '46" Flat Screen TV',
            description: 'Big screen tv for watching the game',
            url: 'http://matthewfoxx.com'
        },
        {
            name: 'Sunset horse ride on beach',
            description: 'use a saddle!',
            url: 'http://matthewfoxx.com'
        },
        {
            name: 'mountain hike day-trip package',
            description: 'get your adventure on',
            url: 'http://matthewfoxx.com'
        },
        {
            name: 'skydiving package',
            description: 'because we want this over, quickly',
            url: 'http://matthewfoxx.com'
        },
        {
            name: 'Airfare to honeymoon destination',
            description: 'shit\'s expsensive, yo',
            url: 'http://matthewfoxx.com'
        }
    );
});
