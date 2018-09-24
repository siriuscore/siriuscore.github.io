/* ==========================================================================
	Document Ready Function
========================================================================== */
jQuery(document).ready(function () {
	'use strict';

	/* ==========================================================================
		Preloader
	========================================================================== */
	$('.preloader').delay(2500).fadeOut('slow');
	setTimeout(function () {
		$('body').removeClass('no-scroll');
	}, 2500);

	/* ==========================================================================
		Navigation
	========================================================================== */
	$(window).on('scroll', function () {
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
	$('.navbar-nav li a').on('click', function () {
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
	$('a[href*="#"]:not([href="#"])').on('click', function () {
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

	/* ==========================================================================
		Team Carousel
	========================================================================== */
	$('.team-carousel').owlCarousel({
		loop: false,
		margin: 30,
		nav: true,
		navText: [
			"<i class='fa fa-angle-left'></i>",
			"<i class='fa fa-angle-right'></i>"
		],
		dots: false,
		autoplay: false,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 3
			},
			1000: {
				items: 4
			}
		}
	});

	/* ==========================================================================
		ajaxChimp
	========================================================================== */
	$('#mc-form').ajaxChimp({
		url: 'https://getsirius.us2.list-manage.com/subscribe/post?u=159cdeca5d26ac11541be85f6&id=c803840bd0',
		callback: chimpCallback
	});
	function chimpCallback(resp) {
		if (resp.result === 'success') {
			$('.subscribe-alert').html('<div class="alert alert-success">' + resp.msg + '</div>').fadeIn(1000);
			//$('.subscribe-alert').delay(6000).fadeOut();
		} else if (resp.result === 'error') {
			$('.subscribe-alert').html('<div class="alert alert-danger">' + resp.msg + '</div>').fadeIn(1000);
		}
	}

	/* ==========================================================================
		Cookie Consent
	========================================================================== */
	window.addEventListener("load", function () {
		window.cookieconsent.initialise({
			"palette": {
				"popup": {
					"background": "#ffffff",
					"text": "#3d4756"
				},
				"button": {
					"background": "#657b99",
					"text": "#ffffff"
				}
			},
			"position": "bottom-right",
			"content": {
				"href": "https://getsirius.io/privacy.html"
			}
		})
	});

	/* ==========================================================================
		Mailchimp Popup
	========================================================================== */
	window.dojoRequire(["mojo/signup-forms/Loader"], function(L) {
		L.start({
			"baseUrl": "mc.us2.list-manage.com",
			"uuid": "159cdeca5d26ac11541be85f6",
			"lid": "c803840bd0",
			"uniqueMethods": true
		})
	})

	/* ==========================================================================
		Cryptopia
	========================================================================== */
	$.getJSON("https://www.cryptopia.co.nz/api/GetMarket/SIRX_BTC", function (data) {
		var rate = data["Data"]["LastPrice"];

		$(".cryptopia-price").html(rate + " BTC");
	});

	/* ==========================================================================
		Facebook SDK
	========================================================================== */
	window.fbAsyncInit = function () {
		FB.init({
			appId: '1873953449338944',
			xfbml: true,
			version: 'v3.1'
		});
		FB.AppEvents.logPageView();
	};
	(function (d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) { return; }
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
}); // JavaScript Document
