function Npc(obj) {
	this.base = Entity;
	var npcData = SPRITES[obj.spriteName];
	this.base(obj.x, obj.y, "npc", obj.angle, obj.fov);
	this.moveSpeed = obj.moveSpeed || npcData.moveSpeed;
	this.roamSpeed = obj.roamSpeed || npcData.roamSpeed;
	this.isPickup = npcData.ispickup || false;
	this.onpickup = npcData.onpickup || null;
	this.originX = obj.x;
	this.originY = obj.y;
	this.npcName = obj.npcName;
	this.spriteName = obj.spriteName;
	this.aggressive = obj.aggressive;
	this.roaming = obj.isRoaming;
	this.attackRange = obj.attackRange || npcData.attackRange;
	this.viewRange = obj.viewRange || npcData.viewRange;
	this.missChance = obj.missChance || npcData.missChance;
	this.damage = obj.damage || npcData.damage;
	this.hp = obj.hp || npcData.hp;
	this.canAttack = false;
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
	this.interactions = obj.interactions;
	this.interactionId = 0;
	this.hitstunChance = obj.hitstunChance || npcData.hitstunChance;
	this.renderInfo = {}; //This is populated from raycaster
	this.sounds = npcData.sounds;
	this.pointsWorth = npcData.pointsWorth;
}
Npc.prototype = new Entity; //Load generic entity functions
Npc.prototype.updateSprite = function() {
	var spriteLength = SPRITES[this.spriteName][this.action].delays[this.currentSpriteId];
	if(this.spriteStartFrame + spriteLength <= window.game.frameCount) {
		//Change sprite
		this.currentSpriteId++;
		if(this.currentSpriteId === SPRITES[this.spriteName][this.action].frameCount) {
			this.currentSpriteId = 0;
			if(this.action === "hitstun") {
				this.action = null;
				this.move(); //decide action
			}
		}
		this.spriteStartFrame = window.game.frameCount;
	}
};
Npc.prototype.move = function() {
	if(this.hp <= 0) {
		this.action = "death";
		return;
	}
	if(this.roaming && this.action !== "hitstun") {
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
		if(this.aggressive && this.isPlayerVisible()) {
			this.roaming = false;
			this.attacking = true;
			this.currentSpriteId = 0;
		}
	} else if(this.aggressive && !this.attacking) {
		if(this.isPlayerVisible()) {
			this.roaming = false;
			this.attacking = true;
			this.currentSpriteId = 0;
		}
	}
	if(this.attacking && this.action !== "hitstun") {
		var diffX = window.game.getPlayer().x - this.x;
		var diffY = window.game.getPlayer().y - this.y;
		var dist = Math.sqrt(diffX*diffX + diffY*diffY);
		this.angle = Math.atan2(diffY, diffX);
		if(dist < this.attackRange || (this.action === "attack" && this.currentSpriteId != 0)) {
			if(this.action !== "attack") {
				this.action = "attack";
				this.currentSpriteId = 0;	
			}
			var attackFrame = SPRITES[this.spriteName][this.action].attackFrame;
			if(this.currentSpriteId == attackFrame.frameId && window.game.frameCount - this.spriteStartFrame == attackFrame.frameId) {
				this.attackPlayer();
			}
		} else {
			if(this.action !== "walk") {
				this.action = "walk";
				this.currentSpriteId = 0;
			}
			var cx = Math.cos(this.angle) * this.moveSpeed;
			var cy = Math.sin(this.angle) * this.moveSpeed;
			var posInfo = this.collisionPass(cx, cy);
			this.x = posInfo.x;
			this.y = posInfo.y;
		}
		if(!this.isPlayerVisible()) {
			this.currentSpriteId = 0;
			this.originX = this.x;
			this.originY = this.y;
			this.roaming = true;
			this.reachedRoamTarget = true;
			this.attacking = false;
		}
	}
};
Npc.prototype.attackPlayer = function() {
	if(this.isPickup) {
		this.onpickup(this, window.game.getPlayer());
		return;
	}
	SoundManager().playSound(this.sounds.attack, this.x, this.y);
	if(Math.random() > this.missChance) {
		window.game.getPlayer().getHit(this);
	}
};
Npc.prototype.isPlayerVisible = function() {
	var player = window.game.getPlayer();
	var dist = this.isPointNotBlocked(player.x, player.y);
	//if player falls into npc view range
	if(dist && this.viewRange - dist > 0) {
		//Check if player falls into npc FOV
		var diffX = this.x - player.x;
		var diffY = this.y - player.y;
		var angDiff = Math.atan2(diffY, diffX) - this.angle + window.TWO_PI;
		angDiff %= window.TWO_PI;
		//Math.PI = looking straight at me
		//therefore Math.PI -halfFov is edge and +halfFov is another edge
		var halfFov = this.fov / 2;
		return angDiff > Math.PI-halfFov && angDiff < Math.PI+halfFov;
	}
	return false;
};
Npc.prototype.frameAction = function() {
	this.updateSprite();
	this.move();
};
Npc.prototype.getInteracted = function(interactorAngle) {
	this.angle = interactorAngle + Math.PI;
	this.angle %= window.TWO_PI;
	this.interaction();
};
Npc.prototype.say = function(text, doneCB, timer) {
	var date = new Date();
	var sec = date.getSeconds();
	sec = sec < 10 ? "0"+sec : sec;
	var min = date.getMinutes();
	min = min < 10 ? "0"+min : min;
	var hour = date.getHours();
	hour = hour < 10 ? "0"+hour : hour;
	var dateStr = "["+hour+":"+min+":"+sec+"]";
	window.game.addToTerminal(dateStr + " " + this.npcName + ": " + text, doneCB, timer);
};
Npc.prototype.interaction = function() {
	var interaction = this.interactions[this.interactionId];
	this.interactable = false;
	interaction(this, function() {
		this.interactionId++;
		if(this.interactionId === this.interactions.length) {
			this.interactable = false;
		} else {
			this.interactable = true;
		}
	}.bind(this));
};
Npc.prototype.takeDamage = function(dmg) {
	this.hp -= dmg;
	if(this.hp <= 0) {
		if(this.ondeath) {
			this.ondeath();
		}
		window.game.points += this.pointsWorth;
		SoundManager().playSound(this.sounds.death, this.x, this.y);
	}
	if(Math.random() < this.hitstunChance) {
		SoundManager().playSound(this.sounds.injury, this.x, this.y);
		this.action = "hitstun";
		this.currentSpriteId = 0;
		this.spriteStartFrame = window.game.frameCount;
	}
	this.aggressive = true;
	this.attacking = true;

}