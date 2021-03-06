/*!
    * Start Bootstrap - SB Admin v6.0.0 (https://startbootstrap.com/templates/sb-admin)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    (function($) {
    "use strict";

    // Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
        $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
            if (this.href === path) {
                $(this).addClass("active");
            }
        });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });
})(jQuery);

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Area Chart Example
/*var ctx = document.getElementById("chart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7", "Mar 8", "Mar 9", "Mar 10", "Mar 11", "Mar 12", "Mar 13"],
    datasets: [{
      label: "Sessions",
      lineTension: 0.3,
      backgroundColor: "rgba(2,117,216,0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(2,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      data: [10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159, 32651, 31984, 38451],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 40000,
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});*/

// Call the dataTables jQuery plugin
//$(document).ready(function() {
//  let datatable = $('#dataTable').DataTable();
//});

$(document).ready(function() {
  let datatable;
  let chart;
  $('#queryLanguage').on('change', function () {
    $('.queryLangauge').addClass("hidden");
    switch($('#queryLanguage').val()){
        case '/mongo':
            $("#mongogroup").removeClass("hidden");
            break;
        case '/mysql':
            $("#mysqlgroup").removeClass("hidden");
            break;
         default:
            // code block
            break;
    }
  });

  $('#search').on('click', function(){
    if (datatable != undefined) {
        datatable.destroy();
        $('#dataTable').empty();
    }
    if (chart != undefined) {
        chart.destroy();
        $('#chart').empty();
    }
    let query = $('#query').val();
    let databaseuri = $('#databaseuri').val();
    let database = $('#database').val();
    let collection = $('#collection').val();
    let url = $('#queryLanguage').val();

    $.ajax(url, {
        type: 'POST',
        data: { query: query, databaseuri: databaseuri, database: database, collection: collection},
        success: function (data, status, xhr) {
            let table = document.getElementById('dataTable');
            let dataset = data.data;
            let columns = data.titles;
            datatable = $('#dataTable').DataTable({
               "data": dataset,
               "columns": columns
            });

            let json = [];
            let headers = [];
            for (var i = 0; i < table.rows[0].cells.length; i++) {
              headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
            }

            for (var i = 1; i < table.rows.length; i++) {
              var tableRow = table.rows[i];
              var rowData = {};
              for (var j = 0; j < tableRow.cells.length; j++) {
                rowData[headers[j]] = tableRow.cells[j].innerHTML;
              }
              json.push(rowData);
            }

            labels = "name"
            values = "wins"

            let x = json.map(function (e) {
              return e[labels];
            });

            let y = json.map(function (e) {
              return e[values];
            });

            chart = BuildChart(x, y, "Wins");
        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert('Error' + errorMessage);
        }
    });

    function BuildChart(labels, values, chartTitle) {
      let ctx = document.getElementById("chart").getContext('2d');
      let chart = new Chart(ctx, {
        type: 'bar',
        legend: {
            display: false
        },
        data: {
          labels: labels,
          datasets: [{
            label: chartTitle,
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true
        }
      });
      return chart;
    }
  });
})