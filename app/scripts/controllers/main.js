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
        {date: new Date(), y: 10}
      ],
      options: {
        width: 1000,
        height: 300,
        offset: 2,
        tickType: 0,
        tickDuration: 6,
        xZoom: 1,
        yZoom: 0
      }
    };
  });
