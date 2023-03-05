const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerEl = document.getElementById('question-container')
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById('answer-buttons')


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', setTime)
startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
})

var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");

var secondsLeft = 3;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left till GAME OVER.";

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
    
      mainEl.textContent = "GAME OVER";
      questionContainerEl.classList.add('hide');
      timeEl.classList.add('hide');
      // overMessage.classList.remove('hide');
       //window.alert('GAME OVER')

    }

  }, 1000);
}





function startQuiz() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() -.5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')
    nextQuestion()

}

function nextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
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
    const selectedButton = event.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
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