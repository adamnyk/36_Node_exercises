// 1.
let baseURL = "https://deckofcardsapi.com/api/deck";

async function drawOne() {
	let { data } = await axios.get(`${baseURL}/new/draw/`)
	let value = data.cards[0]["value"];
	let suit = data.cards[0]["suit"];
	console.log(`${value} of ${suit}`);
}

drawOne()

// 2.

async function drawTwo() {
	try {
		let res = await axios.get(`${baseURL}/new/draw/`)
		console.log('2. ============')
		let firstCard = res.data.cards[0];
		let deck_id = res.data.deck_id;
		let res2 = await axios.get(`${baseURL}/${deck_id}/draw/`)
		let secondCard = res2.data.cards[0];
		console.log(`${firstCard['value']} of ${firstCard['suit']}`)
		console.log(`${secondCard['value']} of ${secondCard['suit']}`)
	}
	catch (e) {
		console.log('2. ============')
		console.log('ERROR!:', e)
	}
}

drawTwo()


// 3.
let deck_id;
let $btn = $("button");
let $cardDiv = $('#card-div')

async function getDeck() {
	try {
		await axios.get(`${baseURL}/new/shuffle`)
			.then(res => {
				deck_id = res.data.deck_id;
				$btn.show()
			})
	}
	catch(e) {
		console.log('Deck Error! :', e)
	}
}
	
async function drawCard() {
	try {
		await axios.get(`${baseURL}/${deck_id}/draw/`)
			.then(res => {
				let card = res.data.cards[0];
				let imgSrc = card.image;
				let $img = $('<img>').attr({
					"src": `${imgSrc}`,
					"style": "position: absolute;'"
				})
				$cardDiv.append($img)
			
				if (res.data.remaining === 0) $btn.remove()
			})
	}
	catch(e) {
		console.log('Draw Error! :', e)
	}
}

getDeck()
$btn.on('click', drawCard)
	
	


	