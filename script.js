var currTurn = "x";
var board = document.querySelector(".board");
var text = document.querySelector(".text");
var turns = document.querySelector(".turns");
var cells = document.querySelectorAll(".cell");
var restart = document.getElementById("restart");

const winCombs = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((element) => {
  element.addEventListener("click", doThis, { once: true }); //means on this cell, fire this event only once. So once clicked, it won't be clicked again.
});

restart.addEventListener("click", (e) => {
  location.reload();
  return false;
});

function doThis(e) {
  markTheCell(e.target);
  if (isCurrWinner()) {
    gameOver(false);
  } else if (isDraw()) {
    gameOver(true);
  } else {
    changeTurn();
    changeBoard();
  }
}

function markTheCell(element) {
  if (currTurn == "x") {
    element.innerHTML = "X";
    element.classList.add("x");
  } else {
    element.innerHTML = "O";
    element.classList.add("o");
  }
}

function isCurrWinner() {
  return winCombs.some((currComb) => {
    return currComb.every((cellIndex) => {
      return cells[cellIndex].classList.contains(currTurn);
    });
  });
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
  // var num = 0;
  // cells.forEach((element) => {
  //   if (element.classList.contains("x") || element.classList.contains("o"))
  //     num++;
  // });
  // if (num == 9) return true;
  // return false;
}

function gameOver(draw) {
  if (draw) {
    text.innerText = "Draw!";
  } else {
    text.innerText = "Player " + currTurn.toUpperCase() + " Wins!";
  }
  document.querySelector(".finish").classList.add("dark");
}

function changeTurn() {
  turns.classList.remove(currTurn);
  currTurn == "x" ? (currTurn = "o") : (currTurn = "x");
  turns.classList.add(currTurn);
  turns.innerText = "Player " + currTurn.toUpperCase() + "'s turn";
}

function changeBoard() {
  cells.forEach((element) => {
    if (element.classList.length == 1)
      element.innerHTML = currTurn.toUpperCase();
  });
  currTurn == "x" ? board.classList.remove("o") : board.classList.remove("x");
  board.classList.add(currTurn);
}
