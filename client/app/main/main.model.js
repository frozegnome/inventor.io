(function() {
	'use strict';

	var Item = function() {
		this.name = '';
		this.quantity = 0;
	};

	Item.minQuantity = 0;
	Item.maxQuantity = 99;

	Item.prototype = {
		setName: function(n) {
			this.name = n;
		},
		setQuantity: function(q) {
			if(q >= Item.minQuantity && q <= Item.maxQuantity) {
				this.quantity = q;
			}
			else {
				throw 'Invalid quantity value: ' + q;
			}
		}
	};

	var module = angular.module('ItemModels');
	module.value('Item', Item);
})();