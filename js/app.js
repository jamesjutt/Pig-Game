'use strict()';
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. 
Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. 
After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. 
After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if(gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        lastDice = dice1;

        // 2. Display the results
        var diceDOM = document.querySelector("#dice-1");
        var dice2DOM = document.querySelector("#dice-2");
        diceDOM.style.display = "block";
        dice2DOM.style.display = "block";
        diceDOM.src = "images/dice-" + dice1 + ".png";
        dice2DOM.src = "images/dice-" + dice2 + ".png";
        
        // 3. Update the round score IF the rolled number was NOT a 1 or lastDice !== 6 and dice-1 !== 6
        if (lastDice === 6 && dice1 === 6) {
            scores[activePlayer] = 0;
            document.getElementById("score-" + activePlayer).textContent = 0;
            nextPlayer();
        } else if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1;
            roundScore += dice2; 
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        lastDice = dice1;        
    }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        var final = document.getElementById("final-score");
        if (final.value === "") {
            final.value = 100;
        }
        // Add current score to global score
        scores[activePlayer] += roundScore;
        // Update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        // Check if player won the game
        if (scores[activePlayer] >= final.value) {
            document.getElementById("name-" + activePlayer).textContent = "Winner!";
            document.querySelector("#dice-1").style.display = "none";
            document.querySelector("#dice-2").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            // Next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector("#dice-1").style.display = "none";
    document.querySelector("#dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    document.querySelector("#dice-1").style.display = "none";
    document.querySelector("#dice-2").style.display = "none";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("active");
}
