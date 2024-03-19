document.addEventListener("DOMContentLoaded", function () {
  const email = document.querySelector("#email");
  const submit = document.querySelectorAll("button");
  const error = document.querySelector("#error");
  const signUp = document.querySelector(".sign-up");
  const success = document.querySelector(".success");
  const main = document.querySelector(".main");

  const showError = () => {
    error.style.display = "block";
  };

  let canClick = true;

  function handleClick(e) {
    e.preventDefault();

    if (!canClick) return;

    canClick = false;
    setTimeout(() => {
      canClick = true;
    }, 1200);

    if (!email.value.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
      return showError();
    }

    main.classList.toggle("shrink");
    signUp.classList.toggle("shown");
    success.classList.toggle("shown");
  }

  submit.forEach((button) => {
    button.addEventListener("click", handleClick);
  });
});
