(function($){
	"use strict";
	

	$(window).on('elementor/frontend/init', function () {
		
        elementorFrontend.hooks.addAction('frontend/element_ready/cryptlight_elementor_chart.default', function(){
	       	
	        $('.ova-chart').each( function( index ) {
	        	var that = $(this);

	        	var radius 		= that.data('chart-radius');
	        	var data_chart 	= that.data('chart');
	        	var id 			= that.data('id');
	        	var labels = [], percents = [], colors = [];

	        	// Label
	        	if ( data_chart['label'] ) {
					labels = data_chart['label'];
	        	}

	        	// Percent
	        	if ( data_chart['percent'] ) {
					percents = data_chart['percent'];
	        	}

	        	// Color
	        	if ( data_chart['color'] ) {
					colors = data_chart['color'];
	        	}

	        	const data = {
					labels: labels,
					datasets: [{
						label: 'Chart',
						data: percents,
						backgroundColor: colors,
						cutout: radius,
						hoverOffset: 0,
						borderWidth: 0,
					}]
				};
				const config = {
					type: 'doughnut',
					data: data,
					options: {
				    	plugins: {
					      	legend: {
					        	display: false,
					      	}
					    }
				  	}
				};
				
				if ( $.inArray( id , chart_ids) == -1 ) {
					chart_ids.push(id)
					var ctx = document.getElementById(id).getContext('2d');
					id = new Chart( ctx, config );
				}
	        });
        });
   });

})(jQuery);
