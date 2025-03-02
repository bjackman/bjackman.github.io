---
date: '2025-01-25T15:37:25+01:00'
title: 'Meandering nonsense about the YX Problem'
---

**Note**:
There's now a punchier, less silly and obtuse version of this argument [here]({{< ref yx-problem-v2 >}}).
{.callout}

[The XY Problem](https://xyproblem.info/) is a name for the phenomenon that
people asking for help often "skip ahead" to questions about the solution they
envisage, instead of asking questions about their problem.

The classic example goes something like this:

> _Schlörbert_: How can I disable SELinux on my GRUNDUS device?
>
> _Æthelred_: Don't do that. Why do you want to do that? That's insecure.
>
> _Schlörbert_: But I'm pretty sure SELinux is breaking my app.
>
> _Æthelred_: What error do you get?
>
> _Schlörbert_: `failed to initialize BAGUNDUS engine (operation not permitted)`
>
> _Æthelred_: You just need to `chmod a+r /etc/bagundus.cbl`

OK, there were two possible outcomes of this conversation:

- Schlörbert haplessly ships an insecure GRUNDUS device and his Quadrant
  Commander's Lunar Orbit Access Credentials are stolen as a result.

- Æthelred and Schlörbert waste a few minutes getting to the point of their
  conversation.

And look, I'd hate it just as much as anyone if the Lilac Faction got access to
Lunar Orbit. It's fair for Æthelred to complain about this. But the latter
outcome is much more likely and it's just... not that bad.

Meanwhile, I think the opposite situation can be just as annoying for everyone,
and warrants its own name: **The YX Problem**. Imagine you are developing your
GRUNDUS app and hitting `EPERM`s. You're used to this, GRUNDUS is like that
sometimes. You have lots of tricks up your sleeve for debugging this, you don't
need help.

But, suddenly it pops into your head that maybe SELinux is causing a problem.
Obviously you wouldn't disable SELinux on a production device. It doesn't even
seem likely that SELInux is at fault here. But it's a useful debugging step to
have in your toolbox, why don't you try something new? So here you go:

> _You_: How can I disable SELinux on my GRUNDUS device?
>
> _Æthelred_: Don't do that. Why do you want to do that? That's insecure.
>
> _You_: I'm just curious.
>
> _Æthelred_: Why?
>
> _You_: Well, I'm debugging an `EPERM` and I was thinking-
>
> _Æthelred_: Jesus, how many fucking idiots do we have to deal with who can't
> get their fucking `/etc/bagundus.cbl` permissions right?
>
> _You_: OK, well, yeah actually I do have the wrong permissions on that file.

Nobody learned anything here, and nobody had any fun. Æthelred failed to
understand that sometimes questions are just questions, and people are just
looking for knowledge.

There isn't really any easy solution to this dilemma. You and Schlörbert phrased
their question the same way, Æthelred didn't have the information to infer that
you're a decorated GRUNDUS Ingeniator with seven Cycles of experience under your
belt. But maybe if you helped him out, and he wasn't such a dick about it, this
would have gone better:

> _You_: I'm curious to see what happens if I disable SELinux, I have a test
> device, it's fully disconnected from the Blood Of Callisto Network. Can anyone
> tell me the command to run?
>
> _Æthelred_: Um, well if you haven't read it, take a look at the Security page in the
> documentation first; SELinux is pretty important. But anyway you're probably
> looking for `sudo setenforce 0`.

Anyway, I'm not saying the XY problem isn't real. But it isn't the only problem
out there involving Xs and Ys. Communication is hard, there aren't many
shortcuts. If you make assumptions and jump to conclusions people will get
frustrated, this goes both ways in every interaction.

So, just be patient! Give people the time to explain themselves, ask for
clarifications. Don't just link https://xyproblem.info. Don't just link a Stack
Overflow question that you think is related to "what they're really asking".
Just, you know... be nice, yeah?