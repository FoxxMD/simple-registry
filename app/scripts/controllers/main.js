'use strict';

angular.module('simpleRegistryApp')
    .directive('mainctrl', ['Gift', '$timeout', '$rootScope', 'Auth', function (Gift, $timeout, $rootScope, Auth) {
        return {
            restrict: 'AE',
            templateUrl: 'partials/main',
            controller: function ($scope) {
                Gift.getList().then(function (gifts) {
                    $scope.gifts = gifts;
                });
                $scope.selectedFilter = 'All';

                $scope.giftFilter = function (gift) {
                    switch ($scope.selectedFilter) {
                        case 'All':
                            return true;
                        case 'Yours':
                            if (gift.isClaimed) {
                                return gift.owner.user == $rootScope.currentUser.id;
                            }
                            else {
                                return false;
                            }
                        case 'Unclaimed':
                            return !gift.isClaimed;
                    }
                };
                $scope.saveGift = function () {
                    if (this.gift.save == undefined) {
                        var that = this;
                        Gift.post(this.giftForm.$data).then(function (returnedGift) {
                            that.gift = returnedGift;
                        });
                    }
                    else {
                        this.gift.save();
                    }
                };
                $scope.onGiftFormCancel = function () {
                    if (this.gift.id == undefined) {
                        this.$parent.gifts.splice(this.$parent.gifts.indexOf(this.gift), 1);
                    }
                };
                $scope.claimGift = function () {
                    var that = this;
                    if (that.isRegistering) {
                        Auth.createUser({
                            name: that.contactForm.$data.Name,
                            email: that.contactForm.$data.Email,
                            password: that.contactForm.$data.Password
                        })
                            .then(function () {
                                that.gift.owner.user = $rootScope.currentUser.id;
                                that.gift.post('claim', that.gift).then(function () {
                                    that.showContactForm = false;
                                }, function (err) {
                                    return err;
                                });
                            })
                            .catch(function (err) {
                                err = err.data;
                                $scope.errors = '';

                                angular.forEach(err.errors, function (error, field) {
                                    $scope.errors += error.message + '<br/>';
                                });
                            })
                    }
                    that.showContactForm = false;
                };
                $scope.deleteGift = function () {
                    var that = this;
                    this.gift.remove().then(function () {
                            $scope.gifts.splice($scope.gifts.indexOf(that.gift), 1);
                        },
                        function (err) {
                            console.log('[ERROR] ' + err);
                        });

                };
                $scope.tryRegister = function (pwData) {
                    if (this.$parent.isRegistering) {
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
                $(element).on('mousedown', '.initialButton', function (event) {
                    if (event.target.nodeName !== "INPUT") {
                        expandGift(event.currentTarget);
                    }
                });
                function expandGift(targetElement) {
                    var giftbox = $(targetElement).closest('.giftbox');
                    if (giftbox.attr('style')) {
                        giftbox.removeAttr('style');
                    }
                    else {
                        giftbox.css('height', (giftbox.height() + giftbox.find('.activePane').outerHeight()));
                    }
                }

                scope.createGift = function () {
                    //TODO refactor into ng-click
                    var newgift = {
                        owner: {}
                    };
                    scope.gifts.unshift(newgift);
                };
                scope.openOnCreate = function () {
                    //TODO refactor this so it only occurs on a new gift insert. Need a way to identify element being created.
                    if (this.gift.id == undefined) {
                        this.giftForm.$show();
                        $timeout(function () {
                            //TODO make this work with expandGift. Right now angular animation classes conflict with expandGift functionality.
                            var newGift = $(element).find('li.giftbox:nth-child(2)');
                            newGift.css('height', (newGift.height() + newGift.find('.activePane').outerHeight()));
                        }, 200);
                    }
                };
                scope.checkForUser = function (event) {
                    //TODO refactor into claimGift
                    if (!$rootScope.currentUser) {
                        this.contactForm.$show();
                        this.showContactForm = true;
                    }
                    else {
                        this.gift.owner = {};
                        this.gift.owner.user = $rootScope.currentUser.id;
                        this.gift.post('claim', this.gift).then(function () {
                        }, function (err) {
                            console.log(err);
                            return err;
                        });
                    }
                };
                $(element).on('click', '.buttonPaneChange', function (event) {
                    //TODO clean this shit up
                    var giftbox = $(event.currentTarget).closest('.giftbox');
                    $timeout(function () {
                        var activePane = giftbox.find('.activePane');
                        giftbox.css('height', (20 + $(activePane[activePane.length - 1]).outerHeight()));
                    }, 20);

                });
            }
        }
    }]);
