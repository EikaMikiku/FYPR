var SPRITES = {
	"marine": {
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
		}
	},
	"demon": {
		"attackRange": 10,
		"viewRange": 90,
		"damage": 15,
		"missChance": 0,
		"roamSpeed": 0.5,
		"moveSpeed": 0.75,
		"hp": 150,
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
		}
	},
	"san": {
		"attackRange": 20,
		"viewRange": 70,
		"damage": 20,
		"missChance": 0.1,
		"roamSpeed": 0.12,
		"moveSpeed": 0.3,
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
			}
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
			}
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
			}
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
			}
		}
	}
};