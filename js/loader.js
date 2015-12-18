function Loader() {

}
var Loader = (function() {
	var instance;
	function createInstance() {
		function Loader(){};
		var resourceCount = 2;
		var currentlyLoaded = 0;
		Loader.res = {
			"img": {
				"img/wall0.png": null,
				"img/wall1.png": null
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