// Constants
const STARTING_TIME = 100
const PENALTY = 5

// Elements
const highScoreTableBody = document.getElementById("high-score-table-body");
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const highScoreButton = document.getElementById('high-score-button')
const questionContainerEl = document.getElementById('question-container')
const highScoreContainerEl = document.getElementById('high-score-container')
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById('answer-buttons')
const gameOverEl = document.getElementById('game-over')
const timeEl = document.querySelector(".time");
const scoreEl = document.getElementById("score");
const saveHighScoreDiv = document.getElementById('save-high-score-div')
const saveHighScoreInput = document.getElementById('save-high-score-input')
const saveHighScoreBtn = document.getElementById('save-high-score-btn')
const clearHighScoreBtn = document.getElementById('clear-high-score-btn')

// Dynamic vars
let shuffledQuestions, currentQuestionIndex
let secondsLeft = 0
let timerInterval
let score = 0
let freeze_question_buttons = false


// Event handlers
startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
})
highScoreButton.addEventListener('click', function() {
    if (highScoreContainerEl.classList.contains('hide')) {
        highScoreContainerEl.classList.remove('hide')
    } else {
        highScoreContainerEl.classList.add('hide')
    }
    renderHighScoreTable()
})
clearHighScoreBtn.addEventListener('click', clearHighScores)
saveHighScoreBtn.addEventListener('click', function () {
    saveHighScoreDiv.classList.add('hide')
    addHighScore(saveHighScoreInput.value, score)
    renderHighScoreTable()
    highScoreContainerEl.classList.remove('hide')
})


function getHighScores() {
    // Get high scores array from local storage.
    let stored_high_scores = localStorage.getItem('high_scores')
    if (!stored_high_scores) {
        // if no local storage is found, return an empty array
        return []
    }
    return JSON.parse(stored_high_scores)
}


function addHighScore(initials, score_) {
    // Add high score to local storage.
    let high_scores = getHighScores()
    high_scores.push({initials: initials, score: score_})
    localStorage.setItem('high_scores', JSON.stringify(high_scores));
}


function clearHighScores() {
    // Clear high scores from local storage.
    localStorage.removeItem('high_scores')
    renderHighScoreTable()
}


function renderHighScoreTable() {
    // Render the high scores table from local storage.
    while (highScoreTableBody.hasChildNodes()) {
        // Clear the table rows first.
        highScoreTableBody.removeChild(highScoreTableBody.lastChild);
    }

    // Add a new table row for each high score object in the local storage array.
    let high_scores = getHighScores()
    for (let i in high_scores) {
        let initials = high_scores[i]['initials']
        let score = high_scores[i]['score']
        console.log(initials + ' -> ' + score)
        highScoreTableBody.insertRow().innerHTML = `<tr><td>${initials}</td><td>${score}</td></tr>`
    }
}


function setScore(score_override) {
    // Set the score state.
    if (score_override !== undefined) {
        score = score_override
    }
    scoreEl.textContent = score
}


function hideSaveHighScore() {
    saveHighScoreDiv.classList.add('hide')
}


function showSaveHighScore() {
    if (score > 0) {
        saveHighScoreDiv.classList.remove('hide')
    } else {
        saveHighScoreDiv.classList.add('hide')
    }
}


function gameOver() {
    // End the game.
    stopTimer()
    gameOverEl.classList.remove('hide')
    questionContainerEl.classList.add('hide');
    startButton.innerText = 'Start'
    if (score > 0) {
        showSaveHighScore()
    } else {
        hideSaveHighScore()
    }
}


function adjustTimer(t) {
    // Add or subtract time from timer. End game when timer gets to zero.
    secondsLeft = secondsLeft + t
    if (secondsLeft <= 0) {
        gameOver()
    } else {
        timeEl.textContent = secondsLeft + " seconds left till GAME OVER.";
    }
}


function startTimer() {
    // Start a new timer, and stop existing one if running.
    if (timerInterval) {
        console.log("Timer already running, stopping first!")
        stopTimer()
    }
    secondsLeft = STARTING_TIME
    adjustTimer(0)
      // Sets interval in variable
    timerInterval = setInterval(function() {
        adjustTimer(-1)
    }, 1000);
    timeEl.classList.remove('hide');
}


function stopTimer() {
    // Stops execution of action at set interval
    timeEl.classList.add('hide');
    if (timerInterval) {
        clearInterval(timerInterval);
        return
    }
    console.log("Timer is not running!")
}


function startQuiz() {
    gameOverEl.classList.add('hide')
    setScore(0)
    currentQuestionIndex = 0
    startButton.innerText = 'Restart'
    highScoreContainerEl.classList.add('hide')
    questionContainerEl.classList.remove('hide')
    shuffledQuestions = questions.sort(() => Math.random() -.5)
    startTimer()
    nextQuestion()
}


function nextQuestion() {
    freeze_question_buttons = false
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        let button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }

        button.addEventListener('click', function(e) {
            // Lock buttons until nextQuestion is called again.
            if (!freeze_question_buttons) {
                selectAnswer(e)
            }
            freeze_question_buttons = true
        })

        answerButtonsEl.appendChild(button)
    });
}


function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsEl.firstChild)
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
}


function selectAnswer(event) {
    if (freeze_question_buttons) {
        return
    }
    let selectedButton = event.target
    let correct = selectedButton.dataset.correct
    if (correct) {
        score += 1
        setScore()
    } else {
        adjustTimer(-PENALTY)
    }
    setStatusClass(selectedButton, selectedButton.dataset.correct)
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        gameOver()
    }
}


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}


function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


const questions = [
    {
        question: 'Question 1 about Javascript',
        answers: [
            { text: 'right answer', correct: true },
            { text: 'wrong answer 1', correct: false },
            { text: 'wrong answer 2', correct: false },
            { text: 'wrong answer 3', correct: false },
        ]
    },
    {
        question: 'Question 2 about Javascript',
        answers: [
            { text: 'right answer', correct: true },
            { text: 'wrong answer 1', correct: false },
            { text: 'wrong answer 2', correct: false },
            { text: 'wrong answer 3', correct: false },
        ]
    },
    {
        question: 'Question 3 about Javascript',
        answers: [
            { text: 'right answer', correct: true },
            { text: 'wrong answer 1', correct: false },
            { text: 'wrong answer 2', correct: false },
            { text: 'wrong answer 3', correct: false },
        ]
    },
    {
        question: 'Question 4 about Javascript',
        answers: [
            { text: 'right answer', correct: true },
            { text: 'wrong answer 1', correct: false },
            { text: 'wrong answer 2', correct: false },
            { text: 'wrong answer 3', correct: false },
        ]
    }
]