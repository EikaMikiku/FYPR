var SPRITES = {
	"marine": {
		"idle": {
			"rotatable": true,
			"frameCount": 1,
			"delays": [
				Infinity
			]
		},
		"hitstun": {
			"rotatable": false,
			"frameCount": 1,
			"delays": [
				6
			]
		},
		"walk": {
			"rotatable": true,
			"frameCount": 4,
			"delays": [
				10, 10, 10, 10
			]
		},
		"attack": {
			"rotatable": true,
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
			"rotatable": false,
			"frameCount": 9,
			"delays": [
				3, 3, 3, 3, 3, 3, 3, 3, Infinity
			]
		}
	},
	"demon": {
		"idle": {
			"rotatable": true,
			"frameCount": 1,
			"delays": [
				Infinity
			]
		},
		"hitstun": {
			"rotatable": false,
			"frameCount": 1,
			"delays": [
				15
			]
		},
		"walk": {
			"rotatable": true,
			"frameCount": 4,
			"delays": [
				5, 5, 5, 5
			]
		},
		"attack": {
			"rotatable": true,
			"frameCount": 3,
			"delays": [
				5, 5, 20
			],
			"attackFrame": {
				"startFrame": 3,
				"frameId": 1
			}
		},
		"death": {
			"rotatable": false,
			"frameCount": 6,
			"delays": [
				6, 6, 6, 6, 6, Infinity
			]
		}
	},
	"commando": {
		"idle": {
			"rotatable": true,
			"frameCount": 1,
			"delays": [
				Infinity
			]
		},
		"hitstun": {
			"rotatable": false,
			"frameCount": 1,
			"delays": [
				15
			]
		},
		"walk": {
			"rotatable": true,
			"frameCount": 4,
			"delays": [
				10, 10, 10, 10
			]
		},
		"attack": {
			"rotatable": true,
			"frameCount": 2,
			"delays": [
				4, 4
			],
			"attackFrame": {
				"startFrame": 1,
				"frameId": 1
			}
		},
		"death": {
			"rotatable": false,
			"frameCount": 7,
			"delays": [
				6, 6, 6, 6, 6, 6, Infinity
			]
		}
	},
	"san": {
		"idle": {
			"rotatable": false,
			"frameCount": 10,
			"delays": [
				5,5,5,5,5,5,5,5,5,5
			]
		},
		"hitstun": {
			"rotatable": false,
			"frameCount": 1,
			"delays": [
				20
			]
		},
		"walk": {
			"rotatable": false,
			"frameCount": 2,
			"delays": [
				10, 10
			]
		},
		"attack": {
			"rotatable": false,
			"frameCount": 3,
			"delays": [
				10, 5, 10
			],
			"attackFrame": {
				"startFrame": 3,
				"frameId": 1
			}
		},
		"death": {
			"rotatable": false,
			"frameCount": 13,
			"delays": [
				3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, Infinity
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
			damageCalculation: function(distance) {
				return 2000 / distance; //20 at distance = 100
			}
		}
	}
};