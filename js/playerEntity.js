function Player(x, y, angle) {
	this.base = Entity;
	this.base(x, y, "player", angle, 60 * Math.PI / 180);
	this.moveSpeed = 0.8;
	this.height = 5;
	this.rotSpeed = Math.PI / 70;
	this.mouseLock = false;
	this.interactDistance = 15;
	this.showingInteractHelp = false;
	this.interactHelpElem = document.getElementById("interactHelp");
	var pointerLockElement = null;

	document.addEventListener("pointerlockchange", onPointerLockChange.bind(this));
	document.addEventListener("mozpointerlockchange", onPointerLockChange.bind(this));
	document.addEventListener("keyup", function(e) {
		if(e.keyCode === 69) {
			attemptInteract(this);
		}
	}.bind(this));

	function attemptInteract(that) {
		var npcs = window.game.npcs;
		var minDist = Infinity;
		var minDistNpc = null;
		var allowedDistance = that.interactDistance * that.interactDistance;
		for(var i = 0; i < npcs.length; i++) {
			var npc = npcs[i];
			if(!npc.aggressive) {
				var diffX = that.x - npc.x;
				var diffY = that.y - npc.y;
				var dist = diffX*diffX + diffY*diffY;
				if(dist < allowedDistance) {
					if(!minDistNpc || dist < minDist) {
						minDist = dist;
						minDistNpc = npc;
					}
				}
			}
		}
		if(minDistNpc && that.isNpcVisible(minDistNpc)) {
			minDistNpc.getInteracted(that.angle);
		}
	}

	function onPointerLockChange() {
		var elem = document.pointerLockElement || document.mozPointerLockElement;
		if(elem) {
			pointerLockElement = elem
			this.mouseLock = true;
			elem.onmousemove = mouseRotate.bind(this);
		} else {
			this.mouseLock = false;
			pointerLockElement.onmousemove = null;
		}
	}

	function mouseRotate(e) {
		var amount = e.movementX || e.mozMovementX;
		if(!amount) return;
		this.angle += amount / 360;
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
Player.prototype.isNpcVisible = function(npc) {
	var notBlocked = this.isPointNotBlocked(npc.x, npc.y);
	//if npc falls into range
	if(notBlocked) {
		//Check if npc falls into players FOV
		var diffx = this.x - npc.x;
		var diffy = this.y - npc.y;
		var angDiff = Math.atan2(diffy, diffx) - this.angle + window.TWO_PI;
		angDiff %= window.TWO_PI;
		//Math.PI = looking straight at me
		//therefore Math.PI -halfFov is edge and +halfFov is another edge
		var halfFov = this.fov / 2;
		return angDiff > Math.PI-halfFov && angDiff < Math.PI+halfFov;
	}
	return false;
};
Player.prototype.frameAction = function() {
	this.move();
};
Player.prototype.showInteractAvailable = function(npc) {
	if(!this.showingInteractHelp) {
		this.interactHelpElem.style.display = "block";
		this.showingInteractHelp = true;
	}
};
Player.prototype.hideInteractAvailable = function() {
	this.interactHelpElem.style.display = "none";
	this.showingInteractHelp = false;
};