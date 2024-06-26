"use strict";

const isLogout = localStorage.getItem("isLogout");
const accessToken = localStorage.getItem("accessToken");
const imageHead = document.getElementById("imageHead");
const imageWriteup = document.getElementById("imageWriteup");
const heading = document.getElementById("heading");
const headingText = document.getElementById("heading_text");

if (accessToken) {
  window.location = "index.html";
}

if (isLogout) {
  imageHead.innerText = "";
  imageWriteup.innerText = "";
  heading.innerText = "We don’t want to see you go";
  headingText.innerText = "You have successfully logged out.";
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
 spinner && spinner.remove();
}

function renderError(errMsg) {
  heading.innerText = "Oops! We can’t sign you in at the moment";
  headingText.innerText = errMsg;
  headingText.classList.add("error");
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
    removeSpinner();
    if (result.success == false) {
      renderError("Invalid Email or Password");
    } else if (result.success == true) {
      localStorage.clear();
      localStorage.setItem("accessToken", result.response.accessToken);
      localStorage.setItem("refreshToken", result.response.refreshToken);
      const userInfo = result.response.data.user;
      const jsonString = JSON.stringify(userInfo);
      const parsedObject = JSON.parse(jsonString);
      for (const key in parsedObject) {
        if (parsedObject.hasOwnProperty(key)) {
          localStorage.setItem(key, parsedObject[key]);
        }
      }
      window.location = "index.html";
    }
  } catch (error) {
    renderError(error);
  }
}
