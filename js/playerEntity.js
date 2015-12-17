function Player(x, y) {
	this.base = Entity;
	this.base(x, y, "player");
	this.angle = 0;
	this.height = 5;
	this.fov = 60 * Math.PI / 180;
	this.speed = 0.6;
	this.rotSpeed = Math.PI / 70;
}
Player.prototype = new Entity; //Load generic entity functions
Player.prototype.move = function() {
	var keyStates = window.game.getKeyStates();
	if(!keyStates.w && !keyStates.s && !keyStates.a && !keyStates.d) return;
	var playerAngleOffset = 0;
	if(keyStates.s) {
		playerAngleOffset = -Math.PI;
	}
	if(keyStates.a) {
		this.angle -= this.rotSpeed;
	}
	if(keyStates.d) {
		this.angle += this.rotSpeed;
	}
	if(this.angle > window.TWO_PI) {
		this.angle -= window.TWO_PI;
	} else if(this.angle < 0) {
		this.angle += window.TWO_PI;
	}
	if(playerAngleOffset !== 0 || keyStates.w) {
		var cx = Math.cos(this.angle + playerAngleOffset) * this.speed;
		var cy = Math.sin(this.angle + playerAngleOffset) * this.speed;
		this.x += cx;
		this.y += cy;
	}
};
Player.prototype.frameAction = function() {
	this.move();
};