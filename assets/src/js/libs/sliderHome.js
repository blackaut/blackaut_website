// this is a slider 
//var sliderBoy = {};

(function(FBZ, $) {


FBZ.slider = {

		clock: {} ,
		time: 5000,
		currentImage:0,
		totalImage:0,

		init : function () {
			FBZ.slider.setupSlider();
			FBZ.slider.createSliderControl();
		//	FBZ.slider.createInterval();
		//	FBZ.slider.deleteInterval();
		},
		createInterval : function () { 
			 FBZ.slider.clock = setInterval( function() 
		{
	//			console.log("interval");
				FBZ.slider.playSlider();
        }, FBZ.slider.time);
		}, 

		deleteInterval : function () { 
			clearInterval(FBZ.slider.clock);
		},

		setupSlider : function () {
			//do some more stuff in here
			FBZ.view.sliderHome = $(".sliderHome");
			
			FBZ.view.sliderHome.parent().append(
				"<div class='slider-control slider-home-control'></div>"
			);
			FBZ.view.sliderHomeControl = $(".slider-home-control");

			//console.dir(FBZ.model.noBrain.SliderHome.elements.length);
			for ( var i = 0 ; i < FBZ.model.noBrain.SliderHome.elements.length ; i ++ ) { 

				if(FBZ.model.noBrain.SliderHome.elements[i].Privacy != "PRIVATE") {  

					FBZ.view.sliderHome.append(
						"<div class='slider-card'>"+
						"</div><!--slider card-->"
						);
					FBZ.view.sliderHome.children().last().css("background-image","url("+FBZ.model.noBrain.SliderHome.elements[i].picUrl+")");

					FBZ.view.sliderHomeControl.append("<div class='slider-dot'></div>")
					

					}

				};
		},
		createSliderControl : function () {
			//FBZ.slider.currentImage = 0;
			FBZ.slider.totalImage  = FBZ.view.sliderHomeControl.children().length-1;
		//	console.log("	FBZ.slider.totalImage ",	FBZ.slider.totalImage );
			FBZ.view.sliderHomeControl.children().on("click",FBZ.slider.onDotClick);
			FBZ.slider.changeImageToIndex(FBZ.slider.currentImage);

		},
		onDotClick : function (e)  { 

		//	console.log($(e.currentTarget).index());
			FBZ.slider.changeImageToIndex($(e.currentTarget).index());
			FBZ.slider.deleteInterval();
		},

		changeImageToIndex : function (index) {


			FBZ.view.sliderHome.children().removeClass("active");
			$(FBZ.view.sliderHome.children().get(index)).addClass('active');
		},

		playSlider: function () { 

			console.log(FBZ.slider.currentImage, FBZ.slider.totalImage);
			if(FBZ.slider.currentImage < FBZ.slider.totalImage) { 
				FBZ.slider.currentImage ++;
			}else { 

				FBZ.slider.currentImage = 0;
			}
				FBZ.slider.changeImageToIndex(FBZ.slider.currentImage);

		}

	};



} )(window.FBZ = window.FBZ || {}, jQuery);

