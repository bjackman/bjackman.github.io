---
date: '2025-07-31T12:11:23+02:00'
title: "curl | bash isn't a security issue (on Linux)"
draft: true
---

When I want to try out a new tool and its "Getting Started" page kicks off with
`curl https//thingy.dev/install.sh | sudo bash`, I usually [turn 360° and walk
away](/assets/xbox_360.gif)[^nix]. It's not worth it.

But this is _not_ because I'm worried about security. In fact I don't think
there's any real security issue with the `curl | sudo bash` here.

To understand why, let's start by considering what happens if we drop this sudo.
Is `curl | sudo bash` more of a security risk than plan `curl | bash`? I don't
think so, because I there's no significant security boundary between users on
Linux. There are two reasons for this:

1. [Almost everything of real-world interest on a desktop GNU/Linux system is
trivially accessible to the primary unprivileged user](https://xkcd.com/1200/).
In other words, the user boundary is not very _meaningful_.

2. Attackers who can run arbitrary code can quite easily access other users'
data (by becoming `root`), because Linux is broken. In other words, the user
boundary is not very _protective_.

## Linux is broken 

The Linux kernel is a monolith in C. As of today there are 3065 [un-rejected
kernel CVEs dated from
2024](https://git.kernel.org/pub/scm/linux/security/vulns.git/tree/cve/published/2024).
Most of those won't be exploitable on your system, many of them aren't
exploitable at all (the bar for creating a kernel CVE is pretty low). Still,
even a pretty small fraction of three thousand per year is several
vulnerabilities per day. And that's only the ones that got fixed. There are
[hundreds of unfixed bugs](https://syzkaller.appspot.com/upstream) that are
publicly-listed, many of which are likely exploitable, many of which are several
years old.

Even if you reboot daily, if you're running Linux you probably have dozens of
N-days on your system. I haven't even mentioned zero-days. Why bother with
those?

**Note**:
I don't know much about other OSs, I'm sure they are just as buggy, but I hear
XNU (macOS) has some nice hardening in place though. It is also possible to
build pretty hardened Linux systems, and distros are incrementally moving in
that direction.
{{.callout}}

## It's not about malicious developers

Despite all this, there's clearly a YOLO spectrum:

1. `curl | sudo bash`
2. `curl | bash`
3. `cargo install` / `brew install` / `npm install`
4. `sudo apt install` / `nix-shell -p` / `podman run` / `snap install` /
   `flatpak install` (arguing about the relative YOLO levels of these options
   is left as an exercise to the reader).

I just said I think my OS of choice is an insecure dumpster fire. Sure, towards the
bottom of the YOLO spectrum, we start to get some meaningful sandboxing
features, but why am I more comfortable with `cargo install` than `curl | bash`?

It's because **if I choose to run native code on my computer, I've priced in the
risk that the developer is malicious**[^compromised]. I don't get protection
from my OS or any other tooling; if my desktop remains uncompromised it's
because the people whose code I'm running aren't trying to compromise my
desktop. If I want to run code that I don't "trust", I would always run it in a
VM[^browser-vm].

## It's about _respect_

I don't reject `curl | bash` because I'm worried about security[^worry], I
reject it because _I like my system and I don't want someone to fuck it up_. If
a developer presents their tool with a `curl | bash`, I suspect that either:

1. Pushing it towards the bottom of the YOLO spectrum was _too hard_, because
   it's _too invasive_. Hmm, no thanks.
2. Or it was _too boring_, because they aren't _interested_ in how their tool
   interacts with the host system. Sounds like a developer who's gonna fuck up
   my host system!

That means there are exceptions. Nix is a `curl | bash` installation, but it
seems to be a pretty carefully-developed one, with clear instructions for
undoing it. I think the Nix developers probably care about this kinda thing, or
they wouldn't be Nix developers! Rustup is also on this list, since, well...
actually... I just get enough value out of Rustup that I tolerate it.

## Conclusion

`curl | bash` isn't a security problem. I don't like it because it's unclear
what effect it will have on my system. Sure, it's unclear what effect _running
any code at all_ will have on my system, if I don't read it or sandbox it. But
the only threat I'm really defending against here is incompetence, not malice.
An incompetent developer can make a lot of poor decisions in a Bash script.
They can make poor decisions in a `Cargo.toml` too, but they are funneled
towards good ones. And if they were able to get their package into the Debian
repositories, they might not be all that incompetent.

So, avoid `curl | bash`, but take a moment to consider why!

[^nix]: Well, actually I usually try `nix run nixpkgs#thingy` and it usually
works. In fact, I do this for basically everything if the "Getting Started"
points me to anything other than the package managers I already use.

[^compromised]: Or compromised. But, I think e.g. stealing a "real" developer's
SSH keys and directly injecting exploits into a release is probably less
effective than just making malicious contributions [à la XZ
Utils](https://en.wikipedia.org/wiki/XZ_Utils_backdoor).

[^browser-vm]: Luckily the browser counts as a VM. There are also userspace
sandboxing tools like [Bubblewrap](https://github.com/containers/bubblewrap).
It's possible to get real protection from something like that if it's
set up properly, I'd be fine with doing that if I ever had a need for something
with less overhead than a VM.

[^worry]: I _am_ worried about security, though. When I wrote "if my desktop
remains uncompromised", I really _meant_ that "if".
