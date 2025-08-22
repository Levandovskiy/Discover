'use strict';

import productsData from "../db.js";

document.addEventListener('DOMContentLoaded', () => {
	const topSellersCards = document.querySelector('.main__sellers-wrapper_slider__cards');

	productsData.topSellers.forEach(product => {
		let stars = "";
		for (let i = 0; i < product.rating; i++) {
			stars += `<img src="./img/main/trendingEarphones/star.jpg" alt="rating"/>`
		};

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
						<div class="card-descr_rating__stars">
							${stars}
						</div>
						<div class="card-descr_rating__review">
							${product.reviews} Reviews
						</div>
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
	const visibleCards = 3;
	const totalCards = productsData.topSellers.length;

	const nextBtn = document.querySelector('.main__sellers-wrapper_slider__button');

	// ширина 1 картки + gap
	const card = topSellersCards.querySelector(".items");
	const gap = 93;
	const cardWidth = card.offsetWidth + gap;

	nextBtn.addEventListener('click', () => {
		currentIndex++;
		if (currentIndex > totalCards - visibleCards) {
			currentIndex = 0; // зациклення
		}

		const offset = -(currentIndex * cardWidth);
		topSellersCards.style.transform = `translateX(${offset}px)`;
		topSellersCards.style.transition = "transform 0.5s ease";
	});
});