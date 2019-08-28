---
layout: post
title:  "Pangrammatic Autograms"
---

In *Gödel, Escher, Bach*, Douglas Hofstadter lays out how self-reference
underpins some staggering philosophical truths. Relatedly, it's *satisfying* and
*funny*. Pangrams - sentence containing every letter - are also satisfying, and
though perhaps I never actually LOL'd at "the quick brown fox jumps over the
lazy dog", I think they're sort of funny (maybe they are a weak form of Tom 7's
["improper hierarchy"](https://www.youtube.com/watch?v=ar9WRwCiSr0)).

So this sentence in Douglas Hofstadter's later book *I am a Strange Loop* is
pretty captivating:

> This pangram tallies five a's, one b, one c, two d's, twenty-eight e's, eight
> f's, six g's, eight h's, thirteen i's, one j, one k, three l's, two m's,
> eighteen n's, fifteen o's, two p's, one q, seven r's, twenty-five s's, twenty
> two t's, four u's, four v's, nine w's, two x's, four y's, and one z.

A self-descriptive sentence like this is called an *autogram*. Coming up with any
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

So, how *do* we go about generating them? The naïve approach above can get us
surprisingly far if we are careful about the order in which we tally the
letters. This sentence is correct[^1]:

> This pangram tallies one b, one c, five a's, two d's, one j, one k, two m's,
  two p's, one q, one z, one y, two g's, three l's, one u, five w's, thirteen
  o's, three f's, three v's, six h's, and six r's.

We've tallied twenty letters here but we'll always get stuck at about this
point. Suppose we somehow managed to tally twenty five letters by this
method. To add the final tally, we would need to use letters that have already
been tallied, so the sentence would become false.

Do you hate computers? If you would like to see yours suffer, you can watch it
trying to complete this impossible task here[^2]:

<blockquote id="suffering-sentence" style="line-height: 2em; height: 6em"></blockquote>
<button id="suffering-start">start</button>
<button id="suffering-stop">stop</button>
<button id="suffering-step">step</button>

In theory it will admit defeat eventually, but if my calculations are correct,
its stupid metal brain will oxidise into dust before that happens.

One way to think about the difficulty of generating pangrammatic autograms is to
compare it to a slightly simpler problem: what if we don't care if the
individual letter counts are correct, just that they add up to the right total?
In that case, the only thing that matters about the phrase "one a" is that it
tallies one letter, but contains four. It doesn't matter what those four letters
are. Generating these pseudo-autograms turns out to be a variant of the ["subset
sum" problem](https://en.wikipedia.org/wiki/Subset_sum_problem). This is an
*NP-complete* problem, which is a fancy way of saying it's "pretty tricky", but
it can be solved quite speedily for the values we're interested in here. Before
writing this article, I thought I could just write some code to generate these
pseudo-autograms, then test loads of them until it found a true autogram among
them. But the number of pseudo-autograms is vaster than I thought (I made the
rookie mistake of underestimating the factorial function!) and proper autograms
are a very slim subset of pseudo-autograms. My little laptop would take far too
long.

After realising this, I had a look online to see if anyone has come up with a
solution, and it turns out Chris Patuzzo has found rather a good one. He
describes it rather well in [this podcast](https://whyarecomputers.com/4) so in
the interest of variety I'll try to describe it in the opposite direction from
his.

One of the best known problems in computer science is "Boolean satisfiability",
or "SAT" for short. Suppose I tell you "either I am a mongoose, or I am
speaking". This might be true, if I was truly a mongoose, or if I was truly
speaking aloud. But if I tell you "I am a mongoose, and mongeese cannot speak,
and I am speaking" then *you don't need any evidence* to infer that I'm
lying. If I was truly a mongoose making the claim aloud, then my assertion of
the muteness of mongeese would stand on shaky ground indeed. If mongeese are
really speechless and you heard me speaking, you would surely doubt my
mongoosehood. If I was indeed a mongoose, which was truly a nonverbal creature,
it would not be possible for me to speak. SAT, then, is the problem of detecting
*unsatisfiable* assertions like this, which can *never* be true. As a bonus, if
the claim *can* be true, a SAT-solver can tell you the situations where it would
be. When given "Either I am a mongoose, or I am speaking", a SAT-solver would
spit out two valid situations:

- You are indeed a mongoose, but you are not speaking
- You are indeed speaking, but you are not a mongoose

Such simple examples may not make it clear, but a SAT-solver is quite a
spectacular thing, because it turns logical puzzles inside out. Chris Patuzzo
figured out a way of feeding the claim "there is a pangrammatic autogram" into a
SAT-solver, and the SAT-solver spat out situations where that claim is true
i.e. pangrammatic sentences. I have of course been glossing over the details -
SAT-solvers do not really understand English[^3], you feed them formal logical
expressions, and they spit out lists of all the combinations of truth and
falsehood that can make your overall expression true. The logical expression
that I'm glossing over when I write "I am a mongoose" is very simple, it
contains a single unit of truth or falsity (i.e. my mongoosehood). But if the
formal expression that we imagined for the assertion "there is a pangrammatic
autogram" was so simple, then the SAT-solver would simply tell us our assertion
is true as long a "there is indeed a pangrammatic autogram". This is not much
use. Patuzzo's work was to express "there is a pangrammatic autogram" in such
specific terms that the SAT-solver had no choice but to spit out everything we
need to know to write out the actual sentence.

I would love to harp on about this until I feel I've really explained it but I
think it would take too long. One more analogy: this technique means that
instead of having to answer the question "how do I find pangrammatic
autograms?", you just have to answer "given a sentence, how do I figure out if
it's a pangrammatic autogram?". The latter is obviously much easier. Patuzzo
clearly thought this was a pretty neat idea (and I agree), because he created an
entire programming language, called [Sentient](https://sentient-lang.org), which
helps you express many different problems in ways that bully SAT-solvers into
solving them for you, as he did for the problem of pangrammatic autograms.

This is pretty satisfying. In a few minutes my little laptop had generated this
beauty using Patuzzo's tool:

> This pangram tallies five a's, one b, one c, two d's, twenty nine e's, nine
  f's, four g's, six h's, thirteen i's, one j, one k, three l's, two m's, twenty
  one n's, fifteen o's, two p's, one q, seven r's, twenty five s's, eighteen
  t's, four u's, five v's, eight w's, two x's, four y's, and one z

But, of course it would a cruel joke if I didn't also extend his tool a little
bit so it could work on larger numbers. Otherwise I wouldn't be able to tell you
that this article[^4] contains and

[^1]: Except that it claims to be a pangram

[^2]: It's actually trying a little harder than I described; when it detects
      that adding a new tally has falsified a previous part of the sentence, it
      makes a crude attempt to fix it in a single step. There's no reason this
      should succeed in general, although I must admit I think there is some
      risk that this addition to the strategy could allow the machine we're
      torturing to achieve its goal.

[^3]: Actually, there has been lots of pretty cool research on writing programs
      that understand some parts of natural language and use it to do logical
      reasoning like SAT-solving. There was a time when some people thought this
      might lead to strong artificial intelligence! One of the earliest and most
      famous examples of this type of thing was a system called
      [SHRDLU](https://en.wikipedia.org/wiki/SHRDLU), which is also discussed in
      *Gödel, Escher, Bach*.

[^4]: Excluding the dynamic bits
