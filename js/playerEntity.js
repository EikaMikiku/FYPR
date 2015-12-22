function Player(x, y, angle) {
	this.base = Entity;
	this.base(x, y, "player", angle, 60 * Math.PI / 180);
	this.runSpeed = 0.8;
	this.walkSpeed = 0.4;
	this.moveSpeed = this.runSpeed;
	this.height = 5;
	this.rotSpeed = Math.PI / 70;
	this.mouseLock = false;
	this.interactDistance = 15;
	this.showingInteractHelp = false;
	this.interactHelpElem = document.getElementById("interactHelp");
	this.interactPadding = 200;
	this.hp = 100;
	this.hpInfo = document.getElementById("hpInfo");
	this.hpInfo.textContent = this.hp;
	this.bloodScreen = document.getElementById("bloodScreen");
	this.head = document.getElementById("playerHead");
	this.headAction = "idle";
	this.prevHeadAction = null;
	this.attackedTimer = null;
	this.weapon = "shotgun";
	this.weaponAction = "idle";
	this.currentShootSpriteId = 0;
	this.shootSpriteStartFrame = 0;
	this.weaponSwayX = 0;
	this.weaponSwayY = 0;
	this.weaponSwayMaxX = 30;
	this.weaponSwayMaxY = 10;
	this.moving = false;
	this.mouse0Down = false;
	this.swayDelta = 0;
	var pointerLockElement = null;

	document.addEventListener("pointerlockchange", onPointerLockChange.bind(this));
	document.addEventListener("mozpointerlockchange", onPointerLockChange.bind(this));
	document.addEventListener("keyup", function(e) {
		if(e.keyCode === 69) {
			e.preventDefault();
			attemptInteract(this);
		} else if(e.keyCode === 16) {
			e.preventDefault();
			if(this.moveSpeed === this.runSpeed) {
				this.moveSpeed = this.walkSpeed;
			} else {
				this.moveSpeed = this.runSpeed;
			}
		}
	}.bind(this));

	function attemptInteract(that) {
		var npcs = window.game.npcs;
		var minDist = Infinity;
		var minDistNpc = null;
		var allowedDistance = that.interactDistance * that.interactDistance;
		for(var i = 0; i < npcs.length; i++) {
			var npc = npcs[i];
			if(npc.interactable && npc.hp > 0 && that.isPointingAtNpc(npc)) {
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
		if(minDistNpc) {
			minDistNpc.getInteracted(that.angle);
		}
	}

	function onPointerLockChange() {
		var elem = document.pointerLockElement || document.mozPointerLockElement;
		if(elem) {
			pointerLockElement = elem;
			this.mouseLock = true;
			elem.onmousemove = mouseRotate.bind(this);
			elem.onmousedown = mouseDownHandler.bind(this);
			elem.onmouseup = mouseUpHandler.bind(this);
		} else {
			this.mouseLock = false;
			if(pointerLockElement) {
				pointerLockElement.onmousemove = null;
			}
		}
	}

	function mouseDownHandler(e) {
		if(e.button === 0) {
			this.mouse0Down = true;
		}
	}
	function mouseUpHandler(e) {
		if(e.button === 0) {
			this.mouse0Down = false;
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
	this.moving = false;
	if(!keyStates.w && !keyStates.s && !keyStates.a && !keyStates.d) {
		return;
	}
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
		this.moving = true;
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
		this.moving = true;
		var cx = Math.cos(this.angle + playerAngleOffset) * this.moveSpeed;
		var cy = Math.sin(this.angle + playerAngleOffset) * this.moveSpeed;
		var newPos = this.collisionPass(cx, cy);
		this.x = newPos.x;
		this.y = newPos.y;
	}
};
Player.prototype.frameAction = function() {
	this.move();
	this.decreaseBloodScreen();
	this.updateHead();
	if(this.mouse0Down) {
		this.shoot();
	}
	if(this.weaponAction === "idle") {
		this.updateWeaponSway();
	} else {
		this.updateWeaponShootSprite();
	}
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
Player.prototype.getHit = function(npc) {
	this.hp -= npc.damage;
	if(this.hp <= 0) {
		this.headAction = "dead";
		this.updateHead();
		window.game.gameOver();
	}
	this.hpInfo.textContent = this.hp;
	this.bloodScreen.style.opacity = parseFloat(this.bloodScreen.style.opacity) + npc.damage / 20;
	var newHeadAction = "attacked";
	if(npc.damage > 20 || this.hp < 30) {
		newHeadAction = "surprised";
	}
	this.headAction = newHeadAction;
	if(this.attackedTimer) {
		//Clear previous timer, so that idle wouldnt pop up out of nowhere
		clearTimeout(this.attackedTimer); 
	}
	this.attackedTimer = setTimeout(function() {
		this.attackedTimer = null;
		this.headAction = "idle";
		this.prevHeadAction = "attacked";
	}.bind(this), 1000);
};
Player.prototype.decreaseBloodScreen = function() {
	this.bloodScreen.style.opacity = parseFloat(this.bloodScreen.style.opacity) - parseFloat(this.bloodScreen.style.opacity) / 45;
};
Player.prototype.updateHead = function() {
	var healthStatus = "none";
	if(this.hp < 30) {
		healthStatus = "extreme";
	} else if(this.hp < 50) {
		healthStatus = "high";
	} else if(this.hp < 75) {
		healthStatus = "medium";
	} else if(this.hp < 90) {
		healthStatus = "low";
	}
	if(this.headAction === "idle" && this.prevHeadAction !== "idle") {
		this.prevHeadAction = "idle";
		this.head.src = "img/sprites/player/" + healthStatus + "/idle.gif";
	} else if(this.headAction === "attacked" && this.prevHeadAction !== "attacked") {
		this.prevHeadAction = "attacked";
		this.head.src = "img/sprites/player/" + healthStatus + "/attacked.png";
	} else if(this.headAction === "surprised" && this.prevHeadAction !== "surprised") {
		this.prevHeadAction = "surprised";
		this.head.src = "img/sprites/player/" + healthStatus + "/omg.png";
	} else if(this.headAction === "dead") {
		this.head.src = "img/sprites/player/dead.png";
	}
};
Player.prototype.updateWeaponSway = function() {
	if(this.moving) {
		this.weaponSwayY = this.weaponSwayMaxY * Math.sin(this.swayDelta / this.weaponSwayMaxY);
		this.weaponSwayX = this.weaponSwayMaxX * Math.sin(this.swayDelta / this.weaponSwayMaxX);
		this.swayDelta++;
	} else {
		this.weaponSwayX *= 0.9;
		this.weaponSwayY *= 0.9;
		this.swayDelta = 0;
	}
};
Player.prototype.shoot = function() {
	if(this.weaponAction !== "shoot") {
		this.weaponAction = "shoot";
		this.currentShootSpriteId = 0;
		this.shootSpriteStartFrame = window.game.frameCount;
	}
};
Player.prototype.updateWeaponShootSprite = function() {
	var spriteLength = SPRITES["weapons"][this.weapon].delays[this.currentShootSpriteId];
	var attackFrame = SPRITES["weapons"][this.weapon].attackFrame;
	if(this.currentShootSpriteId+1 == attackFrame.startFrame && window.game.frameCount - this.shootSpriteStartFrame == attackFrame.frameId) {
		this.attemptAttackNpc();
	}
	if(this.shootSpriteStartFrame + spriteLength <= window.game.frameCount) {
		//Change sprite
		this.currentShootSpriteId++;
		if(this.currentShootSpriteId === SPRITES["weapons"][this.weapon].frameCount) {
			this.currentShootSpriteId = 0;
			this.weaponAction = "idle";
		}
		this.shootSpriteStartFrame = window.game.frameCount;
	}
}
Player.prototype.attemptAttackNpc = function() {
	var validNpcs = [];
	for(var i = 0; i < window.game.npcs.length; i++) {
		var npc = window.game.npcs[i];
		if(npc.hp > 0 && this.isPointingAtNpc(npc) && this.isPointNotBlocked(npc.x, npc.y)) {
			validNpcs.push(npc);
		}
	}
	var minDistNpc = null;
	var minDist = Infinity;
	for(var i = 0; i < validNpcs.length; i++) {
		var npc = validNpcs[i];
		var diffX = npc.x - this.x;
		var diffY = npc.y - this.y;
		var dist = diffX*diffX + diffY*diffY;
		if(dist < minDist) {
			minDist = dist;
			minDistNpc = npc;
		}
	}
	if(minDistNpc) {
		var dmg = SPRITES["weapons"][this.weapon].damageCalculation(Math.sqrt(minDist));
		minDistNpc.takeDamage(dmg);
	}
};
Player.prototype.isPointingAtNpc = function(npc) {
	var canvasXCenter = window.game.getGameCanvas().width / 2;
	if(npc.renderInfo.xDrawOffset + npc.renderInfo.xDrawWidth > canvasXCenter) {
		if(npc.renderInfo.xDrawOffset < canvasXCenter) {
			return true;
		}
	}
	return false;
}