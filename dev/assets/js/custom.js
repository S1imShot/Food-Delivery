const burger = document.querySelector(".hamburger");
burger.addEventListener("click", function () {
	burger.classList.toggle("is-active");

});


const ratingLabel = document.querySelectorAll(".actions-rating__label")
const ratingCount = document.querySelector(".actions-rating__count");

ratingLabel.forEach(element => {
	
	const label = element;
	const getLabelAttr = element.getAttribute("data-value");

	label.addEventListener("click", function() {
		ratingCount.innerHTML = getLabelAttr;
	})
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