'use strict';
import productsData from "../db.js";

document.addEventListener('DOMContentLoaded', () => {

	const topSellersCards = document.querySelector('.main__sellers-wrapper_slider__cards');
	// topSellersCards.innerHTML = "";


	productsData.topSellers.forEach(product => {

		//Встановлюю задану кількість зірок рейтингу для товару
		let stars = "";
		for (let i = 0; i < product.rating; i++) {
			// console.log(stars);
			stars += `<img src="./img/main/trendingEarphones/star.jpg" alt="rating"/>`
		};

		//Робота із відображенням знижки
		let discount = product.discount == null ? `<div class="card-save" style="display: none"></div>` : `<div class="card-save" style="background-color: ${product.bgColorDiscount}">Save ${product.discount}</div>`

		//Робота із відображенням карток на сторінці
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
		`

		topSellersCards.appendChild(items);


	});

})