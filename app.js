// Offer Timer

//Number of ms from 1970 until May 6, 2023
let countDownDate = new Date().getTime() + 100000000;

let counter = setInterval(() => {
  // Get Date Now (from 1970 until now in ms)
  let dateNow = new Date().getTime();

  // Find The Date Difference Between Now And Countdown Date
  let dateDiff = countDownDate - dateNow;

  // Get Time Units
  // let days = Math.floor(dateDiff / 1000 / 60 / 60 / 24);
  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

  document.querySelector(".days").innerHTML = days < 10 ? `0${days}` : days;
  document.querySelector(".hours").innerHTML = hours < 10 ? `0${hours}` : hours;
  document.querySelector(".minutes").innerHTML =
    minutes < 10 ? `0${minutes}` : minutes;
  document.querySelector(".seconds").innerHTML =
    seconds < 10 ? `0${seconds}` : seconds;

  if (dateDiff < 0) {
    clearInterval(counter);
  }
}, 1000);

// Send form data
const form = document.forms["submit-to-google-sheet"];
const btn = document.getElementById("order-btn");
const overlay = document.getElementById("success-overlay");
const loader = document.getElementById("text-warning");

const scriptURL =
  "https://script.google.com/macros/s/AKfycbxYZzy-4vLImnYu9waqVDfFyXXQkTeqIfIyiKAiVjxg6VHwQigKNjtF5nzQI632MMsV/exec";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  btn.classList.add("btn_loader");
  loader.style.opacity = "1";

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      overlay.style.height = "100%";
      loader.style.opacity = "0";
    })

    .catch((error) => {
      console.error("Error!", error.message);
      btn.classList.remove("btn_loader");
      loader.style.opacity = "0";
    });
});
