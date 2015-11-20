'use strict';

angular.module('inventorioApp')
  .controller('MainCtrl', ['$scope', '$state', 'socket', 'Auth', 'Inventory', 
  function ($scope, $state, socket, Auth, Inventory) {
    var vm = this;

    // Declare ViewModel properties
    vm.itemListActive = [];
    vm.itemListInactive = [];
    vm.itemToAdd = {};
    vm.tempItem = Inventory.getServiceItem();

    // Check if a user is logged in
    $scope.isLoggedIn = Auth.isLoggedIn;

    activate();

    // Transfers temporary item to service for transferring views
    vm.transferEditView = function(i) {
      Inventory.setServiceItem(i);
      $state.go('edit');
    };

    // Calls GET service to remove item from interface
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

    // Calls PUT service to remove item from interface
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

    // Calls DELETE service to remove item from interface
    vm.deleteCurrentItem = function() {
      var confirmDelete = confirm('Are you sure you want to delete ' + vm.tempItem.name + '?');
      if(confirmDelete) {
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
      }
    };

    // Instantiate the main page
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
