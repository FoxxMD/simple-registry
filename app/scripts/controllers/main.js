'use strict';

angular.module('simpleRegistryApp')
    .directive('mainctrl', ['Gift', function (Gift) {
        return {
            restrict: 'AE',
            templateUrl: 'partials/main',
            controller: function ($scope) {
                $scope.gifts = Gift.getList().$object;
            },
            link: function (scope, element, attrs) {
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
