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
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": true,
				"x": 180,
				"y": 130,
				"angle": 0,
				"isRoaming": true,
				"attackRange": 50,
				"viewRange": 90,
				"damage": 5,
				"missChance": 0.5,
				"roamSpeed": 0.18,
				"moveSpeed": 0.5,
				"hp": 100,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactiveText": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": false,
				"x": 90,
				"y": 15,
				"angle": Math.PI/2,
				"isRoaming": false,
				"attackRange": 50,
				"viewRange": 90,
				"damage": 25,
				"missChance": 0.5,
				"roamSpeed": 0.18,
				"moveSpeed": 0.5,
				"hp": 100,
				"roamDist": 30,
				"minimapColor": "blue",
				"interactable": true,
				"interactiveText": [
					"What the fuck did you just fucking say about me, you little bitch?",
					"I'll have you know I graduated top of my class in the Navy Seals.",
					"I've been involved in numerous secret raids on Al-Quaeda.",
					"I have over 300 confirmed kills.",
					"I am trained in gorilla warfare.",
					"I'm the top sniper in the entire US armed forces.",
					"You are nothing to me but just another target.",
					"I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth.",
					"Mark my fucking words. You think you can get away with saying that shit to me over the Internet?",
					"Think again, fucker. As we speak I am contacting my secret network of spies across the USA.",
					"Your IP is being traced right now so you better prepare for the storm, maggot.",
					"The storm that wipes out the pathetic little thing you call your life.",
					"You're fucking dead, kid. I can be anywhere, anytime.",
					"I can kill you in over seven hundred ways, and that's just with my bare hands.",
					"Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the US Marine Corps.",
					"I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit.",
					"If only you could have known what unholy retribution your little \"clever\" comment was about to bring down upon you.",
					"Maybe you would have held your fucking tongue. But you couldn't, you didn't.",
					"And now you're paying the price, you goddamn idiot.",
					"I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.",
					"Wau, good job reading(?) all of it, again."
				],
				"fov": 160 * Math.PI / 180
			}
		]
	},
	"1": {
		"name": "maptest",
		"data": [
			[300,300,350,286.6025403784439,386.60254037844385,250,400,200,386.6025403784439,150.00000000000003,350,113.39745962155612,300,100,250,113.39745962155614,213.39745962155615,149.99999999999994,200,199.99999999999997,213.39745962155615,250,250.00000000000003,286.6025403784439]
		],
		"textures": //1 per polygon
		[
			"img/wallTextures/lev0wall0.png"
		],
		"npcs": []
	}
};