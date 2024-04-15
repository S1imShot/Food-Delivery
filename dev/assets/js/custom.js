const dishesArr = [
	{
	  id: 1,
	  title: "Featured Meal",
	  photo: "assets/img/dish-img-1.png",
	  subtitle: "Served with french fries + drink",
	  about: "Choice of: Coke, Fanta, Sprite, Upgrade to large fries, Add whopper patty, Add Tender crisp patty and more...",
	},
	{
	  id: 2,
	  title: "Featured Meal",
	  photo: "assets/img/dish-img-2.png",
	  subtitle: "Served with french fries + drink",
	  about: "Choice of: Coke, Fanta, Sprite, Upgrade to large fries, Add whopper patty, Add Tender crisp patty and more...",
	},
	{
	  id: 3,
	  title: "Featured Meal",
	  photo: "assets/img/dish-img-3.png",
	  subtitle: "Served with french fries + drink",
	  about: "Choice of: Coke, Fanta, Sprite, Upgrade to large fries, Add whopper patty, Add Tender crisp patty and more...",
	},
	{
	  id: 4,
	  title: "Featured Meal",
	  photo: "assets/img/dish-img-4.png",
	  subtitle: "Served with french fries + drink",
	  about: "Choice of: Coke, Fanta, Sprite, Upgrade to large fries, Add whopper patty, Add Tender crisp patty and more...",
	},
	{
	  id: 5,
	  title: "Featured Meal",
	  photo: "assets/img/dish-img-5.png",
	  subtitle: "Served with french fries + drink",
	  about: "Choice of: Coke, Fanta, Sprite, Upgrade to large fries, Add whopper patty, Add Tender crisp patty and more...",
	},
	{
	  id: 6,
	  title: "Featured Meal",
	  photo: "assets/img/dish-img-6.png",
	  subtitle: "Served with french fries + drink",
	  about: "Choice of: Coke, Fanta, Sprite, Upgrade to large fries, Add whopper patty, Add Tender crisp patty and more...",
	},
];

window.addEventListener("load", function () {

	const burger = document.querySelector (".hamburger");
		burger.addEventListener("click", function () {
		burger.classList.toggle("is-active");
	});

	const dishesContainer = document.querySelector(".dishes__card-container");
 
	const renderDishes = (array) => {
	  const list = array
		.map((dishes) => {
		  return `
		  <div class="dishes__card">
		  <div class="card-img">
			  <a href="">
				  <img src="${dishes.photo}" alt="Dish image" />
				  <img
					  src="assets/img/dishes-arrow.png"
					  class="dish-decor"
					  alt="Arrow"
				  />
			  </a>
		  </div>
		  <div class="card__description">
			  <div class="card-title">
				  <h3><a href="#">${dishes.title}</a></h3>
			  </div>
			  <div class="card-subtitle">
				  <p>${dishes.subtitle}</p>
			  </div>
			  <div class="card-about">
				  <p>
				  ${dishes.about}
				  </p>
			  </div>
		  </div>
		  <div class="card__actions">
			  <div class="actions-rating">
				  <div class="actions-rating__items">
					  <input
						  type="radio"
						  class="actions-rating__item"
						  name="actions-rating"
						  value="5"
					  />
					  <label class="actions-rating__label" data-value="5"></label>
					  <input
						  type="radio"
						  class="actions-rating__item"
						  name="actions-rating"
						  value="4"
					  />
					  <label class="actions-rating__label" data-value="4"></label>
					  <input
						  type="radio"
						  class="actions-rating__item"
						  name="actions-rating"
						  value="3"
					  />
					  <label class="actions-rating__label" data-value="3"></label>
					  <input
						  type="radio"
						  class="actions-rating__item"
						  name="actions-rating"
						  value="2"
					  />
					  <label class="actions-rating__label" data-value="2"></label>
					  <input
						  type="radio"
						  class="actions-rating__item"
						  name="actions-rating"
						  value="1"
					  />
					  <label class="actions-rating__label" data-value="1"></label>
				  </div>
			  </div>
			  <div class="actions-rating__count"></div>
			  <div class="actions-button">
				  <a href="" class="button">order</a>
			  </div>
		  </div>
	  	</div>
			  `;
		})
		.join("");
	  dishesContainer.innerHTML = list;
	};
	renderDishes(dishesArr);
	
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

	const dishesCard = document.querySelectorAll('.dishes__card');
	let buttonsAdded = false;

	window.addEventListener('resize', function() {
		const screenWidth = window.innerWidth;
		const firstElement = document.querySelector('.carousel-inner :first-child');

		const prevButton = document.querySelector('.carousel-control-prev');
		const nextButton = document.querySelector('.carousel-control-next');

		if (screenWidth < 759) {
		  	dishesContainer.classList.add('carousel-inner');
			dishesCard.forEach( e => {
				e.classList.add('carousel-item')
			});
			firstElement.classList.add('active');

			const carouselInner = document.querySelector('.carousel-inner')
			


			let html = `
				<button class="carousel-control-prev" type="button" data-bs-target="#card-container" data-bs-slide="prev">
				  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
				  <span class="visually-hidden">Previous</span>
				</button>
				<button class="carousel-control-next" type="button" data-bs-target="#card-container" data-bs-slide="next">
				  <span class="carousel-control-next-icon" aria-hidden="true"></span>
				  <span class="visually-hidden">Next</span>
				</button>
	  		`;

	  
		// Вставляємо HTML-код до контейнера
		carouselInner.insertAdjacentHTML('beforeend', html);
		buttonsAdded = true;


		} else {
			dishesContainer.classList.remove('carousel-inner');

			dishesCard.forEach((e) => {
				e.classList.remove('carousel-item');
				e.classList.remove('active');
			});
			
			prevButton.remove();
			nextButton.remove();

			buttonsAdded = false;
		}
		
	});
	
});

// // // Видаляємо євент
// window.removeEventListener('resize', arguments.callee);


window.addEventListener('resize', function() {
	// const carouselInner = document.querySelector('.carousel-inner')

	// 	let html = `
	// 		<button class="carousel-control-prev" type="button" data-bs-target="#card-container" data-bs-slide="prev">
	// 		  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
	// 		  <span class="visually-hidden">Previous</span>
	// 		</button>
	// 		<button class="carousel-control-next" type="button" data-bs-target="#card-container" data-bs-slide="next">
	// 		  <span class="carousel-control-next-icon" aria-hidden="true"></span>
	// 		  <span class="visually-hidden">Next</span>
	// 		</button>
	//   	`;

	  
	// 	// Вставляємо HTML-код до контейнера
	// 	carouselInner.insertAdjacentHTML('beforeend', html);
		
		// // // Видаляємо євент
		// window.removeEventListener('resize', arguments.callee);
		//   // Перевіряємо, чи елемент `.carousel-inner` існує та видимий
		// if (carouselInner = true) {
		// 	// Знаходимо кнопки
		// 	console.log(123)
		// 	const prevButton = document.querySelector('.carousel-control-prev');
		// 	const nextButton = document.querySelector('.carousel-control-next');
			
		// 	console.log(prevButton)
		// 	console.log(nextButton)
		// 	// Перевіряємо, чи кнопки існують, і видаляємо їх
		// 	if (prevButton) prevButton.remove();
		// 	if (nextButton) nextButton.remove();
			
		// }
		
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
Fancybox.bind();

  