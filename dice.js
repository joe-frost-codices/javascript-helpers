(function() {

    const maxScore = 100;
    const unluckyNumber = 1;

    let gameOver = false;

    const playerOne = {
        id: "p1",
        name: "Player One",
        score: 0,
        gamesWon: 0,
        rollScore: []
    };

    const playerTwo = {
        id: "p2",
        name: "Player Two",
        score: 0,
        gamesWon: 0,
        rollScore: []
    };

    const players = [playerOne, playerTwo];
    let currentPlayer = 0;
    let currentDiceTotal = 0;    

    const diceRollDisplay = document.querySelector("#dice-roll");
    const playerOneContainer = document.getElementById("player-one");
    const playerTwoContainer = document.getElementById("player-two");
    const winPanel = document.getElementById("win-panel");
    const winnerDisplay = document.getElementById("winner-display");
    const diceRollTotalContainer = document.getElementById("dice-roll-total");

    setupEventListeners();
    
    initGame();

    function initGame() {
        currentPlayer = 0;
        currentDiceTotal = 0;
        gameOver = false;
        playerOne.score = 0;
        playerTwo.score = 0;
        playerOne.rollScore = [];
        playerTwo.rollScore = [];
        document.getElementById("p1-score").textContent = "0";
        document.getElementById("p2-score").textContent = "0";
        diceRollDisplay.textContent = 0;
        diceRollTotalContainer.textContent = 0;
        if (!winPanel.classList.contains("panel-hide")) {
            winPanel.classList.add("panel-hide");
        }
        if (!playerOneContainer.classList.contains("panel-active")) {
            playerOneContainer.classList.add("panel-active");
        }
        if (playerTwoContainer.classList.contains("panel-active")) {
            playerTwoContainer.classList.remove("panel-active");
        }
    }
    
    function endGo(player) {
        if (!gameOver) {
            if (player.id === players[currentPlayer].id) {
                addDiceTotalToPlayerScore();
                checkForWinner();
                nextPlayer();
            }
        }
    }

    function addDiceTotalToPlayerScore() {
        if (!gameOver) {
            players[currentPlayer].score += currentDiceTotal;
            document.getElementById(players[currentPlayer].id + "-score").textContent = players[currentPlayer].score;
        }
    }

    function checkForWinner() {
        if (!gameOver) {
            if (players[currentPlayer].score >= maxScore) {
                gameOver = true;
                players[currentPlayer].gamesWon ++;
                document.getElementById(players[currentPlayer].id + "-games-won").textContent = players[currentPlayer].gamesWon;
                winPanel.classList.toggle('panel-hide');
                winnerDisplay.textContent=`WINNER IS ${players[currentPlayer].name}!`;
                winPanel.classList.toggle('active');
            }
        }           
    }

    function nextPlayer() {
        if (!gameOver) {
            resetDiceTotal();
            resetRollScore();
            togglePanel();
        }
    }

    function resetDiceTotal() {
        if (!gameOver) {
            currentDiceTotal = 0;
            diceRollTotalContainer.innerText = currentDiceTotal;
        }
    }

    function resetRollScore() {
        playerOne.rollScore = [];
        playerTwo.rollScore = [];
    }

    function togglePanel() {
        currentPlayer === 0 ? currentPlayer=1 : false;
        playerOneContainer.classList.toggle("panel-active");
        playerTwoContainer.classList.toggle("panel-active");
    }

    function diceRoll(player) {
        if (!gameOver) {
            if (player.id === players[currentPlayer].id) {
                let newRoll = Math.floor(Math.random() * (6) + 1);
                currentDiceTotal += newRoll;
                diceRollDisplay.textContent = newRoll;
                diceRollTotalContainer.textContent = currentDiceTotal;
                player.rollScore.push(newRoll);
                if (player.rollScore.length > 0) {
                    if (player.rollScore[player.rollScore.length-1] + player.rollScore[player.rollScore.length-2] === 12) {
                        player.score = 0;
                        document.getElementById(players[currentPlayer].id + "-score").textContent = players[currentPlayer].score;
                        nextPlayer();
                    }
                }
                if (newRoll === unluckyNumber) {
                    nextPlayer();
                }
            }
        }
    }

    function setupEventListeners() {
        document.getElementById("roll-player-one").addEventListener("click", () => {diceRoll(playerOne)});
        document.getElementById("end-go-player-one").addEventListener("click", () => {endGo(playerOne)});
        document.getElementById("roll-player-two").addEventListener("click", () => {diceRoll(playerTwo)});
        document.getElementById("end-go-player-two").addEventListener("click", () => {endGo(playerTwo)});
        document.getElementById("new-game").addEventListener("click", () => {initGame();});
    }
    
})();
