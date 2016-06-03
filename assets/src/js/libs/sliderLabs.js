// this is a slider 
//var sliderBoy = {};

(function(FBZ, $) {


FBZ.sliderLabs = {

		clock: {} ,
		time: 5000,
		currentImage:0,
		totalImage:0,

		init : function () {
			FBZ.sliderLabs.setupSlider();
			FBZ.sliderLabs.createSliderControl();
		//	FBZ.sliderLabs.createInterval();
		//	FBZ.sliderLabs.deleteInterval();
		},
		createInterval : function () { 
			 FBZ.sliderLabs.clock = setInterval( function() 
		{
	//			console.log("interval");
				FBZ.sliderLabs.playSlider();
        }, FBZ.sliderLabs.time);
		}, 

		deleteInterval : function () { 
			clearInterval(FBZ.sliderLabs.clock);
		},

		setupSlider : function () {
			//do some more stuff in here
			FBZ.view.sliderLabs = $(".sliderLabs");
			
			FBZ.view.sliderLabs.parent().append(
				"<div class='slider-control slider-labs-control'></div>"
			);
			FBZ.view.sliderLabsControl = $(".slider-labs-control");

			//console.dir(FBZ.model.noBrain.SliderLabs.elements.length);
			for ( var i = 0 ; i < FBZ.model.noBrain.SliderLabs.elements.length ; i ++ ) { 

				if(FBZ.model.noBrain.SliderLabs.elements[i].Privacy != "PRIVATE") {  

					FBZ.view.sliderLabs.append(
						"<div class='slider-card'>"+
						"</div><!--slider card-->"
						);
					FBZ.view.sliderLabs.children().last().css("background-image","url("+FBZ.model.noBrain.SliderLabs.elements[i].picUrl+")");

					FBZ.view.sliderLabsControl.append("<div class='slider-dot'></div>")
					

					}

				};
		},
		createSliderControl : function () {
			//FBZ.slider.currentImage = 0;
			FBZ.sliderLabs.totalImage  = FBZ.view.sliderLabsControl.children().length-1;
		//	console.log("	FBZ.slider.totalImage ",	FBZ.slider.totalImage );
			FBZ.view.sliderLabsControl.children().on("click",FBZ.sliderLabs.onDotClick);
			FBZ.sliderLabs.changeImageToIndex(FBZ.sliderLabs.currentImage);

		},
		onDotClick : function (e)  { 

		//	console.log($(e.currentTarget).index());
			FBZ.sliderLabs.changeImageToIndex($(e.currentTarget).index());
			FBZ.sliderLabs.deleteInterval();
		},

		changeImageToIndex : function (index) {

			FBZ.view.sliderLabs.children().removeClass("active");
			FBZ.view.sliderLabsControl.children().removeClass('active');
			
			$(FBZ.view.sliderLabs.children().get(index)).addClass('active');
			$(FBZ.view.sliderLabsControl.children().get(index)).addClass('active');
		},

		playSlider: function () { 

			console.log(FBZ.sliderLabs.currentImage, FBZ.sliderLabs.totalImage);
			if(FBZ.sliderLabs.currentImage < FBZ.sliderLabs.totalImage) { 
				FBZ.sliderLabs.currentImage ++;
			}else { 

				FBZ.sliderLabs.currentImage = 0;
			}
				FBZ.sliderLabs.changeImageToIndex(FBZ.sliderLabs.currentImage);

		}

	};



} )(window.FBZ = window.FBZ || {}, jQuery);

