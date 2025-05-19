---
date: '2025-05-18T12:11:23+02:00'
title: "curl | bash isn't a security issue"
---

When I want to try out a new tool and its "Getting Started" page kicks off with
`curl https//thingy.dev/install.sh | sudo bash`, I usually [turn 360° and walk
away](/assets/xbox_360.gif). It's not worth it.

What if we drop the `sudo`? That's much safer, right? Not really. There is not a
very interesting security boundary between root and unprivileged users on a
typical Linux system. The most sensitive data on your system is probably
in your browser profile.

## Linux is broken (in which I momentarily forget other OSs exist)

But what if there _was_ a real user/root boundary? My employer has a corporate
desktop Linux distro which seems to have some meaningful keyring setup in place
for browser creds. And we shouldn't have any sensitive corporate data stored on
the device. The user/root boundary might _meaningful_ on those systems, but that
doesn't mean it's _protective_.

The Linux kernel is a monolith in C. As of today there are 3074 [un-rejected
kernel CVEs dated from
2024](https://git.kernel.org/pub/scm/linux/security/vulns.git/tree/cve/published/2024).
Most of those won't be exploitable on your system, many of them aren't
exploitable at all (the bar for creating a kernel CVE is pretty low). Still,
even a pretty small fraction of three thousand per year is several
vulnerabilities per day. And  that's only the ones that got fixed. There are
[hundreds of unfixed bugs](https://syzkaller.appspot.com/upstream) that are
publicly-listed, many of which are likely exploitable, many of which are several
years old.

Even if you reboot daily, if you're running Linux you probably have dozens of
N-days on your system. I haven't even mentioned into zero-days. Why bother with
those?

I don't know much about other OSs, I'm sure they are just as buggy, but I hear
XNU (MacOS) has some nice hardening in place though. It is also possible to
build pretty hardened Linux systems, and distros are incrementally moving in
that direction.

## It's not about malicious developers

Despite all this, there's clearly a YOLO spectrum:

1. `curl | sudo bash`
2. `curl | bash`
3. `cargo install` / `brew install` / `npm install`
4. `sudo apt install` / `nix-shell -p` / `podman run` / `snap install` /
   `flatpak install`. (arguing aboutv the relative YOLO levels of these options
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
An incompoetent developer can make a lot of poor decisions in a Bash script.
They can make poor decisions in a `Cargo.toml` too, but they are funneled
towards good ones. And if they were able to get their package into the Debian
repositories, they might not be all that incompetent.

So, avoid `curl | bash`, but take a moment to consider why!

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