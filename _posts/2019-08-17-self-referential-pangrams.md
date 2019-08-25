---
layout: post
title:  "Pangrammatic Autograms"
---

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

A self-descriptive sentence ike this is called an *autogram*. Coming up with any
old self-referential pangram isn't hard (although this ersatz pangram's quotient
of glyphs wants six), but a pangrammatic autogram is very tricky. Try inventing
such a sentence from scratch naïvely, and this is how far you get:

> This sentence contains two a's, one b, three c's, one d,

Now how many e's will you tally? There are six so far, so once you've added your
tally there will be seven. But "seven" contains two extra e's! The
self-reference in such a pangram is clearly much more tangled than this
sentence's own simple narcissism.

Here's a widget that renders these sentences with any falsehoods highlighted in
red:

<blockquote id="sentence"></blockquote>
<table style="border: none;"><tr id="letter-counts"></tr></table>
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
in alphabetical order. By selecting the order of the tallies carefully we can
avoid the "seven a's" issue we encountered earlier. And some letters do not
appear in the words for any numbers so they can be tallied "for free" without
fear of falsifying any as-yet-unwritten part of the sentence:

> This pangram tallies one b, one c, five a's, two d's, one j, one k, two m's,
  two p's, one q, and one z

From here we can select *any* other letter and insert its tally to the sentence
and still have a true statement[^1].

We can continue with this approach, and if we select the order of letters
carefully we can go surprisingly far:

> This pangram tallies one b, one c, five a's, two d's, one j, one k, two m's,
  two p's, one q, one z, one y, two g's, three l's, one u, five w's, thirteen
  o's, three f's, three v's, six h's, and six r's

But eventually we will always end up falsifying an earlier part of the sentence:
suppose we somehow managed to tally twenty five letters by this method. To add
the final tally, we would need to use letters that have already been tallied, so
the sentence would become false.

Do you hate computers? If you would like to see yours suffer, you can watch it
trying to complete this impossible task here:

<blockquote id="suffering-sentence" style="line-height: 2em; height: 6em"></blockquote>
<button id="suffering-start">start</button>
<button id="suffering-stop">stop</button>

In theory it will admit defeat eventually, but if my calculations are correct,
its stupid metal brain will probably oxidise into dust before that happens.

As another way to think about how hard generating pangrammatic autograms is to
compare it to a slightly simpler problem: what if we don't care if the
individual letter counts are correct, just that they add up to the right total?
In that case, the only thing that matters about the phrase "one a" is that it
tallies one letter, but contains four. It doesn't matter what those four letters
are. Generating these pseudo-autograms turns out to be a variant of the
well-known ["subet sum"
problem](https://en.wikipedia.org/wiki/Subset_sum_problem). This is already an
*NP-complete* problem, which is a fancy way of saying it's "pretty tricky", but
it can be solved quite speedily for the values we're interested in here. Before
writing this article, I had thought I could just write a program to generate
these pseudo-autograms, then test loads of them until I found a true autogram
among them. But the number of pseudo-autograms is vaster than I thought (never
underestimate the fatorial function!) and autograms are a very slim subset of
pseudo-atograms. My little laptop would take far too long. The additional degree
of self-reference introduced by having specifically the "o" in "one a" influence
the rest of the sentence takes the difficulty of the problem to another level.

After realising just how difficult this task is, I had a look online to see if
anyone has come up with a solution, and it turns out Chris Patuzzo has found
rather a good one. He describes it rather well in [this
podcast](https://whyarecomputers.com/4) and I'll try to describe it in the
opposite direction from how he does.

One of the best known problems in computer science
is "boolean satisfiability", or "SAT" for short. Suppose I tell you "either I am
a mongoose, or I am speaking". This might be true, if I was truly a mongoose, or
if I was truly speaking aloud. But if I tell you "I am a mongoose, and mongeese
cannot speak, and I am speaking" then you don't need *any evidence* to say that
I'm lying. If I was truly a mongoose making the claim aloud, then my assertion
of the muteness of mongeese would stand on shaky ground indeed. If mongeese are
really speechless and you heard me speaking, you would surely doubt my
mongoosehood. If I was indeed a mongoose, which was truly a nonverbal creature,
you would not believe that I was speaking. SAT, then, is the problem of
detecting these claims that can *never* be true. As a bonus, if the claim *can*
be true, a SAT-solver can tell you the situations where it would be. When given
"Either I am a mongoose, or I am speaking", a SAT-solver would spit out two
valid situations:

- You are indeed a mongoose, but you are not speaking
- You are indeed speaking, but you are not a mongoose

Such simple examples may not make it clear, but a SAT-solver is quite a
spectacular thing, because it turns logical puzzles inside out. Chris Patuzzo
figured out a way of feeding the claim "there is a pangrammatic autogram" into a
SAT-solver, and the SAT-solver spat out situations where that claim is true
(i.e. pangrammatic sentences). I have of course been glossing over the details -
SAT-solvers do not really understand English[^2], you feed them formal logical
expressions, and they spit out lists of all the combinations of truth and
falsehood that can make your overall expression true. The logical expression
that I'm glossing over when I write "I am a mongoose" is very simple, it
contains a single unit of truth or falsity (i.e. my mongoosehood). But if the
formal expression that we imagined for the claim "there is a pangrammatic
autogram" was so simple, then the SAT-solver would simply tell us "there is
indeed a pangrammatic autogram". Patuzzo's work was to express "there is a
pangrammatic autogram" in such specific terms that the SAT-solver had no choice
but to spit out everything we need to know to write out the actual sentence.

Patuzzo clearly thought this was a pretty neat idea (and I agree), because he
created an entire programming language, called
[Sentient](https://sentient-lang.org), which helps you express your problems in
ways that bully SAT-solvers into solving them for you, as he did for the problem
of pangrammatic autograms..

complexity; coming up with that logical expression was the bulk of Patuzzo's
work.

So we cannot reach our goal by steps from one true[^1] sentence to another; we
must take a leap of faith into falesehood which is rectified at the grand
finale.

[^1]: Except that it claims to be a pangram

[^2] Actually, there has been lots of pretty cool research on writing programs
     that understand some parts of natural language and use it to do logical
     reasoning like SAT-solving. There was a time when some people thought this
     might lead to real artificial intelligence!
