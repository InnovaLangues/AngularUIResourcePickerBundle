'use strict';

angular.module('ui.resourcePicker', [])
    .value('uiResourcePickerConfig', {})
    .directive('uiResourcePicker', ['uiResourcePickerConfig', function (uiResourcePickerConfig) {
        uiResourcePickerConfig = uiResourcePickerConfig || {};

        // Set some default options
        var options = {
            parentElement: '#resourcePicker',
            isPickerMultiSelectAllowed: true,
            isPickerOnly: false,
            isWorkspace: false,
            resourceTypes: {},
            callback: function (nodes) {
                return null;
            }
        };

        return {
            restrict: "A",
            link: function ($scope, el, attrs) {
                if (attrs.uiResourcePicker) {
                    var expression = $scope.$eval(attrs.uiResourcePicker);
                } else {
                    var expression = {};
                }

                // Merge default config with user config
                angular.extend(options, uiResourcePickerConfig, expression);

                var $parentElement = $(options.parentElement);
                if ($parentElement === undefined || $parentElement.length === 0) {
                    $('body').append('<div id="' + options.parentElement + '"></div>');
                }

                // Reinject jQuery object into Picker config
                options.parentElement = $(options.parentElement);

                // Initialize resource picker object
                Claroline.ResourceManager.initialize(options);

                $scope.resourcePickerOpen = function () {
                    Claroline.ResourceManager.picker('open');
                }

                $scope.resourcePickerClose = function () {
                    Claroline.ResourceManager.picker('close');
                }

                el[0].onclick = function(e){
                    e.preventDefault();
                    $scope.resourcePickerOpen();
                };
            }
        };
    }]);
