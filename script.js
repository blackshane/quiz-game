const STARTING_TIME = 10
const PENALTY = 5

var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var highScoreButton = document.getElementById('high-score-button')
var questionContainerEl = document.getElementById('question-container')
var highScoreContainerEl = document.getElementById('high-score-container')

var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answer-buttons')
var wrongAnswerEl = document.getElementsByClassName('btn-wrong')
let shuffledQuestions, currentQuestionIndex
var timeEl = document.querySelector(".time");
var scoreEl = document.getElementById("score");

var mainEl = document.getElementById("main");
var secondsLeft
var timerInterval
var score = 0

startButton.addEventListener('click', startTimer)
startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
})

highScoreButton.addEventListener('click', function() {
    console.log(highScoreButton.dataset.is_shown)
    if (highScoreButton.dataset.is_shown == 'false') {
        highScoreContainerEl.classList.add('hide')
        highScoreButton.dataset.is_shown = true

    } else {
        highScoreContainerEl.classList.remove('hide')
        highScoreButton.dataset.is_shown = false
    }
})

function adjustTimer(t) {
    secondsLeft = secondsLeft + t
    if (secondsLeft <= 0) {
        gameOver()
    }
}

function setScore() {
    scoreEl.textContent = score
}


function gameOver() {
    stopTimer()
    score = 0 
    setScore()
    mainEl.textContent = "GAME OVER";
    questionContainerEl.classList.add('hide');
    timeEl.classList.add('hide');
}

function startTimer() {
    if (timerInterval) {
        console.log("Error: Timer already started!")
        return
    }
    secondsLeft = STARTING_TIME
      // Sets interval in variable
    timerInterval = setInterval(function() {
        adjustTimer(-1)
        timeEl.textContent = secondsLeft + " seconds left till GAME OVER.";
  }, 1000);
}

function stopTimer() {
    // Stops execution of action at set interval
    if (!timerInterval) {
        console.log("Error: Timer is not running!")
        return
    }
    clearInterval(timerInterval);
}


function showQuestionContainer() {
    highScoreContainerEl.classList.add('hide')
    questionContainerEl.classList.remove('hide')
}

function startQuiz() {
    score = 0
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() -.5)
    currentQuestionIndex = 0
    showQuestionContainer()
    nextQuestion()
    
}

function nextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
        button.addEventListener('click', (e => {
            e.preventDefault();
      
        }));
    });
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsEl.firstChild)
        answerButtonsEl.removeChild
        (answerButtonsEl.firstChild)
}

function selectAnswer(event) {
    var selectedButton = event.target
    var correct = selectedButton.dataset.correct    
    if (correct) {
        console.log('IT WAS CORRECT!')
        score += 1
        setScore()
    } else {
        console.log('Answer incorrect')
        adjustTimer(-PENALTY)
    }

    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
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

var questions = [
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