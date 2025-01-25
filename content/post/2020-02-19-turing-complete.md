---
categories: jekyll update
date: "2020-02-19T23:43:00Z"
title: eBPF is Turing Complete
---



Recently my teammate and I were discussing our project with another colleague at the coffee machine. Our project is closely tied to [eBPF](https://lwn.net/Articles/740157/). Our colleague didn't really know what that was, so my team-mate summed it up as "a non-Turing-complete bytecode VM in the Linux kernel". This triggered a pointless argument, which is the topic of this post.

My colleague's rationale was that an eBPF program is only allowed to execute [one million instructions](https://lwn.net/Articles/794934/). To use the traditional definition of Turing-completeness, that clearly means it cannot simulate the infinite "tape" of a Turing machine.

Well, say I, neither can your laptop. It has finitely many digital states; it cannot simulate an infinite Turing machine. No real computer can. If your definition of Turing-complete is met by no extant device, then it's not a very useful definition. So, say I, relax it, and let eBPF into the Turing-complete pantheon.

Now, my colleague - if he had not by now finished his coffee and continued with his day - would most likely have suggested that his laptop's merely *physical* limitations should not be be elevated to the severity of eBPF's fundamental, abstract, incontroverible boundedness. Just because a laptop is not truly Turing-complete, he can be imagined arguing, we cannot deny the Turing-completeness of C, or of x86 assembly. A definition met by no extant object is not a useless definition. That is, presumably, what he would have proposed.

But, as I say, the coffee was finished, and I won the argument.
