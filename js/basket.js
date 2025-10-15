"use strict";

// --- Весь код всередині DOMContentLoaded ---
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#cart-items-container");
  const totalEl = document.querySelector("#cart-total"); // опціонально, якщо додаси елемент для суми
  const cartButton = document.querySelector(".header__cart"); // Кнопка для оновлення кількості товарів

  if (!container) {
    console.error("Елемент #cart-items-container не знайдено!");
    return;
  }

  // Масив для корзини (читаємо з localStorage 'cart')
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Збереження
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Рендер
  function renderItems() {
    container.innerHTML = "";

    if (cart.length === 0) {
      container.innerHTML = "<p>Корзина порожня</p>";
      updateTotal();
      return;
    }

    cart.forEach((product) => {
      const html = `
        <div class="cart-item">
          <div class="cart-item__product">
            <img src="${product.img}" alt="${
        product.title
      }" class="cart-item__image" />
            <div class="cart-item__info">
              <h3 class="cart-item__title">${product.title}</h3>
              <p class="cart-item__price">${product.price}</p>
              <p class="cart-item__color">${
                product.color ? `Color: ${product.color}` : ""
              }</p>
            </div>
            <button class="cart-item__remove" data-id="${
              product.id
            }">🗑️ Видалити</button>
          </div>
        </div>
      `;
      container.insertAdjacentHTML("beforeend", html);
    });

    // Додаємо блок із загальною сумою
    const totalHtml = `
    <div class="cart-total">
      <h3>Total amount: <span id="cart-total-value">$${calculateTotal()}</span></h3>
    </div>
  `;
    container.insertAdjacentHTML("beforeend", totalHtml);

    updateTotal();
    updateCartButton();
  }

  // Видалити
  function removeFromCart(productId) {
    cart = cart.filter((product) => String(product.id) !== String(productId));
    saveCart();
    renderItems();
    updateCartButton();
  }

  // Підрахунок загальної суми
  function calculateTotal() {
    return cart.reduce((sum, product) => {
      const price =
        parseFloat(String(product.price).replace(/[^\d.]/g, "")) || 0;

      return sum + price;
    }, 0);
  }

  function updateTotal() {
    const total = calculateTotal();
    if (totalEl) {
      totalEl.textContent = `Total: ${total}`;
    } else {
      console.log(`Загальна сума: ${total}`);
    }
  }

  function updateCartButton() {
    if (cartButton) {
      cartButton.textContent = `👜 ${cart.length} Items Added`;
    }
  }

  // Делегування подій для видалення
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart-item__remove")) {
      const productId = e.target.getAttribute("data-id");
      removeFromCart(productId);
    }
  });

  // Кнопка "Очистити корзину" (опціонально)
  const clearBtn = document.querySelector("#clear-cart");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      cart = [];
      saveCart();
      renderItems();
    });
  }

  // Перший рендер
  renderItems();
  updateCartButton();
});
