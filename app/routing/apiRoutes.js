var friendsList = require("../data/friends.js");

module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
		res.json(friendsList);
	});

	app.post("/api/friends", function(req, res) {
		console.log("server side");
		var userInfo = req.body || {};
		if (!Array.isArray(userInfo.scores)) {
			return res.status(400).json({ error: "scores must be an array" });
		}
		var userScores = userInfo.scores.map(function(score) {
			return parseInt(score, 10);
		});

		var match = matchCheck(userScores);

		friendsList.push({
			"name": userInfo.name,
			"photo": userInfo.photo,
			"scores": userScores,
		});

		res.json(match);
	});

	function matchCheck(userScores) {
		var bestMatchScore = Infinity;
		var matchName = "";
		var matchPhoto = "";
		for (var j = 0; j < friendsList.length; j++) {
			var comparison = 0;
			for(var k = 0; k < userScores.length; k++) {
				comparison += Math.abs(userScores[k]-friendsList[j].scores[k]);
			}
			
			if (comparison < bestMatchScore) {
				bestMatchScore = comparison;
				matchName = friendsList[j].name;
				matchPhoto = friendsList[j].photo;
			}
		
		}
		return { "name": matchName, "photo": matchPhoto };

	}

}