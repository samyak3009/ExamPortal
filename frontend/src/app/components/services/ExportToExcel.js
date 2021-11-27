(function() {
    'use strict';

    angular
        .module('minotaur')
        .factory('ExportToExcel', function($window, $timeout) {
            var uri = 'data:application/vnd.ms-excel;base64,',
                template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                base64 = function(s) { return $window.btoa(unescape(encodeURIComponent(s))); },
                format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) };
            return {
                export: function(tableID, filename) {

                    var table = $("#" + tableID);
                    var ctx = { worksheet: "sheet_name", table: table.html() };
                    var link = document.createElement("a");
                    document.body.appendChild(link);
                    link.download = filename + ".xls";
                    link.href = uri + base64(format(template, ctx));
                    $timeout(function() {
                        link.click();
                        document.body.removeChild(link);
                    }, 100);
                },
                export_lib: function(tableID, filename) {

                    var table = $("#" + tableID);
                    var ctx = { worksheet: "sheet_name", table: table.html() };
                    var link = document.createElement("a");
                    document.body.appendChild(link);
                    link.download = filename + ".xlsx";
                    link.href = uri + base64(format(template, ctx));
                    $timeout(function() {
                        link.click();
                        document.body.removeChild(link);
                    }, 100);
                },
                export_div: function(divID, filename) {
                    var data = new Blob([document.getElementById(divID).innerHTML], {
                        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=Windows"
                    });
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.href = URL.createObjectURL(data);
                    a.download = filename + ".xls";
                    $timeout(function() {
                        a.click();
                        document.body.removeChild(a);
                    }, 100);
                },
                export_table: function(tableID, filename){
                    var csv = [];
                    var container = document.querySelector("#"+tableID);
                    var rows = container.querySelectorAll("tr");
                    for (var i = 0; i < rows.length; i++) {
                        var row = [], cols = rows[i].querySelectorAll("td, th");
                        // console.log(cols);
                        for (var j = 0; j < cols.length; j++)
                             row.push(cols[j].innerText.replace(/\s/g, " "));
                        csv.push(row.join("~"));
                    }
                    // Download CSV file
                    console.log(window.activeElement);
                    // this.downloadCSV(csv.join("\n"), filename);
                },
                downloadCSV: function(csv, filename) {
                    var csvFile;
                    var downloadLink;

                    // CSV file
                    csvFile = new Blob([csv], {type: "text/csv"});

                    // Download link
                    downloadLink = document.createElement("a");

                    // File name
                    downloadLink.download = filename+".xls";

                    // Create a link to the file
                    downloadLink.href = window.URL.createObjectURL(csvFile);

                    // Hide download link
                    downloadLink.style.display = "none";

                    // Add the link to DOM
                    document.body.appendChild(downloadLink);

                    // Click download link
                    downloadLink.click();
                }
            };
        });
})();
