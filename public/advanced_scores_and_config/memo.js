turned1 = undefined;
turned2 = undefined;
imageFileNameTemplate = undefined;
numberOfPairs = undefined;
'use strict';

function cardClicked(card) {
    turn(card);
    if(turned1 === undefined) {
        turned1 = card;
    }
    else {
        if(turned2 === undefined) {
            var pairCard = getPair(turned1);
            if(card.value === pairCard.value) {
                if(pairCard.hasBeenTurned) {
                    increaseCounter('cleverHits');
                    increaseAccumulatedCleverness();
                }
                else {
                    increaseCounter('luckyHits');
                    increaseAccumulatedLuck(turned1);
                }
                removePair(turned1, card, 1000);
                turned1 = undefined;
                turned2 = undefined;
        }
            else {
                if(!turned1.hasBeenTurned && !pairCard.hasBeenTurned && !card.hasBeenTurned) {
                    increaseCounter('unluckyTries');
                }
                else {
                    increaseCounter('mistakes');
                }
                turned2 = card;
            }
        }
        else {
            turnDown(turned1);
            turnDown(turned2);
            turned1 = card;
            turned2 = undefined;
        }
    }
}

function getPair(card) {
    console.log('getPair start. Card value: ' + card.value);
    var cardHolder = document.getElementById('buttonHolder');
    cards = cardHolder.getElementsByTagName('button');
    for(var i = 0; i < cards.length; i++) {
        console.log(i + ' th. value: ' + cards[i].value);
        if(cards[i] === card) {
            // this is the same card
            console.log('same card');
        }
        else {
            if(cards[i].value === card.value) {
                console.log('value matches');
                return cards[i];
            }
        }
    }
}

function countOtherSeenCards(card) {
    console.log('countOtherSeenCards start');
    var cardHolder = document.getElementById('buttonHolder');
    cards = cardHolder.getElementsByTagName('button');
    var counter = 0;
    for(var i = 0; i < cards.length; i++) {
        if(cards[i] === card) {
            // this is the same card
            console.log('same card');
        }
        else {
            console.log(i + ' th. card seen?: ' + cards[i].hasBeenTurned);
            if(cards[i].hasBeenTurned) {
                counter++;
            }
        }
    }
    console.log('seen cards: ' + counter);
    return counter;
}

function increaseCounter(counterId) {
    var counter = document.getElementById(counterId);
    counter.textContent = parseInt(counter.textContent)+1;
}

function increaseAccumulatedLuck(card) {
    var numberOfOtherSeenCards = countOtherSeenCards(card);
    var numberOfCards = numberOfPairs * 2;
    var luckFactor = numberOfCards - numberOfOtherSeenCards - 1;
    console.log('luck factor: ' + luckFactor);
    var accumulatedLuck = parseInt(document.getElementById('accumulatedLuck').textContent);
    if(accumulatedLuck === 0) {
        accumulatedLuck = 1;
    }
    accumulatedLuck = accumulatedLuck*luckFactor;
    if(accumulatedLuck === 0) {
        accumulatedLuck = 1;
    }
    document.getElementById('accumulatedLuck').textContent = accumulatedLuck;
}

function increaseAccumulatedCleverness() {
    var luckyHits = parseInt(document.getElementById('luckyHits').textContent);
    var cleverHits = parseInt(document.getElementById('cleverHits').textContent);
    var cleverness = (numberOfPairs - luckyHits - cleverHits)*2 + 1;
    if(cleverness === 1) {
        cleverness = 0;
    }
    accumulatedClevernessCounter = document.getElementById('accumulatedCleverness');
    accumulatedClevernessCounter.textContent = parseInt(accumulatedClevernessCounter.textContent) + cleverness;
}

function removePair(card1, card2, delay) {
    card1.hasBeenTurned = true;
    card2.hasBeenTurned = true;
    setTimeout(function() {
        card1.textContent = 'X';
        card2.textContent = 'X';
        if(! document.getElementById('cheatModeCheckBox').checked) {
            card1.removeAttribute('style');
            card2.removeAttribute('style');
        }
    }, delay);
}

function turn(card) {

    if(! document.getElementById('cheatModeCheckBox').checked) {
        card.textContent = "";
        var fileName = imageFileNameTemplate.replace('{}', card.value);
        card.setAttribute('style', "background-image: url('" + fileName + "')");
    }
    
    card.disabled = true;
}

function turnDown(card) {
    card.hasBeenTurned = true;

    if(! document.getElementById('cheatModeCheckBox').checked) {
        card.textContent = '?';
        card.removeAttribute('style');
    }
    
    card.disabled = false;
}

function init(imageFileNameTemplateParam) {
    imageFileNameTemplate = imageFileNameTemplateParam;
    numberOfPairs = parseInt(document.getElementById('numberOfPairs').textContent);
    //numberOfPairs = numberOfPairsParam;
    //document.getElementById('numberOfPairs').textContent = numberOfPairs;
    document.getElementById('cleverHits').textContent = 0;
    document.getElementById('accumulatedCleverness').textContent = 0;
    document.getElementById('luckyHits').textContent = 0;
    document.getElementById('accumulatedLuck').textContent = 0;
    document.getElementById('unluckyTries').textContent = 0;
    document.getElementById('mistakes').textContent = 0;
    var numbers = [];
    for(var i = 0; i < numberOfPairs; i++) {
        numbers.push(i);
        numbers.push(i);
    }
    shuffle(numbers);
    var buttonHolder = document.getElementById('buttonHolder');
    var button = buttonHolder.getElementsByTagName('button')[0];
    var templateButton = button.cloneNode(true);
    templateButton.textContent="?";
    templateButton.removeAttribute('style');
    templateButton.disabled = false;
    while (buttonHolder.firstChild) buttonHolder.removeChild(buttonHolder.firstChild);
    for(var i = 0; i < numbers.length; i++) {
        var clonedButton = templateButton.cloneNode(true);

        //clonedButton.textContent = '?';
        //clonedButton.textContent = numbers[i];

        clonedButton.setAttribute('value', numbers[i]);
        //clonedButton.setAttribute('hasBeenTurned', false);
        buttonHolder.appendChild(clonedButton);
    }
    //button.remove();
}

function changeCheatMode() {
    if(document.getElementById('cheatModeCheckBox').checked) {
        console.log('start cheating');
        var cardHolder = document.getElementById('buttonHolder');
        cards = cardHolder.getElementsByTagName('button');
        for(var i = 0; i < cards.length; i++) {
            var fileName = imageFileNameTemplate.replace('{}', cards[i].value);
            cards[i].setAttribute('style', "background-image: url('" + fileName + "')");
        }
    }
    else {
        console.log('stop cheating');
        var cardHolder = document.getElementById('buttonHolder');
        cards = cardHolder.getElementsByTagName('button');
        for(var i = 0; i < cards.length; i++) {
            if(cards[i] != turned1 && cards[i] != turned2) {
                cards[i].removeAttribute('style');
            }
        }
    }
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
