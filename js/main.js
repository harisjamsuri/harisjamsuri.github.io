;(function () {
	
	'use strict';



	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}

	};


	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};


	var counterWayPoint = function() {
		if ($('#colorlib-counter').length > 0 ) {
			$('#colorlib-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var burgerMenu = function() {

		$('.js-colorlib-nav-toggle').on('click', function(event){
			event.preventDefault();
			var $this = $(this);

			if ($('body').hasClass('offcanvas')) {
				$this.removeClass('active');
				$('body').removeClass('offcanvas');	
			} else {
				$this.addClass('active');
				$('body').addClass('offcanvas');	
			}
		});



	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
	    	
	    }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
		});

	};

	var clickMenu = function() {

		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top - 55
			    	}, 500);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-colorlib-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};


	$(document).ready(function() {
		var correctPassword = "PGN536";
		var maxAttempts = 3;
		var attemptCount = 0;
		var errorMessages = [
		"Incorrect password. If you dont have the password. Please do not try again.",
		"What are you doing? Please stop trying.",
		"You might as well contact and ask me if you really want to see it that bad."
		];

		$("#password-form").submit(function(e) {
		e.preventDefault();
		
		var enteredPassword = $("#password-input").val();
		
		if (enteredPassword === correctPassword) {
			$("#password-section").hide();
			$("#secret-section").show();
			$("#password-input").val("");
			$(".error-message").hide();
		} else {
			attemptCount++;
			var errorMessage = errorMessages[attemptCount - 1] || errorMessages[errorMessages.length - 1];
			$(".error-message").text(errorMessage).show();

			if (attemptCount >= maxAttempts) {
			$("#password-input").prop("disabled", true);
			$("#password-form button[type='submit']").prop("disabled", true);
			}
		}
		});
		
		$("#password-section").show();

		$(".eye-icon").on("click", function() {
			var passwordInput = $("#password-input");
			var inputType = passwordInput.attr("type");

			if (inputType === "password") {
				passwordInput.attr("type", "text");
				$(this).removeClass("fa-eye").addClass("fa-eye-slash");
			} else {
				passwordInput.attr("type", "password");
				$(this).removeClass("fa-eye-slash").addClass("fa-eye");
			}
		});
	});



	var sliderMain = function() {
		
	  	$('#colorlib-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	};

	var stickyFunction = function() {

		var h = $('.image-content').outerHeight();

		if ($(window).width() <= 992 ) {
			$("#sticky_item").trigger("sticky_kit:detach");
		} else {
			$('.sticky-parent').removeClass('stick-detach');
			$("#sticky_item").trigger("sticky_kit:detach");
			$("#sticky_item").trigger("sticky_kit:unstick");
		}

		$(window).resize(function(){
			var h = $('.image-content').outerHeight();
			$('.sticky-parent').css('height', h);


			if ($(window).width() <= 992 ) {
				$("#sticky_item").trigger("sticky_kit:detach");
			} else {
				$('.sticky-parent').removeClass('stick-detach');
				$("#sticky_item").trigger("sticky_kit:detach");
				$("#sticky_item").trigger("sticky_kit:unstick");

				$("#sticky_item").stick_in_parent();
			}
			

			

		});

		$('.sticky-parent').css('height', h);

		$("#sticky_item").stick_in_parent();

	};

	var owlCrouselFeatureSlide = function() {
		$('.owl-carousel').owlCarousel({
			animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
		   autoplay: true,
		   loop:true,
		   margin:0,
		   nav:true,
		   dots: false,
		   autoHeight: true,
		   items: 1,
		   navText: [
		      "<i class='icon-arrow-left3 owl-direction'></i>",
		      "<i class='icon-arrow-right3 owl-direction'></i>"
	     	]
		})
	};

	// Document on load.
	$(function(){
		fullHeight();
		counter();
		counterWayPoint();
		contentWayPoint();
		burgerMenu();

		clickMenu();
		// navActive();
		navigationSection();
		// windowScroll();


		mobileMenuOutsideClick();
		sliderMain();
		stickyFunction();
		owlCrouselFeatureSlide();
	});


}());

//POPup windows JS

document.addEventListener('DOMContentLoaded', function() {
  const ctaWindow = document.getElementById('ctaWindow');
  const closeButton = document.getElementById('closeButton');
  const whatsappButton = document.querySelector('.whatsapp-button');
  
  function showCTAWindow() {
    ctaWindow.style.display = 'block';
  }

  function hideCTAWindow() {
    ctaWindow.style.display = 'none';
  }

  function onWhatsappButtonClick() {
    // Replace this with the link to your WhatsApp API
    window.open('https://api.whatsapp.com/send?phone=60169331098&text=[FBRS-INFO]%20Hi%20Haris');
  }

  closeButton.addEventListener('click', hideCTAWindow);
  whatsappButton.addEventListener('click', onWhatsappButtonClick);
  
  showCTAWindow(); // Show the CTA window when the page loads

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  ctaHeader.addEventListener('mousedown', startDrag);
  ctaHeader.addEventListener('touchstart', startDrag);

  function startDrag(e) {
    e.preventDefault();
    isDragging = true;

    if (e.type === 'mousedown') {
      offsetX = e.clientX - ctaWindow.getBoundingClientRect().left;
      offsetY = e.clientY - ctaWindow.getBoundingClientRect().top;
    } else if (e.type === 'touchstart') {
      const touch = e.changedTouches[0];
      offsetX = touch.clientX - ctaWindow.getBoundingClientRect().left;
      offsetY = touch.clientY - ctaWindow.getBoundingClientRect().top;
    }
  }

  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag);

  function drag(e) {
    if (!isDragging) return;
    e.preventDefault();

    const clientX = e.type === 'mousemove' ? e.clientX : e.changedTouches[0].clientX;
    const clientY = e.type === 'mousemove' ? e.clientY : e.changedTouches[0].clientY;

    const newX = clientX - offsetX;
    const newY = clientY - offsetY;

    ctaWindow.style.left = `${newX}px`;
    ctaWindow.style.top = `${newY}px`;
  }

  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchend', stopDrag);

  function stopDrag() {
    isDragging = false;
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const popupError = document.getElementById('popupError');
  const wrapper = document.querySelector('.wrapper');

  function showPopup() {
    popupError.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Disable scroll on the body
  }

  const screenWidth = window.innerWidth;

  if (screenWidth > 768) { // Adjust the width breakpoint as needed
    showPopup();
    wrapper.style.filter = 'blur(5px)'; // Apply the blur effect
    wrapper.style.pointerEvents = 'none'; // Disable mouse events on the wrapper
  }
});