'use strict';

/**
 * @ngdoc overview
 * @name timelineImageChartApp
 * @description
 * # timelineImageChartApp
 *
 * Main module of the application.
 */
angular
  .module('timelineImageChartApps', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'timelineImageChartApp'
  ])
  .config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
  });
