// 1.
let baseURL = "https://deckofcardsapi.com/api/deck";

axios.get(`${baseURL}/new/draw/`)
	.then((res) => {
		let value = res.data.cards[0]["value"];
		let suit = res.data.cards[0]["suit"];
		console.log(`${value} of ${suit}`);
});

// 2.
axios
	.get(`${baseURL}/new/draw/`)
	.then((res) => {
		firstCard = res.data.cards[0];
		let deck = res.data.deck_id;
		return axios.get(`${baseURL}/${deck}/draw/`);
	})
	.then((res) => {
		let secondCard = res.data.cards[0];
		[firstCard, secondCard].forEach((card) => {
			console.log(`${card.value} of ${card.suit}`);
		});
	});

// 3.
let deck_id;
let $btn = $("button");
let $cardDiv = $('#card-div')

axios.get(`${baseURL}/new/shuffle`)
	.then(res => {
		deck_id = res.data.deck_id;
		$btn.show()
	})
	
$btn.on('click', () => {
	axios.get(`${baseURL}/${deck_id}/draw/`)
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
})
	
	


	