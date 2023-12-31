// Declaring the questions! These are the objects that the questions and answers will be pulled from. 

var questions = [

    {
        quest: "What kind of language is JavaScript?",
        options: ["High-Level Language", "Low-Level Language", "Hypertext Language", "Foreign Language"],
        ans: "High-Level Language"
    },

    {
        quest: "What does event.stopPropagation prevent?",
        options: ["Event Gurgling", "Dehydration", "Event Bubbling", "DOM Traversal"],
        ans: "Event Bubbling"
    },

    {
        quest: "In a browser, what is the global object?",
        options: ["Object-This", "Earth", "The OS Drive", "The Window"],
        ans: "The Window"
    },

    {
        quest: "What is the name of the indexing convention used by arrays?",
        options: ["Periodical Indexing", "Legal Indexing", "Metadata indexing", "Zero indexing"],
        ans: "Zero indexing"
    },

    {
        quest: "What does API stand for?",
        options: ["Applicable Program Index", "Application Programming Interface", "Applied Pressure Indicator", "Aftermath Pomegranate Incineration"],
        ans: "Application Programming Interface"
    },

    {
        quest: "History Question! When was JavaScript released?",
        options: ["1 AD", "1989", "2000", "1995"],
        ans: "1995"
    }

];

// After establishing the question bank, I want to grab all necessary DOM elements for the below functions. 

var startButton = document.getElementById("start-quiz-btn");
var timerE1 = document.querySelector("#timer");
var questionsE1 = document.querySelector("#questions-page");
var submitBtn = document.querySelector("#submitBtn");
var nameE1 = document.querySelector("#name");
var feedbackE1 = document.querySelector("#feedback");
var choicesE1 = document.querySelector("#options");


// Variables that keep track of the quiz state. Quiz's length based on the amount of questions present. 

var time = questions.length * 15;
var timerId;
var currentQuestionIndex = 0;

// Start quiz starts the timer and hides the front page/reveals the questions page using set and remove attribute. 

function startQuiz() {
    timerId = setInterval(tickTock, 1000);
    timerE1.textContent = time;
    var introScreenE1 = document.getElementById("intro");
    introScreenE1.setAttribute("class", "hide")
    questionsE1.removeAttribute("class");
    getQuestions();
}

// getQuestions function loops through the array of questions and answers and creates the answers list as buttons. 

function getQuestions() {
    var currentQuestion = questions[currentQuestionIndex];
    var promptE1 = document.getElementById("question-words");
    promptE1.textContent = currentQuestion.quest;
    choicesE1.innerHTML = " ";
    for (var i = 0; i < currentQuestion.options.length; i++) {
        var choice = currentQuestion.options[i];
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.addEventListener("click", questionClick);
        choicesE1.appendChild(choiceBtn);
    }
}

// questionClick compares answer choice against the provided answer in the questions object. If incorrect, time is deducted and feedback is shown with red styling. If the answer is correct, green feedback is shown. The final if-statement will end the quiz if the timer reaches zero, or if the currentQuestionIndex goes past the length of the questions array. 

function questionClick(event) {

    var buttonE1 = event.target;


    if (!buttonE1.matches(".choice")) {
        return;
    }

    if (buttonE1.value !== questions[currentQuestionIndex].ans) {

        time -= 15;

        if (time < 0) {
            time = 0;
        }

        timerE1.textContent = time;

        feedbackE1.textContent = "Wrong!";
        feedbackE1.style.color = "red";

    } else {

        feedbackE1.textContent = "You got it!";
        feedbackE1.style.color = "green";

    }

    feedbackE1.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackE1.setAttribute("class", "feedback hide");
    }, 2000);

    currentQuestionIndex++;

    if (time <= 0 || currentQuestionIndex === questions.length) {
        endQuiz();
    } else {
        getQuestions();
    }

    buttonE1.addEventListener("click", questionClick);

}

// endQuiz clears the value of timerId, and reveals the end screen using setAttribute. 

function endQuiz() {
    clearInterval(timerId);

    var endScreenE1 = document.getElementById("finish-screen");
    endScreenE1.removeAttribute("class");

    var finalScoreE1 = document.getElementById("final-score");
    finalScoreE1.textContent = time;

    questionsE1.setAttribute("class", "hide");
}

// timer. endQuiz function runs if timer equals or falls below zero. 

function tickTock() {
    time--;
    timerE1.textContent = time;
    if (time <= 0) {
        endQuiz()
    }
}

// Use JSON to parse the highscore string. Initials and score saved as an object in local storage. 

function saveHighscore() {

    var initials = nameE1.value.trim();

    if (initials !== " ") {

        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        var newScore = {
            score: time,
            initials: initials,
        };

        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

    }
}

// checks if user uses enter key to enter their initials and highscore value into local storage. 

function checkForEnter(event) {

    if (event.key === "Enter") {
        saveHighscore();
    }

}

// Event listeners for the buttons keyevents. 

nameE1.addEventListener("keyup", checkForEnter);

submitBtn.addEventListener("click", saveHighscore);

startButton.addEventListener("click", startQuiz);

