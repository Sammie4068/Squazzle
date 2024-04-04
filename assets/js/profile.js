"use strict";

// State
const allContents = document.querySelectorAll(".user_profile_container");
const manageAccount = document.getElementById("manageAccount");
const personalInfo = document.getElementById("personalInfo");
const editProfile = document.getElementById("editProfile");
const viewListing = document.getElementById("viewListing");
const myListings = document.getElementById("myListings");
const myListing = document.getElementById("myListing");
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
    case "my-listings":
      displayContent(myListings);
      break;
    case "my-listing":
      displayContent(myListing);
      const listingId = localStorage.getItem("listingId");
      getSingleAccomodation(listingId);
      break;
    case "listing":
      displayContent(viewListing);
      accomId && getSingleAccomodation(accomId);
      break;
    case "edit-listing":
      displayContent(editListing);
      getSingleAccomodation(localStorage.getItem("listingId"));
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
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");
const userId = localStorage.getItem("_id");
const userFirstName = localStorage.getItem("firstName");
const userLastName = localStorage.getItem("lastName");
const userFullName = `${userFirstName} ${userLastName}`;
const userEmail = localStorage.getItem("email");
const userOccupation = localStorage.getItem("occupation");
const userGender = localStorage.getItem("gender");
const userAddr = localStorage.getItem("address");
const userPhone = localStorage.getItem("phoneNumber");
const userNin = localStorage.getItem("nin");
const userAbout = localStorage.getItem("about");
const userState = localStorage.getItem("state");
const userCity = localStorage.getItem("city");

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
  if (
    ele instanceof HTMLInputElement ||
    ele instanceof HTMLSelectElement ||
    ele instanceof HTMLTextAreaElement
  ) {
    if (ele instanceof NodeList) {
      ele.forEach((e) => {
        e.value = "";
        e.value = data;
      });
    } else {
      ele.value = "";
      ele.value = data;
    }
  } else {
    if (ele instanceof NodeList) {
      ele.forEach((e) => (e.innerText = data));
    } else {
      ele.innerText = data;
    }
  }
}

function displayImg(ele, newValue) {
  if (ele instanceof NodeList) {
    ele.forEach((e) => {
      e.attributes.src.value = "";
      e.attributes.src.value = newValue;
    });
  } else {
    ele.attributes.src.value = "";
    ele.attributes.src.value = newValue;
  }
}

function conditionalDisplayProp(lsProp, ele) {
  lsProp
    ? displayProp(ele, lsProp)
    : displayProp(
        ele,
        ele instanceof HTMLInputElement ||
          ele instanceof HTMLSelectElement ||
          ele instanceof HTMLTextAreaElement
          ? ""
          : "N/A"
      );
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
const myListingsLink = document.querySelectorAll(".my_listings_link");
const myListingLink = document.querySelectorAll(".my_listing_link");
const addAcccomLink = document.querySelectorAll(".add_accom_link");
const editListingLink = document.querySelectorAll(".edit_listing_link");

updateHash(personalDetailsLinks, "personal-details");
updateHash(editProfileLink, "edit-profile");
updateHash(myListingsLink, "my-listings");
updateHash(myListingLink, "my-listing");
updateHash(addAcccomLink, "add-listing");
updateHash(editListingLink, "edit-listing");

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

displayProp(firstNameInput, userFirstName);
displayProp(lastNameInput, userLastName);
displayProp(emailInput, userEmail);
conditionalDisplayProp(userOccupation, occupationInput);
conditionalDisplayProp(userGender, genderInput);
conditionalDisplayProp(userAddr, addressInput);
conditionalDisplayProp(userState, stateInput);
conditionalDisplayProp(userCity, cityInput);
displayProp(phoneInput, userPhone);
conditionalDisplayProp(userAbout, aboutInput);
conditionalDisplayProp(userNin, ninInput);

pictureDisplay.addEventListener("click", () => {
  changeProfilePicture.click();
});

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
  formData.append(
    "image",
    changeProfilePicture.files[0] ? changeProfilePicture.files[0] : null
  );

  editProfileFunction(formData);
});

