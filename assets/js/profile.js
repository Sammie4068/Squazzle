"use strict";

// State
const allContents = document.querySelectorAll(".user_profile_container");
const manageAccount = document.getElementById("manageAccount");
const personalInfo = document.getElementById("personalInfo");
const editProfile = document.getElementById("editProfile");
const viewListing = document.getElementById("viewListing");
const myListings = document.getElementById("myListings");
const editListing = document.getElementById("editListing");
const addListing = document.getElementById("addListing");

function displayContent(ele) {
  allContents.forEach((content) => {
    content.classList.add("hidden");
  });
  ele.classList.remove("hidden");
}

function updateDisplay() {
  const state = window.location.hash.slice(1);
  switch (state) {
    case "manage-account":
      displayContent(manageAccount);
      break;
    case "personal-details":
      displayContent(personalInfo);
      break;
    case "edit-profile":
      displayContent(editProfile);
      break;
    case "listing":
      displayContent(viewListing);
      break;
    case "edit-listing":
      displayContent(editListing);
      break;
    case "add-listing":
      displayContent(addListing);
      break;

    default:
      break;
  }
}

window.addEventListener("hashchange", updateDisplay);
window.addEventListener("load", updateDisplay);

// Profile Image
const profileImage = document.querySelectorAll(".profile_picture");
const imageUrl = localStorage.getItem("profileImage");
profileImage.forEach((img) => {
  img.attributes.src.value = imageUrl;
});

// Phone country code API
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

const profileImgWrapper = document.querySelector(".profile_img");
const dropdownWrapper = document.querySelector(".dropdown__wrapper");
profileImgWrapper.addEventListener("click", () => {
  dropdownWrapper.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (!e.target.matches(".profile_img img")) {
    if (!dropdownWrapper.classList.contains("hidden")) {
      dropdownWrapper.classList.add("hidden");
    }
  }
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

// Manage Account Page
const userId = localStorage.getItem("id");
const userFullName = `${localStorage.getItem(
  "firstName"
)} ${localStorage.getItem("lastName")}`;
const userEmail = localStorage.getItem("email");
const userOccupation = localStorage.getItem("occupation");
const userGender = localStorage.getItem("gender");
const userAddr = localStorage.getItem("address");
const userPhone = localStorage.getItem("phoneNumber");
const userNin = localStorage.getItem("nin");
const userAbout = localStorage.getItem("about");

const userNameEle = document.querySelectorAll(".user_name");
const userEmailEle = document.querySelectorAll(".user_email");
const userOccEle = document.querySelectorAll(".user_occupation");
const userGenderEle = document.querySelectorAll(".user_gender");
const userAddrEle = document.querySelectorAll(".user_addr");
const userPhoneEle = document.querySelectorAll(".user_phone");
const userNinEle = document.querySelectorAll(".user_nin");
const userAboutEle = document.querySelectorAll(".user_about");

displayProp(userNameEle, userFullName);
displayProp(userEmailEle, userEmail);
conditionalDisplayProp(userOccupation, userOccEle);
conditionalDisplayProp(userGender, userGenderEle);
conditionalDisplayProp(userAddr, userAddrEle);
displayProp(userPhoneEle, `+234${userPhone}`);
conditionalDisplayProp(userNin, userNinEle);
conditionalDisplayProp(userAbout, userAboutEle);

function displayProp(ele, data) {
  if (ele instanceof NodeList) {
    ele.forEach((e) => (e.innerText = data));
  } else {
    ele.innerText = data;
  }
}

function conditionalDisplayProp(lsProp, ele) {
  lsProp ? displayProp(ele, lsProp) : displayProp(ele, "N/A");
}

function updateHash(ele, hash) {
  if (ele instanceof NodeList) {
    ele.forEach((e) => {
      e.addEventListener("click", () => {
        window.location.hash = hash;
      });
    });
  } else {
    ele.addEventListener("click", () => {
      window.location.hash = hash;
    });
  }
}

const personalDetailsLinks = document.querySelectorAll(
  ".personal_details_link"
);
const editProfileLink = document.querySelectorAll(".edit_profile");

updateHash(personalDetailsLinks, "personal-details");
updateHash(editProfileLink, "edit-profile");

// Edit Profile Page
const editProfileForm = document.getElementById("edit_profile_form");
const firstNameInput = document.getElementById("firstname_input");
const lastNameInput = document.getElementById("lastname_input");
const emailInput = document.getElementById("email_input");
const occupationInput = document.getElementById("occupation_input");
const genderInput = document.getElementById("gender_input");
const addressInput = document.getElementById("address_input");
const stateInput = document.getElementById("state_input");
const cityInput = document.getElementById("city_input");
const ninInput = document.getElementById("nin_input");
const aboutInput = document.getElementById("about_input");
const changeProfilePicture = document.getElementById("change_profile_picture");
const pictureDisplay = document.getElementById("picture_display");

changeProfilePicture.addEventListener("change", () => {
  const file = changeProfilePicture.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    pictureDisplay.attributes.src.value = reader.result;
  });
  reader.readAsDataURL(file);
});

const editProfileSubmitBtn = document.getElementById("edit_profile_submit_btn");
const editProfileCancelBtn = document.getElementById("edit_profile_cancel_btn");

updateHash(editProfileCancelBtn, "personal-details");

editProfileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  editProfileSubmitBtn.style.width = "35%";
  renderSpinner(editProfileSubmitBtn);

  const formData = new FormData();
  formData.append("firstName", firstNameInput.value);
  formData.append("lastName", lastNameInput.value);
  formData.append("email", emailInput.value);
  formData.append("occupation", occupationInput.value);
  formData.append("gender", genderInput.value);
  formData.append("address", addressInput.value);
  formData.append("state", stateInput.value);
  formData.append("city", cityInput.value);
  formData.append("phoneNumber", phoneInput.value);
  formData.append("bio", aboutInput.value);
  formData.append("image", changeProfilePicture.files[0]);

  editProfileFunction(formData);
});

async function editProfileFunction(data) {
  try {
    const res = await fetch(
      `https://stayshare.onrender.com/api/v1/auth/users/${id}`,
      {
        method: "PATCH",
        body: data,
      }
    );
    const result = await res.json();
    removeSpinner();
    console.log(result);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

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

// Logout
function logout() {
  localStorage.clear();
  localStorage.setItem("isLogout", true);
  window.location = "signin.html";
}

// Render Spinner
function renderSpinner(parentEle) {
  const markup = `<div class="spinner"></div>
`;
  const spinner = document.querySelector(".spinner");
  spinner || parentEle.insertAdjacentHTML("beforeend", markup);
}

function removeSpinner() {
  const spinner = document.querySelector(".spinner");
  spinner && spinner.classList.add("hidden");
}

// Add accomodation progress
const prevBtns = document.querySelectorAll("#prevBtn");
const nextBtns = document.querySelectorAll("#nextBtn");
const progressBars = document.querySelectorAll(".progress_bars span");
const activeProgressBars = document.querySelector(".progress_bars .active");
const addAccomPages = document.querySelectorAll(".add_accom_form");
const pageNames = document.querySelectorAll(".page_name");
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

// View Accomodation
const accomId = localStorage.getItem("accomId");
const listingLocation = document.querySelectorAll("#listing_location");
const listingReason = document.querySelectorAll("#listing_reason");
const listingDate = document.querySelectorAll("#listing_date");
const listingType = document.querySelectorAll("#listing_type");
const listingPrice = document.getElementById("listing_price");
const mainPhoto = document.querySelector(".main_photo img");
const subPhotos = document.querySelectorAll(".view_sub_photo img");
const resPhoto = document.querySelector(".res_photo img");
const listingTitle = document.querySelector("#listing_title");
const listingDesc = document.querySelector("#listing_desc");
const hostPhotos = document.querySelectorAll(".host_photo img");
const hostName = document.getElementById("hostName");
const hostJoined = document.getElementById("hostJoined");
const hostPhone = document.getElementById("hostPhone");

async function getSingleAccomodation(accomID) {
  try {
    const res = await fetch(
      `https://stayshare.onrender.com/api/v1/accommodations/${accomID}`
    );
    const data = await res.json();
    const accommodationInfo = data.data.accomodation;
    const hostData = accommodationInfo.createdBy;

    const dateObj = new Date(hostData.createdAt);
    const year = dateObj.getFullYear();
    const month = dateObj.toLocaleString("default", { month: "long" });

    displayProp(hostJoined, `joined squazzle ${month} ${year}`);

    hostPhotos.forEach(
      (ele) => (ele.attributes.src.value = hostData.profileImage)
    );
    displayProp(hostName, `${hostData.firstName} ${hostData.lastName}`);
    displayProp(hostPhone, `+234${hostData.phoneNumber}`);

    displayProp(
      listingLocation,
      `${accommodationInfo.address}, ${accommodationInfo.city}, ${accommodationInfo.state}, Nigeria`
    );
    displayProp(listingReason, accommodationInfo.whyListing);
    displayProp(
      listingDate,
      `${accommodationInfo.hostingPeriodFrom} - ${accommodationInfo.hostingPeriodTo}`
    );
    displayProp(listingType, accommodationInfo.accommodationType);
    displayProp(listingTitle, accommodationInfo.accommodationName);
    displayProp(listingPrice, `NGN ${accommodationInfo.price} per night`);
    displayProp(listingDesc, accommodationInfo.description);
    mainPhoto.attributes.src.value = accommodationInfo.gallery[0].imageUrl;
    subPhotos[0].attributes.src.value = accommodationInfo.gallery[1].imageUrl;
    subPhotos[1].attributes.src.value = accommodationInfo.gallery[2].imageUrl;
    resPhoto.attributes.src.value = accommodationInfo.gallery[1].imageUrl;
  } catch (err) {
    console.log(err);
  }
}
accomId && getSingleAccomodation(accomId);

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

// async function getUserInfo(userID) {
//   // console.log(userID);
//   try {
//     const res = await fetch(
//       `https://stayshare.onrender.com/api/v1/users/profile`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     const data = await res.json();
//     if (data.error == "Expired token please login") {
//       getToken();
//       // location.reload()
//     }
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// Refresh Token
async function getToken() {
  try {
    const res = await fetch(
      `https://stayshare.onrender.com/api/v1/auth/refreshToken`,
      {
        method: "GET",
        headers: {
          "x-user-email": userEmail,
          "x-user-token": refreshToken,
        },
      }
    );
    const data = await res.json();

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  } catch (err) {
    console.log(err);
  }
}
