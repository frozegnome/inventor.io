'use strict';

angular.module('inventorioApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('add', {
        url: '/add',
        templateUrl: 'app/main/add-item.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('edit', {
        url: '/edit',
        templateUrl: 'app/main/edit-item.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      });
  });