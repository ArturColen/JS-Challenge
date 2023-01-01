// Event to recognize which button was clicked
document.body.addEventListener('keydown', (event) => {
    playSound(event.code.toLowerCase());
});

// Event to capture the values of the keys that were clicked and play the song
document.querySelector('#composition button').addEventListener('click', () => {
    let song = document.querySelector("#input").value;

    if (song != '') {
        let songArray = song.split('');
        playComposition(songArray);
    }
});

// Play the sound corresponding to the key clicked
function playSound(sound) {
    let audioElement = document.querySelector(`#s-${sound}`);
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);

    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }

    if (keyElement) {
        keyElement.classList.add('active');

        setTimeout(() => {
            keyElement.classList.remove('active');
        }, 300);
    }
}

// Play the sound of keys that have been typed
function playComposition(songArray) {
    let wait = 0;

    for (let songItem of songArray) {
        setTimeout(() => {
            playSound(`key${songItem}`);
        }, wait);

        wait += 250;
    }
}