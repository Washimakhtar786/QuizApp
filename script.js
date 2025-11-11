// 🧠 Quiz Questions Data
const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyperlinking Text Marking Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    question: "Which is not a JavaScript Framework?",
    options: ["Python Script", "Django", "React", "Node.js"],
    answer: "Python Script"
  },
  {
    question: "Which HTML tag is used to link an external JavaScript file?",
    options: ["<script>", "<js>", "<javascript>", "<code>"],
    answer: "<script>"
  },
  {
    question: "Inside which HTML element do we put the CSS?",
    options: ["<css>", "<style>", "<link>", "<script>"],
    answer: "<style>"
  }
];

// 🎯 Select Elements
const questionEl = document.getElementById("question");
const optionsEl = document.querySelectorAll(".option-btn");
const nextBtn = document.getElementById("next-btn");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const quizContainer = document.getElementById("quiz");

// 📊 Quiz State
let currentQuestion = 0;
let score = 0;
let selectedOption = "";

// 🧩 Load Question
function loadQuestion() {
  const current = quizData[currentQuestion];
  questionEl.innerHTML = current.question;
  progressText.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
  progressFill.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;

  optionsEl.forEach((btn, index) => {
    btn.innerHTML = current.options[index];
    btn.classList.remove("selected");
    btn.disabled = false;
  });

  nextBtn.disabled = true;
  selectedOption = "";
}

// 🖱️ Handle Option Selection
optionsEl.forEach((btn) => {
  btn.addEventListener("click", () => {
    optionsEl.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedOption = btn.innerHTML;
    nextBtn.disabled = false;
  });
});

// ⏭️ Next Button Logic
nextBtn.addEventListener("click", () => {
  const correctAnswer = quizData[currentQuestion].answer;
  if (selectedOption === correctAnswer) score++;

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// 🏁 Show Result
function showResult() {
  quizContainer.innerHTML = `
    <div class="result">
      <h2>🎉 Quiz Completed!</h2>
      <p>You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong></p>
      <p>${getFeedback(score)}</p>
      <button onclick="restartQuiz()">Restart 🔄</button>
    </div>`;
}

// 💬 Feedback based on score
function getFeedback(score) {
  const total = quizData.length;
  const percent = (score / total) * 100;
  if (percent === 100) return "🔥 Perfect Score! You're a JavaScript Master!";
  if (percent >= 80) return "💪 Great job! You know your basics well.";
  if (percent >= 50) return "👍 Good effort! Keep practicing.";
  return "📚 Don’t worry! Review and try again!";
}

// 🔄 Restart Quiz
function restartQuiz() {
  setTimeout(() => location.reload(), 300);
}

// 🚀 Start the Quiz
loadQuestion();
