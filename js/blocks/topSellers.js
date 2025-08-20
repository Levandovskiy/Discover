'use strict';
import productsData from "./db.js";

const topSellersCards = document.querySelector('.main__sellers-wrapper_slider__cards'),
	  items = document.querySelectorAll('.items'),
	  discount = document.querySelector('.card-save'),
	  title = document.querySelector('.card-descr_header'),
	  rating = document.querySelector('.card-descr_rating__stars'),
	  reviews = document.querySelector('.card-descr_rating__review'),
	  price = document.querySelector('.card-descr_price');

renderCardSlider(productsData.topSellers, topSellersCards);
// renderCardSlider(productsData.trendingEarphones, "#trending-earphones");

products.forEach(product => {
//   const card = document.createElement("div");
  card.classList.add("product-card", product.className);

  card.innerHTML = `
    <img src="${product.image}" alt="${product.title}">
    <h3>${product.title}</h3>
    <p>${product.price}</p>
    ${product.discount ? `
      <div class="discount"
           style="background:${product.discount.bgColor};color:${product.discount.textColor}">
        ${product.discount.value}
      </div>
    ` : ""}
  `;

//   document.querySelector("#products").appendChild(card);
});