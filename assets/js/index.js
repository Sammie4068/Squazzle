"use strict";

const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll("#nav_link");
const menuToggleBtn = document.getElementById("nav_toggle_btn");
const overlay = document.querySelector(".overlay");

function hamMenu() {
  navbar.classList.toggle("active");
  menuToggleBtn.classList.toggle("active");
}

menuToggleBtn.addEventListener("click", hamMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", hamMenu);
});

const propertiesDisplayLinks = document.querySelectorAll(
  ".properties_links li"
);
propertiesDisplayLinks.forEach((link) => {
  link.addEventListener("click", () => {
    removeActive(propertiesDisplayLinks, link)
  });
});

function removeActive(ele, activeEle) {
  ele.forEach(el => el.classList.remove("active"))
  activeEle.classList.add("active")
}

// var elem = document.querySelector(".main-carousel");
// var flkty = new Flickity(elem, {
//   // options
//   cellAlign: "left",
//   contain: true,
// });
