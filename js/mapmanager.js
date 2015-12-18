var MapManager = (function() {
	var instance;
	function createInstance(player) {
		function MapManager(){};
		var mapCanvas = document.getElementById("mapCanvas");
		var mapContext = mapCanvas.getContext("2d");
		
		MapManager.mapLevel = 0; //public

		MapManager.render = function() {
			mapContext.setTransform(1, 0, 0, 1, 0, 0);
			mapContext.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
			mapContext.translate(mapCanvas.width/2, mapCanvas.height/2);
			mapContext.rotate(-player.angle - Math.PI/2);
			mapContext.translate(-player.x, -player.y);

			//Draw current level on map
			var polygons = LEVELS[MapManager.mapLevel].data;
			for(var i = 0; i < polygons.length; i++) {
				mapContext.beginPath();
				mapContext.moveTo(polygons[i][0], polygons[i][1]);
				for(var k = 2; k < polygons[i].length; k+=2) {
					mapContext.lineTo(polygons[i][k], polygons[i][k+1]);
				}
				mapContext.lineTo(polygons[i][0], polygons[i][1]);
				mapContext.fill();
			}

			mapContext.beginPath();
			mapContext.moveTo(player.x, player.y);
			mapContext.lineTo(player.x + Math.cos(player.angle)*200, player.y + Math.sin(player.angle)*200);
			mapContext.stroke();
		};

		return MapManager;
	}

	return function(player) {
		if(!instance) instance = createInstance(player);
		return instance;
	};
})();