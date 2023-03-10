/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== "");
		this.makeChains();
	}

	/** set markov chains:
	 *
	 *  for text of "the cat in the hat", chains will be
	 *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		// TODO
		let chains = new Map();

		for (let i = 0; i < this.words.length; i++) {
			let word = this.words[i];
			let nextWord = this.words[i + 1] || null;
			//if word exists push next word to value array
			if (chains.has(word)) chains.get(word).push(nextWord);
			// else if word doesn't exist, create new arrray with nextword
			else chains.set(word, [nextWord]);
		}
		this.chains = chains;
	}

	/** Pick random */
	static getRandom(array) {
		let index = Math.floor(Math.random() * array.length);
		return array[index];
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		// TODO
		let keys = Array.from(this.chains.keys());
		let key = MarkovMachine.getRandom(keys);
		let outputText = [];

		while (outputText.length < numWords && key) {
			outputText.push(key);
			key = MarkovMachine.getRandom(this.chains.get(key));
		}
		return outputText.join(" ");
	}
}

module.exports = { MarkovMachine };

