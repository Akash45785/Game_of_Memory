const cards = document.querySelectorAll('.memory-card');
const moves = document.getElementById("moves-count");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let movesCount =  0 ;

function flipcard() {
  if(lockBoard)
  return ;
  if( this === firstCard)
  return ;
  this.classList.toggle('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    movesCounter();
    return;
  }
  secondCard = this;
  movesCounter();
  checkForMatch();
}


function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework

  isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipcard);
  secondCard.removeEventListener('click', flipcard);
  resetBoard();
}

function unFlipCards() {
  lockBoard  = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard(){
  [hasFlippedCard , lockBoard] = [false , false];
  [firstCard , secondCard] = [null , null ];
}

function movesCounter() {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

function refresh(){
  window.location.reload("Refresh")
}

( function shuffle() {
  cards.forEach(card=>{
    let randomPos = Math.floor( Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipcard));
