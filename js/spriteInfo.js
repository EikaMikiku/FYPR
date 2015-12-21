var SPRITES = {
	"marine": {
		"idle": {
			"frameCount": 1,
			"delays": [
				Infinity
			]
		},
		"walk": {
			"frameCount": 4,
			"delays": [
				10, 10, 10, 10
			]
		},
		"attack": {
			"frameCount": 2,
			"delays": [
				30, 7
			],
			"attackFrame": {
				"startFrame": 2,
				"frameId": 1
			}
		},
		"death": {
			"frameCount": 9,
			"delays": [
				3, 3, 3, 3, 3, 3, 3, 3, Infinity
			]
		}
	},
	"weapons": {
		"shotgun": {
			"frameCount": 7,
			"delays": [
				3, 3, 8, 8, 8, 10, 6
			],
			"attackFrame": {
				"startFrame": 1,
				"frameId": 1
			},
			"attackAccuracy": 10 * Math.PI / 180,
			damageCalculation: function(distance) {
				return 2000 / distance; //20 at distance = 100
			}
		}
	}
};