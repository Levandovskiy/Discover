'use strict';
import productsData from "./db.js";
// window.addEventListener( 'DOMContentLoaded', () => {

// //

// } )
renderCardSlider(productsData.topSellers, "#top-sellers");
renderCardSlider(productsData.trendingEarphones, "#trending-earphones");

products.forEach(product => {
  const card = document.createElement("div");
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

  document.querySelector("#products").appendChild(card);
});