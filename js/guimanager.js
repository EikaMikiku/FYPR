var GuiManager = (function() {
	var instance;
	function createInstance() {
		function GuiManager(){};
		var guiContainer = document.getElementById("guiContainer");
		var mainMenu = document.getElementById("mainMenu");
		var mainMenuItems = mainMenu.children;
		var selectedIndex = 0;
		var selectedItem = mainMenuItems[selectedIndex];
		var actions = {
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