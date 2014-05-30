'use strict';

angular.module('simpleRegistryApp')
    .directive('mainctrl', ['Gift', '$timeout', '$rootScope','Auth', function (Gift, $timeout, $rootScope, Auth) {
        return {
            restrict: 'AE',
            templateUrl: 'partials/main',
            controller: function ($scope) {
                Gift.getList().then(function(gifts){
                    $scope.gifts = gifts;
                });
                $scope.selectedFilter = 'All';

                $scope.giftFilter = function (gift) {
                    switch ($scope.selectedFilter) {
                        case 'All':
                            return true;
                        case 'Yours':
                            if (!gift.isClaimed) {
                                //TODO make this work once user actually works
                                return gift.owner.user == $rootScope.currentUser.id;
                            }
                            else {
                                return false;
                            }
                        case 'Unclaimed':
                            return !gift.isClaimed;
                    }
                };
                $scope.saveGift = function(){
                        this.gift.save();
                };
                $scope.claimGift = function(){
                    var that = this;
                    if(that.isRegistering)
                    {
                        Auth.createUser({
                            name: that.contactForm.$data.Name,
                            email: that.contactForm.$data.Email,
                            password: that.contactForm.$data.Password
                        })
                        .then( function() {
                            that.gift.owner.user = $rootScope.currentUser.id;
                            that.gift.post('claim',that.gift).then(function() {
                                that.showContactForm = false;
                            }, function(err) {
                                return err;
                            });
                        })
                        .catch( function(err) {
                                err = err.data;
                                $scope.errors = '';

                                angular.forEach(err.errors, function(error, field) {
                                    $scope.errors+= error.message + '<br/>';
                                });
                        })
                    }
                    that.showContactForm = false;
                };
                $scope.deleteGift = function(){
                    var that = this;
                    this.gift.remove().then(function(){
                        $scope.gifts.splice($scope.gifts.indexOf(that.gift),1);
                    },
                    function(err){
                        console.log('[ERROR] ' + err);
                    });

                };
                $scope.tryRegister = function(pwData)
                {
                    if(this.$parent.isRegistering)
                    {
                        return pwData === undefined ? 'Password must not be empty!' : null;
                    }
                }
            },
            link: function (scope, element, attrs) {
                scope.toggleMenu = function () {
                    var container = $(document).find('.st-container');
                    if (!container.hasClass('st-menu-open')) {
                        container.addClass('st-menu-open');
                        $timeout(function () {
                            container.find('.st-pusher').on('click', function () {
                                container.removeClass('st-menu-open');
                                container.find('.st-pusher').off();
                            });
                        }, 0);

                    }
                };
                $(element).on('click', '.initialButton', function (event) {
                    var giftbox = $(event.currentTarget).closest('.giftbox');
                    if(giftbox.attr('style')) {
                        giftbox.removeAttr('style');
                    }
                    else {
                        giftbox.css('height', (giftbox.height() + giftbox.find('.gift').outerHeight()));
                    }
                });
                scope.createGift = function(){
                    var that = this;
                    Gift.post(this.newGiftForm.$data).then(function(newgift){
                        $(element).find('.creationBox').removeAttr('style');
                        that.newGiftForm.name = null;
                        that.newGiftForm.description = null;
                        that.newGiftForm.url = null;
                        scope.gifts.unshift(newgift);
                        return false;
                    }, function(error){
                        return error;
                    });
                };
                scope.checkForUser = function(event){
                    if(!$rootScope.currentUser){
                        this.contactForm.$show();
                        //this.gift.owner = {};
                        this.showContactForm = true;
                    }
                };
                $(element).on('click', '.buttonPaneChange', function(event){
                    //TODO clean this shit up
                    var giftbox = $(event.currentTarget).closest('.giftbox');
                    $timeout(function(){
                        var activePane = giftbox.find('.activePane');
                        giftbox.css('height', (20 + $(activePane[activePane.length-1]).outerHeight()));
                    },20);

                });
            }
        }
    }]);
