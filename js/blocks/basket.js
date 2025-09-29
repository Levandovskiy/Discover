// Контейнер для рендерингу товарів у корзині
const container = document.querySelector("#cart-items-container");

import { addedNewLaunchesItems } from "./newLaunches.js";
import { addedTopSellersItems } from "./topSellers.js";
import { addedTrendingItems } from "./trending.js";

const topSellers = addedTopSellersItems;
const newLaunches = addedNewLaunchesItems;
const trending = addedTrendingItems;

console.log("Top Sellers:", topSellers);
console.log("New Launches:", newLaunches);
console.log("Trending:", trending);
// Масив для зберігання товарів у корзині
let cart = [];

// Зєднуємо масив товарів із усіх блоків
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

document.addEventListener("DOMContentLoaded", () => {
  const newLaunchesAddButton = document.getElementById("newLaunchesAdd");

  if (newLaunchesAddButton) {
    newLaunchesAddButton.addEventListener("click", () => {
      addNewLaunchesToCart();
      console.log("Товари з New Launches додано до корзини");
    });
  } else {
    console.warn("Кнопка #newLaunchesAdd не знайдена!");
  }
});

// Видалення товару з корзини
function removeFromCart(productId) {
  cart = cart.filter((product) => product.id !== productId);
  saveCart();
  renderItems();
}

// Делегування подій для видалення товарів
if (container) {
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart-item__remove")) {
      const productId = e.target.getAttribute("data-id");
      removeFromCart(productId);
    }
  });
}

// Делегування подій для кнопок "Додати в корзину"
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = e.target.getAttribute("data-id");
    addToCart(productId);
  }
});

// Функція для додавання товару в корзину
function addToCart(productId) {
  const allItems = [
    ...(topSellers || []),
    ...(trendingEarphones || []),
    ...(newLaunches || []),
  ];

  console.log("All Items:", allItems);

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

// Слухач для кнопок "Додати в корзину"
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = e.target.getAttribute("data-id");
    addToCart(productId);
  }
});

// Слухач для кнопок "Видалити з корзини"
if (container) {
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart-item__remove")) {
      const productId = e.target.getAttribute("data-id");
      removeFromCart(productId);
    }
  });
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = e.target.getAttribute("data-id");
    addToCart(productId);
    console.log(`Товар із ID ${productId} додано до корзини`);
  }
});

function calculateTotal() {
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  console.log(`Загальна сума: ${total}$`);
  return total;
}

// Ініціалізація

calculateTotal();
loadCart();
