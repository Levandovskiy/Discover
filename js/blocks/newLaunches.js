'use strict';

import { newLaunches } from "../db.js";

//Масив із доданими до корзини товарами
export const addedItems = new Array;

document.addEventListener('DOMContentLoaded', () => {
	const newLaunchesSlider = document.querySelector('.main__new-launches_wrapper__card-slider_item'),
		  nextBtn = document.querySelector('.main__new-launches_wrapper__card-slider_rbtn'),
		  prevBtn = document.querySelector('.main__new-launches_wrapper__card-slider_lbtn');

	// Активна картка
	let cards = newLaunches;
	let currentIndex = 0;
	let totalCards = cards.length;

	function card() {
		newLaunchesSlider.innerHTML = "";

		cards.forEach((product, index) => {

			const item = document.createElement("div");
			item.classList.add("main__new-launches_wrapper__card-slider_content");
			if (index === currentIndex) item.classList.add("active");

			// Створюю блок кольорів
			const colorsBlock = document.createElement("div");
			colorsBlock.classList.add("main__new-launches_wrapper__card-slider_content__descr-colors");

			let colors = product.colors;
			console.log(colors);

			//Перемінна для "витягування" з неї назви кольору та коду
			let entr = Object.entries(colors);
			console.log(entr);

			//Перемінна для присвоєння id кожній кнопці кольору
			let colorId = 0;

			//Створюю масив елементів для відслідковування класу активності
			let colorBtns = new Array;


			// //Робота із додаванням класу активності кольору при клікові із використанням делегування подій
			colorsBlock.addEventListener("click", (e) => {

				// console.log(addedItem);

				//Обнуляю клас активності перед додаванням нового
				colorBtns.forEach((hasActive) => {
					hasActive.classList.remove('active');
				});

				//Додаю для конкретного елементу клас активності
				e.target.classList.add('active');

			});


			//Відмалювання кольору та його назви при наведенні, присвоєння id
			entr.forEach( ( [nameOfColor, hexOfColor] ) => {

				const unit = document.createElement("button");

				unit.classList.add("main__new-launches_wrapper__card-slider_content__descr-colors_item");
				unit.id = colorId;
				unit.setAttribute("title", nameOfColor); // Підказка при наведенні
				unit.style.backgroundColor = hexOfColor;

				colorId++;

				//Додаю до масиву створений елемент
				colorBtns.push(unit);

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
						<button class="add" id="newLaunchesAdd">Add to cart</button>
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

		// Знаходжу активну картку
		const activeCard = newLaunchesSlider.querySelector('.main__new-launches_wrapper__card-slider_content.active');
		if (!activeCard) return;

		const addBtn = activeCard.querySelector('.add');
		if (!addBtn) return;

		// Щоб уникнути дублювання слухачів — спочатку знімаю старий
		addBtn.replaceWith(addBtn.cloneNode(true));
		const newAddBtn = activeCard.querySelector('.add');

		newAddBtn.addEventListener('click', () => {
			const selectedColorBtn = activeCard.querySelector('.main__new-launches_wrapper__card-slider_content__descr-colors_item.active');
			if (!selectedColorBtn) return;

			addedItems.push({
				title: cards[currentIndex].title,
				price: cards[currentIndex].price,
				color: selectedColorBtn.getAttribute('title'),
				img: "../../img/main/newLaunches/Nord Buds/Starry Black/NordBuds3TrulyBlack1.jpg"
			});

			console.log(addedItems);
		});
	};


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
	updateSliderPosition();

});