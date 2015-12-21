var MapManager = (function() {
	var instance;
	function createInstance(player) {
		function MapManager(){};
		var mapCanvas = document.getElementById("mapCanvas");
		var mapContext = mapCanvas.getContext("2d");
		var points = [];
		var pointSize = 2;
		var polygonColor = "gray";
		mapContext.strokeStyle = "white";
		var enemyViewSize = 20;
		var showingMap = false;
		var playerSize = 3;
		MapManager.mapLevel = 0; //public

		MapManager.render = function() {
			if(!showingMap) return;
			mapContext.setTransform(1, 0, 0, 1, 0, 0);
			mapContext.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
			mapContext.translate(mapCanvas.width/2, mapCanvas.height/2);
			//mapContext.rotate(-player.angle - Math.PI/2);
			mapContext.translate(-player.x, -player.y);

			//Draw current level on map
			var polygons = LEVELS[MapManager.mapLevel].data;
			mapContext.fillStyle = polygonColor;
			for(var i = 0; i < polygons.length; i++) {
				mapContext.beginPath();
				mapContext.moveTo(polygons[i][0], polygons[i][1]);
				for(var k = 2; k < polygons[i].length; k+=2) {
					mapContext.lineTo(polygons[i][k], polygons[i][k+1]);
				}
				mapContext.lineTo(polygons[i][0], polygons[i][1]);
				mapContext.fill();
			}

			//Draw points given
			for(var i = 0; i < points.length; i++) {
				mapContext.fillStyle = points[i].color;
				mapContext.beginPath();
				mapContext.arc(points[i].x, points[i].y, pointSize, 0, window.TWO_PI);
				mapContext.fill();
			}

			//Draw all entities
			var npcs = window.game.npcs;
			for(var i = 0; i < npcs.length; i++) {
				var npc = npcs[i];
				if(npc.hp <= 0) continue;
				mapContext.fillStyle = npc.minimapColor;
				mapContext.beginPath();
				mapContext.arc(npc.x, npc.y, pointSize, 0, window.TWO_PI);
				mapContext.fill();
				if(npc.aggressive) {
					mapContext.globalAlpha = 0.25;
					//show view angle
					mapContext.beginPath();
					mapContext.moveTo(npc.x, npc.y);
					var halfFov = npc.fov / 2;
					mapContext.arc(npc.x, npc.y, enemyViewSize, npc.angle-halfFov, npc.angle+halfFov, false)
					mapContext.fill();
					//show visibility range
					//mapContext.beginPath();
					//mapContext.moveTo(npc.x, npc.y);
					//var halfFov = npc.fov / 2;
					//mapContext.arc(npc.x, npc.y, npc.viewRange, 0, window.TWO_PI, false)
					//mapContext.fill();
					mapContext.globalAlpha = 1;
					if(npc.roaming) {
						//line to target
						mapContext.setLineDash([2,2]);
						mapContext.beginPath();
						mapContext.moveTo(npc.currentRoamTarget.x, npc.currentRoamTarget.y);
						mapContext.lineTo(npc.x, npc.y);
						mapContext.stroke();
						mapContext.setLineDash([]);
					}
				}
			}
			var cosDir = Math.cos(player.angle)*playerSize;
			var sinDir = Math.sin(player.angle)*playerSize;
			mapContext.beginPath();
			mapContext.moveTo(player.x - cosDir, player.y - sinDir);
			mapContext.lineTo(player.x + cosDir, player.y + sinDir);
			mapContext.stroke();
		};

		MapManager.addPoint = function(x, y, color) {
			points.push({
				"x": x,
				"y": y,
				"color": color
			});
		};
		MapManager.removePoint = function(x, y, color) {
			for(var i = 0; i < points.length; i++) {
				if(points[i].x === x && points[i].y === y) {
					points.splice(i, 1);
					return;
				}
			}
		};

		MapManager.showMap = function() {
			showingMap = true;
			mapCanvas.style.zIndex = 101;
		};
		MapManager.hideMap = function() {
			showingMap = false;
			mapCanvas.style.zIndex = 99;
		};

		return MapManager;
	}

	return function(player) {
		if(!instance) instance = createInstance(player);
		return instance;
	};
})();