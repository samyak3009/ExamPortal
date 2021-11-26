(function(){
	'use strict';

	angular.module('minotaur')
	.directive('exportToExcel',exportToExcel);

	function exportToExcel(ExportToExcel){
		var directive = {};
		directive.restrict = 'A';
		directive.compile = function(element, attributes){
			element.addClass('btn btn-link');
			var text = element.text();
			element.text("");
			element.append('<span class="glyphicon glyphicon-share"></span>'+text)
			var link = function($scope, element, attributes){
				element.on('click',function(){
				if('divId' in attributes){
					ExportToExcel.export_div(attributes.divId, attributes.fileName);
				}
				else if('tableId' in attributes){
					ExportToExcel.export(attributes.tableId, attributes.fileName);
				}
				});
			}
			return link;
		}
		return directive;		
	}
})();