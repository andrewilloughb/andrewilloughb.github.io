# Andrew Willoughby: personal website

A plain website: no installing, no building, no app. Just files.

## The 30-second version

| I want to...                         | Edit this                                      |
|--------------------------------------|------------------------------------------------|
| Change any text, link, or paper      | `content.js`                                   |
| Add / swap / remove gallery photos   | put the file in `images/gallery/`, edit `content.js` |
| Change my profile photo              | replace `images/profile.png` (or change the path in `content.js`) |
| Update the downloadable CV PDF       | replace the file `cv.pdf` in this folder with your new one (keep the name `cv.pdf`) |
| Change colours                       | top of `style.css` (the `:root { ... }` block)  |

`app.js` and `style.css` build and style the pages; you should never need to open `app.js`.

## Preview on your computer

Double-click `index.html`. It opens in your browser; refresh after each edit.

## Publish on GitHub Pages

1. Create a repository and upload **everything in this folder** (drag the files in on github.com: *Add file > Upload files*). `index.html` must be at the top level, not inside another folder.
2. Repository *Settings > Pages > Build and deployment*: Source = **Deploy from a branch**, Branch = **main**, folder = **/ (root)**, Save.
3. After a minute or two the site is live at `https://YOUR-USERNAME.github.io/REPO-NAME/`.

### Editing later, right on github.com
Open `content.js` in the repository, click the pencil icon, edit, click **Commit changes**. The live site updates in about a minute. To add a photo: open `images/gallery/`, *Add file > Upload files*, commit, then add a line for it in `content.js`.

## Adding a gallery photo (the most common edit)

1. Save the photo in `images/gallery/`. Tips:
   - Use a **JPG**, about **1600 px on the long side**, ideally under 500 KB. (Phone/camera originals are several MB and will make the page slow.)
   - Use simple file names: `leaf-2026.jpg`. No spaces. Capital letters matter: `Leaf.JPG` is not `leaf.jpg`.
2. In `content.js`, find `gallery:` and copy one line inside `items: [ ... ]`:

   ```js
   { image: "images/gallery/leaf-2026.jpg", title: "Leaf", caption: "Confocal, 2026" },
   ```

   Every line except the last needs a comma at the end.
3. Save. Refresh. Click a photo on the site to enlarge it.

To make **filter buttons** appear (All / Microscopy / Field ...), add `category: "Microscopy"` to your photos. The buttons appear on their own once photos use two or more different categories.

To **remove** a photo, delete its line.

## Other common edits

- **A new paper:** copy any `{ ... },` block inside `publications: [ ... ]`, paste it anywhere in the list, and change the text. The list sorts itself newest-first. `selected: true` puts it in the short "Selected Publications" list. `doi` is just the number (`10.1234/abcd`).
- **Italics (species names):** put asterisks around the words, e.g. `*Streptocarpus*`. Works in the tagline, bio, research text, gallery captions and curated reads.
- **Title and tagline on the home page:** `title` and `tagline` near the top of `content.js`.
- **Future directions (Research page):** the `future:` block inside `research:` in `content.js`. Copy a `{ ... },` block to add a direction, delete one to remove it. The text there now is placeholder text.
- **Gallery extras:** `hideFromAll: true` on a photo keeps it out of the "All" view (it still shows under its own category button). Photos more than about 1.9x taller than wide automatically show as a cropped tile and open full-size and scrollable when clicked; add `focus: "85%"` (or `"top"`, `"center"`, `"bottom"`) to choose which part the tile shows.
- **Research card diagrams:** on a research card, `imageFit: "contain"` shows the whole image on white instead of cropping it to fill the card.
- **A new press article or announcement:** copy a `{ ... },` block inside `news:` in `content.js` and change the text (type, outlet, headline, date, link). Cards sort themselves newest-first. If you give it the DOI of one of your papers (`doi: "10.1111/..."`), a small press badge also appears on that paper on the CV page. For a paywalled article, paste the outlet's free "gift"/share link as the `link`.
- **A new CV section (Awards, Talks, Teaching...):** see the commented example under `cvSections`.
- **Literature Feed topic:** change `pubmedQuery` in `content.js`. Test your search words on pubmed.ncbi.nlm.nih.gov first.
- **Hide something:** set its link/email to `""`. Empty links and emails are hidden automatically.
- **Browser tab title and search-engine description:** these two lines live in `index.html` (`<title>` and `<meta name="description">`).

## If something breaks

Almost always a missing comma or quote mark in `content.js`. Undo your last edit and try again. Look for red text in your editor if it shows any. The page will say "content.js" in its message if the file can't be read at all. (Pasting `content.js` into any AI chat and asking "find the syntax error" also works.)

## How the CV download works

The "Download full CV" buttons (home page and CV page) give visitors the file `cv.pdf` from this folder, saved as `Andrew-Willoughby-CV.pdf`. To update your CV, replace `cv.pdf` with the new file under the same name. (If you ever set `pdf: ""` in `content.js`, the CV page button switches to "Print / save as PDF" and prints the page layout with every publication.) The CV *page* itself (publications, education, skills) is edited in `content.js`; it is separate from the PDF, so the two need updating separately.

## What's in this folder

```
index.html     page shell (title, description, fonts)
content.js     ALL your text, links, photos, papers  <-- edit this
style.css      look and layout
app.js         builds the pages (leave alone)
images/        logo, profile photo, research images, gallery/
favicon.*      browser-tab icon
```

Fonts (Montserrat, Source Serif 4) load from Google Fonts; if offline, the site falls back to system fonts. The Literature Feed talks directly to PubMed (NCBI) from the visitor's browser; nothing else leaves the page.
