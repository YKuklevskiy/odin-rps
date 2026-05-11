function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3);
    switch (choice) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
        default:
            return "error";
    }
}

function getHumanChoice() {
    let choice = prompt("Choose a hand (rock / paper / scissors):");
    return choice.trim().toLowerCase();
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

const updateScoreEvent = (winner) => {
    return new CustomEvent("updatescore", {
        bubbles: true, 
        detail: {winner: winner}
    });
};

function addRoundMessage(message) {
    const roundResultsContainer = document.getElementById("round-results");
    const round = document.createElement("p");
    round.textContent = message;
    roundResultsContainer.insertBefore(round, roundResultsContainer.childNodes[0]);
}

let computerScore = 0;
let humanScore = 0;

function playRound(computerChoice, humanChoice) {
    humanChoice = humanChoice.toLowerCase();

    if (computerChoice === humanChoice) {
        addRoundMessage(`Both chose ${capitalize(humanChoice)}! Round draw.`);
        return "draw";
    }

    let humanWon;
    switch (humanChoice) {
        case "rock":
            humanWon = computerChoice === "scissors";
            break;
        case "paper":
            humanWon = computerChoice === "rock";
            break;
        case "scissors":
            humanWon = computerChoice === "paper";
            break;
        default:
            console.log("ERROR: unknown human choice");
            return;
    }
    
    if (humanWon) {
        addRoundMessage(`You win! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}`);
        humanScore++;
        document.dispatchEvent(updateScoreEvent("human"));
    }
    else {
        addRoundMessage(`You lose! ${capitalize(humanChoice)} loses to ${capitalize(computerChoice)}`);
        computerScore++;
        document.dispatchEvent(updateScoreEvent("computer"));
    }

    return "score";
}

function updateScoreboard() {
    const humanScoreText = document.getElementById("human-score");
    const computerScoreText = document.getElementById("computer-score");
    humanScoreText.textContent = humanScore;
    computerScoreText.textContent = computerScore;
}

function restartGame() {
    humanScore = 0;
    computerScore = 0;
    updateScoreboard();

    const roundResults = document.getElementById("round-results");
    while(roundResults.childNodes.length > 0) {
        roundResults.removeChild(roundResults.childNodes[0]);
    }
}

// logic
const choiceContainer = document.querySelector(".choice-container");
choiceContainer.addEventListener("click", function(event) {
    const avaliableChoices = ["rock", "paper", "scissors"];
    const choice = event.target.id;
    
    // event bubbles to container object, not needed
    if(!avaliableChoices.includes(choice)) {
        event.stopPropagation();
        return;
    }

    playRound(getComputerChoice(), choice);
});

document.addEventListener("updatescore", function(event) {
    updateScoreboard();
    console.log(event.detail);
});

// for testing
addRoundMessage("jesajejs");
addRoundMessage("jesajejs");
addRoundMessage("jesajejs");

document.addEventListener("updatescore", () => {
    if(computerScore >= 3 || humanScore >= 3)
    {
        const winResult = humanScore > computerScore ? 'won' : 'lost';
        const finalMessage = `You ${winResult} the game! Score: ${humanScore}:${computerScore}`;
        addRoundMessage(finalMessage);
        alert(finalMessage);
        restartGame();
    }
})