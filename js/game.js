var Game = (function() {
	var instance;
	function createInstance() {
		function Game(){};
		var pPos = LEVELS[0].getPlayerPosition();
		var player = new Player(pPos.x, pPos.y, pPos.angle);
		var mapManager = MapManager(0, player);
		var guiManager = GuiManager();
		var gameCanvas = document.getElementById("gameCanvas");
		gameCanvas.requestPointerLock = gameCanvas.requestPointerLock || gameCanvas.mozRequestPointerLock;
		var rayCaster = RayCaster(gameCanvas, player);
		var gameOver = true;
		var gamePaused = false;
		var gameOverScreen = document.getElementById("gameOverScreen");
		var gameCompletedScreen = document.getElementById("gameCompletedScreen");
		var loader = Loader().load(function() {
			guiManager.show();
		});
		var toRemoveNpcs = [];
		var keyStates = {
			"w": false,
			"s": false,
			"a": false,
			"d": false,
			"ctrl": false,
			"space": false
		};
		var weapons = ["chainsaw", "pistol", "shotgun", "machinegun", "rocketlauncher"];
		var gamePoints = document.getElementById("gamePoints");

		Game.terminal = document.getElementById("dialogWindow");
		Game.points = 0;
		Game.inMultiplayer = false;
		Game.getGameCanvas = function() {
			return gameCanvas;
		};
		Game.addToTerminal = function(text, done) {
			var span = null;
			var current = 0;
			span = document.createElement("span");
			span.className = "dialogSpan";
			Game.terminal.appendChild(span);

			var timer = setInterval(function() {
				span.textContent += text[current];
				current++;
				if(current === text.length) {
					done();
					clearInterval(timer);
				}
				Game.terminal.scrollTop = Game.terminal.scrollHeight;
			}, 10);
		};
		Game.engineLoop = function() {
			if(gameOver || gamePaused) return;
			player.frameAction();
			for(var i = 0; i < toRemoveNpcs.length; i++) {
				Game.npcs.splice(Game.npcs.indexOf(toRemoveNpcs[i]), 1);
			}
			toRemoveNpcs = [];
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
			guiManager.changeMenu(0);
			guiManager.show();
			player.bloodScreen.style.opacity = 0;
			gameOverScreen.style.display = "block";
		};
		Game.initLevel = function(levelName) {
			mapManager.mapLevel = levelName;
			while(Game.terminal.firstChild) {
				Game.terminal.removeChild(Game.terminal.firstChild);
			}
			Game.resetPlayer();
			Game.points = 0;
			gameOverScreen.style.display = "none";
			gameCompletedScreen.style.display = "none";
			Game.frameCount = 0;
			Game.npcs = generateNpcsArray(mapManager.mapLevel);
			gameOver = false;
			gamePaused = false;
			Game.resetKeyStates();
			Game.addToTerminal(LEVELS[mapManager.mapLevel].startText, function(){});
			Game.engineLoop();
		};
		Game.completedLevel = function() {
			gameOver = true;
			guiManager.show();
			player.bloodScreen.style.opacity = 0;
			gamePoints.textContent = Game.points;
			gameCompletedScreen.style.display = "block";
		};
		Game.resetKeyStates = function() {
			keyStates = {
				"w": false,
				"s": false,
				"a": false,
				"d": false,
				"ctrl": false,
				"space": false
			};
		};
		Game.togglePause = function() {
			gamePaused = !gamePaused;
			if(gamePaused) {
				guiManager.show();
			} else {
				Game.resetKeyStates();
				guiManager.hide();
				Game.engineLoop();
			}
		};
		Game.getPauseState = function() {
			return gamePaused;
		};
		Game.removeNpc = function(npc) {
			toRemoveNpcs.push(npc);
		};
		Game.resetPlayer = function() {
			var pPos = LEVELS[mapManager.mapLevel].getPlayerPosition();
			player.x = pPos.x;
			player.y = pPos.y;
			player.angle = pPos.angle;
			player.hp = 100;
			player.hpInfo.textContent = 100;
			player.currentShootSpriteId = 0;
			player.weaponAction = "idle";
			player.changeWeapon("pistol");
			player.headAction = "idle";
			player.prevHeadAction = null;
			player.updateHead();
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
		document.addEventListener("keydown", keyDownHandler);
		document.addEventListener("keyup", keyUpHandler);
		gameCanvas.addEventListener("click", mouseClickHandler);
		function keyDownHandler(e) {
			if(e.keyCode === 87 && !gameOver && !gamePaused) {
				e.preventDefault();
				keyStates.w = true;
			} else if(e.keyCode === 83 && !gameOver && !gamePaused) {
				e.preventDefault();
				keyStates.s = true;
			} else if(e.keyCode === 65 && !gameOver && !gamePaused) {
				e.preventDefault();
				keyStates.a = true;
			} else if(e.keyCode === 68 && !gameOver && !gamePaused) {
				e.preventDefault();
				keyStates.d = true;
			} else if(e.keyCode === 9 && !gameOver && !gamePaused) {
				e.preventDefault();
				mapManager.showMap();
			} else if(e.keyCode === 32 && !gameOver && !gamePaused) {
				e.preventDefault();
				keyStates.space = true;
			} else if(e.keyCode > 49 && e.keyCode < 53 && !gameOver && !gamePaused) {
				//50 => 2; 51 => 3; 52 => 4;
				player.changeWeapon(weapons[e.keyCode-49]);
			} else if(e.keyCode === 38 && (gameOver || gamePaused)) {
				guiManager.moveUp();
			} else if(e.keyCode === 40 && (gameOver || gamePaused)) {
				guiManager.moveDown();
			} else if(e.keyCode === 80 && !gameOver) {
				Game.togglePause();
			}
		}

		function keyUpHandler(e) {
			if(e.keyCode === 87 && !gameOver && !gamePaused) {
				keyStates.w = false;
			} else if(e.keyCode === 83 && !gameOver && !gamePaused) {
				keyStates.s = false;
			} else if(e.keyCode === 65 && !gameOver && !gamePaused) {
				keyStates.a = false;
			} else if(e.keyCode === 68 && !gameOver && !gamePaused) {
				keyStates.d = false;
			} else if(e.keyCode === 9 && !gameOver && !gamePaused) {
				mapManager.hideMap();
			} else if(e.keyCode === 17 && !gameOver && !gamePaused) {
				keyStates.ctrl = false;
			} else if(e.keyCode === 32 && !gameOver && !gamePaused) {
				keyStates.space = false;
			} else if(e.keyCode === 69 && !gameOver && !gamePaused) {
				e.preventDefault();
				player.attemptInteract();
			} else if(e.keyCode === 16 && !gameOver && !gamePaused) {
				e.preventDefault();
				if(this.moveSpeed === this.runSpeed) {
					this.moveSpeed = this.walkSpeed;
				} else {
					this.moveSpeed = this.runSpeed;
				}
			} else if((e.keyCode === 13 || e.keyCode === 32) && (gameOver || gamePaused)) {
				guiManager.selectMenuItem();
			}
		}

		function mouseClickHandler(e) {
			gameCanvas.requestPointerLock();
		}

		return Game;
	}

	return function() {
		if(!instance) instance = createInstance();
		return instance;
	};
})();