function Entity(x, y, type, angle, speed) {
	this.x = x || 0;
	this.y = y || 0;
	this.type = type || "generic";
	this.COLLISION_MARGIN = 3;
	this.angle = angle || 0;
	this.speed = speed || 0;
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