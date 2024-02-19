"use strict";

// Form Validation for forgot password
const inputEmailForm = document.querySelector(".fp_form")
const inputEmail = document.getElementById("fp_email")
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