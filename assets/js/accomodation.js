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

document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#dateRange", {
    mode: "range",
    dateFormat: "Y-m-d",
    minDate: "today",
  });
});

// Modals
const modals = document.querySelectorAll("#modal");
const overlay = document.querySelector(".overlay");
const filterModal = document.querySelector(".filter_modal");

function openModal(modal) {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
}

function closeModal() {
  overlay.classList.add("hidden");
  modals.forEach((modal) => modal.classList.add("hidden"));
}

filterBtn = document.querySelector(".filter_btn");
filterBtn.addEventListener("click", () => openModal(filterModal));