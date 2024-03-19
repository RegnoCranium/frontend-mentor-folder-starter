let openedAnswer = "";

function showAnswer(question) {
  hideAnswer();
  if (question === openedAnswer) {
    openedAnswer = "";
    return;
  }

  const currentAnswer = document.querySelector(`.${question} p`);
  const currentIcon = document.querySelector(`.${question} .btn .icon`);

  openedAnswer = question;
  currentAnswer.classList.toggle("answer-shown");
  currentIcon.src = "assets/images/icon-minus.svg";
}

function hideAnswer() {
  if (!openedAnswer) return;

  const closeAnswer = document.querySelector(`.${openedAnswer} p`);
  const closeIcon = document.querySelector(`.${openedAnswer} .btn .icon`);

  closeAnswer.classList.toggle("answer-shown");
  closeIcon.src = "assets/images/icon-plus.svg";
}

document.addEventListener("keypress", function (event) {
  if (event.code === "Enter") {
    const focusedElement = document.activeElement;

    if (focusedElement.classList.contains("btn")) {
      focusedElement.onclick();
    }
  }
});
