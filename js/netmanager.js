var NetManager = (function() {
	var instance;
	function createInstance() {
		function NetManager(){};
		var peer = null;
		var myPeerId = null;
		var connection = null;
		NetManager.points = 0;
		NetManager.enemyNpc = null;

		NetManager.host = function(startMultiplayer) {
			initPeer(function() {
				startMultiplayer();
			});
		};
		NetManager.join = function(startMultiplayer) {
			var id = prompt("Enter id");
			if(!id) return;
			initPeer(function() {
				var conn = peer.connect(id);
				conn.on("open", function() {
					onEstablishedConn(conn);
					startMultiplayer();
				});
			});
		};
		NetManager.sendData = function(data) {
			if(connection) {
				connection.send(data);
			}
		};
		NetManager.disconnect = function() {
			if(peer && connection) {
				NetManager.sendData({
					"type": "disconnect"
				})
				connection.close();
				peer.disconnect();
				peer.destroy();
				GuiManager().changeMenu(0);
				GuiManager().show();
				window.game.inMultiplayer = false;
			}
		};

		function initPeer(done) {
			peer = new Peer({"key": "z0uvirkvbb0m5cdi"});
			peer.on("open", function(id) {
				myPeerId = id;
				console.log(myPeerId);

				peer.on("connection", function(conn) {
					conn.on("open", function() {
						onEstablishedConn(conn);
					})
				});
				done();
			});

		}
		function onEstablishedConn(conn) {
			window.game.addToTerminal("Enemy connected", function(){});
			connection = conn;
			conn.on("data", onDataGet);
			conn.on("close", function() {
				window.game.addToTerminal("Enemy left", function(){});
			});
		}

		function onDataGet(data) {
			if(data.type === "pos") {
				NetManager.enemyNpc.x = data.x;
				NetManager.enemyNpc.y = data.y;
				NetManager.enemyNpc.angle = data.angle;
			} else if(data.type === "shot") {
				window.game.getPlayer().getHit(
					{
						"damage": data.dmg
					}
				);
			} else if(data.type === "reset") {
				NetManager.enemyNpc.hp = 100;
				NetManager.enemyNpc.action = "idle";
				NetManager.enemyNpc.currentSpriteId = 0;
				NetManager.enemyNpc.spriteStartFrame = 0;
				window.game.addToTerminal("Points: " + (++NetManager.points), function(){});
			}
		}

		return NetManager;
	}

	return function() {
		if(!instance) instance = createInstance();
		return instance;
	};
})();