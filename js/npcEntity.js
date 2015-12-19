function Npc(obj) {
	this.base = Entity;
	this.base(obj.x, obj.y, "npc", obj.angle, obj.moveSpeed);
	this.npcName = obj.npcName;
	this.aggressive = obj.aggressive;
	this.roaming = obj.isRoaming;
	this.attackRange = obj.attackRange;
	this.viewRange = obj.viewRange;
	this.hp = obj.hp;
	this.action = "walk";
	this.currentSpriteId = 0;
	this.spriteStartFrame = 0;
}
Npc.prototype = new Entity; //Load generic entity functions
Npc.prototype.updateSprite = function() {
	var spriteLength = SPRITES[this.npcName][this.action].delays[this.currentSpriteId];
	if(this.spriteStartFrame + spriteLength <= window.game.frameCount) {
		//Change sprite
		this.currentSpriteId++;
		if(this.currentSpriteId == SPRITES[this.npcName][this.action].frameCount) {
			this.currentSpriteId = 0;
		}
		this.spriteStartFrame = window.game.frameCount;
	}
};
Npc.prototype.move = function() {
	this.angle += Math.PI / 70;
	var cx = Math.cos(this.angle) * this.speed;
	var cy = Math.sin(this.angle) * this.speed;
	var newPos = this.collisionPass(cx, cy);
	this.x = newPos.x;
	this.y = newPos.y;
	if(this.angle > window.TWO_PI) this.angle -= window.TWO_PI;
};
Npc.prototype.frameAction = function() {
	this.move();
	this.updateSprite();
};