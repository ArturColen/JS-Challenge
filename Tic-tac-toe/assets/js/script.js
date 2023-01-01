// Initial data
let hash = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let player = '';
let warning = '';
let playing = false;

reset();

// Event to restart the game by clicking the button
document.querySelector('#reset').addEventListener('click', reset);
// Event to mark the move
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

// Mark the move on the screen
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if (playing && hash[item] == '') {
        hash[item] = player;
        renderHash();
        togglePlayer();
    }
}

// Restart the game
function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : 'o'; 
    
    for (let i in hash) {
        hash[i] = '';
    }

    playing = true;

    renderHash();
    renderInfo();
}

// Fill in the game fields with the values that are in the object
function renderHash() {
    for (let i in hash) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = hash[i];
    }

    checkGame();
}

// Fill in the main game information 
function renderInfo() {
    document.querySelector('#turn').innerHTML = player;
    document.querySelector('#result').innerHTML = warning;
}

// Switch player
function togglePlayer() {
    player = (player == 'x') ? 'o' : 'x';
    renderInfo();
}

// Check the game status
function checkGame() {
    if (checkWinner('x')) {
        warning = 'O "x" venceu!';
        playing = false;
    }
    else if (checkWinner('o')) {
        warning = 'O "o" venceu!';
        playing = false;
    }
    else if (tie()) {
        warning = 'Empate!';
        playing = false;
    }
}

// Check who won the game
function checkWinner(player) {
    let possibilities = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for (let w in possibilities) {
        let pArray = possibilities[w].split(',');
        let hasWon = pArray.every(option => hash[option] === player);
        if (hasWon) {
            return true;
        }
    }

    return false;
}

// Check if the game is tied
function tie() {
    for (let i in hash) {
        if (hash[i] === '') {
            return false;
        }
    }

    return true;
}