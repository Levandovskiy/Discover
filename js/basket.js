// Контейнер для рендерингу товарів у корзині
const container = document.querySelector("#cart-items-container");

console.log(container);

// Імпорт масивів із інших файлів
import { addedNewLaunchesItems } from "./blocks/newLaunches.js";
import { addedTopSellersItems } from "./blocks/topSellers.js";
import { addedTrendingItems } from "./blocks/trending.js";

// Масиви товарів із усіх блоків
const topSellers = addedTopSellersItems;
const newLaunches = addedNewLaunchesItems;
const trending = addedTrendingItems;

// Масив для зберігання товарів у корзині
let cart = [];

// З'єднуємо масиви товарів із усіх блоків
const allItems = [...topSellers, ...newLaunches, ...trending];

// Функція для збереження корзини в localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Функція для завантаження корзини з localStorage
function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

// Функція для рендерингу товарів у корзині
function renderItems() {
  if (!container) {
    console.error("Елемент #cart-items-container не знайдено!");
    return;
  }
  container.innerHTML = ""; // Очищаємо контейнер перед рендером

  if (cart.length === 0) {
    container.innerHTML = "<p>Корзина порожня</p>";
    return;
  }

  cart.forEach((product) => {
    const html = `
      <div class="cart-item">
        <div class="cart-item__product">
          <img src="${product.img}" alt="${product.title}" class="cart-item__image" />
          <div class="cart-item__info">
            <h3 class="cart-item__title">${product.title}</h3>
            <p class="cart-item__price">${product.price}</p>
          </div>
          <button class="cart-item__remove" data-id="${product.id}">🗑️ Видалити</button>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", html);
  });
}

// Функція для додавання товару в корзину
function addToCart(productId) {
  const product = allItems.find(
    (item) => String(item.id) === String(productId)
  );

  if (cart.some((item) => item.id === productId)) {
    console.log("Товар уже в корзині");
    return;
  }

  if (product) {
    cart.push(product);
    saveCart();
    renderItems();
    console.log("Товар додано до корзини:", product);
  } else {
    console.warn("Товар із таким ID не знайдено:", productId);
  }
}

// Функція для видалення товару з корзини
function removeFromCart(productId) {
  cart = cart.filter((product) => product.id !== productId);
  saveCart();
  renderItems();
}

// Функція для підрахунку загальної суми товарів у корзині
function calculateTotal() {
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  console.log(`Загальна сума: ${total}$`);
  return total;
}

// Делегування подій для кнопок "Додати в корзину"
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = e.target.getAttribute("data-id");
    addToCart(productId);
  }
});

// Делегування подій для кнопок "Видалити з корзини"
if (container) {
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart-item__remove")) {
      const productId = e.target.getAttribute("data-id");
      removeFromCart(productId);
    }
  });
}

// Ініціалізація
document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  renderItems();
  calculateTotal();
});
