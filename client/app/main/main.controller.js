'use strict';

angular.module('inventorioApp')
  .controller('MainCtrl', function ($scope, socket, Auth, Inventory) {
    var vm = this;

    vm.itemListActive = [];
    vm.itemListInactive = [];
    vm.itemToAdd = {};

    $scope.isLoggedIn = Auth.isLoggedIn;

    activate();

    function activate() {
      Inventory.getItems()
      .success(function(response) {
        angular.forEach(response, function(val) {
          if(val.isActive) {
            vm.itemListActive.push(val);
          }
          else {
            vm.itemListInactive.push(val);
          }
        });
      });
    }
  });
