'use strict';

angular.module('inventorioApp')
  .controller('MainCtrl', ['$scope', '$state', 'socket', 'Auth', 'Inventory', 
  function ($scope, $state, socket, Auth, Inventory) {
    var vm = this;

    vm.itemListActive = [];
    vm.itemListInactive = [];
    vm.itemToAdd = {};
    vm.tempItem = Inventory.getServiceItem();

    $scope.isLoggedIn = Auth.isLoggedIn;

    activate();

    vm.transferEditView = function(i) {
      Inventory.setServiceItem(i);
      $state.go('edit');
    };

    vm.addNewItem = function() {
      Inventory.postItem(vm.itemToAdd)
      .success(function(response) {
        console.log('I guess something went right');
        console.log(response);
      })
      .error(function(response) {
        console.log('sorry, that didn\'t work man');
        console.log(response);
      });
    };

    vm.editCurrentItem = function() {
      Inventory.putItem(vm.tempItem)
      .success(function(response) {
        console.log('I guess something went right');
        console.log(response);
      })
      .error(function(response) {
        console.log('sorry, that didn\'t work man');
        console.log(response);
      });
    };

    vm.deleteCurrentItem = function() {
      console.log('oookkkkkk');
      Inventory.deleteItem(vm.tempItem)
      .success(function(response) {
        console.log('I guess something went right');
        console.log(response);
      })
      .error(function(response) {
        console.log('sorry, that didn\'t work man');
        console.log(response);
      });
      $state.go('main');
    };

    function activate() {
      Inventory.getItems()
      .success(function(response) {
        angular.forEach(response, function(val) {
          if(val.quantity > 0) {
            vm.itemListActive.push(val);
          }
          else {
            vm.itemListInactive.push(val);
          }
        });
      });
    }
  }]);
