/**
 * Author:
 * Fabz
 */

// require("./libs/skrollr");
// require("./libs/picturefill");

// Create a closure to maintain scope of the '$' and FBZ
;(function(FBZ, $) {

		$(window).load(function() {

		});


	$(function() {

		// initial functions 
		FBZ.control.readFromGoogleDocs();
		FBZ.control.determineSection();
		FBZ.control.onResizeStage();

	});// END DOC READY
	
	FBZ.model = {
		// add your data here 

		windowH	: 0, //browser screen 
		windowW	: 0,
		stageH	: window.innerHeight, //total document size
		stageW	: window.innerWidth,
		currentSection : 0,
		lastScrollTop : 0, // setting initial scrolltop as top of page
		direction : 0 ,// direction of scroll 1)up -1)down 0)static
		stateObj : {},
		currentSection : "home",
		currentArticule : "",
		currentSectionIndex : 0,
		i18n : null,
		noBrain : {},
		proyects: {},
		totalAmountOfProjects:0, 
		currentProjectIndex:0,
		initialProjectIndex:0,
		courses: {},
		totalAmountOfCourses:0,
		people : {},
		totalAmountOfPeople:0,
		proyectsHeight: 0,
		visibleScrollProjects : 0,
		totalScrollProjects: 0,
		overFlowProjects: 0,
		peoplePicBaseURL : "assets/img/people/",
		currentLang:"es",
		footerHasBeenDisplayed : false,

		
	};

	FBZ.view = {

		// add dom elements here
		$stage 				:$(window),
		$header				:$('header'),
		$main				:$('.main'),
		$block				:$('.block'),
		$langBtn			:$('.lang-btn'),
		$footer				:$('footer'),
		$scrollIcon 		:$('.intro-scroll-icon'),
		$projectArrowUp		:$('.arrow-up'),
		$projectArrowDown	:$('.arrow-down'),
		$projectScroller 	:$('.projects-scroller'),
		$projectsCardHolder	:$('.projects-holder'),
		$projectCard 		:$('.project-card'),
		$coursesContainers	:$('.course-container'),
		$staffContainer		:$('.people-staff'),
		$collabContainer	:$('.people-collaborators'),
		$footerList			:$('.footer-list'),
		$logosFooter		:$('.logo-footer'),
		$wrapper 			:$('.onepage-wrapper'),
		$piramidInfo 		:$(".piramid-info"),
		$missionText 		:$(".mission-text-container"),
		$displayCard 		:$(".display-card"),
		$closeDisplayCard 	:$(".close_x"),
		$toolsTextContainer :$(".tools-text-container"),
		$toolsBg			:$(".tools-bg"),
		$academyText		:$(".academy-text"),
		$verticalText		:$(".vertical-text"),
		$gameRules			:$(".game-rules"),

	};

	FBZ.control = {
		// add function here
		init : function () {
			console.debug('NullØbject is running');
			
		//	FBZ.control.twitterWidget();
			FBZ.control.disappearScrollIcon();
			// FBZ.control.interactiveBG();
			FBZ.control.activateFooter();
			FBZ.control.scrollerControl();
			FBZ.control.checkURL();
		},

		activateFooter : function () { 

			FBZ.view.$logosFooter.on("mouseover",FBZ.control.displayFooterList);

			FBZ.control.displayFooterList(FBZ.model.currentSection);
		},

		displayFooterList : function (e) {


			var currentRolloveredSection;
			// if the function doesnt come from an event trigger it using the passed value.
			if(e.currentTarget == undefined) {
				var currentRolloveredSection =	e;
			}else{	
				currentRolloveredSection = e.currentTarget.getAttribute("data");
			}

			for (var i = 0 ; i < FBZ.view.$footerList.length ; i++ ) { 

				if( $(FBZ.view.$footerList[i]).hasClass(currentRolloveredSection) ) {



					if( $(FBZ.view.$logosFooter[i]).hasClass("make-small")) {
						 $(FBZ.view.$logosFooter[i]).removeClass("make-small");
					}

					if( !$(FBZ.view.$logosFooter[i]).hasClass("make-big")) {
						FBZ.control.animate($(FBZ.view.$logosFooter[i]),"make-big");
					}

						if($(FBZ.view.$footerList[i]).hasClass("is-hidden")) {
							$(FBZ.view.$footerList[i]).removeClass("is-hidden");
						}

					if( !$(FBZ.view.$footerList[i]).hasClass("make-text-big")) {
						FBZ.control.animate($(FBZ.view.$footerList[i]),"make-text-big");
					}

				}else{ 
					
					if( $(FBZ.view.$logosFooter[i]).hasClass("make-big")) {
						 $(FBZ.view.$logosFooter[i]).removeClass("make-big");
					}
					if( !$(FBZ.view.$logosFooter[i]).hasClass("make-small")) {
						FBZ.control.animate($(FBZ.view.$logosFooter[i]),"make-small");
					}

					if(!$(FBZ.view.$footerList[i]).hasClass("is-hidden")) {
						$(FBZ.view.$footerList[i]).addClass("is-hidden");
					}
				
				}

			}

		},

		// addLoadingCurtain : function() { 
		// 	FBZ.control.fadeShow($(".curtain"));
		// },

		removeLoadingCurtain : function() { 
			FBZ.control.fadeHide($(".curtain"));
		},

		determineSection : function () { 
			// this function determines the current page and assign it to a string

			var section = window.location.href.split("/");

			// console.log("section length :",section.length);

			if ( section.length <= 4 ) {

					FBZ.model.currentSection = "home";

			} else { 

					FBZ.model.currentSection  = section[section.length-2];
			}

			FBZ.model.currentArticule  = section[section.length-1];
			//console.log(FBZ.model.currentSection);
		}, 

		sectionMonitor : function (index) { 

			FBZ.control.determineSection();
			FBZ.model.currentSectionIndex = index;
	//		console.log("index :", index, FBZ.model.currentSection);
	//		console.log("articule :", FBZ.model.currentArticule);
			// FBZ.control.sectionAnimationEngine();

			//activate slider in the correct sections 
			if(FBZ.model.currentSection === "home" && index === 3 )  { 
				FBZ.sliderHome.createInterval();
				// console.log("execute slider home");
			}else { 
				FBZ.sliderHome.deleteInterval();
			}

			if(FBZ.model.currentSection === "labs" && index === 2 )  { 
				FBZ.sliderLabs.createInterval();
			}else { 
				FBZ.sliderLabs.deleteInterval();
			}

			if(FBZ.model.currentSection === "academy" && index > 2 && index < 7 )  { 
				FBZ.control.fixHeaderCourses();
			}else { 
				FBZ.control.unfixHeaderCourses();
			}


			// to move footer up
			if(FBZ.model.footerHasBeenDisplayed === true ) {
				// console.log("stuff back to normal");
				FBZ.control.moveElementsUp();
			}

			// to move footer down
			if(FBZ.model.currentSection === "home" && index === 7 )  { 
				FBZ.control.moveElementsDown();
			}else { 
			}

			if(FBZ.model.currentSection === "labs" && index === 5 )  { 
				FBZ.control.moveElementsDown();
			}else { 

			}

			if(FBZ.model.currentSection === "academy" && index === 8 )  { 
				FBZ.control.moveElementsDown();

			}else { 

			}

				// articule triggers for home 
				if(FBZ.model.currentSection === "home") {

					if(FBZ.model.currentArticule === "#mission") {

						FBZ.control.animate( FBZ.view.$piramidInfo,"fadeInObj");
						FBZ.control.animate( FBZ.view.$missionText,"fadeInUpObj");
					
					} else if (FBZ.model.currentArticule === "#about"){

						// FBZ.control.animate( FBZ.view.$sliderHome,"fadeInObj");
						FBZ.control.animate(FBZ.view.$displayCard,"fadeInRightObj");
					
					} 
					 else if (FBZ.model.currentArticule === "#staff"){


					 	FBZ.control.onStaffPage();
				
					
					} 
				}

				// articule triggers for labs 

				if(FBZ.model.currentSection === "labs") {

					if(FBZ.model.currentArticule === "#labs") {

						FBZ.control.animate(FBZ.view.$displayCard,"fadeInRightObj");
					
					}else if (FBZ.model.currentArticule === "#tools"){

						FBZ.control.animate( FBZ.view.$toolsTextContainer,"fadeInUpTools");
						FBZ.control.animate( FBZ.view.$toolsBg,"zoomInBg");

					} 
				}
				// articule triggers for academy
				
				if(FBZ.model.currentSection === "academy") {

					if(FBZ.model.currentArticule === "#academy") {

						FBZ.control.animate(FBZ.view.$academyText,"fadeInLeftObj");
						FBZ.control.animate(FBZ.view.$verticalText,"fadeInVerticalText");
						FBZ.control.animate(FBZ.view.$gameRules,"fadeInRightObj");
					
					}else if (FBZ.model.currentArticule === "#courses-1"){

						FBZ.control.animateCourses(0);

					} else if (FBZ.model.currentArticule === "#courses-2"){

						FBZ.control.animateCourses(1);

					} else if (FBZ.model.currentArticule === "#courses-3"){

						FBZ.control.animateCourses(2);

					} else if (FBZ.model.currentArticule === "#courses-4"){

						FBZ.control.animateCourses(3);

					} 
				}
		},

			animateCourses : function (index) {

				// do poll to fix loading bug
				if($($(".course-container-left").get(index)).find(".course-name").length === 0) {

					 FBZ.model.animateCoursesClock = setInterval( function() 
					{
					 FBZ.control.animateCourses(index);
					 // console.log("interval");
        			}, 100);
				} else {

					clearInterval( FBZ.model.animateCoursesClock);
					FBZ.control.animate($($(".course-container-left").get(index)),"fadeInObjCourses");
					FBZ.control.animate($($(".course-container-right").get(index)),"fadeInObjCourses");

					FBZ.control.animate($($(".course-container-left").get(index)).find(".course-name"),"fadeInLeftObj");
					FBZ.control.animate($($(".course-container-right").get(index)).find(".course-name"),"fadeInLeftObj");

					FBZ.control.animate($($(".course-container-left").get(index)).find(".course-start-date"),"fadeInLeftObjx1");
					FBZ.control.animate($($(".course-container-right").get(index)).find(".course-start-date"),"fadeInLeftObjx1");

					FBZ.control.animate($($(".course-container-left").get(index)).find(".course-students"),"fadeInLeftObjx2");
					FBZ.control.animate($($(".course-container-right").get(index)).find(".course-students"),"fadeInLeftObjx2");

					FBZ.control.animate($($(".course-container-left").get(index)).find(".course-teacher"),"fadeInLeftObjx3");
					FBZ.control.animate($($(".course-container-right").get(index)).find(".course-teacher"),"fadeInLeftObjx3");

					FBZ.control.animate($($(".course-container-left").get(index)).find(".course-CTACopy"),"fadeInLeftObjx4");
					FBZ.control.animate($($(".course-container-right").get(index)).find(".course-CTACopy"),"fadeInLeftObjx4");

				}
		},
		onClickDisplayCard : function () {

				FBZ.view.$displayCard.toggleClass("fadeOutRightObj");
				FBZ.view.$displayCard.toggleClass("fadeInRightObj");
				FBZ.view.$closeDisplayCard.toggleClass("active");
				$(".slider-control").toggleClass("active");

		},

		animate : function (element,animClass) {

				if(element.hasClass("is-hidden")) {
					element.removeClass("is-hidden");
				}
				if(element.hasClass(animClass) )  {
					element.removeClass(animClass);
					element.css("offsetWidth" , element.get(0).offsetWidth);
				}
				element.addClass(animClass);
		},

		animateAndHide : function (element,animClass,time) {

				if(element.hasClass(animClass) )  {
					element.removeClass(animClass);
					element.css("offsetWidth" , element.get(0).offsetWidth);
				}
				element.addClass(animClass);

				setTimeout(function(){ 
					element.addClass("is-hidden");
				}, time);
		},
		// WIP section
		sectionAnimationEngine : function () {

			// console.log("section En : "	, FBZ.view.$main,FBZ.view.$main.find("section").length);

			$.each( FBZ.view.$main.find("section"), function( index, value ){
					 // console.log("index :", index , "currentSection :",FBZ.model.currentSectionIndex);
					
						if (index == FBZ.model.currentSectionIndex-1 ) {

								FBZ.control.fadeShow($(value))
								$.each( value.children, function( index, value ){
									// console.log( "IF INSIDE :", value.children);
									 if ( !$(value.children).hasClass( "is-hidden") )  {
									 		
									 		$.each( value.children, function( index2, value2 ){
									 			 if ( !$(value.children).hasClass( "p") ) {
									 			 	$($(value2).get(index2)).css("animation","animateSideIn");
									 				console.log(value2);
												}
											});
									}
								});

						}
					// if ( !$(this).hasClass( "is-hidden") )  {

					// 	FBZ.control.fadeShow($(value))
						
					// if ( !$(this).hasClass( "is-hidden") )  {

					// 	FBZ.control.fadeShow($(value));
					// }
			});
		},

		moveElementsDown : function () {

			// to determine a realible position for the mail
			FBZ.model.footerHasBeenDisplayed = true;
			var manualOffSet = FBZ.model.stageH*0.2;
			var objePosMail =  $(".mail-to-drag-down").position();
			var objeHeightMail  = $(".mail-to-drag-down").height() + $(".address-text").height() + $(".social-buttons").height();
			var offsetDownMail = FBZ.model.stageH - objePosMail.top  - objeHeightMail - manualOffSet ;


			var manualOffSetBig = FBZ.model.stageH*0.5;
			var objePosBig =  $(".big").position();
			var objeHeightBig  = $(".big img").height();
			var offsetDownBig = FBZ.model.stageH - objePosBig.top  - objeHeightBig + manualOffSetBig;


			console.log("position : ", objePosBig.top , "stage : ", FBZ.model.stageH , "result :", offsetDownBig, "height : ",objeHeightBig);
			$(".mail-to-drag-down").css("margin-top",offsetDownMail);
			$(".mail-to-drag-down").css("padding-top",0);
			$(".big").css("margin-top", offsetDownBig);

		},

		moveElementsUp : function () {
			FBZ.model.footerHasBeenDisplayed = false;
			var offsetUp = 0;
			$(".mail-to-drag-down").css("margin-top",offsetUp);
			$(".mail-to-drag-down").css("padding-top",40);
			$(".big").css("margin-top",0);

		},

		parseBrain : function () {

			
			// triggers the init func
			FBZ.control.init();

			if (	FBZ.model.currentSection == 'home' ) { 

				FBZ.control.initHome();
				FBZ.sliderHome.init();
				FBZ.view.$displayCard.on("click",FBZ.control.onClickDisplayCard);
				FBZ.view.$displayCard.toggleClass("fadeOutRightObj");

			} else if (	FBZ.model.currentSection == 'academy' ) { 

				FBZ.control.initAcademy();

			} else if (	FBZ.model.currentSection == 'labs' ) { 

				FBZ.control.initLabs();
				FBZ.sliderLabs.init();
				FBZ.view.$displayCard.on("click",FBZ.control.onClickDisplayCard);
				FBZ.view.$displayCard.toggleClass("fadeOutRightObj");

			}

			FBZ.control.multilingualEngine(); 
			FBZ.control.removeLoadingCurtain();
		 	//FBZ.control.updateLanguage();
		},


		/// init specific per section

		initHome : function () { 

		//	console.log(" home");
			FBZ.control.populateProjects();
			FBZ.control.populatePeople();
		},

		initAcademy : function () { 

		//	console.log("academy init");
			FBZ.control.populateCourses();
		},

		initLabs : function () { 

//			console.log("labs init");

		},


		populateProjects :  function () { 
		//	console.log("populateProjects");

			FBZ.model.totalAmountOfProjects  = FBZ.model.noBrain.Projects.elements.length;
			 /// ,this is an injection of content coming from the no brain 
//			console.log(FBZ.model.noBrain.Projects.elements.length);
			for ( var i = 0 ; i < FBZ.model.noBrain.Projects.elements.length ; i ++ ) { 
//				console.log(FBZ.model.noBrain.Projects.elements[i]);
				if(FBZ.model.noBrain.Projects.elements[i].Privacy != "PRIVATE") {  

					var link = FBZ.model.noBrain.Projects.elements[i].URL;
					if(link != "") {  
						link= "<a class='project-link is hidden' href='"+link+"' target='_blank'>"+FBZ.model.noBrain.Projects.elements[i].URL+"</a>";
					}
				FBZ.view.$projectsCardHolder.append(

						"<div class='project-card'>"+ 

											"<h3 data-translatable class='project-name'>"+FBZ.model.noBrain.Projects.elements[i].Name +"</h3>"+
											"<div class='project-image is-hidden'>"+
											FBZ.model.noBrain.Projects.elements[i].Image+"</div>"+
											// "<div class='project-text-wrapper is-hidden'>"+
										"<h3 data-translatable class='project-client is-hidden'>"+FBZ.model.noBrain.Projects.elements[i].Client +"</h3>"+
											"<p class='project-date is-hidden'>"+ FBZ.model.noBrain.Projects.elements[i].StartDate+"</p>"+
											"<p class='project-description is-hidden' data-translatable>"+FBZ.model.noBrain.Projects.elements[i].Description+"</p>"+
											link+
											// "</div><!--end project text-wrapper-->"+
											"<div class='project-keywords is-hidden'>"+FBZ.model.noBrain.Projects.elements[i].Keywords+"<span></span></div>"+
										"</div><!--end project card-->");
				}
			}
			// to activate accordeon.
			FBZ.control.activateProjectsAccordeon();
		},

		populateCourses :  function () { 
	
 			FBZ.model.totalAmountOfCourses  = FBZ.model.noBrain.Courses.elements.length;
// 			 /// ,this is an injection of content coming from the no brain 
		//	console.log(FBZ.model.noBrain.Courses.elements.length, FBZ.view.$coursesContainers);
			for ( var i = 0 ; i < FBZ.model.noBrain.Courses.elements.length ; i ++ ) { 
			//	console.log("container : ", FBZ.view.$coursesContainers[i]);
				if(FBZ.model.noBrain.Courses.elements[i].Privacy != "PRIVATE") {  
						
			//	$coursesContainers

				 var datesList = FBZ.model.noBrain.Courses.elements[i].LessonDates.replace(/,/g,"<br>");
				
				 $(FBZ.view.$coursesContainers[i]).append(

						"<div class='course-card'>"+ 

									"<div class='close-btn is-hidden'>x</div>"+
									"<div class='course-image' style='background-image:url("+FBZ.model.noBrain.Courses.elements[i].CoursePic+");'>"+
									"</div>"+
									"<div class='course-box'>"+
										"<h3 data-translatable class='course-name'>"+FBZ.model.noBrain.Courses.elements[i].CourseName +"</h3>"+
										"<h4 data-translatable class='course-start-date'>comienza el "+FBZ.model.noBrain.Courses.elements[i].LessonDates.split(",")[0] +"</h3>"+
										"<p data-translatable class='course-students'>"+FBZ.model.noBrain.Courses.elements[i].StudentDescription+"</p>"+
										"<p data-translatable class='course-teacher'>por "+FBZ.model.noBrain.Courses.elements[i].TeacherName + " // by "+FBZ.model.noBrain.Courses.elements[i].TeacherName +"</p>"+
										"<a data-translatable class='course-CTA course-CTACopy'>"+FBZ.model.noBrain.Courses.elements[i].CTACopy+"</a>"+
									"</div>"+


									"<div class='course-details is-hidden'>"+

										"<p class='course-description'>"+FBZ.model.noBrain.Courses.elements[i].CourseDescription+"</p>"+
											"<p data-translatable class='course-lessonDates'>fechas : // dates : </p>"+
											"<p class='dates-list'>"+datesList+"</p>"+
											"<p data-translatable class='course-lessonHours'> horas pedagogicas : "+FBZ.model.noBrain.Courses.elements[i].LessonHours+" // course length :"+FBZ.model.noBrain.Courses.elements[i].LessonHours+"</p>"+
											"<p class='course-time'>"+FBZ.model.noBrain.Courses.elements[i].Time+"</p>"+
											"<p data-translatable class='course-cost'>valor : "+FBZ.model.noBrain.Courses.elements[i].Cost+" // price : "+FBZ.model.noBrain.Courses.elements[i].Cost+"</p>"+
											"<p data-translatable class='course-venue'>lugar : "+FBZ.model.noBrain.Courses.elements[i].Venue+" // venue : "+FBZ.model.noBrain.Courses.elements[i].Venue+"</p>"+
											"<a data-translatable class='course-CTA course-CTAProgram' target='_blank' href="+FBZ.model.noBrain.Courses.elements[i].URL+">"+FBZ.model.noBrain.Courses.elements[i].CTAProgram+"</a>"+
									"</div>"+

									"<div class='teacher-card is-hidden'>"+
										"<div class='teacher-image'>"+
											"<picture>"+
												"<source srcset='../"+FBZ.model.peoplePicBaseURL+FBZ.model.noBrain.Courses.elements[i].TeacherPic+"_small.jpg' media='(max-width: 320px)'/>"+
												"<source srcset='../"+FBZ.model.peoplePicBaseURL+FBZ.model.noBrain.Courses.elements[i].TeacherPic+"_med.jpg' media='(max-width: 650px)'/>"+
												"<source srcset='../"+FBZ.model.peoplePicBaseURL+FBZ.model.noBrain.Courses.elements[i].TeacherPic+"_big.jpg' media='(max-width: 900px)'/>"+
												"<img srcset='../"+FBZ.model.peoplePicBaseURL+FBZ.model.noBrain.Courses.elements[i].TeacherPic+"_med.jpg' alt='"+FBZ.model.noBrain.Courses.elements[i].TeacherName+"'/>"+
											"</picture>"+
										"</div>"+
										"<p class='teacher-name'>"+FBZ.model.noBrain.Courses.elements[i].TeacherName+"</p>"+
										"<p data-translatable class='teacher-description'>"+FBZ.model.noBrain.Courses.elements[i].TeacherDescription+"</p>"+			
									"</div>"+
										"<div class='course-contact is-hidden'>"+

										"<form class='form form--horizontal' method='post' accept-charset='utf-8' action='php/html_form_send.php' enctype='multipart/form-data'>"+

												"<h2 class='course-preincription' data-translatable>Pre-incribete aquí // Pre-suscribe here</h2>"+
														"<fieldset class='form-fieldset'>"+
															"<div class='form-controlGroup'>"+
																// "<label class='form-label' for='first_name'>Nombre // Name</label>"+
																"<div class='form-controlGroup-inputWrapper'>"+
																	"<input class='form-input form_el' name='first_name' type='text' id='text' placeholder='nombre' required/>"+
																"</div>"+
															"</div>"+
															"<div class='form-controlGroup'>"+
																// "<label class='form-label' for='last_name'>telefono // telephone </label>"+
																"<div class='form-controlGroup-inputWrapper'>"+
																	"<input class='form-input' name='phone' type='number' id='text' class='form_el' placeholder='telefono' required/>"+
																"</div>"+
															"</div>"+
															"<div class='form-controlGroup'>"+
																// "<label class='form-label' for='email'>Email</label>"+
																"<div class='form-controlGroup-inputWrapper'>"+
																"<input class='form-input' name='email' type='email' id='email' class='form_el' placeholder='email' required/>"+
																"</div>"+
															"</div>"+

															"<p class='form-course-name is-hidden' name='course' id='comments' class='form_el'>"+FBZ.model.noBrain.Courses.elements[i].CourseName+"</p>"+
															"<input type='submit' class='has-float-right btn btn--primary form_el' />"+
														"</fieldset>"+
													"</form>"+
												"</div>"+
								"</div><!--end course card-->"
						);
				}
			}

			FBZ.control.activateCoursesExpansion();

		},

		fixHeaderCourses : function () {

			if($(".cursos-header").css("opacity") != 0 ) {
				
			}else{
				FBZ.control.fadeShow($(".cursos-header"));
			}
		},

		unfixHeaderCourses : function () {
			FBZ.control.fadeHide($(".cursos-header"));

		}, 

// 	TeacherName .
// CourseName .
// TeacherDescription .
// Cost	.
// CourseDescription .
// StudentDescription .
// LessonDates	.
// LessonHours .
// CoursePic .
// TeacherPic .
// Privacy .
// URL . 
// CTACopy. 
// Venue.
// Time		.												
		activateCoursesExpansion : function () {

				//onClickOpenProjectCard
				FBZ.model.$courseCard = $('.course-card');
				FBZ.model.$courseCard.on('click',FBZ.control.onClickOpenCourseCard);
				FBZ.model.$courseCard.find(".close-btn").on('click',FBZ.control.onClickCollapseCourseCard);

		},

		onClickOpenCourseCard : function (e) {


				//console.log("expand course");
				var $this = $(e.currentTarget);
				$this.off('click',FBZ.control.onClickOpenCourseCard);
				$this.addClass('active');

				$this.parent().addClass("expanded");


				if($this.parent().hasClass( "course-container-right"))  {

					// console.log("right");
					$this.parent().parent().children(".course-container-left").hide();
				} else {
					// console.log("left");
					$this.parent().parent().children(".course-container-right").hide();
				}

				$.each( e.currentTarget.children, function( index, value ){
					// console.log(index, value);
					if ( !$(this).hasClass( "course-box") )  {
						if ( !$(this).hasClass( "course-image") ) {
								FBZ.control.fadeShow($(value));
							
						}
					}

				});
				FBZ.control.fadeHide($this.find(".course-CTACopy"));
				$this.find(".course-teacher").addClass("active");
				$this.find(".course-image").addClass("active");


		},


		onClickCollapseCourseCard : function (e) {


				//console.log("collapse course");
				var $this = $(e.currentTarget).parent();
				$this.removeClass('active');

				if($this.parent().hasClass( "course-container-right"))  {

					// console.log("right");
					$this.parent().parent().children(".course-container-left").show();
				} else {
					// console.log("left");
					$this.parent().parent().children(".course-container-right").show();
				}
				$this.parent().removeClass("expanded");
				
				 $.each(  $this.get(0).children, function( index, value ){
					// console.log(index, value);
				if ( !$(this).hasClass( "course-box") )  {
					if ( !$(this).hasClass( "course-image") ) {

								FBZ.control.fadeHide($(value));
						}
					}

				});
				FBZ.control.fadeShow($this.find(".course-CTACopy"));
				$this.find(".course-teacher").removeClass("active");
				$this.find(".course-image").removeClass("active");
				
				setTimeout(function(){ 
					FBZ.model.$courseCard.on('click',FBZ.control.onClickOpenCourseCard);
			}, 701);
				
		},


		////// end courses bit 


		populatePeople : function () { 

			FBZ.model.totalAmountOfPeople = FBZ.model.noBrain.People.elements.length;

			for ( var i = 0 ; i < FBZ.model.noBrain.People.elements.length ; i ++ ) { 
			//	console.log(FBZ.model.noBrain.People.elements[i]);
			var decor = ""; 
			
			if (FBZ.model.noBrain.People.elements[i].Rank == "staff") { 
				decor =	"<div class='person-img-decoration'><img src='assets/img/circle_people.svg'/></div>"
			}
				
				var peopleCard = "<div class='people person-card "+FBZ.model.noBrain.People.elements[i].Rank+"'>"+ 
									decor+

										"<div class='person-img'>"+
											"<picture>"+
												"<source srcset='"+FBZ.model.peoplePicBaseURL+FBZ.model.noBrain.People.elements[i].Pic+"_small.jpg' media='(max-width: 320px)'/>"+
												"<source srcset='"+FBZ.model.peoplePicBaseURL+FBZ.model.noBrain.People.elements[i].Pic+"_med.jpg' media='(max-width: 650px)'/>"+
												"<source srcset='"+FBZ.model.peoplePicBaseURL+FBZ.model.noBrain.People.elements[i].Pic+"_big.jpg' media='(max-width: 900px)'/>"+
												"<img srcset='"+FBZ.model.peoplePicBaseURL+FBZ.model.noBrain.People.elements[i].Pic+"_med.jpg' alt='"+FBZ.model.noBrain.People.elements[i].Name+" "+FBZ.model.noBrain.People.elements[i].LastName+"'/>"+
											"</picture>"+
										"</div>"+
											"<h3>"+FBZ.model.noBrain.People.elements[i].Name+" "+FBZ.model.noBrain.People.elements[i].LastName+"</h3>"+
											"<h4 data-translatable>"+FBZ.model.noBrain.People.elements[i].Role+"</h4>"+
									"</div><!-- end person-->";

				if (FBZ.model.noBrain.People.elements[i].Rank == "staff") {

					FBZ.view.$staffContainer.append(peopleCard);
					//	console.log("staff");
				}else { 
					FBZ.view.$collabContainer.append(peopleCard);
				}
			
			}
			FBZ.control.activateStaffPage();
		},

		activateStaffPage: function () {

			// console.log( "activate :", FBZ.view.$staffContainer.find(".people"),FBZ.view.$staffContainer.find(".people").length);
			// console.log( "activate :", FBZ.view.$collabContainer.find(".people"),FBZ.view.$collabContainer.find(".people").length);
			var staffLength  = FBZ.view.$staffContainer.find(".people").length;
			// var collabLength = FBZ.view.$collabContainer.find(".people").length;

			// console.log(FBZ.view.$staffContainer.find(".people").find(".person-img-decoration").get(0));
			$(FBZ.view.$staffContainer.find(".people").find(".person-img-decoration").get(0)).addClass("rotate-first-decoration");
			$(FBZ.view.$staffContainer.find(".people").find(".person-img-decoration").get(staffLength-1)).addClass("rotate-last-decoration");

		},

		onStaffPage: function () {



			var staffLength  = FBZ.view.$staffContainer.find(".people").length;
				// do poll to fix loading bug
				if(staffLength === 0) {

					 FBZ.model.animateStaffClock = setInterval( function() 
					{
					 FBZ.control.onStaffPage();
					 console.log("interval");
				}, 100);
				} else {

				clearInterval(FBZ.model.animateStaffClock);
				
				FBZ.control.animate($(FBZ.view.$staffContainer.find(".people").find(".person-img-decoration").get(0)),"rotate-first-decoration");
				FBZ.control.animate($(FBZ.view.$staffContainer.find(".people").find(".person-img-decoration").get(staffLength-1)),"rotate-last-decoration");
				FBZ.control.animate( $(".staff-title"),"fadeInRightObj");
				FBZ.control.animate( FBZ.view.$staffContainer,"fadeInRightObjx1");
				FBZ.control.animate( $(".collab-title"),"fadeInRightObjx2");
				FBZ.control.animate( FBZ.view.$collabContainer,"fadeInRightObjx3");
			for ( var i = 0 ; i < staffLength; i ++ ) { 
				// console.log("on staff page :",i);
				if ( i == 0 ) {
					// console.log("staff is 0");
					// $(FBZ.view.$staffContainer.find(".people").find(".person-img-decoration").get(0)).addClass("rotate-first-decoration");
				}else if (i === staffLength-1 ){
					// console.log("staff is last");
					// $(FBZ.view.$staffContainer.find(".people").find(".person-img-decoration").get(staffLength-1)).addClass("rotate-last-decoration");

				}else {
					FBZ.control.animate($(FBZ.view.$staffContainer.find(".people").find(".person-img-decoration").get(i)),"rotate-mid-decoration");
						// console.log("staff is mid");
				}
			// 			// FBZ.control.animate(FBZ.view.$displayCard,"fadeInRightObj");
			// console.log( "activate :", FBZ.view.$staffContainer.find(".people"),FBZ.view.$staffContainer.find(".people").length);
			// console.log( "activate :", FBZ.view.$collabContainer.find(".people"),FBZ.view.$collabContainer.find(".people").length);
			// var staffLength  = FBZ.view.$staffContainer.find(".people").length;
			// var collabLength = FBZ.view.$collabContainer.find(".people").length;

			// console.log(FBZ.view.$staffContainer.find(".people").find(".person-img-decoration").get(0));

			// $(FBZ.view.$staffContainer.find(".people").find(".person-img-decoration").get(0)).addClass("rotate-first-decoration");
			// $(FBZ.view.$staffContainer.find(".people").find(".person-img-decoration").get(staffLength-1)).addClass("rotate-last-decoration");
				}
			}
		},



		populateProjects :  function () { 
		//	console.log("populateProjects");

			FBZ.model.totalAmountOfProjects  = FBZ.model.noBrain.Projects.elements.length;
			 /// ,this is an injection of content coming from the no brain 
//			console.log(FBZ.model.noBrain.Projects.elements.length);
			for ( var i = 0 ; i < FBZ.model.noBrain.Projects.elements.length ; i ++ ) { 
//				console.log(FBZ.model.noBrain.Projects.elements[i]);
				if(FBZ.model.noBrain.Projects.elements[i].Privacy != "PRIVATE") {  

				FBZ.view.$projectsCardHolder.append(

						"<div class='project-card'>"+ 

											"<h3 data-translatable class='project-name'>"+FBZ.model.noBrain.Projects.elements[i].Name +"</h3>"+
											"<div class='project-image is-hidden'>"+
											FBZ.model.noBrain.Projects.elements[i].Image+"</div>"+
											// "<div class='project-text-wrapper is-hidden'>"+
										"<h3 data-translatable class='project-client is-hidden'>"+FBZ.model.noBrain.Projects.elements[i].Client +"</h3>"+
											"<p class='project-date is-hidden'>"+ FBZ.model.noBrain.Projects.elements[i].StartDate+"</p>"+
											"<p class='project-description is-hidden' data-translatable>"+FBZ.model.noBrain.Projects.elements[i].Description+"</p>"+
											// "</div><!--end project text-wrapper-->"+
											"<div class='project-keywords is-hidden' data-translatable>"+FBZ.model.noBrain.Projects.elements[i].Keywords+"<span></span></div>"+
										"</div><!--end project card-->");
				}
			}
			// to activate accordeon.
			FBZ.control.activateProjectsAccordeon();

		},


		activateProjectsAccordeon : function () {

			FBZ.model.visibleScrollProjects 			= FBZ.view.$projectScroller.height();
			FBZ.model.totalScrollProjects 				= FBZ.view.$projectsCardHolder.height();
			FBZ.model.overFlowProjects 					= FBZ.model.totalScrollProjects - FBZ.model.visibleScrollProjects;
			FBZ.model.proyectsHeight 					= $('.project-card').height();
			FBZ.model.currentProjectIndex				= Math.floor( FBZ.model.visibleScrollProjects / FBZ.model.proyectsHeight);
			FBZ.model.initialProjectIndex 				= FBZ.model.currentProjectIndex;

			FBZ.view.$projectScroller.css({ height : FBZ.model.proyectsHeight*FBZ.model.initialProjectIndex});

	//		console.log(FBZ.model.proyectsHeight,FBZ.model.currentProjectIndex, FBZ.model.totalAmountOfProjects );

			// on click car
			/// arrows nav
			FBZ.view.$projectArrowUp.on('click hover', function () {

				if (FBZ.model.currentProjectIndex >  FBZ.model.initialProjectIndex ) {
					FBZ.model.currentProjectIndex --;
				}

				FBZ.control.moveToProjectIndex(); 
			});

			FBZ.view.$projectArrowDown.on('click hover', function () {


				if (FBZ.model.totalAmountOfProjects-1 >  FBZ.model.currentProjectIndex ) {
					FBZ.model.currentProjectIndex ++;
				}

					FBZ.control.moveToProjectIndex(); 
			});
			//onClickOpenProjectCard
				FBZ.model.$projectCard 	 = $('.project-card');
				FBZ.model.$projectCard.on('click',FBZ.control.collapseOrExpandProjectSelector);

		},

		moveToProjectIndex : function () { 
				var posy =  FBZ.view.$projectScroller.height() - FBZ.model.proyectsHeight* FBZ.model.currentProjectIndex;
					FBZ.view.$projectsCardHolder.css({top: posy } );
			//		console.log(posy,FBZ.model.currentProjectIndex );
		},

		fadeHide : function (el) { 

			el.addClass("is-fading-out");

			setTimeout(function(){ 
				el.addClass("is-hidden");
				el.removeClass("is-fading-out");
			}, 701);
		},

		fadeShow : function (el) { 

			el.addClass("is-fading-in");
			el.removeClass("is-hidden");

			setTimeout(function(){ 

				el.removeClass("is-fading-in");
			}, 701);
		},


		scrollToProjectIndex : function (index) {


			FBZ.model.currentProjectIndex = index;
			FBZ.model.visibleScrollProjects 			= FBZ.view.$projectScroller.height();
			FBZ.model.totalScrollProjects 				= FBZ.view.$projectsCardHolder.height();
			FBZ.model.overFlowProjects 					= FBZ.model.totalScrollProjects - FBZ.model.visibleScrollProjects;

//			console.log("overflow is ", FBZ.model.overFlowProjects );
			var posy  = 0 //-FBZ.model.proyectsHeight;
			//var posy = FBZ.model.proyectsHeight * FBZ.model.currentProjectIndex;



			FBZ.view.$projectsCardHolder.children(".project-card").each(function( index, value ){
				//	console.log("each",index, value);
					//$(value).removeClass("is-hidden");
					//scrollValue
				//	posy += $(value).height();
				//	console.log("offestTop",parseInt($(value).offset().top));
					if ( index === FBZ.model.currentProjectIndex ) { 
						console.log("match");

						 FBZ.view.$projectScroller.animate({
							 scrollTop: parseInt(value.offsetTop)
						}, 500);
						return false;
					}else { 

					}

				});
				//	console.log("posy is : ",posy,"currentScroll is ",FBZ.view.$projectScroller.scrollTop( ),"scrollTo :",posy,FBZ.model.currentProjectIndex );

				//	FBZ.view.$projectScroller.scrollTop( posy );
		},

		updatedProjectToCurrent : function (index) {

			FBZ.model.currentProjectIndex = index;
			FBZ.control.moveToProjectIndex();
		}, 

		collapseOrExpandProjectSelector : function (e) {

		//	console.log($(this), $(e.currentTarget).hasClass( "active"));
			if ( $(this).hasClass( "active") )  { 

				FBZ.control.onClickCollapseProject(e); 
				$(this).removeClass('active');

			//	console.log ("has active :", !$(this).hasClass( "active") ); 
			//	console.log("this does have active so .. collapse");

			}else { 
				$(this).addClass('active');

				FBZ.control.onClickOpenProjectCard(e);
			//	console.log("this doesnt have active so .. expand");

			}
		},

		onClickOpenProjectCard : function (e) {

		//		console.log("expand");
				var $this = $(e.currentTarget);

				var projectIndex = $this.index(); // - FBZ.model.totalAmountOfProjects; 
			//	console.log("projectIndex :",projectIndex);

				$this.css({ height : FBZ.view.$projectScroller.height()});
				
				$.each( e.currentTarget.children, function( index, value ){
				//	console.log(index, value);
				if (!$(this).hasClass( "project-name") )  {

						FBZ.control.fadeShow($(value));
					}
				});

				FBZ.control.scrollToProjectIndex(projectIndex);

		},

		onClickCollapseProject : function (e) {
			//	console.log("collapse project");
				var $this = $(e.currentTarget);
				$this.css({ height : FBZ.model.proyectsHeight});

				 $.each(  e.currentTarget.children, function( index, value ){
					//console.log(index, value);
					if (!$(this).hasClass( "project-name") )  {
						FBZ.control.fadeHide($(value));
					}
				});
		},

		readFromGoogleDocs : function () { 

			// https://docs.google.com/spreadsheets/d/1T0qB23t_Lc17VrtnybisyjVsfufbM3trJ9QGNjJUspo/pubhtml

			Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1T0qB23t_Lc17VrtnybisyjVsfufbM3trJ9QGNjJUspo/pubhtml',
				callback: function(data, tabletop) { 
					console.dir(data) 
					FBZ.model.noBrain = data;
					FBZ.control.parseBrain();
				} } )
		}, 


		// interactiveBG : function () {

		// 	$(".logo-init").interactive_bg({
		// 	   strength: 25,              // Movement Strength when the cursor is moved. The higher, the faster it will reacts to your cursor. The default value is 25.
		// 	   scale: 1.05,               // The scale in which the background will be zoomed when hovering. Change this to 1 to stop scaling. The default value is 1.05.
		// 	   animationSpeed: "100ms",   // The time it takes for the scale to animate. This accepts CSS3 time function such as "100ms", "2.5s", etc. The default value is "100ms".
		// 	   contain: true,             // This option will prevent the scaled object/background from spilling out of its container. Keep this true for interactive background. Set it to false if you want to make an interactive object instead of a background. The default value is true.
		// 	   wrapContent: false         // This option let you choose whether you want everything inside to reacts to your cursor, or just the background. Toggle it to true to have every elements inside reacts the same way. The default value is false
		// 	 });
		// 	$(".logo-init").interactive_bg(); // function call

		// },

		disappearScrollIcon : function ()  { 
			FBZ.view.$scrollIcon.scroll( function () { 
				//$scrollIcon.css(alpha);
				console.log("scroll");
			});
		},

		// twitterWidget : function () {
		// 	window.twttr = (function(d, s, id) {
		// 		var js, fjs = d.getElementsByTagName(s)[0],
		// 		t = window.twttr || {};
		// 		if (d.getElementById(id)) return t;
		// 	  	js = d.createElement(s);
		// 	  	js.id = id;
		// 	  	js.src = "https://platform.twitter.com/widgets.js";
		// 	  	fjs.parentNode.insertBefore(js, fjs); 
		// 		t._e = [];
		// 		t.ready = function(f) {
		// 			t._e.push(f);
		// 		};
		// 	  return t;
		// 	}(document, "script", "twitter-wjs"));
		// },

		checkURL : function () {

			$.fn.goToSectionByName();
		},

		multilingualEngine : function () {

			// multilingual plugin config . 

			i18n = window.domI18n({
				selector: '[data-translatable]',
				separator: ' // ',
				languages: ['es', 'en'],
				defaultLanguage: 'es'
			});
			
			FBZ.view.$langBtn.click(function(){
				
				var languageSelected = $(this).attr('lang');
				FBZ.control.changeLanguage(languageSelected);
			//	console.log("change language to :",languageSelected);
				
				var buttons = $.find(".lang-btn");
				for(var i = 0 ; i < buttons.length ; i ++ ) { 
					$(buttons[i]).removeClass("active");
					console.dir(buttons[i],buttons[i]);
				//	if (buttons[i].hasClass("active")) {
				//	}
				}
			//	console.log($.find(".lang-btn").hasClass("active").removeClass("active" ));	
				$(this).addClass("active" );
			});

			FBZ.control.changeLanguage('es');
		},

		updateLanguage : function () {
			FBZ.control.changeLanguage('es');
		},

		changeLanguage : function (language) { 

			i18n.changeLanguage(language);
		//	console.log("changeLanguage");

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

		//	console.log("def stage", FBZ.model.stageH, FBZ.model.stageW );

		},

		onResizeStage : function ()  { 

			$(window).resize(function() {
				// to re - resize the layout . 
				FBZ.control.defineStage();
				FBZ.control.resizeContentBlock();
				
				//	// to activate accordeon add existence check 
		//		FBZ.control.activateProjectsAccordeon();

			}.debounce(150));

		},

		resizeContentBlock : function () { 
			FBZ.view.$block.css("width",FBZ.model.stageW);
			FBZ.view.$block.css("height",FBZ.model.stageH);
			// var dynamicPadding = ((FBZ.model.stageW+FBZ.model.stageH)*.5)*.075;
			// FBZ.view.$block.css("padding",dynamicPadding);
		},

		scrollerControl:function () {

			$(".main").onepage_scroll({
			   sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
			   easing: "ease-out",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
			                                    // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
			   animationTime: 900,             // AnimationTime let you define how long each section takes to animate
			   pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
			   updateURL: true,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
			   beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
			   afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
			   loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
			   keyboard: true,                  // You can activate the keyboard controls
			   responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
			                                    // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
			                                    // the browser's width is less than 600, the fallback will kick in.
			   direction: "vertical",            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
			});

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

var i18n;

// debounce prototype
Function.prototype.debounce = function (milliseconds) {
    var baseFunction = this,
        timer = null,
        wait = milliseconds;

    return function () {
        var self = this,
            args = arguments;

        function complete() {
            baseFunction.apply(self, args);
            timer = null;
        }

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(complete, wait);
    };
};

