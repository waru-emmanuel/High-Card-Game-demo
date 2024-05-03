// Define difficulty levels
const Difficulty = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard'
};

// Set default difficulty
let difficulty = Difficulty.MEDIUM;

// Function to set difficulty based on user selection
function setDifficulty() {
    const difficultySelect = document.getElementById('difficulty');
    difficulty = difficultySelect.value;
}

// Event listener for difficulty dropdown change
document.getElementById('difficulty').addEventListener('change', setDifficulty);

// Function to adjust AI behavior based on difficulty
function adjustAIBehavior() {
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

// Default
let userScore, aiScore, user_card, ai_card, userNumber, aiNumber, shuffleLimit, highScore;

highScore = 7;
shuffleLimit = 3;
userScore = 0;
aiScore = 0;
document.getElementById("btn-hold").disabled = true;

// Initialize
document.querySelector('#btn-new').addEventListener('click', () => {
    // 1. Reset JS scores & shuffle limit.
    shuffleLimit = 3;
    userScore = 0;
    aiScore = 0;

    // 2. Reset HTML scores & texts.
    document.querySelector("#score-0").textContent = userScore;
    document.querySelector("#score-1").textContent = aiScore;
    document.getElementById("player-title-0").textContent = "Player";
    document.getElementById("player-title-1").textContent = "Computer";

    // 3. Concile all users' cards.
    user_card = document.getElementById("player-card-0");
    user_card.src = 'img/PNG/card_back.png';
    ai_card = document.getElementById("player-card-1");
    ai_card.src = 'img/PNG/card_back.png';

    // 4. Ensure shuffle button is enabled.
    document.getElementById("btn-shuffle").disabled = false;

    // Set default difficulty
    difficulty = Difficulty.MEDIUM;
});

// Shuffle
document.querySelector('#btn-shuffle').addEventListener('click', () => {
    if (userScore != highScore && aiScore != highScore) {
        // Random number
        userNumber = Math.floor(Math.random() * 13) + 1;

        // Display result with animation
        if (shuffleLimit > 0) {
            user_card = document.getElementById("player-card-0");
            user_card.src = 'img/PNG/card-back.png';
            user_card.style.animation = 'flipInX 0.5s forwards'; // Add animation class
            setTimeout(() => {
                user_card.src = 'img/PNG/card-' + userNumber + '.png';
                user_card.style.animation = 'flipOutX 0.5s forwards'; // Add animation class
            }, 500);
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
        ai_card.style.animation = 'flipInX 0.5s forwards'; // Add animation class
        setTimeout(() => {
            ai_card.src = 'img/PNG/card-' + aiNumber + '.png';
            ai_card.style.animation = 'flipOutX 0.5s forwards'; // Add animation class
        }, 500);

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
