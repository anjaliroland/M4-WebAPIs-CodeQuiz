//A. TODO: define all questions and answers
    // create variables for questions and answers that connect to html elements

//B. TODO: create timer function that will countdown seconds
    // create variables for timer that connect to html elements
    // timer function must:
        // display correctly on screen
        // subtract 20 seconds when incorrect answer is selected
        // IF timer hits 0:
            // End quiz function is called

//C. TODO: create a function to start the quiz
    // create variables for start that connect to html
    // When quiz start button is pushed:
        // hide the start button
        // display the first question
        // begin timer countdown

//D. TODO: create a function to render a question
    //create variables for game page to connect to html elements
    // When question is rendered:
        // add question to question container
        // make button for each answer
        // add answers to answers container

//E. TODO: create function to end quiz 
    // create variables for end of quiz that connect to html elements
    // when quiz is completed:
        // timer stops
        // questions are hidden
        // end screen is shown
        // time remaining is shown as score

//F. TODO: create function that handles answer responses
    // create variables for answer responses that connect to html elements
    // IF answer is correct :
        // flash correct 
    // ELSE IF answer is wrong:
        // subtract time from timer
        // wrong answer message is flashed on screen (setTimeout)
    //
    // display new question
    // 
    // IF no more questions: 
        // end quiz is called
    
//G. TODO: create a function that saves high scores
    // create variables for scores that connect to html elements
    // when function runs:
        // get value of users initials
        // validate input
        // retrieve existing data from local storage
        // redirect to start screen after save

//H. TODO: add event listeners for the following: 
    // click start
    // click answers
    // click save score
    // click view scores

// A. TODO: define all questions and answers
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

var answerBtn1 = document.querySelector("#choice1");
var answerBtn2 = document.querySelector("#choice2");
var answerBtn3 = document.querySelector("#choice3");
var answerBtn4 = document.querySelector("#choice4");

// B. TODO: create timer function that will countdown seconds
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

// C. TODO: create a function to start the quiz
var startBtn = document.querySelector("#startBtn");
var startPge = document.querySelector("#start");
var gamePge = document.querySelector("#gamePge");

function startQuiz() {
    startPge.style.display = "none";
    gamePge.style.display = "block";
    countdown();
    askQuestion(questionNum);
};


//D. TODO: create a function to render a question
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


//E. TODO: create function to end quiz 
var savePge = document.querySelector("#savePge");
var endScore = document.querySelector("#totalScore")

function endQuiz() {
    gamePge.style.display = "none";
    savePge.style.display = "block";
    console.log(savePge);
    endScore.textContent = "Your final score is: " + secondsLeft;
    timeLeft.style.display = "none";
};


//F. TODO: create function that handles answer responses
var checked = document.querySelector("#check");

function checkAnswers(event) {
    event.preventDefault();

    checked.style.display = "block";
    setTimeout(function () {
        checked.style.display = "none";
    }, 1000);

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


//G. TODO: create a function that saves high scores
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


//H. TODO: add event listeners 
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