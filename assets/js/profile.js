"use strict";

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

const profileImg = document.querySelector(".profile_img");
const dropdownWrapper = document.querySelector(".dropdown__wrapper");
profileImg.addEventListener("click", () => {
  dropdownWrapper.classList.toggle("hidden");
});

const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll("#nav_link");
const menuToggleBtn = document.getElementById("nav_toggle_btn");

function hamMenu() {
  navbar.classList.toggle("active");
  menuToggleBtn.classList.toggle("active");
}

menuToggleBtn.addEventListener("click", hamMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", hamMenu);
});

// Modal
const modals = document.querySelectorAll("#modal");
const overlay = document.querySelector(".overlay");
const deleteModal = document.querySelector(".delete_modal");

function openModal(modal) {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
}

function closeModal() {
  overlay.classList.add("hidden");
  modals.forEach((modal) => modal.classList.add("hidden"));
}

const deleteAcccountBtn = document.querySelector(".delete_account");
deleteAcccountBtn.addEventListener("click", () => {
  openModal(deleteModal);
});
