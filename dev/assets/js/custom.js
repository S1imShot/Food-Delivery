const burger = document.querySelector(".hamburger");
burger.addEventListener("click", function () {
	burger.classList.toggle("is-active");

});

const advantage = document.querySelector(".advantage");
advantage.addEventListener("click", function() {
	advantage.classList.toggle("active")
});

var swiper = new Swiper(".mySwiper", {
	effect: "coverflow",
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: "auto",
	loop: true,
	
	coverflowEffect: {
	  rotate: 50,
	  stretch: 0,
	  depth: 100,
	  modifier: 1,
	  slideShadows: false,

	},

	pagination: {
	  el: ".swiper-pagination",
	},
});

AOS.init();