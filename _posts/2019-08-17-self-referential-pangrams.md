---
layout: post
title:  "Self-referential Pangrams"
---

THIS POST IS INCOMPLETE

In *Gödel, Escher, Bach*, Douglas Hofstader explains how self-reference
underpins some staggering philosophical truths. Relatedly, it's *satisfying* and
*funny*. Pangrams - sentence containing every letter - are also satisfying, and
though perhaps I never actually LOL'd at "the quick brown fox jumps ovrer the
lazy dog", I think they're sort of funny (maybe they are a weak form of Tom 7's
["improper hierarchy"](https://www.youtube.com/watch?v=ar9WRwCiSr0)).

So this sentence in Douglas Hofstadter's later book *I am a Strange Loop* is
pretty captivating:

> This pangram tallies five a's, one b, one c, two d's, twenty-eight e's, eight
> f's, six g's, eight h's, thirteen i's, one j, one k, three l's, two m's,
> eighteen n's, fifteen o's, two p's, one q, seven r's, twenty-five s's, twenty
> two t's, four u's, four v's, nine w's, two x's, four y's, and one z.

A self-referential pangram. Coming up with any old self-referential pangram
isn't hard (although this ersatz pangram's quotient of glyphs wants six), but
one that accurately describes itself in this detail is tricky. Try inventing
such a sentence from scratch naïvely, and this is how far you get:

> This sentence contains two a's, one b, three c's, one d,

Now how many e's will you tally? There are six so far, so once you've added your
tally there will be seven. But "seven" contains two extra e's! The
self-reference in such a pangram is clearly much more tangled than this
sentence's own simple narcissism.

Here's a widget that renders these sentences with any falsehoods highlighted in
red:

<table><tr id="letter-counts"></tr></table>
<blockquote id="sentence"></blockquote>
<script src="https://d3js.org/d3.v5.min.js"></script>
<script src="/assets/js/pangrams.js"></script>

Wait a second - Hofstadter's pangram  is wrong! It only contains twenty-one t's!
See if you can  fix it by clicking the little '+'s and  '-s' (are they too small
for phone screens?  Sorry. Web design is  hard. Why aren't you reading this on a
proper computer,  anyway? Why  are your fingers  so fat? It's  not my  fault) to
adjust the letter counts. I can't make it right. This may be funny but it is not
satisfying.

So, how do we go about generating them? We can start the approach we took above,
and by a little less naïve by noting that we do not need to append our tallies
in alphabetical order. Perhaps by selecting the order of the tallies carefully
we can incrementally build a sentence that is true at every step of the
way. Indeed some letters do not appear in the words for any numbers so they can
be tallied "for free" without fear of falsifying any as-yet-unwritten part of
the sentence:

> This pangram tallies one b, one c, five a's, two d's, one j, one k, two m's,
  two p's, one q, and one z

From here we can select *any* other letter and insert its tally to the sentence
and still have a true statement[^1].

We can continue with this approach, and if we select the order of letters
carefully we can go surprisingly far:

> This pangram tallies one b, one c, five a's, two d's, one j, one k, two m's,
  two p's, one q, one z, one y, two g's, three l's, one u, five w's, thirteen
  o's, three f's, three v's, six h's, and six r's

Here we have tallied twenty letters and all that remain are 'e', 's', 'n', 't',
'i', and 'x'. But here we are stuck. We can backtrack and try again with a new
order, but we will always get stuck eventually: suppose we had a sentence
accurately tallying 25 of its constituent letters. The tally for the final
letter would certainly contain some of those 25 letters, so adding it would make
a pre-existing tally false.

So we cannot reach our goal by steps from one true[^1] sentence to another; we
must take a leap of faith into falesehood which is rectified at the grand
finale.

TODO: WRITE THE REST LOL

[^1]: Except that it claims to be a pangram
