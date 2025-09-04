const cart = [];

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const product = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: parseFloat(button.dataset.price),
      quantity: 1,
    };

    // Перевірка, чи товар вже є в корзині
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(product);
    }

    console.log(cart); // Можна замінити на оновлення UI
  });
});
