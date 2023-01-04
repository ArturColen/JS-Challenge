// Select the elements to be manipulated
let digitalElement = document.querySelector('#digital');
let sElement = document.querySelector('#p-s');
let mElement = document.querySelector('#p-m');
let hElement = document.querySelector('#p-h');

// Update the clock data according to the current time
function updateClock() {
    // Variables for storing the timetable 
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    // Show the time on the digital clock
    digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`;

    // Calculate the angle of each pointer 
    let sDeg = ((360 / 60) * second) - 90;
    let mDeg = ((360 / 60) * minute) - 90;
    let hDeg = ((360 / 12) * hour) - 90;      

    // Show the element of each pointer in the correct position
    sElement.style.transform = `rotate(${sDeg}deg)`;
    mElement.style.transform = `rotate(${mDeg}deg)`;
    hElement.style.transform = `rotate(${hDeg}deg)`;
}

// Correctly format the times that have a value less than 10
function fixZero(time) {
    return time < 10 ? `0${time}` : time;
}

setInterval(updateClock, 1000);
updateClock();
