'use strict';

import { newLaunches } from "../db.js";

//Масив із доданими до корзини товарами
export const addedItems = new Array;

document.addEventListener('DOMContentLoaded', () => {
	const newLaunchesSlider = document.querySelector('.main__new-launches_wrapper__card-slider_item'),
		  nextBtn = document.querySelector('.main__new-launches_wrapper__card-slider_rbtn'),
		  prevBtn = document.querySelector('.main__new-launches_wrapper__card-slider_lbtn');
	const allCards = newLaunchesSlider.querySelectorAll(".main__new-launches_wrapper__card-slider_content");

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

			//Перемінна для присвоєння id кожній кнопці кольору
			let colorId = 0;

			//Створюю масив елементів для відслідковування класу активності
			let colorBtns = new Array;

			// //Робота із додаванням класу активності кольору при клікові із використанням делегування подій
			colorsBlock.addEventListener("click", (e) => {

				//Обнуляю клас активності перед додаванням нового
				colorBtns.forEach((hasActive) => {
					hasActive.classList.remove('active');
				});

				//Додаю для конкретного елементу клас активності
				e.target.classList.add('active');

			});


			//Створюю блок фото
			const imgBlock = document.createElement("div");
			imgBlock.classList.add("main__new-launches_wrapper__card-slider_content__img");
			const img1Block = document.createElement("div");
			const img2Block = document.createElement("div");
			const img1 = document.createElement("img");
			const img2 = document.createElement("img");

			//Відмалювання кольору та його назви при наведенні, присвоєння id, зміна фото товару
			colors.forEach( ( { name, hex, images } ) => {

				const btn = document.createElement("button");

				btn.classList.add("main__new-launches_wrapper__card-slider_content__descr-colors_item");
				btn.id = colorId;
				btn.setAttribute("title", name); // Підказка при наведенні
				btn.style.backgroundColor = hex;

				colorId++;

				//Додаю до масиву створений елемент
				colorBtns.push(btn);

				colorsBlock.appendChild(btn);

				img1.setAttribute("src", images[0]);
				img2.setAttribute("src", images[1]);

				img1Block.classList.add("first");
				img2Block.classList.add("second");

				img1Block.appendChild(img1);
				img2Block.appendChild(img2);

				imgBlock.appendChild(img1Block);
				imgBlock.appendChild(img2Block);

				img1.src = colors[0].images[0];
				img2.src = colors[0].images[1];

				btn.addEventListener('click', () => {
					img1.src = images[0];
					img2.src = images[1];
				})
			});


			// Створюю HTML-контент картки
			const cardContent = `
				<!-- Тут буде вставлено imgBlock -->
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
						<button class="more">
							<a href="${product.link}">Explore More</a>
						</button>
					</div>
				</div>
			`;

			// Вставляю HTML у item
			item.innerHTML = cardContent;

			// Вставляю блок кольорів у відповідне місце
			const descrBlock = item.querySelector(".main__new-launches_wrapper__card-slider_content__descr");
			descrBlock.insertBefore(colorsBlock, descrBlock.querySelector(".main__new-launches_wrapper__card-slider_content__descr-btns"));

			//вставляю блок фото
			item.insertBefore(imgBlock, descrBlock);

			// Додаю картку до слайдера
			newLaunchesSlider.appendChild(item);
		});
	};


	//Встановлюю клас активності для картки
	function updateSliderPosition() {

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

			//Посилання на фото товару
			const activeImg = document.querySelector('.main__new-launches_wrapper__card-slider_content__img img');
			// console.log(activeImg.src);




			//Бодя, глянь, що в тебе тут виводиться, коли обробляєю в корзині. Бо шлях http://127.0.0.1:5501/img/main/... Якщо такий же, то мабуть треба попрацювати із методами рядків. Наприклад, activeImg.slice()




			addedItems.push({
				title: cards[currentIndex].title,
				price: cards[currentIndex].price,
				color: selectedColorBtn.getAttribute('title'),
				img: activeImg.src
			});

			// console.log(addedItems);
		});
	};


	// Слухачі на кнопки
	nextBtn.addEventListener('click', () => {
		currentIndex = (currentIndex + 1) % totalCards;
		card();
		updateSliderPosition();
	});

	prevBtn.addEventListener('click', () => {
		currentIndex = (currentIndex - 1 + totalCards) % totalCards;
		card();
		updateSliderPosition();
		console.log("click")
	});


	card();
	updateSliderPosition();

});