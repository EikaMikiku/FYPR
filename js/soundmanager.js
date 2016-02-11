var SoundManager = (function() {
	var instance;
	function createInstance() {
		function SoundManager(){};
		var loader = Loader();

		SoundManager.audioContext = new AudioContext();
		SoundManager.playSound = function(soundSrc, x, y) {
			var mainVolume = SoundManager.audioContext.createGain();
			mainVolume.connect(SoundManager.audioContext.destination);

			var sound = {
				"source": SoundManager.audioContext.createBufferSource(),
				"volume": SoundManager.audioContext.createGain(),
				"panner": SoundManager.audioContext.createPanner()
			};
			sound.source.connect(sound.volume);
			sound.volume.connect(sound.panner);
			sound.panner.connect(mainVolume);

			sound.panner.setPosition(x, 0, y);
			sound.source.buffer = loader.res.sounds[soundSrc];
			sound.source.start(SoundManager.audioContext.currentTime);
			//setTimeout(onFinishedPlaying, buffer.duration * durationModifier);
		}
		return SoundManager;
	}

	return function() {
		if(!instance) instance = createInstance();
		return instance;
	};
})();