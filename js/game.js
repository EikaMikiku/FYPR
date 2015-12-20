var Game = (function() {
	var instance;
	function createInstance() {
		function Game(){};
		var player = new Player(20, 95, Math.PI/3);
		var mapManager = MapManager(player);
		Game.frameCount = 0;
		Game.npcs = generateNpcsArray(mapManager.mapLevel);
		var gameCanvas = document.getElementById("gameCanvas");
		gameCanvas.requestPointerLock = gameCanvas.requestPointerLock || gameCanvas.mozRequestPointerLock;
		var rayCaster = RayCaster(gameCanvas, player);
		var loader = Loader().load(function(src) {
			console.log(src);
		}, function() {
			Game.engineLoop();
		});
		var keyStates = {
			"w": false,
			"s": false,
			"a": false,
			"d": false
		};

		Game.engineLoop = function() {
			player.frameAction();
			for(var i = 0; i < Game.npcs.length; i++) {
				Game.npcs[i].frameAction();
			}
			mapManager.render();
			rayCaster.render();
			Game.frameCount++;
			requestAnimationFrame(Game.engineLoop);
		};
		Game.getKeyStates = function() {
			return keyStates;
		};
		Game.getPlayer = function() {
			return player;
		};

		function generateNpcsArray(level) {
			var arr = [];
			var npcs = LEVELS[level].npcs;
			for(npc in npcs) {
				arr.push(new Npc(npcs[npc]));
			}
			return arr;
		}

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
		gameCanvas.addEventListener("click", function(e) {
			gameCanvas.requestPointerLock();
		});

		return Game;
	}

	return function() {
		if(!instance) instance = createInstance();
		return instance;
	};
})();