"use strict";

const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll("#nav_link");
const menuToggleBtn = document.getElementById("nav_toggle_btn");
const overlay = document.querySelector(".overlay");

const id = localStorage.getItem("_id");
const signinBtn = document.querySelectorAll(".signinBtn");
const toProfile = document.querySelector(".profile_img");
const profileImage = document.querySelector(".profile_img img");
const imageUrl = localStorage.getItem("profileImage");
if (id) {
  signinBtn.forEach((btn) => btn.classList.add("hidden"));
  toProfile.classList.remove("hidden");
  profileImage.attributes.src.value = imageUrl;
  // getUserInfo();
} else {
  signinBtn.forEach((btn) => btn.classList.remove("hidden"));
  toProfile.classList.add("hidden");
}

const dropdownWrapper = document.querySelector(".dropdown__wrapper");
toProfile.addEventListener("click", () => {
  dropdownWrapper.classList.toggle("hidden");
});

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
    removeActive(propertiesDisplayLinks, link);
  });
});

function removeActive(ele, activeEle) {
  ele.forEach((el) => el.classList.remove("active"));
  activeEle.classList.add("active");
}

// var elem = document.querySelector(".main-carousel");
// var flkty = new Flickity(elem, {
//   // options
//   cellAlign: "left",
//   contain: true,
// });

document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#dateRange", {
    mode: "range",
    dateFormat: "Y-m-d",
    minDate: "today",
  });
});

// Get User Info
// async function getUserInfo() {
//   try {
//     const res = await fetch(
//       `https://stayshare.onrender.com/api/v1/users/profile/${id}`
//     );
//     const data = await res.json();
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// }

