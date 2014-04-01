'use strict';

angular.module('ui.resourcePicker', [])
    .value('uiResourcePickerConfig', {})
    .directive('uiResourcePicker', ['uiResourcePickerConfig', function (uiResourcePickerConfig) {
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

        uiResourcePickerConfig = uiResourcePickerConfig || {};

        // Merge default config with user config
        angular.extend(options, uiResourcePickerConfig);

        return {
            restrict: "A",
            link: function ($scope, el, attrs) {
                var $parentElement = $(options.parentElement);
                if ($parentElement === undefined || $parentElement.length === 0) {
                    $('body').append('<div id="' + options.parentElement + '"></div>');
                }

                // Reinject jQuery object into Picker config
                options.parentElement = $parentElement;

                // Initialize resource picker object
                Claroline.ResourceManager.initialize(options);

                $scope.resourcePickerOpen = function () {
                    Claroline.ResourceManager.picker('open');
                }

                $scope.resourcePickerClose = function () {
                    Claroline.ResourceManager.picker('close');
                }
            }
        };
    }]);