async function editProfileFunction(data) {
  try {
    const res = await fetch(
      `https://stayshare.onrender.com/api/v1/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data,
      }
    );
    const result = await res.json();
    removeSpinner();

    if (result.error == "Expired token please login") {
      getToken();
      renderFeedback("Access expired, Try refreshing the page", "error");
    }
    if (result.error) {
      renderProfileFeedback(result.error, "error");
    }

    if (result.status == "success") {
      renderProfileFeedback(result.message, "success");
      const userInfo = result.data.user;
      const jsonString = JSON.stringify(userInfo);
      const parsedObject = JSON.parse(jsonString);
      for (const key in parsedObject) {
        if (parsedObject.hasOwnProperty(key)) {
          localStorage.setItem(key, parsedObject[key]);
        }
      }
    }
    console.log(result);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

// Profile Feedback
const profileFeedback = document.getElementById("feedback");
const profileFeedbackStatus = document.getElementById("feedback_status");
const profileFeedbackMsg = document.getElementById("feedback_text");

function renderProfileFeedback(msg, status) {
  profileFeedbackMsg.innerText = msg;
  profileFeedbackStatus.className = "";
  profileFeedbackStatus.classList.add(status);
  profileFeedback.classList.remove("hidden");
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  setTimeout(() => {
    profileFeedback.classList.add("hidden");
  }, 5000);
}

// Feedback Modal
const feedbackModal = document.getElementById("feedback_modal");
const feedbackModalStatus = document.getElementById("feedback_modal_status");
const feedbackModalMsg = document.getElementById("feedback_modal_text");

function renderFeedback(msg, status) {
  feedbackModalMsg.innerText = msg;
  feedbackModalStatus.className = "";
  feedbackModalStatus.classList.add(status);
  feedbackModal.classList.remove("hidden");
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Modal feedback
const changePassFeedback = document.getElementById("changePassFeedback");
function renderModalFeedback(ele, msg, status) {
  ele.innerText = msg;
  ele.classList.add(status);
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

// Get Radio Value
function getSelectedRadio(ele) {
  const selectedOption = ele.querySelector(
    'input[name="accomodation_type"]:checked'
  );
  if (selectedOption) {
    return selectedOption.value;
  }
}

// Change Password
const changePasswordForm = document.querySelector(".change_pass_form");
const oldPasswordInput = document.getElementById("oldPasswordInput");
const newPasswordInput = document.getElementById("newPasswordInput");
const confirmNewPasswordInput = document.getElementById(
  "confirmNewPasswordInput"
);
const oldPasswordMsg = document.querySelector(".oldPass_msg");
const newPasswordMsg = document.querySelector(".new_password_msg");
const letterMsg = document.querySelector(".new_password_msg .letter");
const numberMsg = document.querySelector(".new_password_msg .number");
const charMsg = document.querySelector(".new_password_msg .char");
const symbolMsg = document.querySelector(".new_password_msg .symbol");
const confirmNewPasswordMsg = document.querySelector(".confirm_newPass_msg");
const changePassDoneBtn = document.getElementById("change_password_submit");

function oldPassvalidation() {
  if (oldPasswordInput.value == "") {
    oldPasswordMsg.innerText = "Please enter a correct password";
    oldPasswordInput.classList.add("error");
    oldPasswordMsg.classList.remove("hidden");
  } else {
    oldPasswordInput.classList.remove("error");
    oldPasswordMsg.classList.add("hidden");
    return true;
  }
}
oldPasswordInput.addEventListener("input", oldPassvalidation);

function passwordValidation() {
  newPasswordMsg.classList.remove("hidden");

  let lowerCaseLetters = /[a-z]/g;
  let upperCaseLetters = /[A-Z]/g;
  if (
    newPasswordInput.value.match(lowerCaseLetters) &&
    newPasswordInput.value.match(upperCaseLetters)
  ) {
    letterMsg.classList.remove("error");
    letterMsg.classList.add("success");
  } else {
    newPasswordInput.classList.add("error");
    letterMsg.classList.remove("success");
    letterMsg.classList.add("error");
  }

  let numbers = /[0-9]/g;
  if (newPasswordInput.value.match(numbers)) {
    numberMsg.classList.remove("error");
    numberMsg.classList.add("success");
  } else {
    numberMsg.classList.remove("success");
    newPasswordInput.classList.add("error");
    numberMsg.classList.add("error");
  }

  if (newPasswordInput.value.length >= 8) {
    charMsg.classList.remove("error");
    charMsg.classList.add("success");
  } else {
    newPasswordInput.classList.add("error");
    charMsg.classList.remove("success");
    charMsg.classList.add("error");
  }

  let SpecialCharacters =
    /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
  if (newPasswordInput.value.match(SpecialCharacters)) {
    symbolMsg.classList.remove("error");
    symbolMsg.classList.add("success");
  } else {
    newPasswordInput.classList.add("error");
    symbolMsg.classList.remove("success");
    symbolMsg.classList.add("error");
  }

  let passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,100}$/;
  if (passRegex.test(newPasswordInput.value)) {
    newPasswordInput.classList.remove("error");
    newPasswordMsg.classList.add("hidden");
    return true;
  }
}

newPasswordInput.addEventListener("input", passwordValidation);

function confirmPass() {
  if (confirmNewPasswordInput.value == "") {
    confirmNewPasswordInput.classList.add("error");
    confirmNewPasswordMsg.innerText = "Re-enter password";
    confirmNewPasswordMsg.classList.remove("hidden");
  } else if (confirmNewPasswordInput.value != newPasswordInput.value) {
    confirmNewPasswordInput.classList.add("error");
    confirmNewPasswordMsg.innerText = "Passwords do not match";
    confirmNewPasswordMsg.classList.remove("hidden");
  } else {
    confirmNewPasswordInput.classList.remove("error");
    confirmNewPasswordMsg.classList.add("hidden");
    return true;
  }
}
confirmNewPasswordInput.addEventListener("input", confirmPass);

changePasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const changePassData = {
    currentPassword: oldPasswordInput.value,
    newPassword: newPasswordInput.value,
    confirmPassword: confirmNewPasswordInput.value,
  };
  if (oldPassvalidation() && passwordValidation() & confirmPass()) {
    renderSpinner(changePassDoneBtn);
    changePasswordFunction(changePassData);
  }
});

async function changePasswordFunction(data) {
  try {
    const res = await fetch(
      `https://stayshare.onrender.com/api/v1/users/changePassword`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    removeSpinner();
    if (result.success == false) {
      renderModalFeedback(changePassFeedback, result.message, "error");
    }
    if (result.error) {
      renderModalFeedback(changePassFeedback, result.error, "error");
      if (result.error == "Expired token please login") {
        getToken();
        renderFeedback("Access expired, Try refreshing the page", "error");
      }
    }

    if (result.status == "success") {
      renderModalFeedback(changePassFeedback, result.message, "success");
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

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
  spinner && spinner.remove();
}

// Add accomodation progress
const prevBtns = document.querySelectorAll(".prevBtn");
const nextBtns = document.querySelectorAll(".nextBtn");
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
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
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
const listingLocation = document.querySelectorAll(".listing_location");
const listingReason = document.querySelectorAll(".listing_reason");
const listingDate = document.querySelectorAll(".listing_date");
const listingType = document.querySelectorAll(".listing_type");
const listingPrice = document.querySelectorAll(".listing_price");
const mainPhoto = document.querySelectorAll(".main_photo img");
const subPhotoOne = document.querySelectorAll(".sub_photo_one");
const subPhotoTwo = document.querySelectorAll(".sub_photo_two");
const resPhoto = document.querySelectorAll(".res_photo img");
const listingTitle = document.querySelectorAll(".listing_title");
const listingDesc = document.querySelectorAll(".listing_desc");
const hostPhotos = document.querySelectorAll(".host_photo img");
const hostName = document.getElementById("hostName");
const hostJoined = document.getElementById("hostJoined");
const hostPhone = document.getElementById("hostPhone");

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

async function getSingleAccomodation(accomID) {
  try {
    const res = await fetch(
      `https://stayshare.onrender.com/api/v1/accommodations/${accomID}`
    );
    const data = await res.json();
    getSingleAccomData(data);
    occupyEditAccom(data);
  } catch (err) {
    console.error(err);
  }
}

function getSingleAccomData(data) {
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
    `${reformatAccomDate(
      accommodationInfo.hostingPeriodFrom
    )} - ${reformatAccomDate(accommodationInfo.hostingPeriodTo)}`
  );
  displayProp(listingType, accommodationInfo.accommodationType);
  displayProp(listingTitle, accommodationInfo.accommodationName);
  displayProp(listingPrice, `NGN ${accommodationInfo.price} per night`);
  displayProp(listingDesc, accommodationInfo.description);
  displayImg(mainPhoto, accommodationInfo.gallery[0].imageUrl);

  accommodationInfo.gallery[1]
    ? displayImg(subPhotoOne, accommodationInfo.gallery[1].imageUrl)
    : displayImg(subPhotoOne, "");

  accommodationInfo.gallery[2]
    ? displayImg(subPhotoTwo, accommodationInfo.gallery[2].imageUrl)
    : displayImg(subPhotoTwo, "");

  displayImg(resPhoto, accommodationInfo.gallery[0].imageUrl);

  const accomRuleWrapper = document.querySelectorAll(".acccomRuleWrapper");
  const rulesArr = accommodationInfo.accommodationRules;

  accomRuleWrapper.forEach((wrap) => (wrap.innerHTML = ``));

  rulesArr.forEach((rule) => {
    let markup = `<span>
                  <h2>${rule}</h2>
                  <p></p>
                </span>`;
    accomRuleWrapper.forEach((wrap) => {
      wrap.insertAdjacentHTML("beforeend", markup);
    });
  });
}

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

// Add accomodation images container
const addAccomImageeWrapper = document.querySelector(
  ".add_accom_image_wrapper"
);
const addNewImageCard = document.getElementById("addNewImage");
const newImageUpload = document.getElementById("newImageUpload");

addNewImageCard.addEventListener("click", () => {
  newImageUpload.click();
});

let imgFileArr = [];

function addNewImageEle(ele) {
  ele.addEventListener("change", () => {
    const file = ele.files[0];
    imgFileArr.push(file);
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const markup = `
        <div class="add_accom_image">
          <span class="add_accom_image_container">
            <img src="${e.target.result}" alt="" />
          </span>
          <div class="add_image_option">
            <div class="open_option">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </div>
            <div class="add_image_option_modal hidden">
              <i class="fa-solid fa-x closeModal"></i>
              <span>Set as cover photo</span>
              <span>Hide from gallery</span>
              <span>Delete</span>
            </div>
          </div>
        </div>`;
      addAccomImageeWrapper.insertAdjacentHTML("afterbegin", markup);
    };
    reader.readAsDataURL(file);
  });
}

document.addEventListener("click", (e) => {
  // remove profile modal
  if (!e.target.matches(".profile_img img")) {
    if (!dropdownWrapper.classList.contains("hidden")) {
      dropdownWrapper.classList.add("hidden");
    }
  }

  // Accomodation option modal
  if (e.target.classList.contains("open_option")) {
    const optionModal = e.target.nextElementSibling;
    optionModal.classList.toggle("hidden");
  } else if (e.target.classList.contains("closeModal")) {
    const optionModal = e.target.parentElement;
    optionModal.classList.add("hidden");
  }
});

// Add accomodation rules container
const addAccomRuleBtn = document.getElementById("addAccomRuleBtn");
const accomRulesWrapper = document.getElementById("accomRulesWrapper");

function addRulesDiv() {
  const markup = `<div class="add_rules_feat">
                    <input type="text" placeholder="Rule name" class="addAccomRule" required/>
                    <textarea
                      cols="30"
                      rows="5"
                      placeholder="description"
                      required
                    ></textarea>
                  </div>`;
  accomRulesWrapper.insertAdjacentHTML("beforeend", markup);
}
addAccomRuleBtn.addEventListener("click", addRulesDiv);

// Add Accomodation
const overviewForm = document.getElementById("overview");
const pricingForm = document.getElementById("pricing");
const descriptionForm = document.getElementById("description");
const imageForm = document.getElementById("images");
const addAccomNameInput = document.getElementById("addAccomNameInput");
const addAccomTypeForm = document.getElementById("addAccomTypeForm");
const addAccomLocationInput = document.getElementById("addAccomLocationInput");
const addAccomStateInput = document.getElementById("addAccomStateInput");
const addAccomCityInput = document.getElementById("addAccomCityInput");
const addAccomAvailForm = document.getElementById("addAccomAvailForm");
const addAccomPrice = document.getElementById("addAccomPrice");
const addAccomStartDate = document.getElementById("addAccomStartDate");
const addAccomEndDate = document.getElementById("addAccomEndDate");
const addAccomAbout = document.getElementById("addAccomAbout");
const addAccomReason = document.getElementById("addAccomReason");

const addImgFeedback = document.getElementById("addImgFeedback");
const publishAccomBtn = document.getElementById("publishAccomBtn");

document.addEventListener("DOMContentLoaded", () => {
  // get user Accom
  getUserListing();

  // Accom Price Validation
  [addAccomPrice, editPrice].forEach((ele) =>
    ele.addEventListener("input", (e) => {
      const filteredValue = e.target.value.replace(/[^\d]/g, "");
      e.target.value = filteredValue;
    })
  );
});
function formProgress(e) {
  e.preventDefault();
  stepNum++;
  progressNum++;
  updateSteps();
  updateProgressbar();
}

function getRules() {
  const addAccmRules = document.querySelectorAll(".addAccomRule");
  let valueArr = [];
  addAccmRules.forEach((input) => {
    valueArr.push(input.value);
  });
  return valueArr;
}

overviewForm.addEventListener("submit", formProgress);
pricingForm.addEventListener("submit", formProgress);
descriptionForm.addEventListener("submit", formProgress);

addNewImageEle(newImageUpload);

imageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderSpinner(publishAccomBtn);
  const addedImages = document.querySelectorAll(".add_accom_image");

  if (!addedImages || addedImages.length < 4) {
    removeSpinner();
    renderModalFeedback(addImgFeedback, "Please add atleast 3 images", "error");
  }

  const formData = new FormData();
  formData.append("accommodationName", addAccomNameInput.value);
  formData.append("description", addAccomAbout.value);
  formData.append("whyListing", addAccomReason.value);
  formData.append("accommodationType", getSelectedRadio(addAccomTypeForm));
  formData.append("accomodationRules", JSON.stringify(getRules()));
  formData.append("price", addAccomPrice.value);
  formData.append("hostingPeriodFrom", addAccomStartDate.value);
  formData.append("address", addAccomLocationInput.value);
  formData.append("hostingPeriodTo", addAccomEndDate.value);
  formData.append("state", addAccomStateInput.value);
  formData.append("city", addAccomCityInput.value);
  imgFileArr.forEach((file) => {
    formData.append("images", file);
  });

  const formDataArray = [];
  formData.forEach((value, key) => {
    formDataArray.push({ [key]: value });
  });

  console.table(formDataArray);
  publishAccom(formData);
});

