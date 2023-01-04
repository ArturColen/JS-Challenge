// Initial data
let areas = {
    a: null,
    b: null,
    c: null
};

// Drag an item
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

// Check and drop the item into the corresponding area
document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
});

// Return with the item to the neutral area
document.querySelector('#neutral-area').addEventListener('dragover', dragOverNeutral);
document.querySelector('#neutral-area').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('#neutral-area').addEventListener('drop', dropNeutral);

// Effect when dragging an item to the area to be filled
function dragStart(e) {
    e.currentTarget.classList.add('dragging');
}

function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

// Check if the space to be filled is empty
function dragOver(e) {
    if (e.currentTarget.querySelector('.item') === null) {
        e.preventDefault();
        e.currentTarget.classList.add('hover');
    }
}

function dragLeave(e) {
    e.currentTarget.classList.remove('hover');
}

// Drop the item in one of the fill areas
function drop(e) {
    e.currentTarget.classList.remove('hover');

    if (e.currentTarget.querySelector('.item') === null) {
        let dragItem = document.querySelector('.item.dragging');
        e.currentTarget.appendChild(dragItem);
        updateAreas();
    }
}

// Effect when dragging an item to the neutral area
function dragOverNeutral(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover');
}

// Drop the item in the neutral area
function dropNeutral(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem);
    updateAreas();
}

// Check the position of each item in the filler areas
function updateAreas() {
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        if (area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML;
        }
        else {
            areas[name] = null;
        }
    });

    if (areas.a === '1' && areas.b === '2' && areas.c === '3') {
        document.querySelector('#areas').classList.add('correct');
    }
    else {
        document.querySelector('#areas').classList.remove('correct');
    }
}