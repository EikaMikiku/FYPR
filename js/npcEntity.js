function Npc(obj) {
	this.base = Entity;
	this.base(obj.x, obj.y, "npc", obj.angle, obj.fov);
	this.moveSpeed = obj.moveSpeed;
	this.roamSpeed = obj.roamSpeed;
	this.originX = obj.x;
	this.originY = obj.y;
	this.npcName = obj.npcName;
	this.spriteName = obj.spriteName;
	this.aggressive = obj.aggressive;
	this.roaming = obj.isRoaming;
	this.attackRange = obj.attackRange;
	this.viewRange = obj.viewRange;
	this.hp = obj.hp;
	this.action = "idle";
	this.currentSpriteId = 0;
	this.spriteStartFrame = 0;
	this.currentRoamTarget = null;
	this.currentRoamTargetAngle = null;
	this.reachedRoamTarget = true; //This will setup roam target at start if needed
	this.roamDist = obj.roamDist;
	this.roamTargetMargin = 3*3; //To avoid sqrt
	this.minimapColor = obj.minimapColor;
	this.attacking = false;
	this.interactable = obj.interactable;
	this.interactiveText = obj.interactiveText;
	this.interactionId = 0;
}
Npc.prototype = new Entity; //Load generic entity functions
Npc.prototype.updateSprite = function() {
	var spriteLength = SPRITES[this.spriteName][this.action].delays[this.currentSpriteId];
	if(this.spriteStartFrame + spriteLength <= window.game.frameCount) {
		//Change sprite
		this.currentSpriteId++;
		if(this.currentSpriteId == SPRITES[this.spriteName][this.action].frameCount) {
			this.currentSpriteId = 0;
		}
		this.spriteStartFrame = window.game.frameCount;
	}
};
Npc.prototype.move = function() {
	if(this.roaming) {
		this.action = "walk";
		if(this.reachedRoamTarget) {
			this.reachedRoamTarget = false;
			//Setup a new target
			do {
				this.currentRoamTarget = {
					"x": this.originX + Math.random()*(this.roamDist*2) - this.roamDist,
					"y": this.originY + Math.random()*(this.roamDist*2) - this.roamDist
				};
			} while(!this.isPointNotBlocked(this.currentRoamTarget.x, this.currentRoamTarget.y));

			var diffX = this.currentRoamTarget.x - this.x;
			var diffY = this.currentRoamTarget.y - this.y;
			this.angle = Math.atan2(diffY, diffX);
		}

		var cx = Math.cos(this.angle) * this.roamSpeed;
		var cy = Math.sin(this.angle) * this.roamSpeed;
		//Dont need collision check when roaming, potential unreachable target
		//And the target chosen should be directly obtainable
		this.x += cx;
		this.y += cy;
		diffX = this.x - this.currentRoamTarget.x;
		diffY = this.y - this.currentRoamTarget.y;
		if(diffX*diffX + diffY*diffY < this.roamTargetMargin) {
			this.reachedRoamTarget = true;
		}
		if(this.isPlayerVisible(window.game.getPlayer().x, window.game.getPlayer().y)) {
			this.roaming = false;
			this.attacking = true;
		}
	}
	if(this.attacking) {
		var diffX = window.game.getPlayer().x - this.x;
		var diffY = window.game.getPlayer().y - this.y;
		this.angle = Math.atan2(diffY, diffX);
		var cx = Math.cos(this.angle) * this.moveSpeed;
		var cy = Math.sin(this.angle) * this.moveSpeed;
		var posInfo = this.collisionPass(cx, cy);
		this.x = posInfo.x;
		this.y = posInfo.y;
		if(!this.isPlayerVisible()) {
			this.originX = this.x;
			this.originY = this.y;
			this.roaming = true;
			this.reachedRoamTarget = true;
			this.attacking = false;
		}
	}
};
Npc.prototype.isPlayerVisible = function() {
	var player = window.game.getPlayer();
	var dist = this.isPointNotBlocked(player.x, player.y);
	//if player falls into npc view range
	if(dist && this.viewRange - dist > 0) {
		//Check if player falls into npc FOV
		var diffx = this.x - player.x;
		var diffy = this.y - player.y;
		var angDiff = Math.atan2(diffy, diffx) - this.angle + window.TWO_PI;
		angDiff %= window.TWO_PI;
		//Math.PI = looking straight at me
		//therefore Math.PI -halfFov is edge and +halfFov is another edge
		var halfFov = this.fov / 2;
		return angDiff > Math.PI-halfFov && angDiff < Math.PI+halfFov;
	}
	return false;
};
Npc.prototype.frameAction = function() {
	this.move();
	this.updateSprite();
};
Npc.prototype.getInteracted = function(interactorAngle) {
	this.angle = interactorAngle + Math.PI;
	this.angle %= window.TWO_PI;

	var date = new Date();
	var sec = date.getSeconds();
	sec = sec < 10 ? "0"+sec : sec;
	var min = date.getMinutes();
	min = min < 10 === 1 ? "0"+min : min;
	var hour = date.getHours();
	hour = hour < 10 === 1 ? "0"+hour : hour;
	var dateStr = "["+hour+":"+min+":"+sec+"]"
	this.say(dateStr + " " + this.npcName + ": " + this.interactiveText[this.interactionId++]);
	if(this.interactionId === this.interactiveText.length) {
		this.interactionId = 0;
	}
};
Npc.prototype.say = function(text) {
	window.game.addToTerminal(text);
};