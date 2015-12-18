function Entity(x, y, type) {
	this.x = x || 0;
	this.y = y || 0;
	this.type = type || "generic";
}
Entity.prototype.collisionPass = function(cx, cy) {
	var newX = this.x + cx;
	var newY = this.y + cy;
	var xInfo = checkCollision.call(this, cx, 0);
	if(xInfo) {
		newX = (xInfo.point.x + xInfo.norm.x * window.COLLISION_MARGIN);
	}
	var yInfo = checkCollision.call(this, 0, cy);
	if(yInfo) {
		newY = (yInfo.point.y + yInfo.norm.y * window.COLLISION_MARGIN);
	}
	return {
		"x": newX,
		"y": newY
	};

	function checkCollision(cx, cy) {
		var polygons = LEVELS[MapManager().mapLevel].data;

		for(var i = 0; i < polygons.length; i++) {
			var collInfo = PolyK.ClosestEdge(polygons[i], this.x + cx, this.y + cy);

			if(collInfo.dist < window.COLLISION_MARGIN) {
				return collInfo;
			}
		}
		return false;
	}
};