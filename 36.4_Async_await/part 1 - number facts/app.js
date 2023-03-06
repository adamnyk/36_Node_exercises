let favNumber = 8;
const baseURL = "http://numbersapi.com";

// 1.

async function oneNum() {
	let {
		data: { text: answer },
	} = await axios.get(`${baseURL}/${favNumber}?json`);
	console.log(answer);
}
oneNum();

// 2.
let favNumbers = [3, 7, 8, 13];
async function getFacts() {
	let { data } = await axios.get(`${baseURL}/${favNumbers}?json`);
	for (let key in data) {
		$("body").append(`<p>${data[key]}</p>`);
	}
}
getFacts();

// 3.

let nums = [9, 10, 11, 12];
async function getAllFacts(arr) {
	let promices = [];
	arr.forEach((num) => {
		promices.push(axios.get(`${baseURL}/${num}?json`));
	});
	let facts = await Promise.all(promices);

	console.log(facts);
	$("body").append(`<br><p>3:</p>`);

	facts.forEach((fact) => {
		$("body").append(`<p>${fact.data.text}</p>`);
	});
}

getAllFacts(nums);
