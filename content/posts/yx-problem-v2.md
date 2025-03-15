---
date: '2025-03-02T13:28:10+01:00'
title: 'The YX Problem (Reverse XY Problem)'
---

[XY Problem](https://xyproblem.info/) interactions go something like this:

> **Tess**: How do I disable SELinux?
>
> **Burt**: Don't disable SELinux. Go and read https://xyproblem.info then ask
> your ACTUAL question.
>
> **Tess**: My webserver is crashing with "can't read /etc/foo.conf: permission denied"
>
> **Burt**: You need to do `chmod a+r /etc/foo.conf`.

And yeah, fine, in this case Burt had a point. But what about this one:

> **Tess**: How do I disable SELinux?
>
> **Burt**: Don't disable SELinux. Go and read https://xyproblem.info then ask
> your ACTUAL question.
>
> **Tess**: I don't have a problem. I am trying to learn about SELinux. I want to
> see how my system behaves with it switched off.

In this case, Burt looks like a dick.  How could Burt have detected that this was
the case before writing his message? **He couldn't have**, so he shouldn't have
written that message.

Perhaps more importantly, even in the first case where he was "right", he killed
the vibe. Next time someone has a question, they'll hesitate before asking it in
this forum. Now everyone learns less from each other and the world is a worse
place.

I call this the **YX Problem**: Someone asks about Y, you assume that there is
some X that they're "really asking about", and you try to answer X instead.

So how should Burt avoid the YX Problem?

> **Tess**: How do I disable SELinux?
>
> **Burt**: It depends exactly what you mean by "disable" but `sudo setenforce
> 0` will stop it from blocking accesses and stuff. By the way - are you sure you
> want to switch SELinux off, is it breaking something?
>
> **Tess**: Yeah, I know it's a security risk, but I'm just doing it on my test
> machine for experimentation.

Yeah, this was more verbose, it took more time. Doing stuff better does usually
take more energy! There aren't that many shortcuts to human interaction, but
taking the time to be nice usually pays off. If you don't have time to be nice,
you can just not reply! Maybe someone else will pick up the slack, or maybe Tess
will just have to RTFM. Both of these are better than poisoning the chatroom by
raising the perceived social cost to ask questions.

If Tess _does_ turn out to be XY-Probleming, Burt should feel free to link
https://xyproblem.info. Just, you know, be nice, yeah?

---

There's also a [longer, sillier, and less accessible version of this post]({{< ref yx-problem >}}).
{ .callout }