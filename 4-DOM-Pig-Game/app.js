/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,
    roundScore,
    activePlayer,
    dice,
    diceSecond,
    gamePlaying,
    lastDice,
    lastDiceSecond,
    gameWinnerScore,
    gameWinnerScoreDOM;

init();

var button = document.querySelector(".btn-roll").addEventListener('click', function(){
    if (gamePlaying) {
        var diceDOM = document.querySelector(".dice"),
            diceSecondDOM = document.querySelector(".diceSecond");       

        // 1. Random number
        dice = Math.floor(6 * Math.random()) + 1;
        diceSecond = Math.floor(6 * Math.random()) + 1;
        
    
        // 2. Display the result
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        diceSecondDOM.style.display = 'block';
        diceSecondDOM.src = 'dice-' + diceSecond + '.png';        
    
        // 3. Update the round IF the rolled was not a 1
        if (dice === 6  && lastDice === 6 ) {

            // Next Player
            roundScore = 0;
            document.getElementById("current-" + activePlayer).innerHTML = roundScore;
            scores[activePlayer] = 0;
            document.getElementById("score-" + activePlayer).innerHTML = scores[activePlayer];
            next_player();

        } else if (dice !== 1 && diceSecond !== 1) {
            // Add score
            roundScore += dice + diceSecond;
            document.getElementById("current-" + activePlayer).innerHTML = roundScore;
             
        } else {
            // Next Player
            roundScore = 0;
            document.getElementById("current-" + activePlayer).innerHTML = roundScore;
            // document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            
            next_player();
            
            document.querySelector(".dice").style.display = 'none';
            document.querySelector(".diceSecond").style.display = 'none';
        }

        lastDice = dice;
        lastDiceSecond = diceSecond;
    }

});

document.querySelector(".btn-hold").addEventListener('click', function(){
    
    if (gamePlaying) {
        // add current score to the global scope
        scores[activePlayer] += roundScore;
        roundScore = 0;
        document.getElementById("current-" + activePlayer).innerHTML = roundScore;    

        // update the UI
        document.getElementById("score-" + activePlayer).innerHTML = scores[activePlayer]

        // check if the player won the game
        if (scores[activePlayer] >= gameWinnerScore ) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner !";
            document.querySelector(".dice").style.display = 'none';
            document.querySelector(".diceSecond").style.display = 'none';
            document.querySelector(".player-" + activePlayer + "-panel").classList.add('winner');
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove('active');
            gamePlaying = false;
        } else {
            next_player();
        }
    }

    

});

function next_player(){
    document.querySelector(".player-" + activePlayer + "-panel").classList.toggle("active");
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");

}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    gameWinnerScore = 100;

    document.querySelector(".dice").style.display = 'none';
    document.querySelector(".diceSecond").style.display = 'none';

    document.getElementById("score-0").textContent = '0';
    document.getElementById("score-1").textContent = '0';
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';
    document.querySelector("#name-0").textContent = "Player 1 !";
    document.querySelector("#name-1").textContent = "Player 2 !";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");    
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");    
}

// dice = Math.floor(6 * Math.random()) + 1;
// console.log(dice);

// document.querySelector("#current-" + activePlayer).textContent = dice;
// document.querySelector("#current-" + activePlayer).innerHTML = '<em>' + dice + '</em>';
// var x = document.querySelector("#score-0").textContent;
// console.log(x);

document.querySelector(".btn-new").addEventListener("click", init);

gameWinnerScoreDOM = document.getElementById("game_winner_score");

gameWinnerScoreDOM.addEventListener("keyup", function() {
    var gameWinnerScoreInt = parseInt(gameWinnerScoreDOM.value);
    if ( gameWinnerScoreInt !== NaN ) {
        gameWinnerScore = gameWinnerScoreInt;
    }
});