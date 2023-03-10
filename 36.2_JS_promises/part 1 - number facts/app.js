let favNumber = 8;
const baseURL = "http://numbersapi.com";

// 1.
axios
	.get(`${baseURL}/${favNumber}?json`)
	.then((res) => console.log(res.data.text));

// 2.
let favNumbers = [3, 7, 8, 13];
let info = axios.get(`${baseURL}/${favNumbers}?json`).then((res) => {
	for (let key in res.data) {
		$("body").append(`<p>${res.data[key]}</p>`);
	}
});



// 3.

let promiseArray = [];
[9, 10, 11, 12].forEach((num) => {
	promiseArray.push(axios.get(`${baseURL}/${num}?json`))
});

Promise.all(promiseArray)
    
    .then((promiseArray) => {
        $("body").append(`<br><p>3:</p>`)
		promiseArray.forEach((res) => $("body").append(`<p>${res.data.text}</p>`));
	})
	.catch((err) => console.log(err));
