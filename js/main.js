import "../js/blocks/topSellers.js";
import "../js/blocks/trending.js";
import "../js/blocks/newLaunches.js";

import "./form.js";

const cartButton = document.querySelector(".header__cart");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
if (cartButton) {
  cartButton.textContent = `👜 ${cart.length} Items Added`;
}
