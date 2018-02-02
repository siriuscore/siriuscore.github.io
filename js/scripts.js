/* ==========================================================================
	Document Ready Function
========================================================================== */
jQuery(document).ready(function () {
	'use strict';

	/* ==========================================================================
		Preloader
	========================================================================== */
	$('.preloader').delay(2500).fadeOut('slow');
	setTimeout(function() {
		$('body').removeClass('no-scroll');
	}, 2500);

	/* ==========================================================================
		Navigation
	========================================================================== */
	$(window).on('scroll', function() {
		var buttonUp = $('.button-up');
		var navbarFixedTop = $('.navbar-fixed-top');
		//Adding background for .navbar after scroll more than 220
		if ($('.navbar').offset().top > 220) {
			$(navbarFixedTop).addClass('top-nav-collapse');
			$(buttonUp).fadeIn(300);
		} else {
			//Removing all adding styles
			$(navbarFixedTop).removeClass('top-nav-collapse');
			$(buttonUp).fadeOut(300);
		}
	});

	/* ==========================================================================
		Close the menu by clicking on the link
	========================================================================== */
	$('.navbar-nav li a').on('click', function() {
		//Check if window is small enough so dropdown is created
		var toggle = $('.navbar-toggle').is(':visible');
		if (toggle) {
			//After click on link in menu navbar is close
			$('.navbar-collapse').collapse('hide');
		}
	});

	/* ==========================================================================
		Smooth Scroll
	========================================================================== */
	$('a[href*="#"]:not([href="#"])').on('click', function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top - 84,
				}, 1000);
				return false;
			}
		}
	});

	/* ==========================================================================
		Tooltip
	========================================================================== */
	$('[data-toggle=\'tooltip\']').tooltip({
		container: 'body'
	});

}); // JavaScript Document
