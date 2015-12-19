var LEVELS = {
	"0": 
	{
		"name": "Super duper start",
		"data": 
		[
			[
				-1000, -1000, //outer
				1000, 0,
				1000, 1000,
				-1000, 1000,
				-1000, -1000,
				10, 10,
				
				10, 40,
				30, 40,
				40, 50,
				50, 50,
				60, 40,
				80, 60,
				80, 70,
				60, 50,
				50, 60,
				10, 60,
				
				10, 170,
				90, 170,
				90, 100,
				100, 100,
				100, 180,
				10, 180,
				
				10, 290, //outer
				390, 290,
				390, 10,
				
				160, 10,
				160, 90,
				20, 90,
				20, 70,
				60, 70,
				70, 80,
				110, 80,
				120, 70,
				150, 70,
				150, 10,
				
				80, 10,
				60, 30,
				50, 20,
				40, 20,
				30, 30,
				20, 30, 	
				20, 10,
				
				0, 10 //outer
			],
			[
				100, 60,
				120, 40,
				130, 40,
				130, 20,
				140, 20,
				140, 60,
				110, 60,
				100, 70
			]
		],
		"textures": //1 per polygon
		[
			"img/wallTextures/lev0wall0.png",
			"img/wallTextures/lev0wall1.png"
		],
		"npcs": [
			{
				"npcName": "marine",
				"aggressive": true,
				"x": 60,
				"y": 140,
				"angle": 0,
				"isRoaming": true,
				"attackRange": 50,
				"viewRange": 90,
				"roamSpeed": 0.18,
				"moveSpeed": 0.5,
				"hp": 100,
				"roamDist": 30,
				"minimapColor": "red",
				"fov": 160 * Math.PI / 180
			}
		]
	}
};