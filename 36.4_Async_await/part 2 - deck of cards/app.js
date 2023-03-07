// 1.
let baseURL = "https://deckofcardsapi.com/api/deck";

async function drawOne() {
	let {data} = await axios.get(`${baseURL}/new/draw/`)
	let {suit, value} = data.cards[0];
	console.log(`${value} of ${suit}`);
	console.log('2. ============')
}

drawOne()

// 2.

async function drawTwo() {
	try {
		let firstCardData = await axios.get(`${baseURL}/new/draw/`)
		let deck_id = firstCardData.data.deck_id;
		
		let secondCardData = await axios.get(`${baseURL}/${deck_id}/draw/`)

		for (let card of [firstCardData, secondCardData]) {
			let { value, suit } = card.data.cards[0]
			console.log(value, 'of', suit)
		}
	}
	catch (e) {
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
	
	


	