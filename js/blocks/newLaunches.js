"use strict";

import { newLaunches } from "../db.js";

// Масив для збереження доданих товарів
export const addedNewLaunchesItems = [];

document.addEventListener("DOMContentLoaded", () => {
  // Отримую DOM-елементи слайдера та кнопок навігації
  const newLaunchesSlider = document.querySelector(
    ".main__new-launches_wrapper__card-slider_item"
  );
  const nextBtn = document.querySelector(
    ".main__new-launches_wrapper__card-slider_rbtn"
  );
  const prevBtn = document.querySelector(
    ".main__new-launches_wrapper__card-slider_lbtn"
  );

  // Ініціалізую масив товарів та індекс активної картки
  let cards = newLaunches;
  let currentIndex = 0;
  let totalCards = cards.length;

  // Основна функція рендеру картки
  function renderCard() {
    // Очищую контейнер перед рендером нової картки
    newLaunchesSlider.innerHTML = "";

    // Отримую поточний товар
    const product = cards[currentIndex];

    // Створюю контейнер картки
    const item = document.createElement("div");
    item.classList.add(
      "main__new-launches_wrapper__card-slider_content",
      "active"
    );

    // Створюю блок кольорів
    const colorsBlock = document.createElement("div");
    colorsBlock.classList.add(
      "main__new-launches_wrapper__card-slider_content__descr-colors"
    );

    let colorId = 0;
    let colorBtns = [];

    // Створюю блок зображень товару
    const imgBlock = document.createElement("div");
    imgBlock.classList.add(
      "main__new-launches_wrapper__card-slider_content__img"
    );
    const img1Block = document.createElement("div");
    const img2Block = document.createElement("div");
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");

    img1Block.classList.add("first");
    img2Block.classList.add("second");

    img1Block.appendChild(img1);
    img2Block.appendChild(img2);
    imgBlock.appendChild(img1Block);
    imgBlock.appendChild(img2Block);

    // Встановлюю початкові фото (перший колір)
    img1.src = product.colors[0].images[0];
    img2.src = product.colors[0].images[1];

    // Створюю кнопки кольорів
    product.colors.forEach(({ name, hex, images }) => {
      const btn = document.createElement("button");
      btn.classList.add(
        "main__new-launches_wrapper__card-slider_content__descr-colors_item"
      );
      btn.id = colorId++;
      btn.setAttribute("title", name);
      btn.style.backgroundColor = hex;

      colorBtns.push(btn);
      colorsBlock.appendChild(btn);

      // При кліку змінюю фото та активний колір
      btn.addEventListener("click", () => {
        colorBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        img1.src = images[0];
        img2.src = images[1];
      });
    });

    // HTML-контент опису товару
    const cardContent = `
      <div class="main__new-launches_wrapper__card-slider_content__descr">
        <div class="main__new-launches_wrapper__card-slider_content__descr-header">
          ${product.title}
        </div>
        <div class="main__new-launches_wrapper__card-slider_content__descr-text">
          ${product.descr}
          <a href="${product.link}"> Read More </a>
        </div>
        <div class="main__new-launches_wrapper__card-slider_content__descr-price">
          Price : <span> $${product.price} </span>
        </div>
        <div class="main__new-launches_wrapper__card-slider_content__descr-btns">
          <button class="add" id="newLaunchesAdd">Add to cart</button>
          <button class="more">
            <a href="${product.link}">Explore More</a>
          </button>
        </div>
      </div>
    `;

    // Вставляю HTML у картку
    item.innerHTML = cardContent;

    // Вставляю блок кольорів перед кнопками
    const descrBlock = item.querySelector(
      ".main__new-launches_wrapper__card-slider_content__descr"
    );
    descrBlock.insertBefore(
      colorsBlock,
      descrBlock.querySelector(
        ".main__new-launches_wrapper__card-slider_content__descr-btns"
      )
    );

    // Вставляю блок зображень перед описом
    item.insertBefore(imgBlock, descrBlock);

    // Додаю картку до слайдера
    newLaunchesSlider.appendChild(item);

    // Додаю логіку кнопки "Add to cart"
    const addBtn = item.querySelector(".add");
    addBtn.addEventListener("click", () => {
      const selectedColorBtn = item.querySelector(
        ".main__new-launches_wrapper__card-slider_content__descr-colors_item.active"
      );
      if (!selectedColorBtn) return;

      const activeImg = item.querySelector(
        ".main__new-launches_wrapper__card-slider_content__img img"
      );

      const cartItem = {
        title: product.title,
        price: product.price,
        color: selectedColorBtn.getAttribute("title"),
        img: activeImg.attributes[0].value,
      };

      // Зчитую корзину з localStorage, додаю товар і зберігаю назад
      let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      existingCart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(existingCart));
      // для миттєвого оновлення лічильника в корзині
      window.dispatchEvent(new Event("cartUpdated")); // для поточної вкладки
      if (typeof window.updateCartButton === "function") {
        window.updateCartButton(); // миттєве оновлення
      }
    });
  }

  // Обробка кнопки "вперед"
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalCards;
    renderCard();
  });

  // Обробка кнопки "назад"
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    renderCard();
  });

  // 🔰 Початковий рендер
  renderCard();
});
