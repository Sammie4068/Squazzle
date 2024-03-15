"use strict";

const contentDisplay = document.querySelectorAll(".content");
const forgotPassSection = document.querySelector(".forgot_password_card");
const forgotPassSent = document.querySelector(".forgot_password_success");
const passwordReset = document.querySelector(".password_reset");
const passwordResetReq = document.querySelector(".prr_wrapper");
const passwordResetSuccess = document.querySelector(".pass_reset_success");
const emailSent = document.querySelector(".email_sent");
const emailCode = document.querySelector(".email-code");
const emailVerifySuccess = document.querySelector(".verify_success");
const emailVerifyFailure = document.querySelector(".verify_failure");

function displayContent(ele) {
  contentDisplay.forEach((content) => {
    content.classList.add("hidden");
  });
  ele.classList.remove("hidden");
}

function updateDisplay() {
  const state = window.location.hash.slice(1);
  switch (state) {
    case "verify-email":
      displayContent(forgotPassSection);
      break;
    case "verify-email-sent":
      displayContent(forgotPassSent);
      break;
    case "password-reset":
      displayContent(passwordReset);
      break;
    case "password-reset-request":
      displayContent(passwordResetReq);
      break;
    case "password-reset-success":
      displayContent(passwordResetSuccess);
      break;
    case "email-sent":
      displayContent(emailSent);
      break;
    case "email-code":
      displayContent(emailCode);
      break;
    case "verify-success":
      displayContent(emailVerifySuccess);
      break;
    case "verify-failure":
      displayContent(emailVerifyFailure);
      break;

    default:
      break;
  }
}
window.addEventListener("hashchange", updateDisplay);
window.addEventListener("load", updateDisplay);

// Form Validation for forgot password
const verifyEmailForm = document.querySelector(".fp_form");
const verifyEmail = document.getElementById("fp_email");
const verifyEmailMsg = document.getElementById("fp_emailMsg");

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function emailValidation() {
  if (verifyEmail.value === "") {
    verifyEmailMsg.classList.remove("hidden");
    verifyEmail.classList.add("input_error");
  } else if (!verifyEmail.value.match(emailPattern)) {
    verifyEmailMsg.classList.remove("hidden");
    verifyEmail.classList.add("input_error");
  } else {
    verifyEmailMsg.classList.add("hidden");
    verifyEmail.classList.remove("input_error");
    return true;
  }
}
verifyEmail.addEventListener("input", emailValidation);

verifyEmailForm.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("email", verifyEmail.value);
  const verifyEmailData = {
    email: verifyEmail.value,
  };
  if (emailValidation()) {
    renderSpinner(getResetCodeBtn);
    getResetCode(verifyEmailData);
  }
});

// Verify-email for forgot password
const getResetCodeBtn = document.getElementById("reset_btn");

async function getResetCode(data) {
  try {
    const res = await fetch(
      "https://stayshare.onrender.com/api/v1/auth/forgotPassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    console.log(result);
    removeSpinner();
    if (result.success == true) {
      window.location.hash = "#verify-email-sent";
      location.reload();
    } else if (result.success == false) {
      renderError(result.error);
    }
  } catch (error) {
    renderError("Oops! Something went wrong");
  }
}

// Password Reset
const inputBoxes = document.querySelectorAll(".input_box");

inputBoxes.forEach((input, index1) => {
  input.addEventListener("keyup", (e) => {
    const currentInput = input,
      nextInput = input.nextElementSibling,
      prevInput = input.previousElementSibling;

    if (currentInput.value.length > 1) {
      currentInput.value = "";
      return;
    }

    if (
      nextInput &&
      nextInput.hasAttribute("disabled") &&
      currentInput.value !== ""
    ) {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }

    if (e.key === "Backspace") {
      inputBoxes.forEach((input, index2) => {
        if (index1 <= index2 && prevInput) {
          input.setAttribute("disabled", true);
          input.value = "";
          prevInput.focus();
        }
      });
    }
  });
});

window.addEventListener("load", () => inputBoxes[0].focus());

function getOtpValue() {
  let otpArr = [];
  inputBoxes.forEach((input) => {
    otpArr.push(input.value);
    otpArr.filter((item) => (item === "" ? otpArr.pop() : item));
  });
  return otpArr.join("");
}

const verifyPassForm = document.querySelector(".verify_code_form");
const passResetReq = document.querySelector(".pass_reset_req");

verifyPassForm.addEventListener("submit", (e) => {
  e.preventDefault();
  window.location.hash = "#password-reset-request";
});

const passResetContBtn = document.getElementById("pr_cont_btn");
const passwordResetCodeForm = document.getElementById("passwordResetCodeForm");

passwordResetCodeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  window.location.hash = "password-reset-request";

});

// New password
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
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,50}$/;
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

const prrForm = document.querySelector(".prr_form");
const prrResetBtn = document.getElementById("prr_reset_btn");

prrForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  if (passwordValidation() && confirmPass()) {
    renderSpinner(prrResetBtn);
    const otp = getOtpValue();
    const resetPasswordData = {
      OTP: otp,
      newPassword: passwordInput.value,
      confirmNewPassword: confirmPasswordInput.value,
      email: userEmail,
    };
    resetPassword(resetPasswordData);
    // window.location.hash = "#password-reset-success";
  }
});

async function resetPassword(data) {
  try {
    const res = await fetch(
      "https://stayshare.onrender.com/api/v1/auth/resetPassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    console.log(result);
    // if (result.success == false) {
    //   window.location.hash = "#verify-failure";
    // } else if (result.status == "success") {
    //   window.location.hash = "#verify-success";
    // }
  } catch (error) {
    console.log(error);
  }
}

// Utilities
function renderSpinner(parentEle) {
  const markup = `<div class="spinner"></div>
`;
  const spinner = document.querySelector(".spinner");
  spinner || parentEle.insertAdjacentHTML("beforeend", markup);
}

function removeSpinner() {
  const spinner = document.querySelector(".spinner");
  spinner && spinner.classList.add("hidden");
}

const feedbackModal = document.getElementById("feedback");
const feedback = document.getElementById("feedback_text");

function renderError(errMsg) {
  feedback.innerText = errMsg;
  feedbackModal.classList.remove("hidden");
  removeSpinner();
  setTimeout(() => {
    location.reload();
  }, 2000);
}

// Email verification page
const userEmailAddr = document.querySelectorAll("#userEmailAddr");
const userEmail = localStorage.getItem("email");

userEmailAddr.forEach((email) => {
  email.textContent = userEmail;
});

const evConfirmBtn = document.getElementById("ev_confirm_btn");

evConfirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  renderSpinner(evConfirmBtn);
  
  const otp = getOtpValue();
  const checkOtpData = {
    otp,
    email: userEmail,
  };
  checkOtp(checkOtpData);
});

async function checkOtp(data) {
  try {
    const res = await fetch(
      "https://stayshare.onrender.com/api/v1/auth/activateAccount",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    console.log(result);
    removeSpinner();
    if (result.success == false) {
      window.location.hash = "#verify-failure";
    } else if (result.status == "success") {
      window.location.hash = "#verify-success";
    }
  } catch (error) {
    console.log(error);
  }
}