async function publishAccom(data) {
  try {
    const res = await fetch(
      "https://stayshare.onrender.com/api/v1/accommodations",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data,
      }
    );
    removeSpinner();
    const result = await res.json();
    if (result.status === "error") {
      renderFeedback(result.error, "error");
    }
    if (result.error) {
      renderFeedback(result.message, "success");
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  } catch (err) {
    console.error(err);
    renderFeedback("internal server error", "error");
  }
}

// Get User Listing
const myListingsWrapper = document.getElementById("my-listings-wrapper");

async function getUserListing() {
  try {
    const res = await fetch(
      `https://stayshare.onrender.com/api/v1/users/accommodations`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    // console.log(data);

    if (data.error == "Expired token please login") {
      getToken();
      renderFeedback("Access expired, Try refreshing the page", "error");
    }
    if (data.status == "success") {
      const userAccom = data.data.accommodations;
      userAccom.forEach((accom) => {
        const listingId = JSON.stringify(accom._id);
        const displayImg = accom.gallery[0].imageUrl;

        let markup = `<div class="add_accom_image accomCard">
          <div class="add_new_image">
            <span class="svg_span">
             <img src="${displayImg}" alt="${accom.accommodationName}" />
            </span>
          </div>
          <button value='${listingId}' class="add_photo_span accomBtn">${accom.accommodationName}</button>
        </div>`;

        myListingsWrapper.insertAdjacentHTML("beforeend", markup);

        const accomCard = document.querySelectorAll(".accomCard");
        accomCard.forEach((card) => {
          card.addEventListener("click", () => {
            const accomBtn = card.querySelector(".accomBtn");
            const listingId = JSON.parse(accomBtn.value);
            localStorage.setItem("listingId", listingId);
            window.location = "profile.html#my-listing";
          });
        });
      });
    }
  } catch (err) {
    console.error(err);
  }
}

// Edit Accomodation
const editSideBarFeat = document.querySelectorAll(".edit_sidebar span");
const editOverview = document.getElementById("edit_overview");
const editDesc = document.getElementById("edit_description");
const editImg = document.getElementById("edit_img");

function editSidebarOnActive(ele) {
  editSideBarFeat.forEach((feat) => {
    if (feat.classList.contains("onActive")) {
      feat.classList.remove("onActive");
    }
  });
  ele.classList.add("onActive");
}

const editAccomSec = document.querySelectorAll(".edit_right_wrapper");
const editOverviewSection = document.getElementById("editOverviewSection");
const editDescSection = document.getElementById("editDescSection");
const editImgSection = document.getElementById("editImgSection");

function editAccomDisplay(ele) {
  editAccomSec.forEach((sec) => sec.classList.add("hidden"));
  ele.classList.remove("hidden");
}

editOverview.addEventListener("click", () => {
  editSidebarOnActive(editOverview);
  editAccomDisplay(editOverviewSection);
});

editDesc.addEventListener("click", () => {
  editSidebarOnActive(editDesc);
  editAccomDisplay(editDescSection);
});

editImg.addEventListener("click", () => {
  editSidebarOnActive(editImg);
  editAccomDisplay(editImgSection);
});

const editNameInput = document.querySelector(".edit_name_input");
const editLocationInput = document.querySelector(".edit_location_input");
const editStateInput = document.querySelector(".editStateInput");
const editCityInput = document.querySelector(".editCityInput");
const editTypeForm = document.querySelector(".edit_type_form");
const editAvailForm = document.querySelector(".edit_avail_form");
const editPrice = document.querySelector(".edit_price");
const editStartDate = document.querySelector(".editStartDate");
const editEndDate = document.querySelector(".editEndDate");
const editAboutAccom = document.querySelector(".editAboutAccom");
const editReason = document.querySelector(".editReason");

const addMoreRulesBtn = document.getElementById("addMoreRulesBtn");
const editRulesWrapper = document.getElementById("editRulesWrapper");

function addMoreRules() {
  const markup = `<div class="edit_rules_feat">
                   <input
                      type="text"
                      placeholder="Rule name"
                      class="editAccomRule"
                      required
                    />
                    <textarea
                      cols="30"
                      rows="5"
                      placeholder="description"
                      required
                    ></textarea>
                </div>`;
  editRulesWrapper.insertAdjacentHTML("beforeend", markup);
}
addMoreRulesBtn.addEventListener("click", addMoreRules);

function occupyEditAccom(data) {
  const accomInfo = data.data.accomodation;

  displayProp(editNameInput, accomInfo.accommodationName);
  displayProp(editLocationInput, accomInfo.address);
  displayProp(editStateInput, accomInfo.state);
  displayProp(editCityInput, accomInfo.city);
  displayProp(editPrice, accomInfo.price);
  displayProp(editStartDate, accomInfo.hostingPeriodFrom);
  displayProp(editEndDate, accomInfo.hostingPeriodTo);
  displayProp(editAboutAccom, accomInfo.description);
  displayProp(editReason, accomInfo.whyListing);
}
