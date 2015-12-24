var RayCaster = (function() {
	var instance;
	function createInstance(gameCanvas, player) {
		function RayCaster(){};
		var gameContext = gameCanvas.getContext("2d");
		gameContext.imageSmoothingEnabled = false;
		gameContext.mozImageSmoothingEnabled = false;
		var STRIP_WIDTH = 2;
		var RAY_COUNT = Math.round(gameCanvas.width / STRIP_WIDTH);
		var PLANE_DISTANCE = (gameCanvas.width / 2) / Math.tan(player.fov / 2);
		var MAX_WALL_HEIGHT = 10;
		var VISIBILITY_RANGE = 40; //TUNED
		var SUN_REDUCTION = 3.2;
		var SHADE_LIMIT = 0.95;
		var MAX_SPRITE_HEIGHT = 1200;
		var mapManager = MapManager();
		var loader = Loader();

		RayCaster.render = function() {
			updateSky();
			gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
			var zIndex = [];
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
				var polygonIndex = null;
				var edge = null;
				var edgeNorm = null;
				for(var pIdx = 0; pIdx < polygonData.length; pIdx++) {
					var rayInfo = PolyK.Raycast(polygonData[pIdx], player.x, player.y, cos_rayAng, sin_rayAng);
					if(rayInfo && (!dist || dist > rayInfo.dist)) {
						dist = rayInfo.dist;
						edge = rayInfo.edge;
						edgeNorm = rayInfo.norm;
						polygon = polygonData[pIdx];
						polygonIndex = pIdx;
					}
				}
				if(!dist) {
					zIndex[col] = 0;
					continue;
				}
				rayDestX = player.x + cos_rayAng*dist;
				rayDestY = player.y + sin_rayAng*dist;
				dist = dist * Math.cos(player.angle - rayAngle);
				columnHeight = Math.round((MAX_WALL_HEIGHT / dist) * PLANE_DISTANCE);
				columnTopOffset = (gameCanvas.height / (MAX_WALL_HEIGHT / player.height)) - (columnHeight / 2);
				zIndex[col] = columnHeight;

				var imgSrc = LEVELS[mapManager.mapLevel].textures[polygonIndex];
				var wallImg = loader.res.img[imgSrc];
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
				
				//Apply simple lighting + distance based lighting
				var edgeAngle = Math.atan2(edgeNorm.x, edgeNorm.y); //Swapped because polyk coordinate system is different
				var lightAngleNormalised = Math.abs(edgeAngle / Math.PI) / SUN_REDUCTION; //Reduce effect
				var shade = VISIBILITY_RANGE / columnHeight / (1-lightAngleNormalised);
				if(shade > SHADE_LIMIT) shade = SHADE_LIMIT;
				gameContext.fillStyle = "rgba(0,0,0," + shade + ")";
				gameContext.fillRect(col*STRIP_WIDTH, columnTopOffset-1, STRIP_WIDTH, columnHeight+2);
			}

			//Render sprites
			var foundInteractableNpc = false;
			//Sort by distances, need to render sprites that are further away first
			//So that sprites before those will paint over them
			if(window.game.npcs.length === 1) {
				var npc = window.game.npcs[0];
				var diffX = npc.x - player.x;
				var diffY = npc.y - player.y;
				npc.dist = Math.sqrt(diffX*diffX + diffY*diffY);
			} else {
				window.game.npcs.sort(function(a, b) {
					if(!a.dist) {
						var aDiffX = a.x - player.x;
						var aDiffY = a.y - player.y;
						a.dist = Math.sqrt(aDiffX*aDiffX + aDiffY*aDiffY);
					}
					if(!b.dist) {
						var bDiffX = b.x - player.x;
						var bDiffY = b.y - player.y;
						b.dist = Math.sqrt(bDiffX*bDiffX + bDiffY*bDiffY);
					}
					return b.dist - a.dist;
				});
			}
			for(var i = 0; i < window.game.npcs.length; i++) {
				var npc = window.game.npcs[i];
				var diffX = npc.x - player.x;
				var diffY = npc.y - player.y;
				var dist = npc.dist; //Calculated in the sorting above
				npc.dist = null; //This will force distance update on the next frame;

				var angDiff = Math.atan2(diffY, diffX);
				var spriteRotQuad = "";
				if(npc.hp > 0 && npc.action !== "hitstun") {
					spriteRotQuad = angDiff + Math.PI - npc.angle + window.TWO_PI; //(-pi+pi) + pi - (-pi+pi) + 2pi
					spriteRotQuad = spriteRotQuad > window.TWO_PI ? spriteRotQuad - window.TWO_PI : spriteRotQuad;
					spriteRotQuad *= 180 / Math.PI; //To degrees
					if(spriteRotQuad > 360) { //if npc.angle is neg. then it will add to spriteRotQuad
						spriteRotQuad -= 360;
					};
					if(spriteRotQuad < 22.5 || spriteRotQuad >= 337.5) {
						spriteRotQuad = 0;
					} else if(spriteRotQuad < 67.5) {
						spriteRotQuad = 315;
					} else if(spriteRotQuad < 112.5) {
						spriteRotQuad = 270;
					} else if(spriteRotQuad < 157.5) {
						spriteRotQuad = 225;
					} else if(spriteRotQuad < 202.5) {
						spriteRotQuad = 180;
					} else if(spriteRotQuad < 247.5) {
						spriteRotQuad = 135;
					} else if(spriteRotQuad < 292.5) {
						spriteRotQuad = 90;
					} else if(spriteRotQuad < 337.5) {
						spriteRotQuad = 45;
					}
					spriteRotQuad += "_";
				}
				var angToPlayer = angDiff - player.angle;
				var imgSrc = "img/sprites/" + npc.spriteName + "/" + npc.action + "/" + spriteRotQuad + npc.currentSpriteId + ".png";
				var img = Loader().res.img[imgSrc];
				var imgProportion = img.width / img.height;
				var ySize = Math.round(MAX_WALL_HEIGHT * PLANE_DISTANCE / (Math.cos(angToPlayer) * dist));
				var xSize = ySize * imgProportion;
				if(ySize <= 0 || xSize <=0) continue;
				if(ySize > MAX_SPRITE_HEIGHT) continue;

				var xOffset = (gameCanvas.width / 2) + (Math.tan(angToPlayer) * PLANE_DISTANCE) - (xSize/2);
				var yOffset = (gameCanvas.height - ySize) / 2;
				var zIndexStart = Math.round(xOffset/STRIP_WIDTH);
				var zIndexEnd = Math.round((xOffset+xSize)/STRIP_WIDTH);
				npc.renderInfo = {};
				if(zIndexStart > zIndex.length) continue;
				if(zIndexEnd < 0) continue;
				//At this point the sprite will be drawn into the canvas
				npc.renderInfo.xDrawOffset = xOffset;
				npc.renderInfo.xDrawWidth = xSize;

				if(npc.interactable && npc.hp > 0 &&
					dist < player.interactDistance && player.isPointingAtNpc(npc)) {
					player.showInteractAvailable(npc);
					foundInteractableNpc = true;
				}
				
				var imgPerSlice = img.width / (zIndexEnd - zIndexStart);
				for(var col = zIndexStart; col < zIndexEnd; col++) {
					if(zIndex[col] > ySize) continue;
					var screenPos = col * STRIP_WIDTH;
					var imagePos = Math.round((col-zIndexStart) * imgPerSlice);
					gameContext.drawImage(img, imagePos, 0, 1, img.height, screenPos, yOffset, STRIP_WIDTH, ySize);
					//TODO: Sprite shading
				}
			}
			//Check for interaction
			if(player.showingInteractHelp && !foundInteractableNpc) {
				player.hideInteractAvailable();
			}

			//Render weapon
			var weaponImgSrc = "img/sprites/weapons/" + player.weapon + "/" + player.weaponAction;
			if(player.weaponAction === "shoot") {
				weaponImgSrc += "_"+player.currentShootSpriteId+".png";
			} else {
				weaponImgSrc += ".png";
			}
			var weaponImg = Loader().res.img[weaponImgSrc];
			var weaponX = gameCanvas.width / 2 - weaponImg.width / 2 + player.weaponSwayX;
			var weaponY = gameCanvas.height - weaponImg.height + player.weaponSwayY + player.weaponSwayMaxY;
			gameContext.drawImage(weaponImg, weaponX, weaponY);
		};

		function updateSky() {
			var left = window.GAME_CANVAS_BG_WIDTH * player.angle / window.TWO_PI;
			gameCanvas.style.backgroundPosition = -left + "px 0";
		}

		function getDistance(x1, y1, x2, y2) {
			var xDiff = x1-x2;
			var yDiff = y1-y2;
			return Math.sqrt(xDiff*xDiff+yDiff*yDiff);
		}

		return RayCaster;
	}

	return function(gameCanvas, player) {
		if(!instance) instance = createInstance(gameCanvas, player);
		return instance;
	};
})();