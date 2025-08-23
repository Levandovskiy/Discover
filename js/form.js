//* Отримання всіх кнопок через класс
const buttonSignUp = document.querySelector(".header__login");
const registerForm = document.querySelector(".registration-form");

//? Працюємо з формою

function hideRegisterForm() {
  registerForm.style.display = "none";
}

function showRegisterForm() {
  registerForm.style.display = "block"; //? Змінюємо  значення з CSS
}

buttonSignUp.addEventListener("click", () => {
  showRegisterForm();
});

window.addEventListener("click", function (event) {
  if (!registerForm.contains(event.target) && event.target !== buttonSignUp) {
    hideRegisterForm();
  }
});
