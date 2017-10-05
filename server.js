const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const PORT = process.env.PORT || 8000;


var app = express();

hbs.registerPartials(__dirname + "/views/partials");

app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/static"));


app.use((req, resp, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile("server.log", `${log}\n\r`, (err) => {
		if (err) {
			console.log('Unable to open log file!');
		}
	})
	next();
});

// app.use((req, resp, next) => {
// 	resp.render("maintenance.hbs");
// })

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('toUpper', (text) => {
	return text.toUpperCase();
})

app.get("/", (req, resp) => {
	resp.render("home.hbs", {
		pageTitle: "Home",
		welcomeMessage: "Welcome to this website."
	})
})

app.get("/json", (req, resp) => {
	resp.send({
		me: "adi",
		what: ["node",
			"json",
			"js"
			]
	})
})


app.get("/bad", (req, resp) => {
	resp.status(400).send({
		errMsg: "bad link"
	})
})

app.get("/about", (req, resp) => {
	resp.render("about.hbs", {
		pageTitle: "About",
	})
})

app.listen(PORT, () => {
	console.log(`Server starting on port ${PORT}`)
}); 