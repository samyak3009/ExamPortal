'use strict';
(function(){
    var lowercase = function(string){return (typeof string === 'string') ? string.toLowerCase() : string;};
    function toBoolean(value) {
      if (typeof value === 'function') {
        value = true;
      } else if (value && value.length !== 0) {
        var v = lowercase('' + value);
        value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]');
      } else {
        value = false;
      }
      return value;
    }
    var AngularPrint = angular.module('minotaur');
    AngularPrint.directive('printSection', function(){
            return {
                restrict: 'A',

                link: function(scope, element){
                        element[0].classList.add('printSection');
                    }
            };
        });
    AngularPrint.directive('printHide', function(){
            return {
                restrict: 'A',
                link: function(scope, element){
                        element[0].classList.add('printHide');
                    }
            };
        });
    AngularPrint.directive('printRemove', function(){
            return {
                restrict: 'A',
                link: function(scope, element){
                        element[0].classList.add('printRemove');
                    }
            };
        });
    AngularPrint.directive('printOnly', function(){
            return {
                restrict: 'A',
                link: {
                    post: function(scope, element){
                        element[0].classList.add('printOnly');
                    }
                }
            };
        });
    AngularPrint.directive('printAvoidBreak', function(){
            return {
                restrict: 'A',
                link: function(scope, element){
                        element[0].classList.add('avoidPageBreak');
                    }
            };
        });
    AngularPrint.directive('printBtn',['$window', function($window){
      // alert($window)S
        return {
            restrict: 'A',
            link: function(scope, element){
                element.on('click', function(){
                  console.log("hhbg")
                    $window.print();
                });
            }
        };
    }]);
    AngularPrint.directive('printIf', ['$animate', function($animate) {
        return function(scope, element, attr) {
          scope.$watch(attr.printIf, function applyPrint(value){
            if('printOnly' in attr){
                $animate[toBoolean(value) ? 'removeClass' : 'addClass'](element, 'printRemove');
            }
            else{
                $animate[toBoolean(value) ? 'addClass' : 'removeClass'](element, 'printSection');
            }
          });
        };
    }]);
    AngularPrint.directive('printLandscape',function(){
        return {
            restrict: 'A',
            link: function(){
                var sheet = (function() {
                    var style = document.createElement('style');
                    style.appendChild(document.createTextNode(''));
                    document.head.appendChild(style);
                    return style.sheet;
                })();
                sheet.insertRule('@page{size:landscape;}', 0);
            }
        };
    });
    AngularPrint.directive('printTable', function(){
        return function(scope, element, attr) {
            scope.$watch(attr.printTable, function makeTable(value){
                setTimeout(function(){
                    if(value == null) return;
                    var elem = element[0];
                    elem.classList.add('printSection');
                    elem.id = 'print-table';
                    var tds = elem.getElementsByTagName('td');
                    for(var i = 0, content, div; i < tds.length; i++){
                        content = tds[i].innerHTML;
                        tds[i].innerHTML = '';
                        div = document.createElement('div');
                        div.className = 'avoidPageBreak';
                        div.innerHTML = content;
                        tds[i].appendChild(div);
                    }
                    element[0] = elem;
                },1000);
            });
        };
    });
    AngularPrint.directive('printDiv',['$window', function($window){
        return {
            restrict: 'A',
            link: function(scope, element, attr){
                element.on('click', function(){
                    var innerContents = document.getElementById(attr.printDiv).innerHTML;
					var frame1 = document.createElement('iframe');
		            frame1.name = "frame1";
		            document.body.appendChild(frame1);
		            var str=""
		            var x;
                    var heading=document.getElementsByTagName('head')[0].innerHTML;
		            var frameDoc = (frame1.contentWindow) ? frame1.contentWindow : (frame1.contentDocument.document) ? frame1.contentDocument.document : frame1.contentDocument;
		            frameDoc.document.open();
		            console.log(heading)
					frameDoc.document.write('<html><link rel="stylesheet" href="/app/styles/components/tile.scss"><link rel="stylesheet" href="../bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss"><link rel="stylesheet" href="/app/styles/components/table.scss"><link rel="stylesheet" href="/app/styles/components/ui-elements.scss"><link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"><head>');
		            frameDoc.document.write('</head><body>');
		            frameDoc.document.write(innerContents);
		            frameDoc.document.write('</body></html>');
		            frameDoc.document.close();
		            setTimeout(function () {
		                window.frames["frame1"].focus();
		                window.frames["frame1"].print();
		                document.body.removeChild(frame1);
		            }, 500);
                });
            }
        };
    }]);
})();
