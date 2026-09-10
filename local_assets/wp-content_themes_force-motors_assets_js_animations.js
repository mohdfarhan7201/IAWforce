$(document).ready(function () {
	//gsap.registerPlugin(ScrollTrigger);

	// Init ScrollMagic
	var controller = new ScrollMagic.Controller({
		refreshInterval: 0,
	});
	// build a scene
	$(".bottom-top").each(function () {
		var fadeScene = new ScrollMagic.Scene({
			triggerElement: this,
			duration: "150%",
			triggerHook: 0.8,
		})
			.setClassToggle(this, "fade-in") // add class to project01
			.addTo(controller);
	});
	$(".gangway").each(function () {
		//console.log(this);
		var fadeLeftScene = new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: 0.5,
		})
			.setClassToggle(this, "fade-in-left") // add class to project01
			.addTo(controller);
	});
	// $(".diagnol").each(function () {
	// 	console.log(this);
	// 	var diagnolScene = new ScrollMagic.Scene({
	// 		triggerElement: this,
	// 		triggerHook: 0.1,
	// 	})
	// 		.setClassToggle(this, "rtl") // add class to project01
	// 		.addTo(controller);
	// });
	var diagnolScene = new ScrollMagic.Scene({
		triggerElement: "#diagnol",
		triggerHook: 0.9,
	})
		.setClassToggle(".diagnol", "rtl") // add class to project01
		.addTo(controller);
});
