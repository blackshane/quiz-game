let question = {
    title: 'questionPlace',
    alternatives: ['answer1', 'answer2', 'answer3'],
    correctAnswer: 1

}

const QUESTIONS = [
    "What is 2+8?", 
    "How many legs does the spider have?", 
    "what is the capital of Russia?"
 ];
 
 let counter = 0;
 let display = document.querySelectora('h3'); // is only targeting 1st <h3> (maybe All?)
 display.innerText = QUESTIONS[counter]
 
 let btn = document.getElementById('start');
 
 btn.addEventListener('click', function() {
    counter++;
    display.innerText = QUESTIONS[counter]
 })