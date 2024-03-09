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
const prevBtns = document.querySelectorAll("#prevBtn");
const nextBtns = document.querySelectorAll("#nextBtn");
const progressBars = document.querySelectorAll(".progress_bars span");
const activeProgressBars = document.querySelector(".progress_bars .active");
const addAccomPages = document.querySelectorAll(".add_accom_form");
const pageNames = document.querySelectorAll(".page_name")
const progressFig = document.querySelector(".progress_number span");
let progressNum = parseInt(progressFig.textContent);

let stepNum = 0;

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    stepNum++;
    progressNum++;
    updateSteps();
    updateProgressbar();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    stepNum--;
    progressNum--;
    updateSteps();
    updateProgressbar();
  });
});

function updateSteps() {
  addAccomPages.forEach((page) => {
    page.classList.contains("step_active") &&
      page.classList.remove("step_active");
  });

  addAccomPages[stepNum].classList.add("step_active");
}

function updatePageName() {
  pageNames.forEach((pageName) => {
    pageName.classList.contains("name_active") &&
      pageName.classList.remove("name_active");
  });

  pageNames[stepNum].classList.add("name_active");
}

function updateProgressbar() {
  progressBars.forEach((progressStep, idx) => {
    if (idx < stepNum + 1) {
      progressStep.classList.add("active");
    } else {
      progressStep.classList.remove("active");
    }
  });
  progressFig.textContent = progressNum;
  updatePageName();
}

progressBars.forEach((progressStep, idx) => {
  progressStep.addEventListener("click", () => {
    stepNum = parseInt(progressStep.dataset.step);
    progressNum = parseInt(progressStep.dataset.step);
    updateSteps();
    if (idx < stepNum + 1) {
      progressStep.classList.add("active");
    } else {
        progressStep.classList.remove("active");
      }
      // console.log(idx, stepNum);
       progressFig.textContent = progressNum + 1;
       updatePageName();
    });
});
