const phoneInput = document.getElementById("phone");
window.intlTelInput(phoneInput, {
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@19.2.19/build/js/utils.js",
});

// Form validation
const signUpForm = document.getElementById("signup_form");
const formMsg = document.getElementById("formMsg");

const infoForm = document.querySelector(".info_form");
const passwordForm = document.querySelector(".password_form");
const allInputs = document.querySelectorAll(".info_input");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");

const errorMsg = document.querySelectorAll(".form-text");
const fnMsg = document.getElementById("fnMsg");
const lnMsg = document.getElementById("lnMsg");
const emailMsg = document.getElementById("emailMsg");
const phoneMsg = document.getElementById("phoneMsg");

const continueBtn = document.getElementById("continue_btn");

continueBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.hash = `#password`;
});

function updateDisplay() {
  const state = window.location.hash.slice(1);
  switch (state) {
    case "":
      infoForm.classList.remove("hidden");
      passwordForm.classList.add("hidden");
      formMsg.innerText = "It is quick and simple.";
      break;
    case "password":
      infoForm.classList.add("hidden");
      passwordForm.classList.remove("hidden");
      formMsg.innerText =
        "Use a minimum of 8 characters, including uppercase letters, lowercase letters and a number.";
      break;

    default:
      break;
  }
}

window.addEventListener("hashchange", updateDisplay);
window.addEventListener("load", updateDisplay);
