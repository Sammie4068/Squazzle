"use strict";

const baseURL = "https://stayshare.onrender.com";
const phoneInput = document.getElementById("phone");
window.intlTelInput(phoneInput, {
  initialCountry: "auto",
  geoIpLookup: (callback) => {
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((data) => callback(data.country_code))
      .catch(() => callback("ng"));
  },
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
const createAccountBtn = document.getElementById("createAccountBtn");

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Loading spinner
function renderSpinner(parentEle) {
  const markup = `<div class="spinner"></div>
`;
  const spinner = document.querySelector(".spinner");
  spinner || parentEle.insertAdjacentHTML("beforeend", markup);
}

function removeSpinner() {
  const spinner = document.querySelector(".spinner");
  spinner && spinner.remove();
}

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

function phoneValidation() {
  if (phoneInput.value === "") {
    phoneMsg.classList.remove("hidden");
    phoneInput.classList.add("input_error");
  } else if (phoneInput.value.trim().length !== 10) {
    phoneMsg.innerText = "Phone number must be 10 digits";
    phoneMsg.classList.remove("hidden");
    phoneInput.classList.add("input_error");
  } else {
    phoneMsg.classList.add("hidden");
    phoneInput.classList.remove("input_error");
    return true;
  }
}

phoneInput.addEventListener("input", phoneValidation);

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
    phoneValidation()
  ) {
    infoForm.classList.add("hidden");
    passwordForm.classList.remove("hidden");
    formMsg.innerText =
      "Use a minimum of 8 characters, including uppercase letters, lowercase letters and a number.";
  }
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

const passwordMsg = document.querySelector(".password_msg");
const letterMsg = document.querySelector(".password_msg .letter");
const numberMsg = document.querySelector(".password_msg .number");
const charMsg = document.querySelector(".password_msg .char");
const symbolMsg = document.querySelector(".password_msg .symbol");

function passwordValidation() {
  passwordMsg.classList.remove("hidden");

  let lowerCaseLetters = /[a-z]/g;
  let upperCaseLetters = /[A-Z]/g;
  if (
    passwordInput.value.match(lowerCaseLetters) &&
    passwordInput.value.match(upperCaseLetters)
  ) {
    letterMsg.classList.remove("error");
    letterMsg.classList.add("success");
  } else {
    letterMsg.classList.remove("success");
    letterMsg.classList.add("error");
  }

  let numbers = /[0-9]/g;
  if (passwordInput.value.match(numbers)) {
    numberMsg.classList.remove("error");
    numberMsg.classList.add("success");
  } else {
    numberMsg.classList.remove("success");
    numberMsg.classList.add("error");
  }

  if (passwordInput.value.length >= 8) {
    charMsg.classList.remove("error");
    charMsg.classList.add("success");
  } else {
    charMsg.classList.remove("success");
    charMsg.classList.add("error");
  }

  let SpecialCharacters =
    /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
  if (passwordInput.value.match(SpecialCharacters)) {
    symbolMsg.classList.remove("error");
    symbolMsg.classList.add("success");
  } else {
    symbolMsg.classList.remove("success");
    symbolMsg.classList.add("error");
  }

  let passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  if (passRegex.test(passwordInput.value)) {
    passwordMsg.classList.add("hidden");
    return true;
  }
}

passwordInput.addEventListener("input", passwordValidation);

const confirmPassInput = document.getElementById("confirmPasswordInput");
const confirmPassMsg = document.getElementById("confirmPassMsg");

function confirmPass() {
  if (confirmPassInput.value != passwordInput.value) {
    confirmPassMsg.classList.remove("hidden");
  } else {
    confirmPassMsg.classList.add("hidden");
    return true;
  }
}

// Form Submission
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderSpinner(createAccountBtn);
  const signupData = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    phoneNumber: phoneInput.value,
    password: passwordInput.value,
  };
  if (passwordValidation() && confirmPass()) {
    registerUser(signupData);
  }
});

// Cancel Button
const cancelBtn = document.getElementById("cancelBtn");
cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.hash = `#`;
  location.reload();
});

// Api function
const feedbackModal = document.getElementById("feedback");
const feedbackStatus = document.getElementById("feedback_status");
const feedback = document.getElementById("feedback_text");

function renderFeedback(msg, status) {
  feedback.innerText = msg;
  feedbackStatus.classList.add(status);
  feedbackModal.classList.remove("hidden");
  setTimeout(() => {
    feedbackModal.classList.add("hidden");
  }, 2000);
}
async function registerUser(data) {
  try {
    const res = await fetch(
      "https://stayshare.onrender.com/api/v1/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    removeSpinner();
    if (result.success == false) {
      renderFeedback(result.error, "error");
    } else if (result.status == "success") {
      const userData = result.data.user;
      const jsonString = JSON.stringify(userData);
      const parsedObject = JSON.parse(jsonString);
      for (const key in parsedObject) {
        if (parsedObject.hasOwnProperty(key)) {
          localStorage.setItem(key, parsedObject[key]);
        }
      }
      window.location = `auth.html#email-sent`;
    }
  } catch (error) {
    renderFeedback("internal server error", "error");
  }
}
