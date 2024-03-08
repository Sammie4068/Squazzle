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

const browseAccomBtn = document.getElementById("browse_accom_btn");

const listAccomBtn = document.getElementById("list_accom_btn");

browseAccomBtn.addEventListener("click", () => {
  window.location.href = "browse_accomodation.html";
}); 
listAccomBtn.addEventListener("click", () => {
  window.location.href = "list_accomodation.html";
});