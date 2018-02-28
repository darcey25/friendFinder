var friendsList = require("../data/friends.js");
var bestMatchScore = 100;
var matchName = "";
var matchPhoto = "";

module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
		res.json(friendsList);
	});

	app.post("/api/friends", function(req, res) {
		console.log("server side");
		var userInfo = req.body;
		var userScores = userInfo.scores;
		for (var i = 0; i < userScores.length; i++) {
			userScores[i] = parseInt(userScores[i]);
		}

		var match = matchCheck(userScores);

		friendsList.push({
			"name": userInfo.name,
			"photo": userInfo.photo,
			"score": userScores,
		});

		res.json(match);
	});

	function matchCheck(userScores) {
		var comparison = 0;
		for (var j = 0; j < friendsList.length; j++) {
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