'use strict';

angular.module('simpleRegistryApp')
    .directive('mainctrl', ['Gift', '$timeout', '$rootScope', function (Gift, $timeout, $rootScope) {
        return {
            restrict: 'AE',
            templateUrl: 'partials/main',
            controller: function ($scope) {
                $scope.gifts = Gift.getList().$object;
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
                    var giftbox = $(this.parentElement);
                    if (giftbox.hasClass('expanded')) {
                        giftbox.css('height', '70px');
                        giftbox.removeClass('expanded');
                    }
                    else {
                        giftbox.css('height', (giftbox.height() + giftbox.find('.gift').outerHeight()));
                        giftbox.addClass('expanded');
                    }
                });
            }
        }
    }]);
