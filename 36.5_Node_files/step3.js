const fs = require("fs");
const process = require("process");
const axios = require("axios");

function handleOutput(text, output) {
	if (out) {
		fs.writeFile(output, text, "utf8", (err) => {
			if (err) {
				console.log("Writing error:", err);
				process.exit(1);
			}
		});
	} else {
		console.log(text);
	}
}

function cat(path, output) {
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			console.log("Reading error:", err);
			process.exit(1);
		} else {
			handleOutput(data, output);
		}
	});
}

async function webCat(url, output) {
	try {
		const response = await axios.get(url);
		cat(response.data, out);
	} catch (err) {
		console.log("Error:", err);
	}
}

let path;
let out;

if (process.argv[2] === "--out") {
	out = process.argv[3];
	path = process.argv[4];
} else {
	path = process.argv[2];
}

if (path.startsWith("http")) {
	webCat(path, out);
} else {
	cat(path, out);
}
