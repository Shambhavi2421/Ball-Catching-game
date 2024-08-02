const basket = document.querySelector('.basket');
const ball = document.querySelector('.ball');
const gameContainer = document.querySelector('.game-container');

let basketLeft = 50;
let basketWidth = basket.offsetWidth;
let ballSpeed = 2;

function moveBasket(event) {
    const containerRect = gameContainer.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();
    const containerLeft = containerRect.left;

    if (event.key === 'ArrowLeft' && basketLeft > 0) {
        basketLeft -= 10;
    } else if (event.key === 'ArrowRight' && basketLeft < containerRect.width - basketWidth) {
        basketLeft += 10;
    }

    basket.style.left = `${basketLeft}px`;
}

function dropBall() {
    const ballRect = ball.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    let ballTop = ballRect.top - gameContainer.getBoundingClientRect().top;
    let ballLeft = ballRect.left - gameContainer.getBoundingClientRect().left;

    if (ballTop + ballSpeed >= gameContainer.offsetHeight - ball.offsetHeight) {
        ballTop = 0;
        ballLeft = Math.random() * (gameContainer.offsetWidth - ball.offsetWidth);
    } else {
        ballTop += ballSpeed;
    }

    ball.style.top = `${ballTop}px`;
    ball.style.left = `${ballLeft}px`;

    if (
        ballTop + ball.offsetHeight >= basketRect.top - gameContainer.getBoundingClientRect().top &&
        ballLeft + ball.offsetWidth >= basketRect.left - gameContainer.getBoundingClientRect().left &&
        ballLeft <= basketRect.right - gameContainer.getBoundingClientRect().left
    ) {
        alert('Caught the ball!');
        ballTop = 0;
        ballLeft = Math.random() * (gameContainer.offsetWidth - ball.offsetWidth);
    }
}

document.addEventListener('keydown', moveBasket);
setInterval(dropBall, 20);
