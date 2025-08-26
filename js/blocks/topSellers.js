'use strict';

import topSellers from "../db.js";

document.addEventListener('DOMContentLoaded', () => {
	const topSellersCards = document.querySelector('.main__sellers-wrapper_slider__cards');
	const nextBtn = document.querySelector('.main__sellers-wrapper_slider__button');

	// === Рендер товарів ===
	topSellers.topPicks.forEach(product => {

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

		//Відмальовую картки товарів
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
			<button>Add to cart</button>
		`;
		topSellersCards.appendChild(items);
	});

	// === СЛАЙДЕР ===
	let currentIndex = 0;
	const totalCards = topSellers.topPicks.length;

	// визначаю кількість видимих карток по ширині вікна
	function getVisibleCards() {
		const width = window.innerWidth;
		if (width <= 575) return 1;
		if (width <= 991) return 2;
		return 3; // від 992px і більше
	}

	function updateSliderPosition() {
		const styles = getComputedStyle(topSellersCards);
		const gap = parseInt(styles.gap) || 0;
		const card = topSellersCards.querySelector(".items");
		const cardWidth = card ? card.offsetWidth : 0;

		const visibleCards = getVisibleCards();

		// обмежуємо currentIndex щоб не вилізти за межі
		if (currentIndex > totalCards - visibleCards) {
			currentIndex = 0;
		}

		const offset = -(currentIndex * (cardWidth + gap));
		topSellersCards.style.transform = `translateX(${offset}px)`;
		topSellersCards.style.transition = "transform 0.5s ease";
	}

	nextBtn.addEventListener('click', () => {
		currentIndex++;
		updateSliderPosition();
	});

	window.addEventListener('resize', () => {
		updateSliderPosition();
	});

	// перший запуск
	updateSliderPosition();

	//Робота з категоріями товару і класом активності
	const topPicks = document.querySelector('.main__sellers-wrapper_category__picks'),
		  watches = document.querySelector('.main__sellers-wrapper_category__watches');

	topPicks.addEventListener('click', () => {
		topPicks.classList.add('active');
		watches.classList.remove('active');
	});

	watches.addEventListener('click', () => {
		watches.classList.add('active');
		topPicks.classList.remove('active');
	})

});