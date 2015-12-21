function Loader() {

}
var Loader = (function() {
	var instance;
	function createInstance() {
		function Loader(){};
		var resourceCount = 97;
		var currentlyLoaded = 0;
		Loader.res = {
			"img": {
				"img/sprites/weapons/shotgun/idle.png": null,
				"img/sprites/weapons/shotgun/shoot_0.png": null,
				"img/sprites/weapons/shotgun/shoot_1.png": null,
				"img/sprites/weapons/shotgun/shoot_2.png": null,
				"img/sprites/weapons/shotgun/shoot_3.png": null,
				"img/sprites/weapons/shotgun/shoot_4.png": null,
				"img/sprites/weapons/shotgun/shoot_5.png": null,
				"img/sprites/weapons/shotgun/shoot_6.png": null,

				"img/wallTextures/lev0wall0.png": null,
				"img/wallTextures/lev0wall1.png": null,

				"img/sprites/player/none/idle.gif": null,
				"img/sprites/player/none/pickup.png": null,
				"img/sprites/player/none/attacked.png": null,
				"img/sprites/player/none/omg.png": null,
				"img/sprites/player/low/idle.gif": null,
				"img/sprites/player/low/pickup.png": null,
				"img/sprites/player/low/attacked.png": null,
				"img/sprites/player/low/omg.png": null,
				"img/sprites/player/medium/idle.gif": null,
				"img/sprites/player/medium/pickup.png": null,
				"img/sprites/player/medium/attacked.png": null,
				"img/sprites/player/medium/omg.png": null,
				"img/sprites/player/high/idle.gif": null,
				"img/sprites/player/high/pickup.png": null,
				"img/sprites/player/high/attacked.png": null,
				"img/sprites/player/high/omg.png": null,
				"img/sprites/player/extreme/idle.gif": null,
				"img/sprites/player/extreme/pickup.png": null,
				"img/sprites/player/extreme/attacked.png": null,
				"img/sprites/player/extreme/omg.png": null,
				"img/sprites/player/dead.png": null,
				"img/sprites/player/god.png": null,

				"img/sprites/marine/idle/0_0.png": null,
				"img/sprites/marine/idle/45_0.png": null,
				"img/sprites/marine/idle/90_0.png": null,
				"img/sprites/marine/idle/135_0.png": null,
				"img/sprites/marine/idle/180_0.png": null,
				"img/sprites/marine/idle/225_0.png": null,
				"img/sprites/marine/idle/270_0.png": null,
				"img/sprites/marine/idle/315_0.png": null,
				"img/sprites/marine/walk/0_0.png": null,
				"img/sprites/marine/walk/0_1.png": null,
				"img/sprites/marine/walk/0_2.png": null,
				"img/sprites/marine/walk/0_3.png": null,
				"img/sprites/marine/walk/45_0.png": null,
				"img/sprites/marine/walk/45_1.png": null,
				"img/sprites/marine/walk/45_2.png": null,
				"img/sprites/marine/walk/45_3.png": null,
				"img/sprites/marine/walk/90_0.png": null,
				"img/sprites/marine/walk/90_1.png": null,
				"img/sprites/marine/walk/90_2.png": null,
				"img/sprites/marine/walk/90_3.png": null,
				"img/sprites/marine/walk/135_0.png": null,
				"img/sprites/marine/walk/135_1.png": null,
				"img/sprites/marine/walk/135_2.png": null,
				"img/sprites/marine/walk/135_3.png": null,
				"img/sprites/marine/walk/180_0.png": null,
				"img/sprites/marine/walk/180_1.png": null,
				"img/sprites/marine/walk/180_2.png": null,
				"img/sprites/marine/walk/180_3.png": null,
				"img/sprites/marine/walk/225_0.png": null,
				"img/sprites/marine/walk/225_1.png": null,
				"img/sprites/marine/walk/225_2.png": null,
				"img/sprites/marine/walk/225_3.png": null,
				"img/sprites/marine/walk/270_0.png": null,
				"img/sprites/marine/walk/270_1.png": null,
				"img/sprites/marine/walk/270_2.png": null,
				"img/sprites/marine/walk/270_3.png": null,
				"img/sprites/marine/walk/315_0.png": null,
				"img/sprites/marine/walk/315_1.png": null,
				"img/sprites/marine/walk/315_2.png": null,
				"img/sprites/marine/walk/315_3.png": null,
				"img/sprites/marine/attack/0_0.png": null,
				"img/sprites/marine/attack/0_1.png": null,
				"img/sprites/marine/attack/45_0.png": null,
				"img/sprites/marine/attack/45_1.png": null,
				"img/sprites/marine/attack/90_0.png": null,
				"img/sprites/marine/attack/90_1.png": null,
				"img/sprites/marine/attack/135_0.png": null,
				"img/sprites/marine/attack/135_1.png": null,
				"img/sprites/marine/attack/180_0.png": null,
				"img/sprites/marine/attack/180_1.png": null,
				"img/sprites/marine/attack/225_0.png": null,
				"img/sprites/marine/attack/225_1.png": null,
				"img/sprites/marine/attack/270_0.png": null,
				"img/sprites/marine/attack/270_1.png": null,
				"img/sprites/marine/attack/315_0.png": null,
				"img/sprites/marine/attack/315_1.png": null,
				"img/sprites/marine/death/0.png": null,
				"img/sprites/marine/death/1.png": null,
				"img/sprites/marine/death/2.png": null,
				"img/sprites/marine/death/3.png": null,
				"img/sprites/marine/death/4.png": null,
				"img/sprites/marine/death/5.png": null,
				"img/sprites/marine/death/6.png": null,
				"img/sprites/marine/death/7.png": null,
				"img/sprites/marine/death/8.png": null,
				"img/sprites/marine/hitstun/0.png": null
			},
			"sounds": {

			}
		};
		
		Loader.load = function(done1cb, doneAllcb) {
			for(src in Loader.res.img) {
				var newImg = new Image();
				newImg.src = src;
				(function(img, src){
					img.onload = function() {
						Loader.res.img[src] = img;
						finishedLoadingResource(src, done1cb, doneAllcb);
					};
				})(newImg, src);
			}
			//load sounds
		};

		function finishedLoadingResource(src, oneCb, allCb) {
			currentlyLoaded++;
			oneCb(src);
			if(currentlyLoaded === resourceCount) {
				allCb();
			}
		}

		return Loader;
	}

	return function() {
		if(!instance) instance = createInstance();
		return instance;
	};
})();