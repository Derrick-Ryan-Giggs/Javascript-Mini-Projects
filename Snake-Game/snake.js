// Initializing variables for the game
const canvas = document.getElementById('game-canvas'); // Selecting the canvas element from the HTML
const ctx = canvas.getContext('2d'); // Getting the context for drawing on the canvas
const box = 20; // Size of each square in the grid (snake body part and food)
canvas.width = 400; // Set canvas width
canvas.height = 400; // Set canvas height

let snake = [{ x: 200, y: 200 }]; // Snake's initial position in the center of the canvas
let food = { x: 100, y: 100 }; // Initial position of the food
let direction ; // Initial direction of the snake
let score = 0; // Initial score

// Load the highest score from local storage
let highScore = localStorage.getItem('highScore') || 0;
document.getElementById('score').textContent = score;

// Function to draw the snake and the food
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw the snake
    snake.forEach(part => {
        ctx.fillStyle = 'green';
        ctx.fillRect(part.x, part.y, box, box);
    });

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);
}

// Function to update the snake's position
function updateSnake() {
    // Get the current head position of the snake
    const head = { x: snake[0].x, y: snake[0].y };

    // Move the snake's head in the current direction
    if (direction === 'RIGHT') head.x += box;
    if (direction === 'LEFT') head.x -= box;
    if (direction === 'UP') head.y -= box;
    if (direction === 'DOWN') head.y += box;

    // Check if the snake has eaten the food
    if (head.x === food.x && head.y === food.y) {
        score += 1; // Increase the score
        generateFood(); // Generate new food
    } else {
        snake.pop(); // Remove the last part of the snake if it hasn't eaten
    }

    // Add the new head position to the snake
    snake.unshift(head);

    // Check for collisions with the walls or itself
    if (
        head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height ||
        snake.slice(1).some(part => part.x === head.x && part.y === head.y)
    ) {
        resetGame(); // Reset the game if collision occurs
    }
}

// Function to generate food at a random position
function generateFood() {
    food = {
        x: Math.floor(Math.random()* (canvas.width / box))* box,
        y: Math.floor(Math.random()* (canvas.height / box))* box
    };
}

// Function to reset the game
function resetGame() {
    if (score > highScore) {
        highScore = score; // Update the high score
        localStorage.setItem('highScore', highScore); // Save it to local storage
    }
    alert(`Game Over! Your score: ${score}`);
    snake = [{ x: 200, y: 200 }]; // Reset the snake to the initial position
    direction = 'RIGHT'; // Reset the direction
    score = 0; // Reset the score
}

// Event listener for key presses to change direction
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Main game loop
function gameLoop() {
    updateSnake(); // Update the snake's position
    draw(); // Draw the snake and the food
    setTimeout(gameLoop, 100); // Repeat the game loop every 100ms
}

generateFood(); // Generate the initial food position
gameLoop(); // Start the game loop
