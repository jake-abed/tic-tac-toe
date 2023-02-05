'use strict';
const display = {
	newGame: document.querySelector('.new-game'),
	gameBoard: document.querySelector('.game-board')
}

//Create game state object
const gameState = (() => {
	let preGame = true,
		gameActive = false,
		postGame = false;

	const startGame = () => {
		preGame = false;
		gameActive = true;
		postGame = false;
	}

	const gameOver = () => {
		preGame = false;
		gameActive = false;
		postGame = true;
	}

	return {
		startGame,
		gameOver
	};
})();

//Create gameboard object

/*
gameBoard.grid is an array that abstracts the game board.

For developer sanity, the array indexes map to the following:
-------------
| 0 | 1 | 2 |
-------------
| 3 | 4 | 5 |
-------------
| 6 | 7 | 8 |
-------------
*/

const gameBoard = (() => {
	const grid = ['', '', '', '', '', '', '', '', ''];

	const placePiece = (piece, location) => grid[location] = piece.toUpperCase();

	return {
		grid,
		placePiece
	}
})();

//Create player objects - factories

const Player = (name) => {
	let pieceType = '';
	const getName = () => name;
	const getPieceType = () => pieceType;

	const setPieceType = (piece) => pieceType = piece.toUpperCase();
	const setName = (newName) => name = newName;

	return {
		getName,
		getPieceType,
		setName,
		setPieceType
	}
}

const playerOne = Player('Player 1');
const playerTwo = Player('Player 2');
playerOne.setPieceType('X');
playerTwo.setPieceType('O');

//Create functions to render gameboard.

//DOM Manipulation Event Listeners
display.newGame.addEventListener('click', () => {
	display.newGame.classList.add('hidden');
	//gameBoard.initNewBoard();
	display.gameBoard.classList.remove('hidden');
});
