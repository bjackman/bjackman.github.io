---
date: '2025-07-30T12:11:23+02:00'
title: "curl | bash isn't a security issue (on Linux)"
---

When I want to try out a new tool and its "Getting Started" page kicks off with
`curl https://thingy.dev/install.sh | sudo bash`, I usually [turn
360°](/assets/xbox_360.gif) and walk away[^nix]. It's not worth it.

But this is _not_ because I'm worried about security. In fact I don't think
there's any real security issue with the `curl | sudo bash` here.

To understand why, let's start by considering what happens if we drop this sudo.
Is `curl | sudo bash` more of a security risk than plain `curl | bash`? I don't
think so, because there's no significant security boundary between users on
Linux. There are two reasons for this:

1. Almost everything of real-world interest on a typical desktop GNU/Linux system is
[trivially accessible](https://xkcd.com/1200/) to the primary unprivileged
user[^keyring].

2. Attackers who can run arbitrary code can quite easily access other users'
data, or gain a persistent foothold, or whatever else, by becoming `root`,
because Linux is broken. 

## Linux is broken 

The Linux kernel is a monolith in C. As of today there are 3065 [un-rejected
kernel CVEs dated from
2024](https://git.kernel.org/pub/scm/linux/security/vulns.git/tree/cve/published/2024).
Most of those won't be exploitable on your system, many of them aren't
exploitable at all (the bar for creating a kernel CVE is pretty low). Still,
even a small fraction of three thousand per year is several
vulnerabilities per day. And that's only the ones that got fixed. There are
[hundreds of unfixed bugs](https://syzkaller.appspot.com/upstream) that are
publicly listed, many of which are likely exploitable, many of which are several
years old.

Even if you reboot daily, you probably have dozens of exploitable N-days on your
system. I haven't even mentioned zero-days. Why bother with those?

All of this leads to the conclusion: if you think an actor might be malicious,
**downloading their code and running it unsandboxed is exactly as risky as
running it as root**.

### How we get away with it

If Linux is so broken, why does the world keep turning? The answer is that our
most important systems are architected with the brokenness in mind. Luckily for
us, while vulns [do](https://dirtypipe.cm4all.com/) sometimes [show
up](https://en.wikipedia.org/wiki/Dirty_COW) in really core areas of the kernel,
the vast majority are in pretty obscure dark corners of the API where very few
applications ought to stray.

This makes sandboxing really effective. The most obvious (and probably also the
most secure) sandboxes are web browsers and KVM. But just running a normal
process/container without full syscall API access already goes a long
way[^process-sandboxing].

But you don't get a sandbox when you `curl | bash`. You don't get a sandbox when
you `apt install`, or `go run` or `brew install` or anything else. (Flatpak and
Snap do offer some sandboxing, but those are only available for limited
use cases). Thus, these are all roughly equivalent from a
malicious-developer-risk point of view.

### What about hardening?

The Linux kernel itself [is very slowly gaining a
bunch of features](https://docs.kernel.org/security/self-protection.html) that
start to add up to something like a dial that says "security". One day, it
might be possible to turn that dial up to 11 (probably when you compile the
kernel) and get a system where:

- exploiting kernel bugs is really hard, even without a sandbox, _and_

- the system is still usable (cost-effective on the server, responsive enough
for the desktop).

But we aren't there today. As things stand, you need to do work across the stack in order to build a secure system on Linux. This is part of the reason that Android and ChromeOS are so different from GNU/Linux. 

I don't know very much about macOS, but from what I've heard XNU (its kernel)
already has a lot of these hardening features. Yet at the same time, Apple still
opts to do much of the same cross-stack engineering. This feels like a sign that
kernel hardening will always be an "and" instead of an "or".

## It's not about malicious developers

So, Linux is so broken that `curl | sudo bash` isn't a security issue, but I
still don't do it. Why not? 

First, let's take a look at the YOLO spectrum of software installation:

1. `curl | sudo bash`
2. `curl | bash`
3. `cargo install` / `brew install` / `npm install` / `nix run`
4. `sudo apt install` / `podman run` / `snap install` /
`flatpak install` (arguing about the relative YOLO levels of these options
is left as an exercise to the reader).

In terms of a potentially malicious developer, I don't see
much[^spectrum-sandboxing] of a risk difference between the levels of this
spectrum, I still see a spectrum there for other reasons.

## It's about _respect_

I don't reject `curl | bash` because I'm worried about security, I reject it
because _I like my system and I don't want someone to fuck it up_. If a
developer presents their tool with a `curl | bash`, I suspect that either:

1. Pushing it towards the bottom of the YOLO spectrum was _too hard_, because
it's _too invasive_. Hmm, no thanks.
2. Or it was _too boring_, because they aren't _interested_ in how their tool
interacts with the host system. Sounds like a developer who's gonna fuck up
my host system![^bash-installer]

That means there are exceptions. Nix is a `curl | bash` installation, but it
seems to be a pretty carefully-developed one, with clear instructions for
undoing it. I think the Nix developers probably care about this kinda thing, or
they wouldn't be Nix developers! 

## Conclusion

Maybe you thought this post would be about how secure Linux is. It's actually
the opposite. `curl | bash` isn't a security problem on Linux, just like
microplastics aren't a health concern for heroin addicts.

I don't like `curl | bash` because it's unclear what effect it will have on my
system. Sure, it's unclear what effect _running any code at all_ will have on my
system, if I don't read it or sandbox it. But **the threat I'm defending against
here is incompetence, not malice**. 

An incompetent developer can make a lot of poor decisions in a Bash script. They
can make poor decisions in a `Cargo.toml` too, but they are funneled towards
good ones. And if they were able to get their package into the Debian
repositories, they might not be all that incompetent.

So, avoid `curl | bash`, but take a moment to consider why!

[^keyring]: On some systems, really important data is stored in a keyring that
can only be decrypted via action from the human user. For example Chrome can
store credentials this way. I don't know enough about browsers or these
credentials to know how protective this is in practice. Firefox doesn't do this,
anyway. I assume Windows and macOS do much better than Linux here, but I don't
know about that either.

[^nix]: Well, actually I usually try `nix run nixpkgs#thingy` and it usually
works. In fact, I do this for basically everything if the "Getting Started"
points me to anything other than the package managers I already use.

[^process-sandboxing]: There are a few different ways to achieve this. They
include LSMs (in particular
[Landlock](https://docs.kernel.org/security/landlock.html) which is specifically
designed for this),
[seccomp](https://www.kernel.org/doc/html/v5.0/userspace-api/seccomp_filter.html),
and even ptrace. [gVisor](https://gvisor.dev/) is quite an interesting case that
uses KVM in an interesting way.

[^spectrum-sandboxing]: I'm being pretty harsh here. Escaping a plain Podman
container isn't very hard, but it _does actually require an exploit_. And
Flatpak and Snap actually have meaningful syscall sandboxing.

[^bash-installer]: I've also once or twice read the script that I was asked to
pipe into my shell, and discovered that in fact the developers _have_ packaged
their tool properly for a bunch of different distros. Then their script just
detects which distro you're on, adds the appropriate repo to your system, and
then calls the appropriate package manager. I guess those developers just
_really_ want their "Getting Started" to be short and snappy, and assume most of
their prospective users don't care about all this OS-nerd bullshit.