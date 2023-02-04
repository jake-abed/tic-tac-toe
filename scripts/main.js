'use strict';

//Create game state object
const gameState = (() => {
	let preGame = true,
		gameActive = false,
		player1Score = 0,
		player2Score = 0; 

	const startGame = () => {
		preGame = false;
		gameActive = true;
		player1Score = 0;
		player2Score = 0;
	}

	return {
		preGame,
		startGame
	};
})();

//Create gameboard object

//Create player objects - factories

//Create functions to render gameboard.