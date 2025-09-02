'use strict';

import {newLaunches} from "../db.js";
console.log(newLaunches);

document.addEventListener('DOMContentLoaded', () => {
	const newLaunchesSlider = document.querySelector('.main__new-launches_wrapper__card-slider_item'),
		  nextBtn = document.querySelector('.main__new-launches_wrapper__card-slider_rbtn'),
		  prevBtn = document.querySelector('.main__new-launches_wrapper__card-slider_lbtn');

	// Активна картка
	let active = newLaunches;
	let currentIndex = 0;
	let totalCards = active.length;


// 	function card() {
// 	newLaunchesSlider.innerHTML = "";

// 	newLaunches.forEach((product, index) => {

// 		const item = document.createElement("div");
// 		item.classList.add("main__new-launches_wrapper__card-slider_content");
// 		if (index === currentIndex) item.classList.add("active");

// 		//Активний колір
// 		const colorsBlock = document.querySelector(".main__new-launches_wrapper__card-slider_content__descr-colors");
// 		let colors = product.colors;
// 		// let activeColor = color.classList.add("active");

// 		colors.forEach((item) => {
// 			const unit = document.createElement("div");
// 			unit.classList.add("main__new-launches_wrapper__card-slider_content__descr-colors_item");
// 			// let color = colorsBlock.querySelector("._item");
// 			unit.style.backgroundColor = `${colors}`;
// 		});



// 		item.innerHTML = `
// 			<div class="main__new-launches_wrapper__card-slider_content__img">
// 				<div class="first">
// 					<img src=${product.img1} alt=${product.title} />
// 				</div>
// 				<div class="second">
// 					<img src=${product.img2} alt=${product.title} />
// 				</div>
// 			</div>
// 			<div class="main__new-launches_wrapper__card-slider_content__descr">
// 				<div class="main__new-launches_wrapper__card-slider_content__descr-header">
// 					${product.title}
// 				</div>
// 				<div class="main__new-launches_wrapper__card-slider_content__descr-text">
// 					${product.descr}
// 					<a href=${product.link}> Read More </a>
// 				</div>
// 				<div class="main__new-launches_wrapper__card-slider_content__descr-price">
// 					Price : <span> $${product.price} </span>
// 				</div>
// 				<div class="main__new-launches_wrapper__card-slider_content__descr-colors">
// 					${colors}
// 				</div>
// 				<div class="main__new-launches_wrapper__card-slider_content__descr-btns">
// 					<button class="add">Add to cart</button>
// 					<button class="more">Explore More</button>
// 				</div>
// 			</div>
// 		`;

// 		newLaunchesSlider.appendChild(item);
// 	});
// }


	// === СЛАЙДЕР ===

	function card() {
	newLaunchesSlider.innerHTML = "";

	newLaunches.forEach((product, index) => {

		const item = document.createElement("div");
		item.classList.add("main__new-launches_wrapper__card-slider_content");
		if (index === currentIndex) item.classList.add("active");

		// Створюємо блок кольорів
		const colorsBlock = document.createElement("div");
		colorsBlock.classList.add("main__new-launches_wrapper__card-slider_content__descr-colors");

		product.colors.forEach(color => {
			const unit = document.createElement("button");
			unit.classList.add("main__new-launches_wrapper__card-slider_content__descr-colors_item");
			unit.style.backgroundColor = color;
			unit.setAttribute("title", color); // Підказка при наведенні
			colorsBlock.appendChild(unit);
		});

		// Створюємо HTML-контент картки
		const cardContent = `
			<div class="main__new-launches_wrapper__card-slider_content__img">
				<div class="first">
					<img src="${product.img1}" alt="${product.title}" />
				</div>
				<div class="second">
					<img src="${product.img2}" alt="${product.title}" />
				</div>
			</div>
			<div class="main__new-launches_wrapper__card-slider_content__descr">
				<div class="main__new-launches_wrapper__card-slider_content__descr-header">
					${product.title}
				</div>
				<div class="main__new-launches_wrapper__card-slider_content__descr-text">
					${product.descr}
					<a href="${product.link}"> Read More </a>
				</div>
				<div class="main__new-launches_wrapper__card-slider_content__descr-price">
					Price : <span> $${product.price} </span>
				</div>
				<!-- Тут буде вставлено colorsBlock -->
				<div class="main__new-launches_wrapper__card-slider_content__descr-btns">
					<button class="add">Add to cart</button>
					<button class="more">Explore More</button>
				</div>
			</div>
		`;

		// Вставляємо HTML у item
		item.innerHTML = cardContent;

		// Вставляємо блок кольорів у відповідне місце
		const descrBlock = item.querySelector(".main__new-launches_wrapper__card-slider_content__descr");
		descrBlock.insertBefore(colorsBlock, descrBlock.querySelector(".main__new-launches_wrapper__card-slider_content__descr-btns"));

		// Додаємо картку до слайдера
		newLaunchesSlider.appendChild(item);
	});
}

	function updateSliderPosition() {
		const allCards = newLaunchesSlider.querySelectorAll(".main__new-launches_wrapper__card-slider_content");

		allCards.forEach((card, index) => {
			card.classList.remove("active");
			if (index === currentIndex) {
				card.classList.add("active");
			}
		});
	}


	// Слухачі на кнопки

	nextBtn.addEventListener('click', () => {
		currentIndex = (currentIndex + 1) % totalCards;
		updateSliderPosition();
	});

	prevBtn.addEventListener('click', () => {
		currentIndex = (currentIndex - 1 + totalCards) % totalCards;
		updateSliderPosition();
	});


	card();
});