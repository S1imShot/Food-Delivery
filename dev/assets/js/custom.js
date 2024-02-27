const burger = document.querySelector(".hamburger");
burger.addEventListener("click", function () {
	burger.classList.toggle("is-active");

});

const dishes = document.querySelectorAll(".dishes__card");

dishes.forEach((dish, index) => {
	const ratingLabel = dish.querySelectorAll(".actions-rating__label")
	const ratingCounts = dish.querySelectorAll(".actions-rating__count");
	const ratingItem = dish.querySelectorAll('.actions-rating__item');
	
	
	for (let i = 0; i < ratingLabel.length; i++) {
		ratingLabel[i].setAttribute('for', index + "" + i);
	}
	
	for (let i = 0; i < ratingItem.length; i++) {
		ratingItem[i].setAttribute('id', index + "" + i);
	}
	
	for (let i = 0; i < ratingCounts.length; i++) {
		ratingCounts[i].setAttribute('data-number', i);
	}
		
	ratingCounts.forEach(count => {
			ratingLabel.forEach(label => {
	
			const labelAttr = label.getAttribute("data-value");
		
			label.addEventListener("click", function() {
				count.innerHTML = labelAttr;
				
			})
		});
	
	})
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