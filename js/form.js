//* Отримання всіх кнопок через класс
const buttonSignUp = document.querySelector(".header__login");
const registerForm = document.querySelector(".registration-form");

//TODO Працюємо з формою

function hideRegisterForm() {
  registerForm.style.display = "none";
}

function showRegisterForm() {
  registerForm.style.display = "block"; //TODO Змінюємо  значення з CSS
}

buttonSignUp.addEventListener("click", () => {
  showRegisterForm();
});

window.addEventListener("click", function (event) {
  if (!registerForm.contains(event.target) && event.target !== buttonSignUp) {
    hideRegisterForm();
  }
});
