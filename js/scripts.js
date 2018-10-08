/* ==========================================================================
	Document Ready Function
========================================================================== */
jQuery(document).ready(function () {
	'use strict';

	/* ==========================================================================
		i18next
	========================================================================== */
	var lngDetectionOption = {
		order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
		lookupQuerystring: 'lng',
		lookupCookie: 'i18next',
		lookupLocalStorage: 'i18nextLocalStorage',
		caches: ['localStorage', 'cookie'],
		excludeCacheFor: ['cimode'],
		cookieMinutes: 365 * 24 * 60,
		htmlTag: document.documentElement
	}
	var i18nextoptions = {
		debug: false,
		whitelist: ['en', 'pt-BR'],
		fallbackLng: 'en',
		detection: lngDetectionOption,
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json',
			addPath: '/locales/{{lng}}/{{ns}}.missing.json',
			crossDomain: true
		}
	}

	i18next
	.use(i18nextBrowserLanguageDetector)
	.use(i18nextXHRBackend)
	.init(i18nextoptions, function(err, t) {
		updateContent();
	});

	function updateContent() {
		jqueryI18next.init(i18next, $);
		$(document).localize();
	}

	$('.lang').click(function () {
		var lang = $(this).attr('data-lang');
		i18next.init({
			lng: lang
		}, function (t) {
			updateContent();
		});
	});

	/* ==========================================================================
		Preloader
	========================================================================== */
	$(window).on('load', function() {
		$('.preloader').fadeOut(1000);
	});

	/* ==========================================================================
		Back to Top
	========================================================================== */
	$(window).on('scroll', function() {
		if ($(this).scrollTop() >= 700) {
			$('.back-to-top').fadeIn(1000);
		} else {
			$('.back-to-top').fadeOut(1000);
		}
	});

	$(document).on('click', '.back-to-top', function() {
		$('html,body').animate({
			scrollTop: 0
		}, 1200);
	});

	/* ==========================================================================
		Navigation
	========================================================================== */
	$(window).on("scroll", function() {
		if ($(window).scrollTop() > 60) {
			$(".navbar").addClass("navbar-colored");
		} else {
			$(".navbar").removeClass("navbar-colored");
		}
	});

	//Close navbar-collapse when a  clicked
	/* $(".navbar-nav a").on('click', function() {
		$(".navbar-collapse").removeClass("show");
	}); */

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
		dots: true,
		autoplay: false,
		responsive: {
			0: {
				items: 2
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

/* ==========================================================================
	ParticlesJS
========================================================================== */
particlesJS("particles-js", {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 800
			}
		},
		color: {
			value: "#ffffff"
		},
		shape: {
			type: "circle",
			opacity: .2,
			stroke: {
				width: 0,
				color: "#000000"
			},
			polygon: {
				nb_sides: 5
			},
			image: {
				src: "img/github.svg",
				width: 100,
				height: 100
			}
		},
		opacity: {
			value: .3,
			random: false,
			anim: {
				enable: true,
				speed: 1,
				opacity_min: .12,
				sync: false
			}
		},
		size: {
			value: 6,
			random: true,
			anim: {
				enable: false,
				speed: 40,
				size_min: .08,
				sync: false
			}
		},
		line_linked: {
			enable: true,
			distance: 150,
			color: "#ffffff",
			opacity: .5,
			width: 1.3
		},
		move: {
			enable: true,
			speed: 6,
			direction: "none",
			random: true,
			straight: false,
			out_mode: "out",
			bounce: false,
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 1200
			}
		}
	},
	interactivity: {
		detect_on: "canvas",
		events: {
			onhover: {
				enable: true,
				mode: "grab"
			},
			onclick: {
				enable: true,
				mode: "push"
			},
			resize: true
		},
		modes: {
			grab: {
				distance: 400,
				line_linked: {
					opacity: 1
				}
			},
			bubble: {
				distance: 400,
				size: 40,
				duration: 2,
				opacity: 8,
				speed: 3
			},
			repulse: {
				distance: 200,
				duration: .4
			},
			push: {
				particles_nb: 4
			},
			remove: {
				particles_nb: 2
			}
		}
	},
	retina_detect: true
});
