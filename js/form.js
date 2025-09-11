//* Отримання всіх кнопок через класс
const buttonSignUp = document.querySelector(".header__login"),
	  registerForm = document.querySelector(".registration-form"),
	  btnStart = document.querySelector(".footer__prev-btn");

//? Працюємо з формою

function hideRegisterForm() {
  registerForm.style.display = "none";
}

function showRegisterForm() {
  registerForm.style.display = "block"; //? Змінюємо  значення з CSS
  registerForm.style.position = "fixed";
}

buttonSignUp.addEventListener("click", () => {
  showRegisterForm();
});


btnStart.addEventListener('click', () => {
	showRegisterForm();
})

window.addEventListener("click", function (event) {
  if (!registerForm.contains(event.target) && event.target !== buttonSignUp && event.target !== btnStart) {
    hideRegisterForm();
  }
});
