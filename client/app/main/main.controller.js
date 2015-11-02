'use strict';

angular.module('inventorioApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    var vm = this;

    vm.itemList = {};
    vm.itemToAdd = {};

    $http.get('/api/items')
      .success(function(testItems) {
        vm.itemList = testItems;
        socket.syncUpdates('thing', vm.testItems);
      });

    vm.addItem = function() {
      if(vm.itemToAdd === '') {
        return;
      }
      $http.post('/api/items', { name: vm.newItem });
      vm.newItem = '';
    };

    vm.deleteItem = function(item) {
      $http.delete('/api/items/' + item._id);
    };
  });
