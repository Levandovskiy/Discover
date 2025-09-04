'use strict';

import {newLaunches} from "../db.js";

document.addEventListener('DOMContentLoaded', () => {
	const newLaunchesSlider = document.querySelector('.main__new-launches_wrapper__card-slider_item'),
		  nextBtn = document.querySelector('.main__new-launches_wrapper__card-slider_rbtn'),
		  prevBtn = document.querySelector('.main__new-launches_wrapper__card-slider_lbtn');

	// Активна картка
	let activeCard = newLaunches;
	let currentIndex = 0;
	let totalCards = activeCard.length;


	function card() {
		newLaunchesSlider.innerHTML = "";

		newLaunches.forEach((product, index) => {

			const item = document.createElement("div");
			item.classList.add("main__new-launches_wrapper__card-slider_content");
			if (index === currentIndex) item.classList.add("active");

			// Створюю блок кольорів
			const colorsBlock = document.createElement("div");
			colorsBlock.classList.add("main__new-launches_wrapper__card-slider_content__descr-colors");

			let colors = product.colors;

			let entr = Object.entries(colors);

			let colorId = 0;

			// //Робота із додаванням класу активності кольору при клікові із використанням делегування подій

			// colorsBlock.addEventListener("click", (e) => {
			// 	console.log(e);
			// 	let activeBtn = e.target.classList.contains('active');
			// 	console.log(activeBtn);//виводить булеве значення. 1 клік - false, 2 і більше кліків -true

			// 	activeBtn ? e.target.classList.add('active') : e.target.classList.remove('active');

			// 	// e.target.classList.add('active')

			// 	if (e.target.id == colorId) {
			// 	// 	// console.log(e.target);
			// 		e.target.classList.contains('active') ? e.target.classList.remove('active') : e.target.classList.add('active')
			// 	}
			// 	else if (e.target.id != colorId ){
			// 		console.log(e.target.id);//0б 1б 2
			// 		console.log(colorId);//завжди 3
			// 		e.target.classList.add('active');
			// 	}
			// });


			//Відмалювання кольору та його назви при наведенні, присвоєння id
			entr.forEach( ( [nameOfColor, hexOfColor] ) => {

				const unit = document.createElement("button");

				unit.classList.add("main__new-launches_wrapper__card-slider_content__descr-colors_item");
				unit.id = colorId;
				// console.log(colorId);
				unit.setAttribute("title", nameOfColor); // Підказка при наведенні
				unit.style.backgroundColor = hexOfColor;

				colorId++;

				colorsBlock.appendChild(unit);
			});


			// Створюю HTML-контент картки
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

			// Вставляю HTML у item
			item.innerHTML = cardContent;

			// Вставляю блок кольорів у відповідне місце
			const descrBlock = item.querySelector(".main__new-launches_wrapper__card-slider_content__descr");
			descrBlock.insertBefore(colorsBlock, descrBlock.querySelector(".main__new-launches_wrapper__card-slider_content__descr-btns"));

			// Додаю картку до слайдера
			newLaunchesSlider.appendChild(item);
		});
	};

	//Встановлюю клас активності для картки
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