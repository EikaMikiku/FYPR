function Player(x, y, angle) {
	this.base = Entity;
	this.base(x, y, "player", angle);
	this.moveSpeed = 0.8;
	this.height = 5;
	this.fov = 60 * Math.PI / 180;
	this.rotSpeed = Math.PI / 70;
	this.mouseLock = false;
	var pointerLockElement = null;

	document.addEventListener('pointerlockchange', function() {
		if(document.pointerLockElement) {
			pointerLockElement = document.pointerLockElement;
			this.mouseLock = true;
			pointerLockElement.onmousemove = mouseRotate.bind(this);
		} else {
			this.mouseLock = false;
			pointerLockElement.onmousemove = null;
		}
	}.bind(this));

	function mouseRotate(e) {
		this.angle += e.movementX / 360;
		if(this.angle > Math.PI*2) {
			this.angle -= Math.PI*2;
		} else if(this.angle < 0) {
			this.angle += Math.PI*2;
		}
	};
}
Player.prototype = new Entity; //Load generic entity functions
Player.prototype.move = function() {
	var keyStates = window.game.getKeyStates();
	if(!keyStates.w && !keyStates.s && !keyStates.a && !keyStates.d) return;
	var playerAngleOffset = 0;
	if(keyStates.s) {
		playerAngleOffset = -Math.PI;
	}
	if(!this.mouseLock) {
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
	} else {
		if(keyStates.d) {
			playerAngleOffset = Math.PI / 2;	
		} else if(keyStates.a) {
			playerAngleOffset = -Math.PI / 2;
		}
		if(keyStates.w && keyStates.d) {
			playerAngleOffset = Math.PI / 4;
		} else if(keyStates.w && keyStates.a) {
			playerAngleOffset = -Math.PI / 4;
		}
		if(keyStates.s && keyStates.d) {
			playerAngleOffset = Math.PI * 3 / 4;
		} else if(keyStates.s && keyStates.a) {
			playerAngleOffset = -Math.PI * 3 / 4;
		}
	}
	if(keyStates.s || keyStates.w || (this.mouseLock && (keyStates.d || keyStates.a))) {
		var cx = Math.cos(this.angle + playerAngleOffset) * this.moveSpeed;
		var cy = Math.sin(this.angle + playerAngleOffset) * this.moveSpeed;
		var newPos = this.collisionPass(cx, cy);
		this.x = newPos.x;
		this.y = newPos.y;
	}
};
Player.prototype.frameAction = function() {
	this.move();
};