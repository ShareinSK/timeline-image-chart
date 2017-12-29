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
        {date: new Date('2017-12-30'), y: 15}
      ],
      options: {
        width: 1000,
        height: 300,
        offset: 2,
        tickType: 0,
        tickDuration: 6,
        xZoom: 1,
        yZoom: 0,
        type: 'image'
      }
    };
  });
