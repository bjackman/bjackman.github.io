# My blong

Start with `nix develop`.

Then: `hugo serve`. This should auto-reload and shit.

It means you forgot to clone recursively. Run `git submodule init && git submodule update`.

To create a new post: `hugo new content content/posts/name.md`.

Page views are tracked at https://yawn.goatcounter.com/.

## Writing blong ponts

Refer to other posts like this: `[here]({{< ref yx-problem-v2 >}})`.

Make "callout" sections like this:

```markdown
**Note**:
There's now a punchier, less silly and obtuse version of this argument [here]({{< ref yx-problem-v2 >}}).
{.callout}
```

They just get a background color and some padding.

## Notes on port from Jekyll

TODOs after `hugo import`ing from old Jekyll version:

- [x] Figure out why I can't see any pages
- [x] Add a list to the homepage

  The theme I started with doesn't list posts on its default home page. I tried
  just copying its "list page" template there but it didn't work. So I started
  trying different themes.

  - Ananke is something like a "default" so I didn't wanna use it. I don't get a
    list on the homepage.
  - "Introduction" doesn't generate a list and seems quite complex.
  - "Mini" doesn't build

  Then while fiddling around with the "nostyleplease" theme I realised that it
  starts working if I remove dates from the filenames. What's up with that? I
  think maybe Hugo or the themes are buggy when switching between themes. This
  issue went away when I cleaned up the repo for the commit that added the
  theme. Not sure this is really the theme I want but it works so let's just
  start from here.

  Anyway, let's try that...
- [x] Bring back my fancy old 404 page
- [x] Look through deleted files and figure out if anything that looks important
  was lost
- [x] Check all  pages still work
  - [x] Fix links between posts
  - [x] Make pictures work
- [x] Try to make old links work. (`permalinks` section of config?)
- [x] Fix the copyright thingy
- [x] Improve the "up" link for non-nerds
- [x] Deploy that thang
- [ ] Add a favicon or something?
- [ ] Use a more gentle color theme?
