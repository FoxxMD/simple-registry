'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
/*    Thing = mongoose.model('Thing'),*/
    Gift = mongoose.model('Gift');

/**
 * Populate database with sample application data
 */

// Create admin user if no users present in DB
User.count(function(err,count){
if(count == 0)
{
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
}
});
// Create dummy gifts if none present in DB
Gift.count(function(err,count){
    if(count == 0)
    {
    Gift.create({
            name: 'Dinner Plate Set of 12',
            description: 'A set of plates for dinner',
            url: 'http://www.target.com/p/corelle-6-piece-dinner-plate-set-winter-frost-white/-/A-14551453'
        }, {
            name: 'Lazy Boi Sofa',
            description: 'Dah comfiest',
            url: 'http://www.la-z-boy.com/Product/53-6904/Daphne-Casual-Sofa/'
        },
        {
            name: 'Washer/Dryer Combo',
            description: 'Something to wash the clothes with',
            url: 'http://www.amazon.com/LG-FRONT-WASHER-DRYER-COMBO/dp/B0039V7JFG'
        },
        {
            name: 'Curtain Set',
            description: 'Set of nice curtains for the windows',
            url: 'http://amzn.com/B000VLZJLS'
        },
        {
            name: '46" Flat Screen TV',
            description: 'Big screen tv for watching the game',
            url: 'http://amzn.com/B00II6VT12'
        },
        {
            name: 'Sunset horse ride on beach',
            description: 'use a saddle!',
            url: 'http://www.sunsetranchhollywood.com/'
        },
        {
            name: 'skydiving package',
            description: 'because we want this over, quickly',
            url: 'https://www.skydiveatlanta.com/'
        },
        {
            name: 'Airfare to honeymoon destination',
            description: 'expsensive, yo',
            url: 'http://kayak.com'
        }
    );
    }
});
