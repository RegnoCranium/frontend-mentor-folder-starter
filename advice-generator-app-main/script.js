document.addEventListener("DOMContentLoaded", () => {
  const adviceIdElem = document.getElementById("adviceId");
  const adviceElem = document.getElementById("advice");
  const generateAdviceBtn = document.getElementById("generateAdviceBtn");

  async function fetchAdvice() {
    try {
      const response = await fetch(
        `https://api.adviceslip.com/advice?t=${Date.now()}`
      );
      const data = await response.json();
      return data.slip;
    } catch (error) {
      console.error("Error fetching advice:", error);
      return null;
    }
  }

  async function updateAdvice() {
    const slip = await fetchAdvice();
    if (slip) {
      adviceIdElem.textContent = slip.id;
      adviceElem.textContent = slip.advice;
    } else {
      adviceIdElem.textContent = "Error";
      adviceElem.textContent = "Failed to fetch advice. Please try again.";
    }
  }

  updateAdvice();

  generateAdviceBtn.addEventListener("click", updateAdvice);
});
