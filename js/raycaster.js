var RayCaster = (function() {
	var instance;
	function createInstance(player) {
		function RayCaster(){};
		var gameCanvas = document.getElementById("gameCanvas");
		var gameContext = gameCanvas.getContext("2d");
		gameContext.imageSmoothingEnabled = false;
		var STRIP_WIDTH = 2;
		var RAY_COUNT = Math.round(gameCanvas.width / STRIP_WIDTH);
		var PLANE_DISTANCE = (gameCanvas.width / 2) / Math.tan(player.fov / 2);
		var MAX_WALL_HEIGHT = 10;
		var mapManager = MapManager();
		var loader = Loader();

		RayCaster.render = function() {
			gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
			for(var col = 0; col < RAY_COUNT; col++) {
				var rayScreenPos = (col - RAY_COUNT/2) * STRIP_WIDTH;
				var rayDistView = Math.sqrt(rayScreenPos*rayScreenPos + PLANE_DISTANCE*PLANE_DISTANCE);
				var rayAngle = player.angle + Math.asin(rayScreenPos / rayDistView);
				var cos_rayAng = Math.cos(rayAngle);
				var sin_rayAng = Math.sin(rayAngle);
				var dist = null;
				var rayDestX = null;
				var rayDestY = null;
				var columnHeight = null;
				var columnTopOffset = null;
				var polygonData = LEVELS[mapManager.mapLevel].data;
				var polygon = null;
				var edge;

				for(var pIdx = 0; pIdx < polygonData.length; pIdx++) {
					var rayInfo = PolyK.Raycast(polygonData[pIdx], player.x, player.y, cos_rayAng, sin_rayAng);
					if(rayInfo && (!dist || dist > rayInfo.dist)) {
						dist = rayInfo.dist;
						edge = rayInfo.edge;
						//edgeNorm = rayInfo.norm;
						polygon = polygonData[pIdx];
					}
				}
				if(!dist) continue;
				rayDestX = player.x + cos_rayAng*dist;
				rayDestY = player.y + sin_rayAng*dist;
				dist = dist * Math.cos(player.angle - rayAngle);
				columnHeight = Math.round((MAX_WALL_HEIGHT / dist) * PLANE_DISTANCE); 
				columnTopOffset = (gameCanvas.height / (MAX_WALL_HEIGHT / player.height)) - (columnHeight / 2);
				
				var wallImg = loader.res.img["img/wall0.png"];
				var texRatio = MAX_WALL_HEIGHT / wallImg.height;
				var texWidth = STRIP_WIDTH * wallImg.height / columnHeight;
				var texOffset = getDistance(rayDestX, rayDestY, polygon[edge*2], polygon[edge*2+1]) / texRatio;
				var texActualOffset = ~~(texOffset % wallImg.height);
				gameContext.drawImage(
					wallImg,
					texActualOffset, 0, 				//From img point
					texWidth, wallImg.height, 			//To img size
					col*STRIP_WIDTH, columnTopOffset, 	//From canvas point
					STRIP_WIDTH, columnHeight 			//To canvas size
				);
				//gameContext.fillRect(col*STRIP_WIDTH, columnTopOffset, STRIP_WIDTH, columnHeight);
			}
		};

		function getDistance(x1, y1, x2, y2) {
			var xDiff = x1-x2;
			var yDiff = y1-y2;
			return Math.sqrt(xDiff*xDiff+yDiff*yDiff);
		}

		return RayCaster;
	}

	return function(player) {
		if(!instance) instance = createInstance(player);
		return instance;
	};
})();