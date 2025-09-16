'use strict';

import {trendingEarphones} from "../db.js";

//Масив із доданими до корзини товарами
export const addedItems = new Array;

document.addEventListener('DOMContentLoaded', () => {
	const trendingEarphonesCards = document.querySelector('.main__trending-wrapper_slider__cards');
	const nextBtn = document.querySelector('.main__trending-wrapper_slider__button');

	//Категорії
	const earbuds = document.querySelector('.main__trending-wrapper_category__earbuds'),
		  wireless = document.querySelector('.main__trending-wrapper_category__wireless'),
		  wired = document.querySelector('.main__trending-wrapper_category__wired');

	// Активна категорія
	let active = trendingEarphones.earbuds;
	let currentIndex = 0;
	let totalCards = active.length;

	// === Рендер товарів ===
	function category(select) {

		// Очищаю попередні картки
		trendingEarphonesCards.innerHTML = "";

		select.forEach(product => {
			//Рейтинг
			let stars = "";
			for (let i = 0; i < product.rating; i++) {
				stars += `<img src="./img/main/trendingEarphones/star.jpg" alt="rating"/>`;
			}

			//Знижка
			let discount = product.discount == null
				? `<div class="card-save" style="display: none"></div>`
				: `<div class="card-save" style="background-color: ${product.bgColorDiscount}">Save ${product.discount}</div>`;

			const items = document.createElement("div");
			items.classList.add("items");

			items.innerHTML = `
				<div class="card" id=${product.id} style="background-color: ${product.bgColor}">
					${discount}
					<div class="card-img">
						<img src=${product.img} alt=${product.title}>
					</div>
					<div class="card-descr">
						<div class="card-descr_header">${product.title}</div>
						<div class="card-descr_rating">
							<div class="card-descr_rating__stars">${stars}</div>
							<div class="card-descr_rating__review">${product.reviews} Reviews</div>
						</div>
						<div class="card-descr_price">$${product.price}</div>
					</div>
				</div>
				<button class="trendingAdd">Add to cart</button>
			`;
			trendingEarphonesCards.appendChild(items);
		});

		// Скидаю індекс і оновлюю кількість карток
		currentIndex = 0;
		totalCards = select.length;

		updateSliderPosition();
	}

	// === СЛАЙДЕР ===
	function getVisibleCards() {
		const width = window.innerWidth;
		if (width <= 575) return 1;
		if (width <= 991) return 2;
		return 3;
	};

	function updateSliderPosition() {
		const styles = getComputedStyle(trendingEarphonesCards);
		const gap = parseInt(styles.gap) || 0;//Дістаю gap із css, або 0 за замовчуванням
		const card = trendingEarphonesCards.querySelector(".items");
		const cardWidth = card ? card.offsetWidth : 0;//витягую ширину 1 картки із css

		const visibleCards = getVisibleCards();//в залежності від ширини визначаю, яку саме кількість карток треба відмальовувати в слайдері

		if (currentIndex > totalCards - visibleCards) {
			currentIndex = 0;//повертаюсь на першу картку, коли вже була остання і натиснув на кнопку "наступна"
		}

		const offset = -(currentIndex * (cardWidth + gap));//визначаю, на яку ширину потрібно зсунути слайдер вліво (знак "-"). Кількість відображених карток * (ширина картки + відступ)
		trendingEarphonesCards.style.transform = `translateX(${offset}px)`;
		trendingEarphonesCards.style.transition = "transform 0.5s ease";
	}

	// Слухачі на кнопки
	nextBtn.addEventListener('click', () => {
		currentIndex++;
		updateSliderPosition();
	});

	window.addEventListener('resize', updateSliderPosition);

	// Клік по категоріях
	earbuds.addEventListener('click', () => {
		earbuds.classList.add('active');
		wireless.classList.remove('active');
		wired.classList.remove('active');
		active = trendingEarphones.earbuds;
		category(active);
	});

	wireless.addEventListener('click', () => {
		wireless.classList.add('active');
		earbuds.classList.remove('active');
		wired.classList.remove('active');
		active = trendingEarphones.wireless;
		category(active);
	});

	wired.addEventListener('click', () => {
		wired.classList.add('active');
		earbuds.classList.remove('active');
		wireless.classList.remove('active');
		active = trendingEarphones.wired;
		category(active);
	});

	// За замовчуванням earbuds
	earbuds.classList.add('active');
	category(active);

	//Додавання катрок в корзину
	const trendingAdd = document.querySelectorAll('.trendingAdd');

	trendingEarphonesCards.addEventListener('click', (e) => {

		// const cardContent = e.target.parentElement.querySelector('.card');
		// const productId = cardContent?.id;

		if (e.target.matches('.trendingAdd')) {

			const wrapper = e.target.closest('.items');
			const cardContent = wrapper.querySelector('.card');
			const productId = cardContent?.id;

			//Тут товари не мають різних кольорів, то без них
			addedItems.push({
				title: cardContent.childNodes[5].childNodes[1].innerText,
				price: cardContent.childNodes[5].childNodes[5].innerText,
				img: cardContent.childNodes[3].childNodes[1].attributes[0].value
			});

			console.log(addedItems);
		};
	});
});