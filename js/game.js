var Game = (function() {
	var instance;
	function createInstance() {
		function Game(){};
		var mapManager = MapManager();
		var player = new Player(120, 120);

		var keyStates = {
			"w": false,
			"s": false,
			"a": false,
			"d": false
		};
		var mouseLockStatus = false;

		Game.engineLoop = function() {
			mapManager.render(player);
			player.frameAction();
			requestAnimationFrame(Game.engineLoop);
		};
		Game.getKeyStates = function() {
			return keyStates;
		};
		Game.getPlayer = function() {
			return player;
		};

		//Events
		document.addEventListener("keydown", function(e) {
			if(e.keyCode === 87) {
				keyStates.w = true;
			} else if(e.keyCode === 83) {
				keyStates.s = true;
			} else if(e.keyCode === 65) {
				keyStates.a = true;
			} else if(e.keyCode === 68) {
				keyStates.d = true;
			}
		});
		document.addEventListener("keyup", function(e) {
			if(e.keyCode === 87) {
				keyStates.w = false;
			} else if(e.keyCode === 83) {
				keyStates.s = false;
			} else if(e.keyCode === 65) {
				keyStates.a = false;
			} else if(e.keyCode === 68) {
				keyStates.d = false;
			}
		});

		return Game;
	}

	return function() {
		if(!instance) instance = createInstance();
		return instance;
	};
})();