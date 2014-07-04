'use strict';

angular.module('ui.resourcePicker', [])
    .value('uiResourcePickerConfig', {})
    .directive('uiResourcePicker', ['uiResourcePickerConfig', function (uiResourcePickerConfig) {
        uiResourcePickerConfig = uiResourcePickerConfig || {};

        // Set some default options
        var options = {
            name: null,
            parameters: {
                isPickerMultiSelectAllowed: true,
                isPickerOnly: false,
                isWorkspace: false,
                resourceTypes: {},
                callback: function (nodes) {
                    return null;
                }
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

                if ( typeof options.name === 'undefined' || options.name === null || options.name.length === 0 ) {
                    // Generate unique name
                    options.name = 'picker-' + Math.floor(Math.random() * 10000);
                }

                if (!attrs.id) {
                    attrs.$set('id', options.name);
                }
                else {
                    // Reuse existing id as picker name
                    options.name = attrs.id;
                }

                // Initialize resource picker object
                Claroline.ResourceManager.createPicker(options.name, options.parameters);

                $scope.resourcePickerOpen = function (pickerName) {
                    // Initialize resource picker object
                    Claroline.ResourceManager.picker(pickerName, 'open');
                };

                $scope.resourcePickerClose = function (pickerName) {
                    Claroline.ResourceManager.picker(pickerName, 'close');
                };

                el[0].onclick = function (e) {
                    e.preventDefault();
                    $scope.resourcePickerOpen(this.id);
                };
            }
        };
    }]);
