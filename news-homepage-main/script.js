document.addEventListener("DOMContentLoaded", function () {
  const btnOpen = document.querySelector(".open-menu");
  const btnClose = document.querySelector(".close-menu");
  const menu = document.querySelector("ul");
  const gray = document.querySelector(".gray");
  const body = document.querySelector("body");

  btnOpen.addEventListener("click", function () {
    menu.classList.toggle("shown");
    body.classList.toggle("stop");

    setTimeout(function () {
      gray.classList.toggle("hidden");
    }, 475);
  });

  btnClose.addEventListener("click", function () {
    menu.classList.toggle("shown");
    body.classList.toggle("stop");
    gray.classList.toggle("hidden");
  });
});
