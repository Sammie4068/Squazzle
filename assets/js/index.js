"use strict";

const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll("#nav_link");
const menuToggleBtn = document.getElementById("nav_toggle_btn");
const overlay = document.querySelector(".overlay");

menuToggleBtn.addEventListener("click", () => {
  navbar.classList.toggle("active");
  menuToggleBtn.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.toggle("active");
    menuToggleBtn.classList.toggle("active");
  });
});
