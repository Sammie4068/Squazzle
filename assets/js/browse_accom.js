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
    console.log(data);
    const accommodations = data.data.accomodation;
    occupyAccommodations(accommodations);
  } catch (err) {
    console.log(err);
  }
}

const accomodationContainer = document.querySelector(".accomodation_container");

function reformatAccomDate(dateStr) {
  let date = new Date(dateStr);
  let formattedDate = date.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  return formattedDate;
}

function occupyAccommodations(data) {
  data.forEach((accom) => {
    const accomId = JSON.stringify(accom._id);
    const displayImg = accom.gallery[0].imageUrl;
    let markup = `<div class="accomodation_card cell">
          <img src="${displayImg}" alt="${accom.accommodationName}" />
          <p class="title">${accom.accommodationName}</p>
          <p class="location">${accom.city}, Nigeria</p>
          <div class="available">
            <span
              ><i class="fa-solid fa-circle ${
                accom.status == "available" && "accom_status_avail"
              }"></i>
              <p>${accom.status}</p></span
            >
            <span
              ><i class="fa-solid fa-circle"></i>
              <p>Mansion</p></span
            >
          </div>
          <p class="duration">Duration: ${reformatAccomDate(
            accom.hostingPeriodFrom
          )} - ${reformatAccomDate(accom.hostingPeriodTo)}</p>
          <button value='${accomId}' class="price">
            <span>NGN</span> <span>${accom.price} /</span> <span>night</span>
          </button>
        </div>`;

    accomodationContainer.insertAdjacentHTML("beforeend", markup);

    const accomCard = document.querySelectorAll(".accomodation_card");
    accomCard.forEach((card) => {
      card.addEventListener("click", () => {
        const priceBtn = card.querySelector(".price");
        const accomId = JSON.parse(priceBtn.value);
        localStorage.setItem("accomId", accomId);
        window.location = "profile.html#listing";
      });
    });
  });
}

getAccomodations();
