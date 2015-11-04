'use strict';

angular.module('inventorioApp')
	.service('Inventory', ['$http', function ($http) {
		var baseUrl = 'http://10.34.24.120:9000';
		var serviceItem = {};

		this.setServiceItem = function(item) {
			serviceItem = item;
		};

		this.getServiceItem = function() {
			return serviceItem;
		};

		this.getItems = function() {
		  var service = $http({
		    method: 'GET',
		    url: baseUrl + '/api/items'
		  });
		  return service;
		};

		this.postItem = function(item) {
			console.log(item);
			var service = $http({
				method: 'POST',
				url: baseUrl + '/api/items',
				data: item
			});
			return service;
		};

		this.putItem = function(item) {
			console.log(item);
			var service = $http({
				method: 'PUT',
				url: baseUrl + '/api/items/' + item._id,
				data: item
			});
			return service;
		};

		this.deleteItem = function(item) {
		    var service = $http({
		      method: 'DELETE',
		      url: baseUrl + '/api/items/' + item._id
		    });
		    return service;
		  };
	}]);