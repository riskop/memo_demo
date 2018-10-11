turned1 = undefined;
turned2 = undefined;
'use strict';

function cardClicked(card) {
    if(turned1 === undefined) {
        turn(card);
        turned1 = card;
    }
    else {
        if(turned2 === undefined) {
            turn(card);
            if(card.value === turned1.value) {
                increaseScore();
                removePair(turned1, card, 1000)
                turned1 = undefined;
            }
            else {
                turned2 = card;
            }
        }
        else {
            turnDown(turned1);
            turnDown(turned2);
            turn(card);
            turned1 = card;
            turned2 = undefined;
        }
    }
}

function increaseScore() {
    var score = document.getElementById('score');
    score.textContent = parseInt(score.textContent)+1;
}

function removePair(card1, card2, delay) {
    setTimeout(function() {
        card1.textContent = 'X'
        card2.textContent = 'X';
    }, delay);
}

function turn(card) {
    card.textContent = card.value;
    card.disabled = true;
}

function turnDown(card) {
    card.textContent = '?';
    card.disabled = false;
}

function init(numberOfPairs) {
    document.getElementById('pairs').textContent = numberOfPairs;
    var numbers = [];
    for(var i = 0; i < numberOfPairs; i++) {
        numbers.push(i);
        numbers.push(i);
    }
    shuffle(numbers);
    var buttonHolder = document.getElementById('buttonHolder');
    var button = buttonHolder.getElementsByTagName('button')[0];
    for(var i = 0; i < numbers.length; i++) {
        var clonedButton = button.cloneNode(true);
        clonedButton.textContent = '?';
        clonedButton.setAttribute('value', numbers[i]);
        buttonHolder.appendChild(clonedButton);
    }
    button.remove();
}

// Fisher - Yates shuffling
function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
