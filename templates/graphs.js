var chart;

// Utility Function for loading Charts over JS
(function($){ 
  $.loadChart = function (options, url) {
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        options.series[0].data = data
        new Highcharts.Chart(options);
      },
      error: function(status, statusText, responses, headers) {
        alert('Oops something went wrong..');
      }
    });
  }
})(jQuery);


$(document).ready(function() {
  // JSON Object that describes how the Chart should look and where to render too
  chart = {
    chart: {
      renderTo: '<%= plural_table_name %>'
    },
    title: {
      text: 'Graphing <%= plural_table_name %>'
    },
    tooltip: {
      formatter: function() {
        return '<b>'+ this.point.name +'</b>: '+ this.y;
      }
    },
    series: [{
      type: 'pie'
    }]
  };
  
  // Load the Chart over AJAX, Need a better way to find this controller
  $.loadChart(chart, '/<%=plural_table_name%>.json');
});
