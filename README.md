# The Final Exam

An examination in classical education, set on twenty lessons from the Substack [*What Schools Forget*](https://whatschoolsforget.substack.com/).

Thirteen of the twenty lessons are drawn at random, with one question on each. Every answer draws the next step of Euclid's proof of I.47: in colour if it is right, in pencil if it is not. When the paper is handed in, the lessons open as links to the articles, and a wrapped prize waits to be opened, whatever the score.

**Sit it:** https://dprol.github.io/euclid-exam/

## Run it locally

It is a static site with no build step. Serve the folder with any web server:

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Change the questions

Everything is in `js/data.js`:

- `LESSONS`: the twenty articles, with title, date and link.
- `QUESTIONS`: four options each, where the first option is the right answer (they are shuffled on screen), and a `why` shown after answering.
- `STEPS`: the thirteen steps of I.47, after Heath's wording.

Progress is kept in the browser's `localStorage`, so a half-finished paper can be resumed.

## Make it for someone

The published exam names nobody, and its questions say "the author". A copy you host yourself can carry a name and a photograph: create a `local/` folder next to `index.html` (it is ignored by git) with a `config.js` like this:

```js
window.HONOREE = { name: 'Full Name', first: 'First', photo: 'local/photo.jpg' };
```

The page looks for that file everywhere except on GitHub Pages. In that copy, `{author}` in the questions becomes the first name, so it suits a copy made for the author of the lessons.

## Credits

- The lessons and the facts behind the questions: [*What Schools Forget*](https://whatschoolsforget.substack.com/).
- The colours follow Oliver Byrne's *The First Six Books of the Elements of Euclid* (1847); the steps of I.47 follow T. L. Heath's translation.
- The prize: Ben Orlin's *Math with Bad Drawings* (2018).
- Typefaces: Libre Caslon Display and Libre Caslon Text, SIL Open Font Licence, from Google Fonts.
