console.log("htmlRoutes");
var path = require("path");

module.exports = function(app) {
	// app.get("/", function(req, res) {
	// 	res.sendFile(path.join(__dirname, "../public/home.html"));
	// });
	app.get("/survey", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/survey.html"));
	});
	// Express 5 needs a named wildcard; this also matches "/".
	app.get("/{*path}", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/home.html"));
	});
};