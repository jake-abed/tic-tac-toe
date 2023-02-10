'use strict';
const display = (() => {
	const newGame = document.querySelector('.new-game'),
	newGameWrapper = document.querySelector('.new-game-wrapper'),
	gameBoard = document.querySelector('.game-board'),
	playerOneName = document.querySelector('#player-one-name'),
	playerTwoName = document.querySelector('#player-two-name'),
	gameOverWrapper = document.querySelector('.game-over-wrapper'),
	reportWinner = document.querySelector('.report-winner');
	
	return {
		newGame,
		newGameWrapper,
		gameBoard,
		playerOneName,
		playerTwoName,
		gameOverWrapper,
		reportWinner
	}
})();

//Create game state object
const gameState = (() => {
	let preGame = true,
		gameActive = false,
		postGame = false,
		activePlayer;

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

	const getActivePlayerPieceType = () => activePlayer.getPieceType();
	const getActivePlayer = () => activePlayer;
	const isGameActive = () => gameActive;
	const setActivePlayer = (player) => activePlayer = player;
	const swapActivePlayer = () => {
		if (getActivePlayer() == playerOne) {
			setActivePlayer(playerTwo);
		} else if (getActivePlayer() == playerTwo) {
			setActivePlayer(playerOne);
		}
	}

	return {
		startGame,
		gameOver,
		getActivePlayerPieceType,
		getActivePlayer,
		isGameActive,
		setActivePlayer,
		swapActivePlayer
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

	const WIN_CONS = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	]

	const placePiece = (piece, location) => grid[location] = piece.toUpperCase();

	const refreshBoard = () => {
		for (let i = 0; i <=8; i++) {
			const currentSpace = document.querySelector(`#space-${i}`);
			const piece = document.createElement('p');
			piece.classList.add(`piece-${grid[i]}`);
			piece.innerText = grid[i];
			if (!currentSpace.firstChild && grid[i] != '') {
				currentSpace.appendChild(piece);
			};
		}
	}
	
	const checkWinCons = (pieceType) => {
		if (WIN_CONS.some((winCon) => {
			let winProgress = 0;
			winCon.forEach((position) => {
				if (grid[position] == pieceType) winProgress++;
				if (winProgress >= 3) return true;
			})
			if (winProgress == 3) return true;
		})) {
			gameState.gameOver();
			display.reportWinner.innerText = `${gameState.getActivePlayer().getName()} wins!`;
			display.gameOverWrapper.classList.remove('hidden');
		}
		if (!grid.includes('')) {
			gameState.gameOver('tie');
			display.reportWinner.innerText = `Dang! It's a tie.`;
			display.gameOverWrapper.classList.remove('hidden');
		};
	};

	const initNewBoard = () => {
		for (let i = 0; i <= 8; i++) {
			const space = document.createElement('div');
			const activePlayerSelectSpace = () => {
				if (!gameState.isGameActive()) return console.error('Game over! Please restart!'),
					space.removeEventListener('click', activePlayerSelectSpace);
				grid[i] = gameState.getActivePlayerPieceType();
				checkWinCons(gameState.getActivePlayerPieceType());
				gameState.swapActivePlayer();
				space.removeEventListener('click', activePlayerSelectSpace);
				refreshBoard();
			};
			space.classList.add('space')
			space.setAttribute('id', `space-${i}`);
			space.setAttribute('data-space', i);
			space.addEventListener('click', activePlayerSelectSpace);
			display.gameBoard.appendChild(space);
		}
	};
	
	const resetGrid = ()  => {
		for (let i = 0; i < grid.length; i++) {
			grid[i] = '';
		};
	};

	return {
		placePiece,
		initNewBoard,
		refreshBoard,
		resetGrid
	}
})();

//Create functions to render gameboard.

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

const playerOne = Player('Player One');
const playerTwo = Player('Player Two');
playerOne.setPieceType('X');
playerTwo.setPieceType('O');

//DOM Manipulation Event Listeners
display.newGame.addEventListener('click', () => {
	display.newGameWrapper.classList.add('hidden');
	console.log(display.playerOneName.value);
	playerOne.setName(display.playerOneName.value ?? 'Player 1');
	playerTwo.setName(display.playerTwoName.value ?? 'Player 2');
	gameBoard.initNewBoard();
	gameState.startGame();
	gameState.setActivePlayer(playerOne);
	display.gameBoard.classList.remove('hidden');
});

console.log(display.gameOverWrapper);

display.gameOverWrapper.addEventListener('click', () => {
	display.gameOverWrapper.classList.add('hidden');
	while (display.gameBoard.firstChild) {
		display.gameBoard.removeChild(display.gameBoard.lastChild);
	};
	gameBoard.resetGrid();
	display.gameBoard.classList.add('hidden');
	display.newGameWrapper.classList.remove('hidden');
});
