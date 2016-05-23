// this is a slider 
//var sliderBoy = {};

(function(FBZ, $) {


FBZ.slider = {

		init : function () {
			FBZ.slider.setupSliders();
			FBZ.slider.createSliders();

		},

		setupSliders : function () {
			//do some more stuff in here
			console.log("init");
			FBZ.model.sliders = $(".slider");

// 			 /// ,this is an injection of content coming from the no brain 
			console.dir(FBZ.model.noBrain.Sliders.elements.length,FBZ.model.sliders);
// 			for ( var i = 0 ; i < FBZ.model.noBrain.Projects.elements.length ; i ++ ) { 
// //				console.log(FBZ.model.noBrain.Projects.elements[i]);
// 				if(FBZ.model.noBrain.Projects.elements[i].Privacy != "PRIVATE") {  

// 				FBZ.view.$projectsCardHolder.append(

// 						"<div class='project-card'>"+ 

// 											"<h3 data-translatable class='project-name'>"+FBZ.model.noBrain.Projects.elements[i].Name +"</h3>"+
// 											"<div class='project-image is-hidden'>"+
// 											FBZ.model.noBrain.Projects.elements[i].Image+"</div>"+
// 											// "<div class='project-text-wrapper is-hidden'>"+
// 										"<h3 data-translatable class='project-client is-hidden'>"+FBZ.model.noBrain.Projects.elements[i].Client +"</h3>"+
// 											"<p class='project-date is-hidden'>"+ FBZ.model.noBrain.Projects.elements[i].StartDate+"</p>"+
// 											"<p class='project-description is-hidden' data-translatable>"+FBZ.model.noBrain.Projects.elements[i].Description+"</p>"+
// 											// "</div><!--end project text-wrapper-->"+
// 											"<div class='project-keywords is-hidden' data-translatable>"+FBZ.model.noBrain.Projects.elements[i].Keywords+"<span></span></div>"+
// 										"</div><!--end project card-->");
// 				}
// 			}





		},

		createSliders : function () { 
			console.log(FBZ.model.sliders);
			//FBZ.model.SliderAboutHome
		},
		populateSliders : function () {


		},
		pauseSlider : function () { 

		},
		playSlider: function () { 


		}


	};



// sliderBoy.init : function () { 

// }




} )(window.FBZ = window.FBZ || {}, jQuery);

