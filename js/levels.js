var LEVELS = {
	"arena": {
		getPlayerPosition: function() {
			var spawns = [
				{
					"x": 46,
					"y": 180,
					"angle": Math.PI / 2
				},
				{
					"x": 158,
					"y": 215,
					"angle": 4 * Math.PI / 3
				},
				{
					"x": 239,
					"y": 223,
					"angle": 3 * Math.PI / 4
				},
				{
					"x": 258,
					"y": 105,
					"angle": Math.PI
				},
				{
					"x": 105,
					"y": 88,
					"angle": 0
				},
			]
			return spawns[~~(Math.random()*5)];
		},
		"name": "1v1 Arena",
		"startText": "Kill him.",
		"data": [
			//Outer
			[-1000,200,9,200,50,262,100,291,200,291,250,262,291,200,1000,200,1000,1000,-1000,1000],
			[200,1000,200,291,250,262,291,200,291,100,262,50,200,9,200,-1000,1000,-1000,1000,1000],
			[1000,100,291,100,262,50,200,9,100,9,50,38,9,100,-1000,100,-1000,-1000,1000,-1000],
			[100,-1000,100,9,50,38,9,100,9,200,50,262,100,291,100,1000,-1000,1000,-1000,-1000],
			//Left bottom ¬ shape
			[-1000,144,80,144,80,203,62,203,62,162,-1000,162],
			//Center bottom tick shape
			[122,215,133,204,157,228,195,190,206,201,157,250],
			//S shape
			[76,61,91,61,91,99,155,99,155,151,140,151,140,114,76,114],
			//top square
			[203,59,235,59,235,91,203,91],
			//bottom square
			[222,129,259,129,259,166,222,166]
		],
		"textures": [
			"img/wallTextures/lev0wall3.png",
			"img/wallTextures/lev0wall2.png",
			"img/wallTextures/lev0wall6.png",
			"img/wallTextures/lev0wall7.png",
			"img/wallTextures/lev0wall0.png",
			"img/wallTextures/lev0wall8.png",
			"img/wallTextures/lev0wall10.png",
			"img/wallTextures/lev0wall5.png",
			"img/wallTextures/lev0wall9.png"
		],
		"npcs": [
			{
				"npcName": "Enemy",
				"spriteName": "marine",
				"aggressive": false,
				"x": 0,
				"y": 0,
				"angle": 0,
				"isRoaming": false,
				"roamDist": 50,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 2 * Math.PI,
				"hp": 100
			}
		]
	},
	"0": {
		getPlayerPosition: function() {
			return {
				"x": 455,
				"y": 65,
				"angle": Math.PI / 2
			};
		},
		"name": "Level 0",
		"startText": "Find the pinky and talk to him. (green dot on map)",
		"data": [
			//Red
			[-1000,130,29,130,81,78,81,67,397,67,397,-1000,-1000,-1000,-1000,130],
			//Dark Orange
			[129,69,180,69,180,80,170,80,170,89,189,89,189,65,123,65,123,117,182,117,182,110,129,110],
			//Light Orange
			[150,129,180,139,189,139,189,100,180,100,180,100,180,115,125,115,125,65,75,65,75,79,120,79,120,129],
			//Lime
			[330,69,330,100,289,100,289,90,280,90,280,110,270,110,270,130,275,130,294,105,435,105,435,64,185,64,185,69,280,69,280,79,289,79,289,69],
			//Green
			[279,139,299,119,299,109,390,109,390,149,399,149,399,103,292,103,272,130,260,130,260,139],
			//Teal
			[419,119,430,119,430,129,420,140,420,149,439,149,439,119,435,110,395,110,395,139,409,139,419,129],
			//Cyan
			[439,110,449,110,449,119,435,119,395,110,395,-1000,485,-1000,485,119,460,119,460,110,470,110,470,99,460,99,460,80,470,80,470,49,439,49,439,80,449,80,449,99,439,99],
			//Light blue
			[560,170,570,170,570,139,560,139,550,119,550,99,499,99,499,149,490,149,480,129,480,-1000,1000,-1000,1000,1000,480,1000,480,180,490,160,499,160,499,210,550,210,550,190],
			//Blue
			[460,229,470,229,470,1000,485,1000,485,190,460,190,460,199,470,199,470,210,460,210],
			//Dark blue
			[389,320,420,320,420,290,460,300,460,260,475,260,475,1000,380,1000,380,300,389,300],
			//Dark purple
			[339,310,329,310,329,299,369,299,369,245,280,245,280,1000,385,1000,385,350,329,350,329,339,339,339,339,330,329,330,329,319,339,319],
			//Purple
			[409,279,449,289,449,260,365,260,365,289,400,289,400,309,409,309],
			//Fushia
			[449,210,439,210,439,199,449,199,449,190,433,190,433,260,439,260,439,229,449,229],
			//Pink
			[395,265,435,265,439,190,439,160,420,160,420,169,430,180,430,190,419,190,419,180,409,170,395,170],
			//Light red
			[390,200,299,200,299,190,279,170,260,170,260,265,399,265,399,160,390,160],
			//Dark red
			[190,229,190,250,139,250,139,229,149,229,159,219,159,199,179,189,189,189,189,170,180,170,150,180,130,180,130,200,135,255,265,255,265,190,219,190,219,170,200,170,200,200,190,200,170,210,170,219,180,229],
			//Red 2
			[160,280,150,280,150,289,169,289,169,269,200,269,200,330,190,360,180,380,170,390,150,399,79,399,59,390,49,380,39,360,29,330,29,269,60,269,60,289,79,289,79,280,69,280,69,259,80,259,80,269,89,269,99,259,109,249,109,240,99,240,99,229,109,229,109,220,99,220,99,209,109,209,109,200,-1000,200,-1000,1000,285,1000,285,252,135,252,135,200,120,200,120,209,130,209,130,220,120,220,120,229,130,229,130,240,120,240,120,249,130,259,140,269,149,269,149,259,160,259],
			//Yellow 2
			[109,169,139,169,139,160,100,160,100,180,39,180,39,170,29,170,29,128,-1000,128,-1000,201,99,201,99,189,109,189],
			//Columns
			[450,130,459,130,479,150,479,159,459,179,450,179],
			[510,120,529,120,539,140,539,150,549,150,549,159,539,159,539,169,529,189,510,189,510,180,520,180,530,160,530,149,520,129,510,129],
			[450,240,459,240,459,249,450,249],
			[340,130,359,130,369,140,369,169,359,179,340,179,340,170,350,160,360,160,360,149,350,149,340,139],
			[290,150,319,150,319,159,290,159],
			[240,130,249,130,249,149,239,149,239,160,249,160,249,179,240,179,230,169,230,140],
			[80,110,109,110,109,140,139,140,139,149,100,149,100,119,80,119],
			[60,300,79,300,79,309,69,309,69,320,79,320,79,329,60,329],
			[150,300,169,300,169,329,150,329,150,320,160,320,160,309,150,309],
			[80,340,89,340,89,350,140,350,140,340,149,340,149,369,140,369,140,359,119,359,119,380,129,380,129,389,100,389,100,380,110,380,110,359,89,359,89,369,80,369]
		],
		"textures": //1 per polygon
		[
			"img/wallTextures/lev0wall1.png", //Exit
			"img/wallTextures/lev0wall13.png", //Storage
			"img/wallTextures/lev0wall0.png", //Near exit
			"img/wallTextures/lev0wall16.png", //Control rooms
			"img/wallTextures/lev0wall14.png", //Dinner hall
			"img/wallTextures/lev0wall5.png", //To dinner hall
			"img/wallTextures/lev0wall0.png", //Spawn point
			"img/wallTextures/lev0wall7.png", //Lab
			"img/wallTextures/lev0wall6.png", //To sewer
			"img/wallTextures/lev0wall10.png", //Sewer pipe
			"img/wallTextures/lev0wall12.png", //Sewer
			"img/wallTextures/lev0wall10.png", //Sewer pipe
			"img/wallTextures/lev0wall6.png", //To sewer
			"img/wallTextures/lev0wall5.png", //To dinner hall
			"img/wallTextures/lev0wall14.png", //Dinner hall
			"img/wallTextures/lev0wall8.png", //Library
			"img/wallTextures/lev0wall3.png", //Boss area
			"img/wallTextures/lev0wall0.png", //Near boss
			"img/wallTextures/lev0wall0.png", //Corridor
			"img/wallTextures/lev0wall9.png", //Lab
			"img/wallTextures/lev0wall15.png", //Toilet sign
			"img/wallTextures/lev0wall14.png", //Dinner hall
			"img/wallTextures/lev0wall14.png", //Dinner hall
			"img/wallTextures/lev0wall0.png", //Dinner hall
			"img/wallTextures/lev0wall0.png", //Dinner hall
			"img/wallTextures/lev0wall4.png", //boss column
			"img/wallTextures/lev0wall4.png", //boss column
			"img/wallTextures/lev0wall4.png" //boss column
		],
		"npcs": [
			{
				"npcName": "San",
				"spriteName": "san",
				"aggressive": false,
				"x": 115,
				"y": 315,
				"angle": Math.PI,
				"isRoaming": false,
				"roamDist": 20,
				"minimapColor": "red",
				"interactable": true,
				"interactions": [
					function(npc, doneCB) {
						npc.say("It's a beautiful day outside...", doneCB);
					},
					function(npc, doneCB) {
						npc.say("Birds are singing. Flowers are blooming...", doneCB);
					},
					function(npc, doneCB) {
						npc.say("On days like these... People like you... ", doneCB);
					},
					function(npc, doneCB) {
						var terminal = Game().terminal;
						var lastText = terminal.lastChild;
						var text = "Should be burning in hell...";
						var current = 0;
						var timer = setInterval(function() {
							lastText.textContent += text[current];
							current++;
							if(current === text.length) {
								clearInterval(timer);
								npc.aggressive = true;
								npc.damage = 20;
								npc.viewRange = 100;
								npc.moveSpeed = 0.8;
								npc.roamSpeed = 0.5;
								npc.ondeath = function() {
									setTimeout(window.game.completedLevel, 2000);
								};
								doneCB();
							}
							terminal.scrollTop = terminal.scrollHeight;
						}, 100);
					}
				],
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "HpPack",
				"spriteName": "smallhppack",
				"aggressive": true,
				"x": 465,
				"y": 105,
				"angle": Math.PI,
				"isRoaming": false,
				"roamDist": 100,
				"minimapColor": "rgb(0,0,0,0)",
				"interactable": false,
				"interactions": null,
				"fov": 2 * Math.PI
			},
			{
				"npcName": "HpPack",
				"spriteName": "smallhppack",
				"aggressive": true,
				"x": 355,
				"y": 155,
				"angle": Math.PI,
				"isRoaming": false,
				"roamDist": 100,
				"minimapColor": "rgb(0,0,0,0)",
				"interactable": false,
				"interactions": null,
				"fov": 2 * Math.PI
			},
			{
				"npcName": "HpPack",
				"spriteName": "smallhppack",
				"aggressive": true,
				"x": 130,
				"y": 370,
				"angle": Math.PI,
				"isRoaming": false,
				"roamDist": 100,
				"minimapColor": "rgb(0,0,0,0)",
				"interactable": false,
				"interactions": null,
				"fov": 2 * Math.PI
			},
			{
				"npcName": "HpPack",
				"spriteName": "smallhppack",
				"aggressive": true,
				"x": 100,
				"y": 370,
				"angle": Math.PI,
				"isRoaming": false,
				"roamDist": 100,
				"minimapColor": "rgb(0,0,0,0)",
				"interactable": false,
				"interactions": null,
				"fov": 2 * Math.PI
			},
			{
				"npcName": "Commando",
				"spriteName": "commando",
				"aggressive": true,
				"x": 475,
				"y": 125,
				"angle": Math.PI,
				"isRoaming": true,
				"roamDist": 20,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Pinky",
				"spriteName": "demon",
				"aggressive": false,
				"x": 540,
				"y": 110,
				"angle": Math.PI,
				"isRoaming": false,
				"roamDist": 30,
				"minimapColor": "green",
				"interactable": true,
				"interactions": [
					function(npc, doneCB) {
						npc.say("Listen here, i need you to stop evil being.", doneCB);
					},
					function(npc, doneCB) {
						npc.say("He goes by the name \"San\".", doneCB);
					},
					function(npc, doneCB) {
						npc.interactable = false;
						npc.say("You can find him in a big red chamber. Talk to him.", doneCB);
					},
					function(npc, doneCB) {
						npc.interactionId--;
						npc.say("Go on, find San in a red chamber and talk to him!", doneCB);
					}
				],
				"fov": 170 * Math.PI / 180
			},
			{
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": true,
				"x": 540,
				"y": 200,
				"angle": Math.PI,
				"isRoaming": true,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": true,
				"x": 465,
				"y": 205,
				"angle": Math.PI,
				"isRoaming": false,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": true,
				"x": 425,
				"y": 185,
				"angle": 4*Math.PI/3,
				"isRoaming": false,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": true,
				"x": 425,
				"y": 125,
				"angle": 135 * Math.PI / 180 ,
				"isRoaming": false,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": true,
				"x": 330,
				"y": 150,
				"angle": 0,
				"isRoaming": true,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": true,
				"x": 45,
				"y": 285,
				"angle": 0,
				"isRoaming": true,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": true,
				"x": 185,
				"y": 285,
				"angle": 0,
				"isRoaming": true,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": true,
				"x": 125,
				"y": 215,
				"angle": Math.PI,
				"isRoaming": false,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Commando",
				"spriteName": "commando",
				"aggressive": true,
				"x": 125,
				"y": 235,
				"angle": Math.PI,
				"isRoaming": false,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": true,
				"x": 104,
				"y": 215,
				"angle": 0,
				"isRoaming": true,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": true,
				"x": 104,
				"y": 235,
				"angle": 0,
				"isRoaming": false,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": true,
				"x": 100,
				"y": 94,
				"angle": 0,
				"isRoaming": false,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": true,
				"x": 395,
				"y": 315,
				"angle": 0,
				"isRoaming": false,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": true,
				"x": 365,
				"y": 335,
				"angle": 0,
				"isRoaming": true,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Commando",
				"spriteName": "commando",
				"aggressive": true,
				"x": 152,
				"y": 241,
				"angle": 0,
				"isRoaming": true,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": true,
				"x": 177,
				"y": 241,
				"angle": 0,
				"isRoaming": true,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": true,
				"x": 115,
				"y": 330,
				"angle": 0,
				"isRoaming": true,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": true,
				"x": 309,
				"y": 91,
				"angle": 0,
				"isRoaming": true,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Commando",
				"spriteName": "commando",
				"aggressive": true,
				"x": 258,
				"y": 78,
				"angle": 0,
				"isRoaming": true,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": true,
				"x": 151,
				"y": 89,
				"angle": 0,
				"isRoaming": true,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Marine",
				"spriteName": "marine",
				"aggressive": true,
				"x": 232,
				"y": 94,
				"angle": 0,
				"isRoaming": true,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			},
			{
				"npcName": "Commando",
				"spriteName": "commando",
				"aggressive": true,
				"x": 70,
				"y": 146,
				"angle": 0,
				"isRoaming": true,
				"roamDist": 30,
				"minimapColor": "red",
				"interactable": false,
				"interactions": null,
				"fov": 160 * Math.PI / 180
			}
		]
	}
};