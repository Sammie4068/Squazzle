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

// Modals
const modals = document.querySelectorAll("#modal");
const overlay = document.querySelector(".overlay");
const deleteModal = document.querySelector(".delete_modal");
const changePassModal = document.querySelector(".change_pass_modal");

function openModal(modal) {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
}

function closeModal() {
  overlay.classList.add("hidden");
  modals.forEach((modal) => modal.classList.add("hidden"));
}

const deleteAcccountBtn = document.querySelectorAll(".delete_account");

deleteAcccountBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    openModal(deleteModal);
  })
);

const changePassBtn = document.querySelectorAll(".change_pass");
changePassBtn.forEach((btn) =>
  btn.addEventListener("click", () => openModal(changePassModal))
);

// Add accomodation progress
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBars = document.querySelectorAll(".progress_bars span");
const activeProgressBars = document.querySelector(".progress_bars .active");

function progress() {
  let currentPage = 1;

  function movePage() {
    if (currentPage > 1) {
      prevBtn.innerText = "Back";
    } else if (currentPage === 4) {
      nextBtn.innerText = "Save & Publish";
    }
    else if (currentPage > 4 || currentPage < 1) {
      return
    }

    // activeProgressBars.classList.remove("active");
    progressBars[currentPage - 1].classList.add("active");
    console.log(currentPage);
  }

  prevBtn.addEventListener("click", () => {
    currentPage -= 1;
    movePage();
  });
  nextBtn.addEventListener("click", () => {
    currentPage += 1;
    movePage();
  });
}

progress();
