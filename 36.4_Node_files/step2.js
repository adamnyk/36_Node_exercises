const fs = require("fs");
const process = require("process");
const axios = require("axios");

function cat(path) {
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			console.log("Error:", err);
			process.exit(1);
		}
		console.log(data);
	});
}

async function webCat(url) {
	try {
		const response = await axios.get(url);
		console.log(response);
	} catch (err) {
		console.log("Error:", err);
	}
}

function bigCat(path) {
	if (path.startsWith("http")) webCat(path);
	else cat(path);
}

bigCat(process.argv[2]);
