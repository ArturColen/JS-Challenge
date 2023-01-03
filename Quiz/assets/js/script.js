// Initial data
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// Click the button to restart the quiz
document.querySelector('#score-area button').addEventListener('click', resetEvent);

// Show the questions and change the progress bar
function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('#progress-bar').style.width = `${pct}%`;

        document.querySelector('#score-area').style.display = 'none';
        document.querySelector('#question-area').style.display = 'block';

        document.querySelector('#question').innerHTML = q.question;
        let optionsHTML = '';
        for (let i in q.options) {
            optionsHTML += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span> ${q.options[i]}</div>`;
        }
        document.querySelector('#options').innerHTML = optionsHTML;

        document.querySelectorAll('#options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });
    }
    else {
        finishQuiz();
    }
}

// Verify that you have clicked on the correct option and move on to the next 
function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if (questions[currentQuestion].answer === clickedOption) {
        correctAnswers++;
    }

    currentQuestion++;
    showQuestion();
}

// Show the survey result
function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if (points < 30) {
        document.querySelector('#score-text-1').innerHTML = 'Tá ruim, ein?!';
        document.querySelector('#score-percent').style.color = '#f00';
    }
    else if (points >= 30 && points < 70) {
        document.querySelector('#score-text-1').innerHTML = 'Boa!';
        document.querySelector('#score-percent').style.color = '#ff0';
    }
    else {
        document.querySelector('#score-text-1').innerHTML = 'Parabéns!';
        document.querySelector('#score-percent').style.color = '#0d630d';
    }

    document.querySelector('#score-percent').innerHTML = `Acertou ${points}%`;
    document.querySelector('#score-text-2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

    document.querySelector('#score-area').style.display = 'block';
    document.querySelector('#question-area').style.display = 'none';
    document.querySelector('#progress-bar').style.width = '100%';
}

// Restart the quiz
function resetEvent() {
    currentQuestion = 0;
    correctAnswers = 0;
    showQuestion();
}