'use strict';

angular.module('inventorioApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    var vm = this;
    vm.testItems = [];

    $http.get('/api/items').success(function(testItems) {
      vm.testItems = testItems;
      socket.syncUpdates('thing', vm.testItems);
    });

    vm.addThing = function() {
      if(vm.newItem === '') {
        return;
      }
      $http.post('/api/items', { name: vm.newItem });
      vm.newItem = '';
    };

    vm.deleteThing = function(item) {
      $http.delete('/api/items/' + item._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('item');
    });
  });
