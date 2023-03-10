const { MarkovMachine, getRandom } = require("./markov");


test("MarkovMachine.words should remove new lines and white space and make an array of words", () => {
    let mm = new MarkovMachine(`I am 
    Daniel    I am Sam  Sam I am!`)
    console.log(mm.words)
    expect(mm.words).toEqual(['I', 'am', 'Daniel', 'I', 'am', 'Sam', 'Sam', 'I', 'am!'])
})

test("MarkovMachine.chains not contain duplicate keys", () => {
    let mm = new MarkovMachine(`I am 
    Daniel    I am Sam  Sam I am!`)

    expect(Object.fromEntries(mm.chains)).toEqual({
        "I": ["am", "am", "am!"],
        "am": ["Daniel", "Sam"],
        "Daniel": ["I"],
        "Sam": ["Sam", "I"],
        "am!": [null]
    })
})

test("getRandom(array) should always choose an element from that array.", () => {
    let text = "I am Sam Sam I am ham"
    let mm = new MarkovMachine(text)
    let words = mm.words

    expect(words).toContainEqual(MarkovMachine.getRandom(words))
})

test("getRandom(array) should always choose an element from that array.", () => {
    let text = "I am Sam Sam I am ham"
    let mm = new MarkovMachine(text)
    for (let i = 0; i < 20; i++) {
        expect(mm.makeText().toLowerCase().split(/[ \r\n]+/).filter(c => c !== "").length).toBeLessThan(101)
    }
})
