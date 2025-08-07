const questions = [
  {
    question: "What type of attack involves intercepting and altering communication between two parties without their knowledge?",
    answers: [
      { text: "Phishing", correct: false },
      { text: "Man-in-the-Middle (MITM)", correct: true },
      { text: "Denial of Service (DoS)", correct: false },
      { text: "SQL Injection", correct: false },
    ],
  },
  {
    question: "Which vulnerability allows attackers to execute malicious code by inserting harmful SQL statements into input fields?",
    answers: [
      { text: "Cross-Site Scripting (XSS)", correct: false },
      { text: "Buffer Overflow", correct: false },
      { text: "SQL Injection", correct: true },
      { text: "Zero-Day Exploit", correct: false },
    ],
  },
  {
    question: "What is the primary risk of a buffer overflow vulnerability?",
    answers: [
      { text: "Unauthorized access to data", correct: false },
      { text: "System crash or execution of malicious code", correct: true },
      { text: "Phishing attacks", correct: false },
      { text: "Password guessing", correct: false },
    ],
  },
  {
    question: "Which type of vulnerability exploits weaknesses in a website to inject malicious scripts that run in users’ browsers?",
    answers: [
      { text: "Cross-Site Scripting (XSS)", correct: true },
      { text: "Broken Authentication", correct: false },
      { text: "Man-in-the-Middle", correct: false },
      { text: "Directory Traversal", correct: false },
    ],
  },
  {
    question: "What kind of vulnerability allows unauthorized users to gain access by exploiting weak or default credentials?",
    answers: [
      { text: "Broken Authentication", correct: true },
      { text: "Privilege Escalation", correct: false },
      { text: "Cross-Site Request Forgery (CSRF)", correct: false },
      { text: "Remote Code Execution", correct: false },
    ],
  },
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn-quiz");
        answerButtons.appendChild(button); 
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();