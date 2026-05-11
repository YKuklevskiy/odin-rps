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

let computerScore = 0;
let humanScore = 0;

function playRound(computerChoice, humanChoice) {
    humanChoice = humanChoice.toLowerCase();

    if (computerChoice === humanChoice) {
        console.log(`Both chose ${capitalize(humanChoice)}! Round draw.`);
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
        console.log(`You win! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}`);
        humanScore++;
    }
    else {
        console.log(`You lose! ${capitalize(humanChoice)} loses to ${capitalize(computerChoice)}`);
        computerScore++;
    }
    return "score";
}

/*
function playGame() {
    for (let i = 0; i < 5; i++) {
        while(playRound(getComputerChoice(), getHumanChoice()) === "draw")
        {
            console.log("Replaying round...");
        }

        if (computerScore >= 3 || humanScore >= 3)
        {
            break;  
        }
    }
    
    const finalScoreMessage = humanScore > computerScore ? 'won' : 'lost';
    console.log(`You ${finalScoreMessage} the game! Score: ${humanScore}:${computerScore}`);
}

playGame();
*/