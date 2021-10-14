const FORM = document.querySelector("#quiz-form");
const ANSWERS = Array.from(document.querySelectorAll(".answer"));
const QUESTIONS = Array.from(document.querySelectorAll(".question-item"));
const ALERT = document.querySelector("#alert");
const BTN = document.querySelector("button");

let arr = [];
ANSWERS.forEach((answer) => {
  answer.addEventListener("click", (e) => {
    if (!arr.includes(e.target.name)) {
      arr.push(e.target.name);
    }
    if (arr.length === QUESTIONS.length) {
      BTN.removeAttribute("disabled");
    }
  });
});

FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  QUESTIONS.forEach((question) => {
    question.classList.add("incorrect");
    question.classList.remove("correct");
  });
  let correctAnswers = ANSWERS.filter(
    (answer) => answer.checked && answer.value === "true"
  );
  correctAnswers.forEach((answer) => {
    answer.closest(".question-item").classList.add("correct");
    answer.closest(".question-item").classList.remove("incorrect");
  });

  if (correctAnswers.length === QUESTIONS.length) {
    ALERT.classList.add("active");
    setTimeout(() => {
      ALERT.classList.remove("active");
    }, 3000);
  }
});
