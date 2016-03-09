var GuiManager = (function() {
	var instance;
	function createInstance() {
		function GuiManager(){};
		var guiContainer = document.getElementById("guiContainer");
		var menus = [
			document.getElementById("mainMenu").children,
			document.getElementById("pauseMenu").children,
			document.getElementById("multiplayerMenu").children,
			document.getElementById("inMultiplayerMenu").children
		];
		var selectedIndex = 0;
		var currentMenu = 0;
		var previousMenu = 0;
		var selectedItem = menus[currentMenu][selectedIndex];
		var actions = {
			resumeButton: function() {
				window.game.togglePause();
				GuiManager.hide();
			},
			newGameButton: function() {
				window.game.initLevel("0");
				GuiManager.hide();
			},
			multiplayerButton: function() {
				GuiManager.changeMenu(2);
			},
			backButton: function() {
				GuiManager.changeMenu(previousMenu);
			},
			aboutButton: function() {
				alert("Some information should be here");
			},
			hostGameButton: function() {
				if(!window.game.inMultiplayer) {
					NetManager().host(startMultiplayer);
				}
			},
			joinGameButton: function() {
				if(!window.game.inMultiplayer) {
					NetManager().join(startMultiplayer);
				}
			},
			disconnectButton: function() {
				if(window.game.inMultiplayer) {
					NetManager().disconnect();
					GuiManager.changeMenu(0);
				}
			}
		};

		GuiManager.selectMenuItem = function() {
			var id = selectedItem.dataset.name;
			actions[id]();
		};
		GuiManager.show = function() {
			guiContainer.style.opacity = 1;
			if(window.game.getPauseState()) {
				if(!window.game.inMultiplayer) {
					GuiManager.changeMenu(1);
				} else {
					GuiManager.changeMenu(3);
				}
			} else {
				updateGui();
			}
		};
		GuiManager.hide = function() {
			guiContainer.style.opacity = 0;
		};
		GuiManager.moveUp = function() {
			if(selectedIndex > 0) {
				selectedIndex--;
				updateGui();
			}
		};
		GuiManager.moveDown = function() {
			if(selectedIndex < menus[currentMenu].length - 1) {
				selectedIndex++;
				updateGui();
			}
		};
		GuiManager.changeMenu = function(idx) {
			previousMenu = currentMenu;
			menus[currentMenu][0].parentElement.style.display = "none";
			currentMenu = idx;
			menus[currentMenu][0].parentElement.style.display = "block";
			selectedIndex = 0;
			updateGui();
		};

		function startMultiplayer() {
			window.game.inMultiplayer = true;
			window.game.initLevel("arena");
			NetManager().enemyNpc = window.game.npcs[0];
			GuiManager.hide();
		}

		function updateGui() {
			selectedItem.classList.remove("current");
			selectedItem = menus[currentMenu][selectedIndex];
			selectedItem.classList.add("current");
		}
		return GuiManager;
	}

	return function() {
		if(!instance) instance = createInstance();
		return instance;
	};
})();