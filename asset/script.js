(function($) {
	"use strict";

	$(window).on('load', function() {
	    $(".preloader").fadeOut("slow", function() {
	        $(".preloader-left").addClass("slide-left");
	    });

	    var $container = $('#portfolio-container');
	    $container.isotope({
	        masonry: {
	            columnWidth: '.portfolio-item'
	        },
	        itemSelector: '.portfolio-item'
	    });
	    $('#filters').on('click', 'li', function() {
	        $('#filters li').removeClass('active');
	        $(this).addClass('active');
	        var filterValue = $(this).attr('data-filter');
	        $container.isotope({ filter: filterValue });
	    });
	});
})(jQuery);
var price = 10;
$(document).ready(function() {
	var $cart = $('#selected-seats'),
	$counter = $('#counter'),
	$total = $('#total');
	var sc = $('#seat-map').seatCharts({
		map: [
			'aaaaaaaaaa',
			'aaaaaaaaaa',
			'__________',
			'aaaaaaaa__',
			'aaaaaaaaaa',
			'aaaaaaaaaa',
			'aaaaaaaaaa',
			'aaaaaaaaaa',
			'aaaaaaaaaa',
			'__aaaaaa__'
		],
		naming : {
			top : false,
			getLabel : function (character, row, column) {
				return column;
			}
		},
		legend : {
			node : $('#legend'),
			items : [
				[ 'a', 'available',   'Available' ],
				[ 'a', 'unavailable', 'Sold'],
				[ 'a', 'selected', 'Selected']
			]					
		},
		click: function () {
			if (this.status() == 'available') {
				$('<li>Row'+(this.settings.row+1)+' Seat'+this.settings.label+'</li>')
					.attr('id', 'cart-item-'+this.settings.id)
					.data('seatId', this.settings.id)
					.appendTo($cart);

				$counter.text(sc.find('selected').length+1);
				$total.text(recalculateTotal(sc)+price);
							
				return 'selected';
			} else if (this.status() == 'selected') {
					$counter.text(sc.find('selected').length-1);
					$total.text(recalculateTotal(sc)-price);
					$('#cart-item-'+this.settings.id).remove();
					return 'available';
			} else if (this.status() == 'unavailable') {
				return 'unavailable';
			} else {
				return this.style();
			}
		}
	});
	sc.get(['1_2', '4_4','4_5','6_6','6_7','8_5','8_6','8_7','8_8', '10_1', '10_2']).status('unavailable');
});
function recalculateTotal(sc) {
	var total = 0;
	sc.find('selected').each(function () {
		total += price;
	});
	return total;
}
$('#seat-map').addClass('animated bounceInLeft');
$('.booking-details').addClass('animated bounceInRight');
$(document).ready(function(){
    $('#poster').hover(function(){
        $(this).addClass('animated pulse');
    });
		$('#poster').on("webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd", function(event) {
    $(this).removeClass("animated pulse");
	});
});
