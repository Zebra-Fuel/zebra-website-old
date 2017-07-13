/*-------------------------------------------------------------------------------------------------------------------------------*/
/*This is main JS file that contains custom style rules used in this template*/
/*-------------------------------------------------------------------------------------------------------------------------------*/
/* Template Name: Site Title*/
/* Version: 1.0 Initial Release*/
/* Build Date: 22-04-2015*/
/* Author: Unbranded*/
/* Website: http://moonart.net.ua/site/ 
/* Copyright: (C) 2015 */
/*-------------------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/
/* 01 - VARIABLES */
/*-------------------------------------------------------------------------------------------------------------------------------*/

jQuery(function($) {

	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, winScr, $container, _isresponsive, smPoint = 768, mdPoint = 992, lgPoint = 1200, addPoint = 1600, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

	/*========================*/
	/* 02 - page calculations */
	/*========================*/
	function pageCalculations(){
		winW = $(window).width();
		winH = $(window).height();
		if($('.menu-button').is(':visible')) _isresponsive = true;
		else _isresponsive = false;
	}

	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/
	pageCalculations();	

	/*============================*/
	/* 04 - function on page load */
	/*============================*/
	$(window).load(function(){
		$('#loader-wrapper').fadeOut();
		initSwiper();
		if($('.isotope-filter').length){
			var initValue = $('.isotope-nav').find('.selected a').attr('data-filter');
			$container.isotope({itemSelector: '.isotope-item', filter: initValue,masonry:{gutter:0,columnWidth:'.grid-sizer'}});			
		}		
	});

	/*==============================*/
	/* 05 - function on page scroll */
	/*==============================*/	
	$(window).on("scroll", function() {
		winScr = $(window).scrollTop();
		if (winScr > 0){
			$(".tt-header").addClass("stick");
		} else {
			$(".tt-header").removeClass("stick");
		}	
	});		

	/*==============================*/
	/* 05 - function on page resize */
	/*==============================*/
	function resizeCall(){
		pageCalculations();
	}
	if(!_ismobile){
		$(window).resize(function(){
			resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			resizeCall();
		}, false);
	}

	/*=====================*/
	/* 07 - swiper sliders */
	/*=====================*/
	var initIterator = 0;
	function initSwiper(){
		$('.swiper-container').not('.initialized').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index+' initialized').attr('id', index);
			$t.find('>.swiper-pagination').addClass('swiper-pagination-'+index);
			$t.find('.swiper-button-prev').addClass('swiper-button-prev-'+index);
			$t.find('.swiper-button-next').addClass('swiper-button-next-'+index);

			var slidesPerViewVar = ($t.data('slides-per-view'))?$t.data('slides-per-view'):1;
			if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				pagination: '.swiper-pagination-'+index,
		        paginationClickable: true,
		        nextButton: '.swiper-button-next-'+index,
		        prevButton: '.swiper-button-prev-'+index,
		        slidesPerView: slidesPerViewVar,
		        autoHeight:($t.is('[data-auto-height]'))?parseInt($t.data('auto-height'), 10):0,
		        loop: ($t.is('[data-loop]'))?parseInt($t.data('loop'), 10):0,
				autoplay: ($t.is('[data-autoplay]'))?parseInt($t.data('autoplay'), 10):0,
				centeredSlides: ($t.is('[data-centered-slides]'))?parseInt($t.data('centered-slides'), 10):0,
				spaceBetween: ($t.is('[data-space-between]'))?parseInt($t.data('space-between'), 10):0,
		        breakpoints: ($t.is('[data-breakpoints]'))? { 767: { slidesPerView: parseInt($t.attr('data-xs-slides'), 10) }, 991: { slidesPerView: parseInt($t.attr('data-sm-slides'), 10) }, 1199: { slidesPerView: parseInt($t.attr('data-md-slides'), 10) } } : {},
		        initialSlide: ($t.is('[data-ini]'))?parseInt($t.data('ini'), 10):0,
		        speed: ($t.is('[data-speed]'))?parseInt($t.data('speed'), 10):500,
		        keyboardControl: true,
		        mousewheelControl: ($t.is('[data-mousewheel]'))?parseInt($t.data('mousewheel'), 10):0,
		        mousewheelReleaseOnEdges: true,
		        direction: ($t.is('[data-direction]'))?$t.data('direction'):'horizontal'
			});
			swipers['swiper-'+index].update();
			initIterator++;
		});
		$('.swiper-container.swiper-control-top').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-bottom').attr('id')];
		});
		$('.swiper-container.swiper-control-bottom').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-top').attr('id')];
		});
	};

	/*==============================*/
	/* 08 - buttons, clicks, hovers */
	/*==============================*/
	//menu
	$('.cmn-toggle-switch').on('click', function(e){
		$(this).toggleClass('active');
		$(this).parents('header').find('.toggle-block').slideToggle();
		e.preventDefault();
	});
	$('.main-nav .menu-toggle').on('click', function(e){
		$(this).closest('li').addClass('select').siblings('.select').removeClass('select');
		$(this).closest('li').siblings('.parent').find('ul').slideUp();
		$(this).parent().siblings('ul').slideToggle();
		e.preventDefault();
	});

	/*tt-video*/
	$(document).on('click', '.tt-video-open', function(e){
		e.preventDefault();
		var video = $(this).attr('href');
		$('.tt-video-popup-container iframe').attr('src',video);
		$('.tt-video-popup').addClass('active');
		
	});
	$('.tt-video-popup-close, .tt-video-popup-layer').on('click', function(e){
		$('.tt-video-popup').removeClass('active');
		$('.tt-video-popup-container iframe').attr('src','about:blank')
		e.preventDefault();
	});

	/*==================================================*/
	/* 09 - form elements - checkboxes and radiobuttons */
	/*==================================================*/
    //Tabs
	var tabFinish = 0;
	$('.tt-nav-tab-item').on('click', function(){		
	    var $t = $(this);
	    if(tabFinish || $t.hasClass('active')) return false;
	    tabFinish = 1;
	    $t.closest('.tt-nav-tab').find('.tt-nav-tab-item').removeClass('active');
	    $t.addClass('active');
	    var index = $t.parent().parent().find('.tt-nav-tab-item').index(this);
	    $t.parents('.tt-tab-nav-wrapper').find('.tt-tab-select select option:eq('+index+')').prop('selected', true);
	    $t.closest('.tt-tab-wrapper').find('.tt-tab-info:visible').fadeOut(500, function(){
	    	var $tabActive  = $t.closest('.tt-tab-wrapper').find('.tt-tab-info').eq(index);
	    	$tabActive.css('display','block').css('opacity','0');
	    	tabReinit($tabActive.parents('.tt-tab-wrapper'));
	    	$tabActive.animate({opacity:1});
	    	 tabFinish = 0;
	    });
	});
	$('.tt-tab-select select').on('change', function(){
	    var $t = $(this);
	    if(tabFinish) return false;
	    tabFinish = 1;    
	    var index = $t.find('option').index($(this).find('option:selected'));
	    $t.closest('.tt-tab-nav-wrapper').find('.tt-nav-tab-item').removeClass('active');
	    $t.closest('.tt-tab-nav-wrapper').find('.tt-nav-tab-item:eq('+index+')').addClass('active');
	    $t.closest('.tt-tab-wrapper').find('.tt-tab-info:visible').fadeOut(500, function(){
	    	var $tabActive  = $t.closest('.tt-tab-wrapper').find('.tt-tab-info').eq(index);
	    	$tabActive.css('display','block').css('opacity','0');
	    	tabReinit($tabActive.parents('.tt-tab-wrapper'));
	    	$tabActive.animate({opacity:1});
	    	 tabFinish = 0;
	    });
	});
	function tabReinit($tab){
		$tab.find('.swiper-container').each(function(){
			var thisSwiper = swipers['swiper-'+$(this).attr('id')];
			thisSwiper.update();
		});			
	}

	//isotope filter
	$container = $('.isotope-content');
	$('.isotope-nav').on( 'click', 'a', function(e) {
		var filterValue = $(this).attr('data-filter');
		var $buttonGroup = $(this).parent().parent();
		var index = $buttonGroup.find('li').index($(this).parent());
		$buttonGroup.siblings('.isotope-select').find('option:eq('+index+')').prop('selected', true);
		$container.isotope({ filter: filterValue });
		$buttonGroup.find('.selected').removeClass('selected');
		$(this).parent().addClass('selected');
		e.preventDefault();
	});
	$('.isotope-select select').on( 'change', function() {
		var filterValue = $(this).find('option:selected').val();
		var index = $(this).find('option').index($(this).find('option:selected'));
		$container.isotope({ filter: filterValue });
		var $buttonGroup = $(this).parents('.isotope-select').siblings('.isotope-nav');
		$buttonGroup.find('.selected').removeClass('selected');
		$buttonGroup.find('li').eq(index).addClass('selected');
	});

	$(".tt-offer-link").on({
	    mouseenter: function () {
	    	$(this).closest('.row').find('.tt-offer-screen').attr('style', $(this).attr('data-img')); 
	    },
	    mouseleave: function () {
	    }
	});

	/*counters*/
	$('.js-count').viewportChecker({
		offset: 100,
		callbackFunction: function(elem, action){
			elem.countTo();		
		}		
	});
		
	/*=====================*/
	/* 12 - LIGHT-BOX */
	/*=====================*/
	
	/*activity indicator functions*/
	var activityIndicatorOn = function(){
		$('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
	};
	var activityIndicatorOff = function(){
		$('#imagelightbox-loading').remove();
	};
	
	/*close button functions*/
	var closeButtonOn = function(instance){
		$('<button type="button" id="imagelightbox-close" title="Close"></button>').appendTo('body').on('click touchend', function(){ $(this).remove(); instance.quitImageLightbox(); return false; });
	};
	var closeButtonOff = function(){
		$('#imagelightbox-close').remove();
	};
	
	/*overlay*/
	var overlayOn = function(){$('<div id="imagelightbox-overlay"></div>').appendTo('body');};
	var overlayOff = function(){$('#imagelightbox-overlay').remove();};
	
	/*caption*/
	var captionOff = function(){$('#imagelightbox-caption').remove();};
	var captionOn = function(){
		var description = $('a[href="' + $('#imagelightbox').attr('src') + '"] img').attr('alt');
		if(description.length)
			$('<div id="imagelightbox-caption">' + description +'</div>').appendTo('body');
	};

	/*arrows*/
    var arrowsOn = function(instance, selector) {
        var $arrows = $('<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"><i class="fa fa-chevron-left"></i></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"><i class="fa fa-chevron-right"></i></button>');
        $arrows.appendTo('body');
        $arrows.on('click touchend', function(e) {
            e.preventDefault();
            var $this = $(this);
            if( $this.hasClass('imagelightbox-arrow-left')) {
                instance.loadPreviousImage();
            } else {
                instance.loadNextImage();
            }
            return false;
        });
    };	
	var arrowsOff = function(){$('.imagelightbox-arrow').remove();};	
			
	var selectorG = '.lightbox';
	if($(selectorG).length){
		var instanceG = $(selectorG).imageLightbox({
			quitOnDocClick:	false,
			onStart:		function() {arrowsOn(instanceG, selectorG);overlayOn(); closeButtonOn(instanceG);},
			onEnd:			function() {arrowsOff();captionOff(); overlayOff(); closeButtonOff(); activityIndicatorOff();},
			onLoadStart: 	function() {captionOff(); activityIndicatorOn();},
			onLoadEnd:	 	function() {$('.imagelightbox-arrow').css('display', 'block');captionOn(); activityIndicatorOff();}
		});		
	}				


});