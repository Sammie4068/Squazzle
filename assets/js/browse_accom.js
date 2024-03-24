const profileImg = document.querySelector(".profile_img");
const dropdownWrapper = document.querySelector(".dropdown__wrapper");
profileImg.addEventListener("click", () => {
  dropdownWrapper.classList.toggle("hidden");
});

const profileImage = document.querySelector(".profile_img img");
const imageUrl = localStorage.getItem("profileImage");
imageUrl && (profileImage.attributes.src.value = imageUrl);

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

// get Accomodations
async function getAccomodations() {
  try {
    const res = await fetch(
      `https://stayshare.onrender.com/api/v1/accommodations`
    );
    const data = await res.json();
    const accommodations = data.data.accomodation;
   occupyAccommodations(accommodations)
  } catch (err) {
    console.log(err);
  }
}

const accomodationContainer = document.querySelector(".accomodation_container");

function occupyAccommodations(data) {
  data.forEach((accom) => {
    let markup = `<div class="accomodation_card cell">
          <img src="./assets/images/apt1.png" alt="Apartments" />
          <p class="title">${accom.accommodationName}</p>
          <p class="location">${accom.city}</p>
          <div class="available">
            <span
              ><i class="fa-solid fa-circle"></i>
              <p>${accom.status}</p></span
            >
            <span
              ><i class="fa-solid fa-circle"></i>
              <p>Mansion</p></span
            >
          </div>
          <p class="duration">Duration: Fri 18 Nov - Fri 16 Dec</p>
          <p class="price">
            <span>NGN</span> <span>${accom.price} /</span> <span>night</span>
          </p>
        </div>`;

    accomodationContainer.insertAdjacentHTML("beforeend", markup);
  });
}

getAccomodations();