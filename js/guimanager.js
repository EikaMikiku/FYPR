var GuiManager = (function() {
	var instance;
	function createInstance() {
		function GuiManager(){};
		var guiContainer = document.getElementById("guiContainer");
		var resumeButton = document.getElementById("resumeButton");
		var mainMenu = document.getElementById("mainMenu");
		var mainMenuItems = mainMenu.children;
		var selectedIndex = 0;
		var selectedItem = mainMenuItems[selectedIndex];
		var actions = {
			resumeButton: function() {
				window.game.togglePause();
				GuiManager.hide();
			},
			newGameButton: function() {
				window.game.initLevel();
				GuiManager.hide();
			},
			aboutButton: function() {
				alert("Some information should be here");
			}
		};

		GuiManager.selectMenuItem = function() {
			var id = selectedItem.id;
			actions[id]();
		};
		GuiManager.show = function() {
			guiContainer.style.opacity = 1;
			if(window.game.getPauseState()) {
				resumeButton.style.display = "block";
				selectedIndex = 0;
			} else {
				resumeButton.style.display = "none";
				selectedIndex = 1;
			}
			updateGui();
		};
		GuiManager.hide = function() {
			guiContainer.style.opacity = 0;
		};
		GuiManager.moveUp = function() {
			if(selectedIndex > (window.game.getPauseState() ? 0 : 1)) {
				selectedIndex--;
				updateGui();
			}
		};
		GuiManager.moveDown = function() {
			if(selectedIndex < mainMenuItems.length - 1) {
				selectedIndex++;
				updateGui();
			}
		};

		function updateGui() {
			selectedItem.classList.remove("current");
			selectedItem = mainMenuItems[selectedIndex];
			selectedItem.classList.add("current");
		}
		return GuiManager;
	}

	return function() {
		if(!instance) instance = createInstance();
		return instance;
	};
})();