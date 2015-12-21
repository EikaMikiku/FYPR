var Game = (function() {
	var instance;
	function createInstance() {
		function Game(){};
		var player = new Player(15, 15, Math.PI/2);
		//var player = new Player(50, 100, Math.PI/2);
		var mapManager = MapManager(player);
		Game.frameCount = 0;
		Game.npcs = generateNpcsArray(mapManager.mapLevel);
		var gameCanvas = document.getElementById("gameCanvas");
		gameCanvas.requestPointerLock = gameCanvas.requestPointerLock || gameCanvas.mozRequestPointerLock;
		var rayCaster = RayCaster(gameCanvas, player);
		var gameOver = false;
		var gameOverScreen = document.getElementById("gameOverScreen");
		var loader = Loader().load(function(src) {
			console.log(src);
		}, function() {
			Game.engineLoop();
		});
		var keyStates = {
			"w": false,
			"s": false,
			"a": false,
			"d": false,
			"ctrl": false
		};
		Game.terminal = document.getElementById("dialogWindow");
		Game.addToTerminal = function(text) {
			var span = document.createElement("span");
			var current = 0;
			span.className = "dialogSpan";
			Game.terminal.appendChild(span);
			var timer = setInterval(function() {
				span.textContent += text[current];
				current++;
				if(current === text.length) {
					clearInterval(timer);
				}
				Game.terminal.scrollTop = Game.terminal.scrollHeight;
			}, 10);
		};
		Game.engineLoop = function() {
			if(gameOver) return;
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
		Game.gameOver = function() {
			gameOver = true;
			gameOverScreen.style.display = "block";
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
				e.preventDefault();
				keyStates.w = true;
			} else if(e.keyCode === 83) {
				e.preventDefault();
				keyStates.s = true;
			} else if(e.keyCode === 65) {
				e.preventDefault();
				keyStates.a = true;
			} else if(e.keyCode === 68) {
				e.preventDefault();
				keyStates.d = true;
			} else if(e.keyCode === 9) {
				e.preventDefault();
				mapManager.showMap();
			} else if(e.keyCode === 32) {
				e.preventDefault();
				player.shoot();
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
			} else if(e.keyCode === 9) {
				mapManager.hideMap();
			} else if(e.keyCode === 17) {
				keyStates.ctrl = false;
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