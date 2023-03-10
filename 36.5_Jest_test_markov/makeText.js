/** Command-line tool to generate Markov text. */

const fs = require("fs");
const { MarkovMachine } = require("./markov");
const axios = require("axios");
const process = require("process");

function generateText(text) {
	let markov = new MarkovMachine(text);
	console.log(markov.makeText());
}

function generateFileText(path) {
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			console.log("File reading error:", err);
			process.exit(1);
		} else {
			generateText(data);
		}
	});
}

/**  Only works when URL is a direct link to a text file. */
async function generateURLText(url) {
    try {
        let {data} = await (axios.get(url))
        generateText(data)
    } catch (err) {
        console.log('Axios error:', err)
    }
}

const type = process.argv[2]
const path = process.argv[3]

function makeText(type, path) {
    if (type === 'file') return generateFileText(path)
    else if (type === 'url') return generateURLText(path)
}

makeText(type, path)    

/////////////////////////////////////////////////
// Debug code

// generateFileText('./eggs.txt')
// generateURLText('https://www.gutenberg.org/files/11/11-0.txt')

