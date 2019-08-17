---
layout: post
title:  "Self-referential Pangrams"
---

Things that refer to themselves, such as this sentence, are one of the central
ideas in Douglas Hofstadter's *Gödel, Escher, Bach*. Not only does
self-reference underpin some staggering metaphysical truths, it's also
*satisfying* and *funny*. Mark Dunn's novel *Ella Minnow Pea*, is concerned
pangrams: sentences containing every letter of the alphabet. *Ella Minnow Pea*
is satisfying and funny too. In fact, pangrams are satisfying in themselves, and
although I never actually LOL'd at "the quick brown fox jumps over the lazy
dog", I think they're sort of funny. [Tom 7 might have something to say about
that](https://www.youtube.com/watch?v=ar9WRwCiSr0).

So, this sentence reproduced in Hofstadter's later book *I Am A Strang Loop*,
is pretty captivating:

> This pangram tallies five a's, one b, one c, two d's, twenty-eight e's, eight
> f's, six g's, eight h's, thirteen i's, one j, one k, three l's, two m's,
> eighteen n's, fifteen o's, two p's, one q, seven r's, twenty-five s's, twenty
> two t's, four u's, four v's, nine w's, two x's, four y's, and one z.

A self-referential pangram. Coming up with any old self-referential pangram
isn't hard (although this ersatz pangram's quotient of glyphs wants six), but
one that accurately tallies the letters it contains is tricky. Try inventing
such a sentence from scratch naïvely, and this is how far you get:

> This sentence contains two a's, one b, three c's, one d,

Now how many e's will you tally? There are six so far, so once you've added your
tally there will be seven. But "seven" contains two extra e's! The
self-reference in such a pangram is much more tangled than the lame attempt in
this post's first sentence.

How did the author (I am not sure if it was Hofstadter - the pangram is
reproduced from an earlier publication in which he printed submissions from
readers) construct the pangram? I suspect this information is on the internet,
but I want to figure it out for myself. I am too lazy to do this sort of thing
with just my brain and a pencil so I started writing some code. Here's a widget
you can play with to figure out whether one of these magical sentences is
accurate (don't read my JavaScript - it will hurt you):

<script>
</script>

<table>
    <tbody>
        <tr>
            <td>a: 1</td>
            <td>b: 1</td>
            <td>c: 1</td>
            <td>d: 1</td>
            <td>e: 1</td>
            <td>f: 1</td>
            <td>g: 1</td>
            <td>h: 1</td>
            <td>i: 1</td>
        </tr>
        <tr>
            <td>j: 1</td>
            <td>k: 1</td>
            <td>l: 1</td>
            <td>m: 1</td>
            <td>n: 1</td>
            <td>o: 1</td>
            <td>p: 1</td>
            <td>q: 1</td>
            <td>r: 1</td>
        </tr>
        <tr>
            <td>s: 1</td>
            <td>t: 1</td>
            <td>u: 1</td>
            <td>v: 1</td>
            <td>w: 1</td>
            <td>x: 1</td>
            <td>y: 1</td>
            <td>z: 1</td>
        </tr>
    </tbody>
</table>

(DO IT)

Wait a second - Hofstadter's pangram is wrong! It only contains twenty-one t's!
See if you can fix it. I can't. This may be funny but it is not satisfying.
