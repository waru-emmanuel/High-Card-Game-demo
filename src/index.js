// Define difficulty levels
const Difficulty = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard'
};

// Set default difficulty
let difficulty = Difficulty.MEDIUM;

// Default
let userScore, aiScore, user_card, ai_card, userNumber, aiNumber, shuffleLimit, highScore;

highScore = 5;
shuffleLimit = 3;
userScore = 0;
aiScore = 0;

// Initialize
document.getElementById("btn-new").addEventListener('click', () => {
    // Reset scores & shuffle limit
    shuffleLimit = 3;
    userScore = 0;
    aiScore = 0;

    // Reset HTML scores & texts
    document.querySelector("#score-0").textContent = userScore;
    document.querySelector("#score-1").textContent = aiScore;
    document.getElementById("player-title-0").textContent = "Player";
    document.getElementById("player-title-1").textContent = "Computer";

    // Reset all cards to back
    user_card = document.getElementById("player-card-0");
    user_card.src = 'img/PNG/card_back.png';
    ai_card = document.getElementById("player-card-1");
    ai_card.src = 'img/PNG/card_back.png';

    // Enable draw button
    document.getElementById("btn-shuffle").disabled = false;

    // Set default difficulty
    difficulty = Difficulty.MEDIUM;
});

// Shuffle
document.getElementById("btn-shuffle").addEventListener('click', () => {
    if (userScore < highScore && aiScore < highScore) {
        // Generate random number for user
        userNumber = Math.floor(Math.random() * 13) + 1;

        // Display user's card
        user_card = document.getElementById("player-card-0");
        user_card.src = 'img/PNG/card-' + userNumber + '.png';

        // Update shuffle limit
        shuffleLimit--;

        // Enable Hold button
        document.getElementById("btn-hold").disabled = false;

        // Set difficulty
        setDifficulty();
    }
});

// Hold
document.getElementById("btn-hold").addEventListener('click', () => {
    if (userScore < highScore && aiScore < highScore) {
        // Generate random number for AI
        aiNumber = Math.floor(Math.random() * 13) + 1;

        // Display AI's card
        ai_card = document.getElementById("player-card-1");
        ai_card.src = 'img/PNG/card-' + aiNumber + '.png';

        // Compare cards and update scores
        if (userNumber > aiNumber) {
            userScore++;
            document.getElementById("player-title-0").textContent = "Winner";
            document.querySelector("#score-0").textContent = userScore;
        } else if (userNumber < aiNumber) {
            aiScore++;
            document.getElementById("player-title-1").textContent = "Winner";
            document.querySelector("#score-1").textContent = aiScore;
        }

        // Disable Hold button
        document.getElementById("btn-hold").disabled = true;

        // Check for end of game
        if (userScore === highScore || aiScore === highScore) {
            endGame();
        }
    }
});

// Function to adjust AI behavior based on difficulty
function setDifficulty() {
    // Adjust AI behavior based on the selected difficulty
    switch (difficulty) {
        case Difficulty.EASY:
            // Implement easy AI behavior
            break;
        case Difficulty.MEDIUM:
            // Implement medium AI behavior
            break;
        case Difficulty.HARD:
            // Implement hard AI behavior
            break;
        default:
            break;
    }
}

// Function to end the game
function endGame() {
    if (userScore === highScore) {
        document.getElementById("player-title-0").textContent = "Champion";
    } else if (aiScore === highScore) {
        document.getElementById("player-title-1").textContent = "Champion";
    }
    document.getElementById("btn-shuffle").disabled = true;
    document.getElementById("btn-hold").disabled = true;
}
