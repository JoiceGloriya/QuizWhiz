const questions = [
    {
      question: "What is the `===` operator in JavaScript used for?",
      answers: [
        { text: "Assignment", correct: false },
        { text: "Loose Equality Comparsion", correct: false },
        { text: "Strict Equality Comparsion", correct: true },
        { text: "Logical OR", correct: false },
      ],
    },
    {
      question: "What does the NaN value represent in JavaScript?",
      answers: [
        { text: "Not a Node", correct: false },
        { text: "Not a Number", correct: true },
        { text: "No Argument Needed", correct: false },
        { text: "New Array Null", correct: false },
      ],
    },
    {
      question: "How do you properly comment a single-line in JavaScript?",
      answers: [
        { text: "`-- This is a comment `", correct: false },
        { text: "`/* This is a comment */`", correct: false },
        { text: "`//This is a comment`", correct: true },
        { text: "`#This is a comment`", correct: false },
      ],
    },
    {
      question:
        "Which of the following datatypes is NOT a primitive data type in JavaScript?",
      answers: [
        { text: "String", correct: false },
        { text: "Boolean", correct: false },
        { text: "Number", correct: false },
        { text: "Object", correct: true },
      ],
    },
  ];
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");

  let questionIndex = 0;
  let score = 0;

  function startQuiz() {
    questionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
  }

  function showQuestion() {
    resetState(); //reset previous questions and answers
    let currentQuestion = questions[questionIndex];
    let questionNumber = questionIndex + 1;
    questionElement.innerHTML =
      questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
      let button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  }

  function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }

  function selectAnswer(event) {
    let selectedButton = event.target;
    let isCorrect = false;
    if (selectedButton.dataset.correct === "true") isCorrect = true;
    if (isCorrect) {
      selectedButton.classList.add("tick");
      score++;
    } else selectedButton.classList.add("wrong");

    Array.from(answerButtons.children).forEach((button) => {
      if (button.dataset.correct === "true") button.classList.add("tick");
      button.disabled = true;
    });
    nextButton.style.display = "block";
  }

  nextButton.addEventListener("click", () => {
    if (questionIndex < questions.length) handleNextButton();
    else startQuiz();
  });

  function handleNextButton() {
    questionIndex++;
    if (questionIndex < questions.length) {
      showQuestion();
    } else {
      displayScore();
    }
  }

  function displayScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.style.display = "block";
    nextButton.innerHTML = "Play Again";
  }

  startQuiz();