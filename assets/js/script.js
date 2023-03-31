// TODO: define all questions and answers
    // create variables for questions and answers that connect to html elements

// TODO: create timer function that will countdown seconds
    // create variables for timer that connect to html elements
    // timer function must:
        // display correctly on screen
        // subtract 20 seconds when incorrect answer is selected
        // IF timer hits 0:
            // End quiz function is called

// TODO: create a function to start the quiz
    // create variables for start that connect to html
    // When quiz start button is pushed:
        // hide the start button
        // display the first question
        // begin timer countdown

// TODO: create a function to render a question
    //create variables for game page to connect to html elements
    // When question is rendered:
        // remove previous question
        // add question to question container
        // make button for each answer
        // add answers to answers container

// TODO: create function to end quiz 
    // create variables for end of quiz that connect to html elements
    // when quiz is completed:
        // timer stops
        // questions are hidden
        // end screen is shown
        // time remaining is shown as score

// TODO: create function that handles answer responses
    // create variables for answer responses that connect to html elements
    // IF answer is correct :
        // hide answered question
        // display new question
    // ELSE IF answer is wrong:
        // subtract time from timer
        // wrong answer message is flashed on screen (setTimeout)
        // hide answered question
        // display new question
    // 
    // IF no more questions: 
        // end quiz is called
    
// TODO: create a function that saves high scores
    // create variables for scores that connect to html elements
    // when function runs:
        // get value of users initials
        // validate input
        // retrieve existing data from local storage
        // redirect to start screen after save

// TODO: create a function that listens for keyboard events
    // checks if the 'Enter' key was pressed for saving scores
    // POTENTIALLY check if 'a', 'b', 'c', or 'd' is pressed for answers

// TODO: add event listeners for the following: 
    // click start
    // click answers
    // click save score
    // click view scores


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
