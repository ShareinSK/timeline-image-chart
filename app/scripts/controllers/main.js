'use strict';

/**
 * @ngdoc function
 * @name timelineImageChartApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the timelineImageChartApp
 */
angular.module('timelineImageChartApps')
  .controller('MainCtrl', function ($scope) {
    $scope.chartData = {
      data: [
        {x: new Date(), y: 10, url:'https://github.com/favicon.ico'}
      ],
      options: {
        width: 1000,
        height: 300,
        offset: 5
      }
    };
  });
