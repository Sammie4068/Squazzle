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

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

// function checkIfEmpty() {
//   allInputs.forEach((input) => {
//     if (input.value === "") {
//       errorMsg.forEach((msg) => msg.classList.remove("hidden"));
//       input.classList.add("input_error");
//     }
//   });
//   return true;
// }

function nameValidation(ele, eleMsg) {
  if (ele.value === "") {
    eleMsg.classList.remove("hidden");
    ele.classList.add("input_error");
  } else {
    eleMsg.classList.add("hidden");
    ele.classList.remove("input_error");
    return true;
  }
}

firstNameInput.addEventListener("input", () =>
  nameValidation(firstNameInput, fnMsg)
);
lastNameInput.addEventListener("input", () =>
  nameValidation(lastNameInput, lnMsg)
);

phoneInput.addEventListener("input", () => {
  nameValidation(phoneInput, phoneMsg);
});

function emailValidation() {
  if (emailInput.value === "") {
    emailMsg.classList.remove("hidden");
    emailInput.classList.add("input_error");
  } else if (!emailInput.value.match(emailPattern)) {
    emailMsg.classList.remove("hidden");
    emailInput.classList.add("input_error");
  } else {
    emailMsg.classList.add("hidden");
    emailInput.classList.remove("input_error");
    return true;
  }
}
emailInput.addEventListener("input", emailValidation);

continueBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    nameValidation(firstNameInput, fnMsg) &&
    nameValidation(lastNameInput, lnMsg) &&
    emailValidation() &&
    nameValidation(phoneInput, phoneMsg)
  )
    window.location.hash = `#password`;
});

// Confirm Password
const passwordInput = document.getElementById("passwordInput");
const confirmPasswordInput = document.getElementById("confirmPasswordInput");

const eyeIcon = document.getElementById("eyeIcon");
const confirmEyeIcon = document.getElementById("confirmEyeIcon");

function showpass(input, icon) {
  if (input.value == "") return;
  if (input.type == "password") {
    input.type = "text";
    icon.innerHTML = `<i class="fas fa-eye-slash"></i>`;
  } else {
    input.type = "password";
    icon.innerHTML = `<i class="fas fa-eye"></i>`;
  }
}

eyeIcon.addEventListener("click", () => showpass(passwordInput, eyeIcon));
confirmEyeIcon.addEventListener("click", () =>
  showpass(confirmPasswordInput, confirmEyeIcon)
);