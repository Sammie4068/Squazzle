"use strict";

const contentDisplay = document.querySelectorAll(".content")
const forgotPassSection = document.querySelector(".forgot_password_card");
const emailSection = document.getElementById("input_email_section");
const emailConfirm = document.getElementById("email_confirm_section");

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

    default:
      break;
  }
}
window.addEventListener("hashchange", updateDisplay);
window.addEventListener("load", updateDisplay);




// Form Validation for forgot password
const inputEmailForm = document.querySelector(".fp_form");
const inputEmail = document.getElementById("fp_email");
const inputEmailMsg = document.getElementById("fp_emailMsg");


const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function emailValidation() {
  if (inputEmail.value === "") {
    inputEmailMsg.classList.remove("hidden");
    inputEmail.classList.add("input_error");
  } else if (!inputEmail.value.match(emailPattern)) {
    inputEmailMsg.classList.remove("hidden");
    inputEmail.classList.add("input_error");
  } else {
    inputEmailMsg.classList.add("hidden");
    inputEmail.classList.remove("input_error");
    return true;
  }
}
inputEmail.addEventListener("input", emailValidation);

inputEmailForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (emailValidation()) {
    emailSection.classList.add("hidden");
    emailConfirm.classList.remove("hidden");
  }
});


// Password Reset
const inputBoxes = document.querySelectorAll(".input_box");
//   button = document.querySelector("button");
// iterate over all inputBoxes
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
