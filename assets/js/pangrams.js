// WHAT, YOU THOUGHT YOU'D FIND CLEAN CODE HERE?
//         YOU THOUGHT YOU'D FIND COMMMENTS??
//           YOU THOUGHT PUNK WAS DEAD???

let numberWords = [
    "",
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
        if ((counts.size) > 1 && (i == counts.size - 1))
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
        let match = sentence.match(new RegExp(letter, "g"));
        counts.set(letter, {"letter": letter, "count": match ? match.length : 0})
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
        if ((counts.size > 1) && (i == counts.size - 1))
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

function writeTallyPhrase(count, letter) {
    let tallyPhrase = numberWords[count] + " " + letter;
    if (count > 1)
        tallyPhrase += "'s";
    return tallyPhrase
}

function* suffer(counts) {
    let sentence = createSentence(counts);
    let sentenceCounts = countLetters(sentence);
    for (let newLetter of letters) {
        if (counts.has(newLetter)) {
            continue;
        }
        let newLetterCount = sentenceCounts.get(newLetter).count;
        let found = false;
        let newTallyPhrase = null;
        for (let additionalCount = 0; additionalCount <= 5; additionalCount++) {
            newTallyPhrase = writeTallyPhrase(newLetterCount + additionalCount, newLetter);
            if (counts.size == 1)
                newTallyPhrase = "and " + newTallyPhrase;
            if (countLetters(newTallyPhrase).get(newLetter).count == additionalCount) {
                found = true;
                break;
            }
        }
        if (!found) {
            continue;
        }
        let newCounts = new Map(counts);
        newCounts.set(newLetter, {"letter": newLetter, "count": newLetterCount})
        for (let chr of newTallyPhrase.split(""))
            if (newCounts.has(chr))
                newCounts.set(chr, {"letter": chr, "count": newCounts.get(chr).count + 1});

        let newSentence = createSentence(newCounts);
        yield newCounts;

        let actualNewCounts = countLetters(newSentence);
        let newSentenceValid = true;
        for (let [letter, newCount] of newCounts) {
            if (newCount.count != actualNewCounts.get(letter).count) {
                newSentenceValid = false;
                break;
            }
        }
        if (newSentenceValid) {
            for (let val of suffer(newCounts)) {
                yield val;
            }
        }
    }
    return null;
}

function updateTable() {
    let td = d3.select("#letter-counts")
        .selectAll("td")
        .data(Array.from(counts.values()), d => d.letter);

    let sentenceString = createSentence(counts);
    let actualCounts = countLetters(sentenceString);

    genClaimedCountText = d => `${d.count}`.padEnd(2, "\xa0");
    genActualCountText = d => `(${actualCounts.get(d.letter).count})`.padStart(4, "\xa0");

    let tdEnter = td.enter().append("td")
        .style("display", "inline-block")
        .style("font-family", "monospace")
        .style("padding", "8px")
        .text(d => `${d.letter}: `);
    tdEnter.append("span").attr("class", "claimed-count").text(genClaimedCountText);
    tdEnter.append("span").style("cursor", "pointer").text("+").on("click", d => {
        if (d.count < 50)
            d.count++;
        updateTable()
    });
    tdEnter.append("span").style("cursor", "pointer").text("-").on("click", d => {
        if (d.count > 1)
            d.count--;
        updateTable()
    });
    tdEnter.append("span").attr("class", "actual-count")
        .text(genActualCountText)
        .style("color", d => actualCounts.get(d.letter).count != d.count ? "red" : "gray");


    td.selectAll(".claimed-count").text(genClaimedCountText);
    td.selectAll(".actual-count")
        .text(genActualCountText)
        .style("color", d => actualCounts.get(d.letter).count != d.count ? "red" : "gray");

    let sentenceNodes = renderSentence(counts);
    let sentenceElem = d3.select("#sentence").node();
    sentenceElem.innerHTML = "";
    sentenceNodes.forEach(node => {
        sentenceElem.appendChild(node);
    });
}

let sentenceGenerator = suffer(new Map());
function updateSuffering() {
    counts = sentenceGenerator.next().value;
    let sentenceNodes = renderSentence(counts);
    let sentenceElem = d3.select("#suffering-sentence").node();
    sentenceElem.innerHTML = "";
    sentenceNodes.forEach(node => {
        sentenceElem.appendChild(node);
    });
}

function main() {
    updateTable();
    let timer = null;
    d3.select("#suffering-start").on("click", function() { if (!timer) { timer = d3.interval(updateSuffering, 500) }});
    d3.select("#suffering-stop").on("click", function() { if (timer) timer.stop(); timer = null; });
    d3.select("#suffering-step").on("click", updateSuffering);
}

window.onload = main;
