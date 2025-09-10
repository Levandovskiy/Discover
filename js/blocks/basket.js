import { topSellers, trendingEarphones, newLaunches } from "../db.js";

const item = [...topSellers, ...trendingEarphones, ...newLaunches];

// Тепер можеш працювати з даними
console.log("Корзина:");
console.log("Топ продажі:", topSellers);
console.log("Трендові навушники:", trendingEarphones);
console.log("Новинки:", newLaunches);

// Приклад використання
console.log("Корзина:", basket);
console.log("Новинки:", newLaunches);

// Додавання товару в корзину
const container = document.getElementById("cart-items-container");

function renderItems() {
  container.innerHTML = ""; // очищаємо контейнер перед рендером

  item.forEach((product) => {
    const html = `
      <div class="cart-item">
        <div class="cart-item__product">
          <img src="${product.image}" alt="${
      product.name
    }" class="cart-item__image" />
          <div class="cart-item__info">
            <h3 class="cart-item__title">${product.name}</h3>
            <div class="cart-item__services">
              <label class="cart-item__service"> </label>
              <label class="cart-item__service"> </label>
            </div>
          </div>
          <div class="cart-item__pricing">
            <span class="cart-item__current-price">${product.price}$</span>
            <span class="cart-item__old-price">${
              product.oldPrice || product.price
            }$</span>
            <button class="cart-item__remove" data-id="${
              product.id
            }">🗑️</button>
          </div>
        </div>
        <div class="cart-item__total">
          <span>Сума замовлення:</span>
          <span class="cart-item__total-price">${product.price}$</span>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", html);
  });
}
