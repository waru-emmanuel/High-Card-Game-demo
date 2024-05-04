// Define difficulty levels with corresponding high scores
const Difficulty = {
    EASY: { level: 'easy', highScore: 7 },
    MEDIUM: { level: 'medium', highScore: 9 },
    HARD: { level: 'hard', highScore: 11 }
};

// Set default difficulty
let difficulty = Difficulty.EASY;

// Function to set difficulty based on user selection
function setDifficulty() {
    const difficultySelect = document.getElementById('difficulty');
    difficulty = Difficulty[difficultySelect.value.toUpperCase()];

}

// Event listener for difficulty dropdown change
document.getElementById('difficulty').addEventListener('change', setDifficulty);



// Default
let userScore, aiScore, user_card, ai_card, userNumber, aiNumber, shuffleLimit, highScore;

// Initialize scores and other variables based on the default difficulty
function initializeGame() {
    userScore = 0;
    aiScore = 0;
    shuffleLimit = 3;
    highScore = difficulty.highScore;
    document.getElementById("btn-hold").disabled = true;

    // Reset HTML scores & texts
    document.querySelector("#score-0").textContent = userScore;
    document.querySelector("#score-1").textContent = aiScore;
    document.getElementById("player-title-0").textContent = "Player";
    document.getElementById("player-title-1").textContent = "Computer";

    // Concile all users' cards
    user_card = document.getElementById("player-card-0");
    user_card.src = 'img/PNG/card_back.png';
    ai_card = document.getElementById("player-card-1");
    ai_card.src = 'img/PNG/card_back.png';

    // Ensure shuffle button is enabled
    document.getElementById("btn-shuffle").disabled = false;
}

// Initialize game when page loads
initializeGame();

// Event listener for New Game button
document.querySelector('#btn-new').addEventListener('click', () => {
    initializeGame(); // Reset the game
});

// Shuffle
document.querySelector('#btn-shuffle').addEventListener('click', () => {
    if (userScore != highScore && aiScore != highScore) {
        // Random number
        userNumber = Math.floor(Math.random() * 13) + 1;

        // Hide previous AI card
        ai_card.src = 'img/PNG/card_back.png';

        // Display result with animation
        if (shuffleLimit > 0) {
            user_card = document.getElementById("player-card-0");
            user_card.src = 'img/PNG/card-back.png';
            user_card.style.animation = 'flipInX 0.0s backwards'; // Add animation class
            setTimeout(() => {
                user_card.src = 'img/PNG/card-' + userNumber + '.png';
                user_card.style.animation = 'flipOutX 0.0s backwards'; // Add animation class
            }, 0);
        }

        // Update shuffle limit
        shuffleLimit -= 1;

        // Enable Hold button
        document.getElementById("btn-hold").disabled = false;

        // Set difficulty
        setDifficulty();
        adjustAIBehavior();
    }
});



// Hold
function hold() {
    if (userScore != highScore && aiScore != highScore) {
        // AI random number
        aiNumber = Math.floor(Math.random() * 13) + 1;

        // Display AI's card with animation
        ai_card = document.getElementById("player-card-1");
        ai_card.src = 'img/PNG/card-back.png';
        ai_card.style.animation = 'flipInX 0.0s backwards'; // Add animation class
        setTimeout(() => {
            ai_card.src = 'img/PNG/card-' + aiNumber + '.png';
            ai_card.style.animation = 'flipOutX 0.0s backwards'; // Add animation class
        }, 0);

        // Compare results
        if (userNumber > aiNumber) {
            userScore += 1;
            document.getElementById("player-title-0").textContent = "Winner";
            document.querySelector("#score-0").textContent = userScore;
        } else if (userNumber < aiNumber) {
            aiScore += 1;
            document.getElementById("player-title-1").textContent = "Winner";
            document.querySelector("#score-1").textContent = aiScore;
        }
        shuffleLimit = 3;
        document.getElementById("btn-hold").disabled = true;

        // Reset player titles unless one of them is a champion
        if (userScore < highScore && aiScore < highScore) {
            setTimeout(() => {
                document.getElementById("player-title-0").textContent = "Player";
                document.getElementById("player-title-1").textContent = "Computer";
            }, 1000);
        }

        // Check if the game ends
        if (userScore === highScore || aiScore === highScore) {
            endGame();
        }
    }
}


document.getElementById('btn-hold').addEventListener('click', hold);

// Function to end the game
function endGame() {
    if (userScore === highScore) {
        document.getElementById("player-title-0").textContent = "Champion";
        playSound('winning-sound'); // Play winning sound effect
    } else if (aiScore === highScore) {
        document.getElementById("player-title-1").textContent = "Champion";
        playSound('lose-sound'); // Play losing sound effect
    }
    document.getElementById("btn-shuffle").disabled = true;
    document.getElementById("btn-hold").disabled = true;
}

// Function to play sound effect
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0; // Reset sound to start
    sound.play(); // Play sound
}
