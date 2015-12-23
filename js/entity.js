function Entity(x, y, type, angle, fov) {
	this.x = x || 0;
	this.y = y || 0;
	this.type = type || "generic";
	this.COLLISION_MARGIN = 3;
	this.angle = angle || 0;
	this.fov = fov;
}
Entity.prototype.frameAction = function() { };
Entity.prototype.collisionPass = function(cx, cy) {
	var returnInfo = {
		"x": this.x + cx,
		"y": this.y + cy
	};

	var xInfo = closestEdgeInfo(this.COLLISION_MARGIN, this.x + cx, this.y);
	if(xInfo) {
		returnInfo.x = xInfo.point.x + xInfo.norm.x * this.COLLISION_MARGIN;
	}
	var yInfo = closestEdgeInfo(this.COLLISION_MARGIN, this.x, this.y + cy);
	if(yInfo) {
		returnInfo.y = yInfo.point.y + yInfo.norm.y * this.COLLISION_MARGIN;
	}
	return returnInfo;

	function closestEdgeInfo(cm, x, y) {
		var polygons = LEVELS[MapManager().mapLevel].data;
		var minDistInfo = null;
		for(var i = 0; i < polygons.length; i++) {
			var info = PolyK.ClosestEdge(polygons[i], x, y);
			if(info.dist < cm) {
				if(minDistInfo && info.dist < minDistInfo.dist) {
					minDistInfo = info;
				} else {
					minDistInfo = info;
				}
			}
		}
		return minDistInfo;
	}
};
Entity.prototype.isPointNotBlocked = function(x, y) {
	var diffX = x - this.x;
	var diffY = y - this.y;
	var polygonData = LEVELS[MapManager().mapLevel].data;
	var rayMinDistToPoint = Infinity;
	var distToPoint = Math.sqrt(diffX*diffX + diffY*diffY);
	for(var pIdx = 0; pIdx < polygonData.length; pIdx++) {
		var rayInfo = PolyK.Raycast(polygonData[pIdx], this.x, this.y, diffX, diffY);
		if(rayInfo && rayInfo.dist < rayMinDistToPoint) {
			rayMinDistToPoint = rayInfo.dist;
		}
	}
	//if true, this means that the point is not blocked by wall, because
	//the closest wall hit by the ray is further than a point distance
	return rayMinDistToPoint > distToPoint ? distToPoint : false;
};