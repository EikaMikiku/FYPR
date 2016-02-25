var SPRITES = {
	"marine": {
		"pointsWorth": 20,
		"attackRange": 50,
		"viewRange": 90,
		"damage": 5,
		"missChance": 0.5,
		"roamSpeed": 0.18,
		"moveSpeed": 0.5,
		"hp": 20,
		"hitstunChance": 0.7813,
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
		},
		"sounds": {
			"attack": "sounds/pistol.wav",
			"death": "sounds/marinedeath.wav",
			"injury": "sounds/marineinjured.wav"
		}
	},
	"demon": {
		"pointsWorth": 70,
		"attackRange": 10,
		"viewRange": 90,
		"damage": 15,
		"missChance": 0,
		"roamSpeed": 0.8,
		"moveSpeed": 1,
		"hp": 1500,
		"hitstunChance": 0.7031,
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
				10
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
		},
		"sounds": {
			"attack": "sounds/demonattack.wav",
			"death": "sounds/demondeath.wav",
			"injury": "sounds/demoninjured.wav"
		}
	},
	"commando": {
		"pointsWorth": 30,
		"attackRange": 40,
		"viewRange": 70,
		"damage": 2,
		"missChance": 0.1,
		"roamSpeed": 0.12,
		"moveSpeed": 0.3,
		"hp": 70,
		"hitstunChance": 0.6641,
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
		},
		"sounds": {
			"attack": "sounds/pistol.wav",
			"death": "sounds/commandodeath.wav",
			"injury": "sounds/marineinjured.wav"
		}
	},
	"san": {
		"pointsWorth": 100,
		"attackRange": 30,
		"viewRange": 700,
		"damage": 40,
		"missChance": 0.1,
		"roamSpeed": 0.82,
		"moveSpeed": 3,
		"hp": 1000,
		"hitstunChance": 0.7031,
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
		},
		"sounds": {
			"attack": "sounds/sanattack.wav",
			"death": "sounds/sandeath.wav",
			"injury": "sounds/saninjured.wav"
		}
	},
	"weapons": {
		"pistol": {
			"frameCount": 3,
			"delays": [
				3, 8, 8
			],
			"attackFrame": {
				"startFrame": 1,
				"frameId": 1
			},
			damageCalculation: function(distance) {
				return 10;
			},
			"sound": "sounds/pistol.wav"
		},
		"shotgun1": {
			"frameCount": 7,
			"delays": [
				3, 3, 8, 8, 8, 10, 6
			],
			"attackFrame": {
				"startFrame": 1,
				"frameId": 1
			},
			damageCalculation: function(distance) {
				var dmg = 2000 / distance; //20 at distance = 100
				if(dmg < 5)
					dmg = 5;
				else if(dmg > 80)
					dmg = 80;
				return dmg;
			},
			"sound": "sounds/shotgun1.wav"
		},
		"shotgun2": {
			"frameCount": 7,
			"delays": [
				3, 3, 8, 8, 8, 10, 6
			],
			"attackFrame": {
				"startFrame": 1,
				"frameId": 1
			},
			damageCalculation: function(distance) {
				var dmg = 3500 / distance; //35 at distance = 100
				if(dmg < 7)
					dmg = 7;
				else if(dmg > 120)
					dmg = 120;
				console.log(dmg);
				return dmg;
			},
			"sound": "sounds/shotgun2.wav"
		},
		"machinegun": {
			"frameCount": 2,
			"delays": [
				5, 5
			],
			"attackFrame": {
				"startFrame": 1,
				"frameId": 1
			},
			damageCalculation: function(distance) {
				return 5;
			},
			"sound": "sounds/pistol.wav"
		}
	}
};