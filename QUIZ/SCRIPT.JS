// initialise variables
let currentQuestionIndex = localStorage.getItem('currentQuestionIndex') ? parseInt(localStorage.getItem('currentQuestionIndex')): 0; // keeps track of the current question
let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0; // keeps track of the score


// create an array to store users quiz questions
const quizQuestions = [
  {
    question: 'What is the capital city of France?',
    options:['Berlin', 'Madrid', 'Paris', 'Rome'],
    Answer: 'Paris'
  },
  {
    question: 'What is 2+2 ?',
    options:['3', '4', '5', '6'],
    Answer: '4'
  },
  {
    question: 'Which planet is known as the red planet?',
    options:['Mercury', 'Venus', 'Earth', 'Mars'],
    Answer: 'Mars'
  }
]

//select all html elements
const questionElement = document.getElementById('question')
const optionsButtons = document.querySelectorAll('.option')
const resultElement = document.getElementById('result')
const nextButton = document.getElementById('next')

// add event listeners
optionsButtons.forEach(optionsButton => {optionsButton.addEventListener('click', checkAnswer) } ); // when an option is clicked, call checkanswer function

nextButton.addEventListener('click', showNextQuestion) // when nextquestion btn is clicked, show the next question by calling the shownextquestion function


//display the first question 
displayQuestion();


// function to display question
function displayQuestion(){
  const currentQuestion = quizQuestions[currentQuestionIndex] // get current questionindex from the array quizQuestions
  questionElement.textContent = currentQuestion.question // update the question text

  // update the option buttons with the options for the current question
  optionsButtons.forEach((optionsButtons, index) => {
    optionsButtons.textContent = quizQuestions[currentQuestionIndex].options[index]

  })
  // clear the previous result element
  resultElement.textContent = ''
}








// function to checkAnswer
function checkAnswer(event){
const userAnswer = event.target.textContent // gets the users selected answer
const correctAnswer = quizQuestions[currentQuestionIndex].Answer; // gets correct answer from current question

if(userAnswer === correctAnswer){ // compare users answer to correct answer
  score ++ // increment the score if answer id correct
  localStorage.setItem('score' , score); // update score in local storage
  resultElement.textContent = 'Correct'; // display correct if useranswer = correctanswer
} else{
  resultElement.textContent = 'Wrong'; // display wrong if useranswer!= correctAnswer
}

//disable options or input types after user selects answer
optionsButtons.forEach(optionsButtons => {
  optionsButtons.disabled = true;
})
}


//function to display the next question
function showNextQuestion(){
currentQuestionIndex ++ // move to the next question if in current question 
localStorage.setItem('currentQuestionIndex' , currentQuestionIndex) // update currentquestionindex in local storage 
if(currentQuestionIndex < quizQuestions.length){ //if they're more questions, display next question
  displayQuestion()

//re enable all optionbuttons for the next question
optionsButtons.forEach(optionsButtons => {
  optionsButtons.disabled = false;
})
} else{ // if no more questions, display the users final score
questionElement.textContent = ` Quiz over! Your score is ${score}/ ${quizQuestions.length}`
localStorage.removeItem('currentQuestionIndex');
localStorage.removeItem('score');
resultElement.textContent = ''
nextButton.disabled = true; // disable next question button
}
}

