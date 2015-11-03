'use strict';

angular.module('inventorioApp')
	.service('Inventory', function ($http) {
		var baseUrl = 'http://10.34.24.120:9000';

		this.getItems = function() {
		  var service = $http({
		    method: 'GET',
		    url: baseUrl + '/api/items'
		  });
		  return service;
		};

		this.deleteItem = function(item) {
		    var service = $http({
		      method: 'DELTE',
		      url: baseUrl + '/api/items/' + item._id
		    });
		    return service;
		  };
	});