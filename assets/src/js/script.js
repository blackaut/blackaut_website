/**
 * Author:
 * Fabz
 */

// require("./libs/skrollr");
// require("./libs/picturefill");

// Create a closure to maintain scope of the '$' and FBZ
;(function(FBZ, $) {

	$(function() {
		// Any globals go here in CAPS (but avoid if possible)

		// follow a singleton pattern
		// (http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript)

		FBZ.control.init();

	});// END DOC READY
	
	FBZ.model = {
		// add your data here 
		
		windowH	: 0, //browser screen 
		windowW	: 0,

		stageH	: window.innerHeight, //total document size
		stageW	: window.innerWidth,
		currentSection : 0,
		lastScrollTop : 0, // setting initial scrolltop as top of page
		direction : 0 // direction of scroll 1)up -1)down 0)static

	};

	FBZ.view = {

		// add dom elements here
		$stage 		:$(window),
		$header		:$('header'),
		$container	:$('container'),
		$block		:$('.block'),
		$footer		:$('footer')
	};



	FBZ.control = {
		// add function here
		init : function () {
			console.debug('FabzOff is running');
			FBZ.control.defineStage();
			FBZ.control.resizeContentBlock();
			FBZ.control.scrollerControl();
		},

		getHeight : function (obj) {

			var value = obj.height();
			return value;
		},

		getWidth : function(obj) {

			var value = obj.width();
			return value;
		},
		defineStage : function ( ) { 

			FBZ.model.stageH = FBZ.control.getHeight(FBZ.view.$stage);
			FBZ.model.stageW = FBZ.control.getWidth(FBZ.view.$stage);
			console.log("def stage", FBZ.model.stageH, FBZ.model.stageW );
		},

		resizeContentBlock : function () { 
			FBZ.view.$block.css("width",FBZ.model.stageW);
			FBZ.view.$block.css("height",FBZ.model.stageH);
		//	console.log(FBZ.view.$block);
		},

		scrollerControl:function () {


			$(".main").onepage_scroll({
			   sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
			   easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
			                                    // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
			   animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
			   pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
			   updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
			   beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
			   afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
			   loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
			   keyboard: true,                  // You can activate the keyboard controls
			   responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
			                                    // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
			                                    // the browser's width is less than 600, the fallback will kick in.
			   direction: "vertical",            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
			 posTop : 0 
			});

		// window.onscroll = FBZ.control.throttle(2000, function() {

		// 	var direction = FBZ.control.detectDirection();

		// 	if (direction === -1) {


		// 		FBZ.model.currentSection ++;

		// 	}else if (direction === 1 ){

		// 		FBZ.model.currentSection --;
		// 		// if(FBZ.model.currentSection < 0 ) {
		// 		// 	FBZ.model.currentSection = 0;
		// 		// }
		// 	}

		// 	console.log("current Section : ", FBZ.model.currentSection, "direction : ", direction );

		// 	$("body").animate({'scrollTop': (FBZ.model.currentSection*FBZ.model.stageH)+'px' }, 2000);


		// 	// console.log("onscroll", $window.scrollTop());

		// 	//FBZ.view.$stage.scrollTop(200);
		// 	//$("body").animate({'scrollTop': 700+'px' }, 500);

		// 	console.log("onscroll", FBZ.view.$stage.scrollTop());


		// 	//	console.log(FBZ.control.detectDirection());

		// 		// if (delta > 0) $('body').text('down');
		// 		// else $('body').text('up');

		// 		// var olPosTop = FBZ.control.determineOlPosY(FBZ.control.olTop);

		// 		// var olPosBot = FBZ.control.determineOlPosY(FBZ.control.olBot);

		// 		// FBZ.control.setCss3Style(FBZ.control.olTop,'transform','translateY('+olPosTop+'px) skew(-30deg) rotate(-30deg)');
		// 		// FBZ.control.setCss3Style(FBZ.control.olBot,'transform','translateY('+olPosBot+'px) skew(-30deg) rotate(-30deg)');
		// });
	},

	  detectDirection : function () {
        // current scrollTop can't be cached or in the local global scope
        var st = window.pageYOffset;

        if (st > FBZ.model.lastScrollTop) {
            // scrolling down
            FBZ.model.direction = -1;
        } else if (st < FBZ.model.lastScrollTop ){
            // scrolling up
            FBZ.model.direction = 1;
        } else {
            // static
            FBZ.model.direction = 0;
        }

        // updated lastscrolltop with new current top
        FBZ.model.lastScrollTop = st;

        // return the direction
        return FBZ.model.direction;

    },


		determineOlPosY: function (obj) {

			var posY ;
			if (obj.alternate === true ) { 
				posY = FBZ.control.windowHeight+FBZ.control.windowHeight*.6;
				obj.alternate = false;
			}else{
				posY = -(FBZ.control.windowHeight*1.5);
				obj.alternate = true;
			}
			return posY;
		},
		// Throttle calls to "callback" routine and ensure that it
		// is not invoked any more often than "delay" milliseconds.
		throttle:function(delay, callback) {
			var previousCall = new Date().getTime();
			return function() {
				var time = new Date().getTime();

				// if "delay" milliseconds have expired since
				// the previous call then propagate this call to
				// "callback"
				//
				if ((time - previousCall) >= delay) {
					previousCall = time;
					callback.apply(null, arguments);
				}
			};
		},

		toCamelCase: function (str){
			return str.toLowerCase().replace(/(\-[a-z])/g, function($1){
				return $1.toUpperCase().replace('-','');
			});
		},

		setCss3Style: function (el,prop,val){

			var vendors = ['-moz-','-webkit-','-o-','-ms-','-khtml-',''];

			for(var i=0,l=vendors.length;i<l;i++)
				{
					var p = FBZ.control.toCamelCase(vendors[i] + prop);
					if(p in el.style)
						el.style[p] = val;
				}
		}
	};
	// Example module
	/*
	FBZ.MyExampleModule = {
		init : function () {
			FBZ.MyExampleModule.setupEvents();
		},

		setupEvents : function () {
			//do some more stuff in here
		}
	};
	*/

})(window.FBZ = window.FBZ || {}, jQuery);
