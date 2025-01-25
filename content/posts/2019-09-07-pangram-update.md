---
date: "2019-09-07T00:00:00Z"
title: A Humiliating Update on 'Pangrammatic Autograms'
---

In my [previous post on "pangrammatic autograms"]({% post_url
2019-08-28-pangrammatic-autograms %}), I included a cute tool to fiddle with
these magical sentences and see whether they were correct. I then exclaimed (!)
that the pan-autogram that I found in Hofstadter's *I Am A Strange Loop* was
*incorrect*!

Well, a Reddit user [pointed
out](https://www.reddit.com/r/programming/comments/cxusz6/pangrammatic_autograms/eypyot0?utm_source=share&utm_medium=web2x)
that I am a completely useless idiot and deserve to be cast into the North Sea
on a raft of overripe bananas, because the reason why my cute tool found
Hofstadter's pangram to be bogus was simply that it didn't account for capital
letters. I usually consider myself a competent programmer so this is pretty
embarrassing. I should probably add some daily self-flaggelation to my
banana-raft itinerary.

Anyway, despite my slanderous repudiation of a claim made by an intellectual hero,
the widget still does its job of illustrating the difficulty of getting to a
pan-autogram. So the article's core message is intact, even if the self-respect
of its author is in tatters.

## One more thing!

One more note about that article. The party trick at the end was trickier than
you might think. I extended Patuzzos's Sentient tool and fed it in my article as
the "seed sentence", but it didn't have any solutions! With the article as it
stood, it was impossible to make it accurately autogrammatic. It's intuitively
not too surprising that as the seed sentence gets longer (i.e. grows from "this
sentence contains ... and" to the entirety of my article), the likelihood that
there is a valid solution begins to wane.

So I actually [extended the
tool](https://gist.github.com/bjackman/4b0ccb3f91a3b9c214872ed518c9ced9)
further, to find near-miss autograms, where the resultant article would
*almost*, but not quite accurately tally all its constituent letters. After
leaving my laptop whirring overnight, I found a set of tallies that would be
correct if I simply removed three m's, one s, and one t from the other parts of
the article. This took a bit of fiddling - I had to add and remove a few letters
and shoehorn in the word "acmatic" to reach the right aggregate change in letter
counts. You can see the changes I made to the article
[here](https://github.com/bjackman/bjackman.github.io/commit/9d207f15f3b75630d50fc6e0c7dab187ef192a83).
