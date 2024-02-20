const burger = document.querySelector(".hamburger");
burger.addEventListener("click", function () {
	burger.classList.toggle("is-active");

});


const ratingLabel = document.querySelectorAll(".actions-rating__label")
const ratingCount = document.querySelectorAll(".actions-rating__count");


ratingCount.forEach(element => {
	const count = element;

	ratingLabel.forEach(element => {
	
		const label = element;
		const getLabelAttr = element.getAttribute("data-value");
	
		label.addEventListener("click", function() {
			count.innerHTML = getLabelAttr;
		})

		console.log(label);
	});

})






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

// var swiperSecond = new Swiper(".mySwiper-sec", {
// 	centeredSlides: true,
// 	slidesPerView: "auto",
// 	loop: true,

// 	navigation: {
// 	  nextEl: ".swiper-button-next",
// 	  prevEl: ".swiper-button-prev",
// 	},

// 	pagination: {
// 		el: ".swiper-pagination",
// 	  },
//   });

AOS.init();