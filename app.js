// get elements
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const name0 = document.querySelector('.player--0 .name');
const name1 = document.querySelector('.player--1 .name');
const diceImg = document.querySelector('.dice-img');
const newGame = document.querySelector('.new-game');
const rollDice = document.querySelector('.roll-dice');
const hold = document.querySelector('.hold');

// initializations
score0.textContent = 0;
score1.textContent = 0;
diceImg.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;


// rolling dice function
const rollingDiceHandler = () => {
    // generate a random dice
    const randomDice = Math.trunc(Math.random() * 6) + 1;

    // display
    diceImg.classList.remove('hidden');
    diceImg.src = `./assets/images/dice-${randomDice}.png`;

    // checking is 0 or not: if true change player if false add to current score
    if (randomDice !== 1) {
        // add to current score
        currentScore += randomDice;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    } else {
        switchPlayer();
    }
}

rollDice.addEventListener('click', rollingDiceHandler);


// hold handler function
const holdHandler = () => {
    // if score < 100 => add current to score and change player
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
    
    // if score >= 100 => this player is winner
    if (scores[activePlayer] >= 100) {
        console.log(document.querySelector(`.player--${activePlayer}`));
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        document.querySelector(`.player--${activePlayer} .name`).classList.add('name--winner');
        document.querySelector(`.winner--${activePlayer}`).classList.replace('hidden' , 'winner--winner');
        rollDice.setAttribute('disabled' , 'false');
        hold.setAttribute('disabled' , 'false');
    }
    else {
        switchPlayer();
    }

}

hold.addEventListener('click', holdHandler);

// new game handler
newGame.addEventListener("click" , () => {
    window.location.reload();
})


// switch player function (helper function)
function switchPlayer() {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
    name0.classList.toggle('name--active');
    name1.classList.toggle('name--active');
}