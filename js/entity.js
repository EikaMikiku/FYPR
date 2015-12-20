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
	var newX = this.x + cx;
	var newY = this.y + cy;
	var xInfo = checkCollision.call(this, cx, 0);
	if(xInfo) {
		newX = (xInfo.point.x + xInfo.norm.x * this.COLLISION_MARGIN);
	}
	var yInfo = checkCollision.call(this, 0, cy);
	if(yInfo) {
		newY = (yInfo.point.y + yInfo.norm.y * this.COLLISION_MARGIN);
	}
	return {
		"x": newX,
		"y": newY
	};

	function checkCollision(cx, cy) {
		var polygons = LEVELS[MapManager().mapLevel].data;

		for(var i = 0; i < polygons.length; i++) {
			var collInfo = PolyK.ClosestEdge(polygons[i], this.x + cx, this.y + cy);

			if(collInfo.dist < this.COLLISION_MARGIN) {
				return collInfo;
			}
		}
		return false;
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