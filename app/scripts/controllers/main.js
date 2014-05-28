'use strict';

angular.module('simpleRegistryApp')
    .directive('mainctrl', ['Gift', '$timeout', '$rootScope', function (Gift, $timeout, $rootScope) {
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
                            if (gift.owner !== undefined && gift.owner.user !== undefined) {
                                return gift.owner.user.id == $rootScope.currentUser.id;
                            }
                            else {
                                return false;
                            }
                        case 'Unclaimed':
                            return gift.owner === undefined;
                    }
                };
                $scope.saveGift = function(){
                        this.gift.save();
                };
                $scope.claimGift = function(){
                    var that = this;
                    this.gift.post('claim',this.gift).then(function() {
                        that.gift.showContactForm = false;
                    }, function(err) {
                        return err;
                    });
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
                        this.gift.tryRegister = true;
                    }
                };
                $(element).on('click', '.buttonPaneChange', function(event){
                    var giftbox = $(event.currentTarget).closest('.giftbox');
                    $timeout(function(){
                        giftbox.css('height', (70 + giftbox.find('.activePane .gift').outerHeight()));
                    },0);

                });
            }
        }
    }]);
