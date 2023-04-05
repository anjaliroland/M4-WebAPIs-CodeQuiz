// array of questions, choices, and answers
var questionSrc = [
    {
        question: "Where is Rose from?",
        choices: ["a. Portland", "b. Miami", "c. St. Olaf", "d. Cincinnati"],
        answer: "c"
    },
    {
        question: "Who is Sophia's daughter?",
        choices: ["a. Blanche", "b. Dorothy", "c. Rose", "d. Betty"],
        answer: "b"
    },
    {
        question: "What is the name of the retirement home Dorothy threatens to send Sophia?",
        choices: ["a. Shady Pines", "b. Gnarly Knolls", "c. Mild Manor", "d. Stone Ranch"],
        answer: "a"
    },
    {
        question: "What food did the girls often eat when talking about their problems?",
        choices: ["a. Cookies", "b. Ice Cream", "c. Scones", "d. Cheesecake"],
        answer: "d"
    },
    {
        question: "What is the name of Dorothy's ex husband?",
        choices: ["a. Stan", "b. Miles", "c. Alan", "d. Phil"],
        answer: "a"
    },
    {
        question: "What would Sophia often say before starting a story?",
        choices: ["a. 'Back in my day, ________'", "b. 'Before I dies, let me tell you about the time ________'", "c. 'Picture it ________'", "d. 'Did you know ________'"],
        answer: "c"
    },
    {
        question: "Whose house do all the girls live in?",
        choices: ["a. Dorothy", "b. Blanche", "c. Rose", "d. Sophia"],
        answer: "b"
    },
    {
        question: "Where do the all the girls live?",
        choices: ["a. Greenwich, NY", "b. Palm Springs, CA", "c. Portland, OR", "d. Miami, FL"],
        answer: "d"
    }
];  

// variables connecting to html for questions
var answerBtn1 = document.querySelector("#choice1");
var answerBtn2 = document.querySelector("#choice2");
var answerBtn3 = document.querySelector("#choice3");
var answerBtn4 = document.querySelector("#choice4");

// variables and function for countdown timer
var timeLeft = document.querySelector("#timer");
var secondsLeft = 300;

function countdown() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeLeft.textContent = "Time left: " + secondsLeft + "s";

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            timeLeft.textContent = "Time is up!";
            endQuiz();
        }else if (questionCount >= questionSrc.length +1) {
            clearInterval(timerInterval);
            endQuiz();
        }
    
    }, 1000);
}

// variables and function for starting the quiz
var startBtn = document.querySelector("#startBtn");
var startPge = document.querySelector("#start");
var gamePge = document.querySelector("#gamePge");

function startQuiz() {
    startPge.style.display = "none";
    gamePge.style.display = "block";
    countdown();
    askQuestion(questionNum);
};


// variables and function to display the questions
var questionEl = document.querySelector("#question");
var questionNum = 0;
var questionCount = 1;

function askQuestion(n) {
    questionEl.textContent = questionSrc[n].question;
    answerBtn1.textContent = questionSrc[n].choices[0];
    answerBtn2.textContent = questionSrc[n].choices[1];
    answerBtn3.textContent = questionSrc[n].choices[2];
    answerBtn4.textContent = questionSrc[n].choices[3];
    questionNum = n;
};


// variables and function to end the quiz
var savePge = document.querySelector("#savePge");
var endScore = document.querySelector("#totalScore")

function endQuiz() {
    gamePge.style.display = "none";
    savePge.style.display = "block";
    console.log(savePge);
    endScore.textContent = "Your final score is: " + secondsLeft;
    timeLeft.style.display = "none";
};


// variable and function to check answer responses
var checked = document.querySelector("#check");

function checkAnswers(event) {
    event.preventDefault();

    checked.style.display = "block";
    setTimeout(function () {
        checked.style.display = "none";
    }, 1500);

    if(questionSrc[questionNum].answer == event.target.value) {
        checked.textContent = "Correct!";
    } else {
        secondsLeft = secondsLeft - 20;
        checked.textContent = "Wrong! The correct answer is " + questionSrc[questionNum].answer;
    }

    if (questionNum < questionSrc.length -1) {
        askQuestion(questionNum +1);
    } else {
        endQuiz();
    }
    questionCount++;
};


//variables and functions for saving highscores
var saveBtn = document.querySelector("#saveBtn");
var highscorePge = document.querySelector("#highscorePge");
var recordScore = document.querySelector("#recordScore");
var userInitials = document.querySelector("#initials");

function getScore() {
    var currentList = localStorage.getItem("ScoreList");
    if (currentList !== null) {
        newList = JSON.parse(currentList);
        return newList;
    } else {
        newList = [];
    }
    return newList;
};

function renderScore() {
    recordScore.innerHTML = "";
    recordScore.style.display ="block";
    var highScores = sort();   
    var topFive = highScores.slice(0,5);
    
    for (var i = 0; i < topFive.length; i++) {
        var item = topFive[i];
        var li = document.createElement("li");
        li.textContent = item.user + " - " + item.score;
        li.setAttribute("data-index", i);
        recordScore.appendChild(li);
    }
};

function sort() {
    var unsortedList = getScore();
    
    if (getScore == null) {
        return;
    } else{
    unsortedList.sort(function(a,b){
        return b.score - a.score;
    })
    return unsortedList;
}};

function addScore(n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

function saveScore() {
    var scoreItem = {
        user: userInitials.value,
        score: secondsLeft
    }
    addScore(scoreItem);
    renderScore();
};


// variables and eventListeners for buttons
var answerChoices = document.querySelectorAll(".answers")

startBtn.addEventListener("click", startQuiz); 

answerChoices.forEach(function(click){
    click.addEventListener("click", checkAnswers);
});

saveBtn.addEventListener("click", function(event) {
    event.preventDefault();
    savePge.style.display = "none";
    startPge.style.display = "none";
    highscorePge.style.display = "block";
    gamePge.style.display = "none";
    saveScore();
});

var scoreCheck = document.querySelector("#score-check");
scoreCheck.addEventListener("click", function(event) {
    event.preventDefault();
    savePge.style.display = "none";
    startPge.style.display = "none";
    highscorePge.style.display = "block";
    gamePge.style.display ="none";
    renderScore();
});

var backBtn = document.querySelector("#backBtn");
backBtn.addEventListener("click",function(event){
    event.preventDefault();
    savePge.style.display = "none";
    startPge.style.display = "block";
    highscorePge.style.display = "none";
    gamePge.style.display ="none";
    location.reload();
});

var clearBtn = document.querySelector("#clearBtn")
clearBtn.addEventListener("click",function(event) {
    event.preventDefault();
    localStorage.clear();
    renderScore();
});