k# My blong

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
- [ ] Look through deleted files and figure out if anything important was lost:

      ```
        deleted:    404.html
        deleted:    Gemfile
        deleted:    Gemfile.lock
        deleted:    README.md
        deleted:    _assets/js/pangrams.html
        deleted:    _config.yml
        deleted:    _posts/table.html
        deleted:    about.md
        deleted:    creeps_tutorial.html
      ```
- [ ] Check all  pages still work
- [ ] Figure this shit out:
      ```
      WARN  Raw HTML omitted while rendering "/home/brendan/src/bjackman.github.io/content/posts/2023-05-06-german.md"; see https://gohugo.io/getting-started/configuration-markup/#rendererunsafe
      You can suppress this warning by adding the following to your site configuration:
      ignoreLogs = ['warning-goldmark-raw-html']
      WARN  Raw HTML omitted while rendering "/home/brendan/src/bjackman.github.io/content/posts/2019-08-28-pangrammatic-autograms.md"; see https://gohugo.io/getting-started/configuration-markup/#rendererunsafe
      You can suppress this warning by adding the following to your site configuration:
      ignoreLogs = ['warning-goldmark-raw-html']
      ```
- [ ] Deploy that thang
- [ ] Try to make old links work. (`permalinks` section of config?)
- [ ] Add a favicon or something?
- [ ] Fix the copyright thingy
