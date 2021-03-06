var Loader = (function() {
	var instance;
	function createInstance() {
		function Loader(){};
		Loader.res = {
			"img": {
				"img/sprites/smallhppack/idle/0.png": null,
				"img/sprites/smallhppack/walk/0.png": null,
				"img/sprites/smallhppack/attack/0.png": null,
				"img/sprites/smallhppack/death/0.png": null,
				"img/sprites/smallhppack/hitstun/0.png": null,

				"img/sprites/weapons/pistol/idle.png": null,
				"img/sprites/weapons/pistol/shoot_0.png": null,
				"img/sprites/weapons/pistol/shoot_1.png": null,
				"img/sprites/weapons/pistol/shoot_2.png": null,
				"img/sprites/weapons/pistol/small.png": null,

				"img/sprites/weapons/shotgun1/idle.png": null,
				"img/sprites/weapons/shotgun1/shoot_0.png": null,
				"img/sprites/weapons/shotgun1/shoot_1.png": null,
				"img/sprites/weapons/shotgun1/shoot_2.png": null,
				"img/sprites/weapons/shotgun1/shoot_3.png": null,
				"img/sprites/weapons/shotgun1/shoot_4.png": null,
				"img/sprites/weapons/shotgun1/shoot_5.png": null,
				"img/sprites/weapons/shotgun1/shoot_6.png": null,
				"img/sprites/weapons/shotgun1/small.png": null,

				"img/sprites/weapons/shotgun2/idle.png": null,
				"img/sprites/weapons/shotgun2/shoot_0.png": null,
				"img/sprites/weapons/shotgun2/shoot_1.png": null,
				"img/sprites/weapons/shotgun2/shoot_2.png": null,
				"img/sprites/weapons/shotgun2/shoot_3.png": null,
				"img/sprites/weapons/shotgun2/shoot_4.png": null,
				"img/sprites/weapons/shotgun2/shoot_5.png": null,
				"img/sprites/weapons/shotgun2/shoot_6.png": null,
				"img/sprites/weapons/shotgun2/small.png": null,

				"img/sprites/weapons/machinegun/idle.png": null,
				"img/sprites/weapons/machinegun/shoot_0.png": null,
				"img/sprites/weapons/machinegun/shoot_1.png": null,
				"img/sprites/weapons/machinegun/small.png": null,

				"img/wallTextures/lev0wall0.png": null,
				"img/wallTextures/lev0wall1.png": null,
				"img/wallTextures/lev0wall2.png": null,
				"img/wallTextures/lev0wall3.png": null,
				"img/wallTextures/lev0wall4.png": null,
				"img/wallTextures/lev0wall5.png": null,
				"img/wallTextures/lev0wall6.png": null,
				"img/wallTextures/lev0wall7.png": null,
				"img/wallTextures/lev0wall8.png": null,
				"img/wallTextures/lev0wall9.png": null,
				"img/wallTextures/lev0wall10.png": null,
				"img/wallTextures/lev0wall11.png": null,
				"img/wallTextures/lev0wall12.png": null,
				"img/wallTextures/lev0wall13.png": null,
				"img/wallTextures/lev0wall14.png": null,
				"img/wallTextures/lev0wall15.png": null,
				"img/wallTextures/lev0wall16.png": null,

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
				"img/sprites/marine/hitstun/0.png": null,

				"img/sprites/demon/idle/0_0.png": null,
				"img/sprites/demon/idle/45_0.png": null,
				"img/sprites/demon/idle/90_0.png": null,
				"img/sprites/demon/idle/135_0.png": null,
				"img/sprites/demon/idle/180_0.png": null,
				"img/sprites/demon/idle/225_0.png": null,
				"img/sprites/demon/idle/270_0.png": null,
				"img/sprites/demon/idle/315_0.png": null,
				"img/sprites/demon/walk/0_0.png": null,
				"img/sprites/demon/walk/0_1.png": null,
				"img/sprites/demon/walk/0_2.png": null,
				"img/sprites/demon/walk/0_3.png": null,
				"img/sprites/demon/walk/45_0.png": null,
				"img/sprites/demon/walk/45_1.png": null,
				"img/sprites/demon/walk/45_2.png": null,
				"img/sprites/demon/walk/45_3.png": null,
				"img/sprites/demon/walk/90_0.png": null,
				"img/sprites/demon/walk/90_1.png": null,
				"img/sprites/demon/walk/90_2.png": null,
				"img/sprites/demon/walk/90_3.png": null,
				"img/sprites/demon/walk/135_0.png": null,
				"img/sprites/demon/walk/135_1.png": null,
				"img/sprites/demon/walk/135_2.png": null,
				"img/sprites/demon/walk/135_3.png": null,
				"img/sprites/demon/walk/180_0.png": null,
				"img/sprites/demon/walk/180_1.png": null,
				"img/sprites/demon/walk/180_2.png": null,
				"img/sprites/demon/walk/180_3.png": null,
				"img/sprites/demon/walk/225_0.png": null,
				"img/sprites/demon/walk/225_1.png": null,
				"img/sprites/demon/walk/225_2.png": null,
				"img/sprites/demon/walk/225_3.png": null,
				"img/sprites/demon/walk/270_0.png": null,
				"img/sprites/demon/walk/270_1.png": null,
				"img/sprites/demon/walk/270_2.png": null,
				"img/sprites/demon/walk/270_3.png": null,
				"img/sprites/demon/walk/315_0.png": null,
				"img/sprites/demon/walk/315_1.png": null,
				"img/sprites/demon/walk/315_2.png": null,
				"img/sprites/demon/walk/315_3.png": null,
				"img/sprites/demon/attack/0_0.png": null,
				"img/sprites/demon/attack/0_1.png": null,
				"img/sprites/demon/attack/0_2.png": null,
				"img/sprites/demon/attack/45_0.png": null,
				"img/sprites/demon/attack/45_1.png": null,
				"img/sprites/demon/attack/45_2.png": null,
				"img/sprites/demon/attack/90_0.png": null,
				"img/sprites/demon/attack/90_1.png": null,
				"img/sprites/demon/attack/90_2.png": null,
				"img/sprites/demon/attack/135_0.png": null,
				"img/sprites/demon/attack/135_1.png": null,
				"img/sprites/demon/attack/135_2.png": null,
				"img/sprites/demon/attack/180_0.png": null,
				"img/sprites/demon/attack/180_1.png": null,
				"img/sprites/demon/attack/180_2.png": null,
				"img/sprites/demon/attack/225_0.png": null,
				"img/sprites/demon/attack/225_1.png": null,
				"img/sprites/demon/attack/225_2.png": null,
				"img/sprites/demon/attack/270_0.png": null,
				"img/sprites/demon/attack/270_1.png": null,
				"img/sprites/demon/attack/270_2.png": null,
				"img/sprites/demon/attack/315_0.png": null,
				"img/sprites/demon/attack/315_1.png": null,
				"img/sprites/demon/attack/315_2.png": null,
				"img/sprites/demon/death/0.png": null,
				"img/sprites/demon/death/1.png": null,
				"img/sprites/demon/death/2.png": null,
				"img/sprites/demon/death/3.png": null,
				"img/sprites/demon/death/4.png": null,
				"img/sprites/demon/death/5.png": null,
				"img/sprites/demon/hitstun/0.png": null,

				"img/sprites/commando/idle/0_0.png": null,
				"img/sprites/commando/idle/45_0.png": null,
				"img/sprites/commando/idle/90_0.png": null,
				"img/sprites/commando/idle/135_0.png": null,
				"img/sprites/commando/idle/180_0.png": null,
				"img/sprites/commando/idle/225_0.png": null,
				"img/sprites/commando/idle/270_0.png": null,
				"img/sprites/commando/idle/315_0.png": null,
				"img/sprites/commando/walk/0_0.png": null,
				"img/sprites/commando/walk/0_1.png": null,
				"img/sprites/commando/walk/0_2.png": null,
				"img/sprites/commando/walk/0_3.png": null,
				"img/sprites/commando/walk/45_0.png": null,
				"img/sprites/commando/walk/45_1.png": null,
				"img/sprites/commando/walk/45_2.png": null,
				"img/sprites/commando/walk/45_3.png": null,
				"img/sprites/commando/walk/90_0.png": null,
				"img/sprites/commando/walk/90_1.png": null,
				"img/sprites/commando/walk/90_2.png": null,
				"img/sprites/commando/walk/90_3.png": null,
				"img/sprites/commando/walk/135_0.png": null,
				"img/sprites/commando/walk/135_1.png": null,
				"img/sprites/commando/walk/135_2.png": null,
				"img/sprites/commando/walk/135_3.png": null,
				"img/sprites/commando/walk/180_0.png": null,
				"img/sprites/commando/walk/180_1.png": null,
				"img/sprites/commando/walk/180_2.png": null,
				"img/sprites/commando/walk/180_3.png": null,
				"img/sprites/commando/walk/225_0.png": null,
				"img/sprites/commando/walk/225_1.png": null,
				"img/sprites/commando/walk/225_2.png": null,
				"img/sprites/commando/walk/225_3.png": null,
				"img/sprites/commando/walk/270_0.png": null,
				"img/sprites/commando/walk/270_1.png": null,
				"img/sprites/commando/walk/270_2.png": null,
				"img/sprites/commando/walk/270_3.png": null,
				"img/sprites/commando/walk/315_0.png": null,
				"img/sprites/commando/walk/315_1.png": null,
				"img/sprites/commando/walk/315_2.png": null,
				"img/sprites/commando/walk/315_3.png": null,
				"img/sprites/commando/attack/0_0.png": null,
				"img/sprites/commando/attack/0_1.png": null,
				"img/sprites/commando/attack/45_0.png": null,
				"img/sprites/commando/attack/45_1.png": null,
				"img/sprites/commando/attack/90_0.png": null,
				"img/sprites/commando/attack/90_1.png": null,
				"img/sprites/commando/attack/135_0.png": null,
				"img/sprites/commando/attack/135_1.png": null,
				"img/sprites/commando/attack/180_0.png": null,
				"img/sprites/commando/attack/180_1.png": null,
				"img/sprites/commando/attack/225_0.png": null,
				"img/sprites/commando/attack/225_1.png": null,
				"img/sprites/commando/attack/270_0.png": null,
				"img/sprites/commando/attack/270_1.png": null,
				"img/sprites/commando/attack/315_0.png": null,
				"img/sprites/commando/attack/315_1.png": null,
				"img/sprites/commando/death/0.png": null,
				"img/sprites/commando/death/1.png": null,
				"img/sprites/commando/death/2.png": null,
				"img/sprites/commando/death/3.png": null,
				"img/sprites/commando/death/4.png": null,
				"img/sprites/commando/death/5.png": null,
				"img/sprites/commando/death/6.png": null,
				"img/sprites/commando/hitstun/0.png": null,
				
				"img/sprites/san/idle/0.png": null,
				"img/sprites/san/idle/1.png": null,
				"img/sprites/san/idle/2.png": null,
				"img/sprites/san/idle/3.png": null,
				"img/sprites/san/idle/4.png": null,
				"img/sprites/san/idle/5.png": null,
				"img/sprites/san/idle/6.png": null,
				"img/sprites/san/idle/7.png": null,
				"img/sprites/san/idle/8.png": null,
				"img/sprites/san/idle/9.png": null,
				"img/sprites/san/death/0.png": null,
				"img/sprites/san/death/1.png": null,
				"img/sprites/san/death/2.png": null,
				"img/sprites/san/death/3.png": null,
				"img/sprites/san/death/4.png": null,
				"img/sprites/san/death/5.png": null,
				"img/sprites/san/death/6.png": null,
				"img/sprites/san/death/7.png": null,
				"img/sprites/san/death/8.png": null,
				"img/sprites/san/death/9.png": null,
				"img/sprites/san/death/10.png": null,
				"img/sprites/san/death/11.png": null,
				"img/sprites/san/death/12.png": null,
				"img/sprites/san/hitstun/0.png": null,
				"img/sprites/san/walk/0.png": null,
				"img/sprites/san/walk/1.png": null,
				"img/sprites/san/attack/0.png": null,
				"img/sprites/san/attack/1.png": null,
				"img/sprites/san/attack/2.png": null,
			},
			"sounds": {
				"sounds/commandodeath.wav": null,
				"sounds/demonattack.wav": null,
				"sounds/demondeath.wav": null,
				"sounds/demoninjured.wav": null,
				"sounds/marinedeath.wav": null,
				"sounds/marineinjured.wav": null,
				"sounds/pistol.wav": null,
				"sounds/sanattack.wav": null,
				"sounds/sandeath.wav": null,
				"sounds/saninjured.wav": null,
				"sounds/shotgun1.wav": null,
				"sounds/shotgun2.wav": null
			}
		};

		var currentlyLoaded = 0;
		var loaderScreen = document.getElementById("loaderScreen");
		var loaderLoadedBar = document.getElementById("loaderLoadedBar");
		var loaderText = document.getElementById("loaderText");
		var resourceCount = Object.keys(Loader.res.img).length;
		resourceCount += Object.keys(Loader.res.sounds).length;

		Loader.load = function(doneAllcb) {
			for(src in Loader.res.img) {
				var newImg = new Image();
				newImg.src = src;
				(function(img, src){
					img.onload = function() {
						Loader.res.img[src] = img;
						finishedLoadingResource(src, doneAllcb);
					};
				})(newImg, src);
			}
			for(src in Loader.res.sounds) {
				(function(src) {
					loadAudio(src, function(buffer) {
						SoundManager().audioContext.decodeAudioData(buffer, function(buffer) {
							Loader.res.sounds[src] = buffer;
							finishedLoadingResource(src, doneAllcb);
						});
					});
				})(src);
			}
		};

		function finishedLoadingResource(src, allCb) {
			currentlyLoaded++;
			loaderText.textContent = src;
			loaderLoadedBar.style.width = (100 * currentlyLoaded / resourceCount) + "%";
			if(currentlyLoaded === resourceCount) {
				loaderScreen.style.opacity = 0;
				allCb();
			}
		}

		function loadAudio(url, cb) {
			var ajax = new XMLHttpRequest();
			ajax.open("GET", url, true);
			ajax.responseType = "arraybuffer";
			ajax.onload = function(e) {
				cb(this.response);
			};
			ajax.send();
		}

		return Loader;
	}

	return function() {
		if(!instance) instance = createInstance();
		return instance;
	};
})();