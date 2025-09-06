import { topSellers } from "./topSellers.js";
import { trending } from "./trending.js";
import { newLaunches } from "./newLaunches.js";

// Об'єднуємо всі товари
const allProducts = [...topSellers, ...trending, ...newLaunches];

//  пошук товару по id
function getProductById(id) {
  return allProducts.find((product) => product.id === id);
}

// Додавання до корзини
function addToBasket(id) {
  const product = getProductById(id);
  if (product) {
    console.log(`Додано до корзини: ${product.name} — $${product.price}`);
    // Тут логіка додавання до корзини
  } else {
    console.warn("Товар не знайдено");
  }
}
