"use strict";

// Utilities
const heading = document.getElementById("heading");
const headingText = document.getElementById("heading_text");

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

function renderError(errMsg) {
  heading.innerText = "Oops! We can’t sign you in at the moment";
  headingText.innerText = errMsg;
  headingText.classList.add("error");
  removeSpinner();
}

// Password show and hide
const eyeIcon = document.getElementById("eyeIcon");
const passwordInput = document.getElementById("passwordInput");

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

const emailInput = document.getElementById("emailInput");
const signinBtn = document.getElementById("signinBtn");

signin_form.addEventListener("submit", (e) => {
  renderSpinner(signinBtn);
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const userData = {
    email,
    password,
  };
  signinUser(userData);
});

async function signinUser(data) {
  try {
    const res = await fetch(
      "https://stayshare.onrender.com/api/v1/auth/signin",
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
    if (result.success == false) {
      renderError(result.error);
    }
  } catch (error) {
    renderError(error);
  }
}
