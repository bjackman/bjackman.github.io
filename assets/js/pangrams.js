let numberWords = [
    "", // Zero
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
    "twenty",
    "twenty one",
    "twenty two",
    "twenty three",
    "twenty four",
    "twenty five",
    "twenty six",
    "twenty seven",
    "twenty eight",
    "twenty nine",
    "thirty",
    "thirty one",
    "thirty two",
    "thirty three",
    "thirty four",
    "thirty five",
    "thirty six",
    "thirty seven",
    "thirty eight",
    "thirty nine",
    "fourty",
    "fourty one",
    "fourty two",
    "fourty three",
    "fourty four",
    "fourty five",
    "fourty six",
    "fourty seven",
    "fourty eight",
    "fourty nine",
    "fifty",
]

let hofstadterCounts = {
    'a': 5,
    'b': 1,
    'c': 1,
    'd': 2,
    'e': 28,
    'f': 8,
    'g': 6,
    'h': 8,
    'i': 13,
    'j': 1,
    'k': 1,
    'l': 3,
    'm': 2,
    'n': 18,
    'o': 15,
    'p': 2,
    'q': 1,
    'r': 7,
    's': 25,
    't': 22,
    'u': 4,
    'v': 4,
    'w': 9,
    'x': 2,
    'y': 4,
    'z': 1
}
let letters = "abcdefghijklmnopqrstuvwxyz".split("");

let counts = new Map();
letters.forEach(l => counts.set(l, {"letter": l, "count": hofstadterCounts[l]}));

function createSentence(counts) {
    let sentence = "This pangram tallies"

    let i = 0;
    counts.forEach(countElem => {
        sentence += " ";
        if (i == counts.size - 1)
            sentence += "and ";
        sentence += numberWords[countElem.count] + " " + countElem.letter;
        if (countElem.count > 1)
            sentence += "'s";
        if (i != counts.size - 1)
            sentence += ",";

        i++;
    });

    return sentence;
}

function countLetters(sentence) {
    let counts = new Map();
    letters.forEach(letter => {
        counts.set(letter, {"letter": letter, "count": sentence.match(new RegExp(letter, "g")).length})
    });
    return counts;
}

function renderSentence(counts) {
    let span = document.createElement("span");
    span.innerText = "This pangram tallies";
    let spans = [span];

    let sentenceString = createSentence(counts);
    let actualCounts = countLetters(sentenceString);

    let i = 0;
    counts.forEach(countElem => {
        let tallyPhrase = " ";
        if (i == counts.size - 1)
            tallyPhrase += "and ";
        tallyPhrase += numberWords[countElem.count] + " " + countElem.letter;
        if (countElem.count > 1)
            tallyPhrase += "'s";
        if (i != counts.size - 1)
            tallyPhrase += ",";

        let span = document.createElement("span");
        if (actualCounts.get(countElem.letter).count != countElem.count)
            span.style.color = "red"
        span.innerText = tallyPhrase;
        spans.push(span);

        i++;
    });

    return spans;
}

function update() {
    let td = d3.select("#letter-counts")
        .selectAll("td")
        .data(Array.from(counts.values()), d => d.letter);

    let tdEnter = td.enter().append("td").style("display", "inline-block").text(d => d.letter);;
    tdEnter.append("span").attr("class", "claimed-count").text(d => d.count);
    tdEnter.append("span").style("cursor", "pointer").text("+").on("click", d => {
        if (d.count < 50)
            d.count++;
        update()
    });
    tdEnter.append("span").style("cursor", "pointer").text("-").on("click", d => {
        if (d.count > 0)
            d.count--;
        update()
    });

    td.selectAll(".claimed-count").text(d => d.count);

    let sentenceNodes = renderSentence(counts);
    let sentenceElem = d3.select("#sentence").node();
    sentenceElem.innerHTML = "";
    sentenceNodes.forEach(node => {
        sentenceElem.appendChild(node);
    });
}

window.onload = update;
