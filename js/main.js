import "../js/blocks/topSellers.js";
import "../js/blocks/trending.js";
import "../js/blocks/newLaunches.js";

import "./form.js";

const cartButton = document.querySelector(".header__cart");

// --- Функція оновлення лічильника ---
function updateCartButton() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartButton) {
    cartButton.textContent = `👜 ${cart.length} Items Added`;
  }
}

// --- Початкове оновлення ---
updateCartButton();

// --- Слухач події (оновлення після додавання товару) ---
window.addEventListener("cartUpdated", updateCartButton);

// --- Слухач зміни localStorage (якщо сторінка інша) ---
window.addEventListener("storage", (e) => {
  if (e.key === "cart") {
    updateCartButton();
  }
});

// --- Доступ глобально, щоб інші скрипти могли викликати напряму ---
window.updateCartButton = updateCartButton;
