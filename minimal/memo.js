'use strict';

window.turned1 = undefined;
window.turned2 = undefined;

function cardClicked(card) {
    if(window.turned1 === undefined) {
        turn(card);
        window.turned1 = card;
    }
    else {
        if(window.turned2 === undefined) {
            turn(card);
            if(card.value === window.turned1.value) {
                var score = document.getElementById('score');
                score.textContent = parseInt(score.textContent)+1;
                var turned1 = window.turned1;
                setTimeout(function() {
                    card.textContent = 'X'
                    turned1.textContent = 'X';
                }, 1000);
                window.turned1 = undefined;
            }
            else {
                window.turned2 = card;
            }
        }
        else {
            turnDown(window.turned1);
            turnDown(window.turned2);
            turn(card);
            window.turned1 = card;
            window.turned2 = undefined;
        }
    }
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
