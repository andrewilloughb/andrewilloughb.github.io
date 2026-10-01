/* ============================================================================
   app.js - builds the pages from content.js. You should not need to edit this.
   ============================================================================ */
(function () {
  'use strict';

  var S = window.SITE;
  var main = document.getElementById('main');

  if (!S) {
    main.textContent =
      'The site content could not be loaded. Open content.js and look for a missing comma, quote mark or bracket.';
    return;
  }

  /* ---------- small helpers ---------- */

  function $(sel, root) { return (root || document).querySelector(sel); }

  // h('div', {class: 'x'}, 'text', childElement, [more, children]) -> element
  function h(tag, attrs) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k === 'class') el.className = v;
      else if (k.indexOf('on') === 0) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    });
    (function add(list) {
      list.forEach(function (kid) {
        if (kid === null || kid === undefined || kid === false) return;
        if (Array.isArray(kid)) return add(kid);
        el.append(kid.nodeType ? kid : document.createTextNode(kid));
      });
    })(Array.prototype.slice.call(arguments, 2));
    return el;
  }

  var ICONS = {
    menu: '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
    close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    school: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    list: '<line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>',
    book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
    terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
    printer: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    rss: '<path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    news: '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>'
  };

  function icon(name) {
    var t = document.createElement('template');
    t.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + '</svg>';
    return t.content.firstChild;
  }

  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function mailto(subject) { return 'mailto:' + S.email + (subject ? '?subject=' + encodeURIComponent(subject) : ''); }
  function lines(arr) { // array of strings -> text with line breaks
    var out = [];
    (arr || []).forEach(function (l, i) { if (i) out.push(h('br')); out.push(l); });
    return out;
  }
  function cleanText(s) { // strips any HTML tags / decodes entities from text fetched from PubMed
    return new DOMParser().parseFromString(String(s || ''), 'text/html').documentElement.textContent;
  }
  // *word* -> italic word (used for species names). plain() removes the asterisks.
  function rich(text) {
    text = String(text === null || text === undefined ? '' : text);
    var out = [], last = 0, re = /\*([^*]+)\*/g, m;
    while ((m = re.exec(text))) {
      if (m.index > last) out.push(text.slice(last, m.index));
      out.push(h('i', null, m[1]));
      last = re.lastIndex;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
  }
  function plain(text) { return String(text === null || text === undefined ? '' : text).replace(/\*/g, ''); }
  function cvFileName() { return plain(S.name || 'CV').trim().replace(/\s+/g, '-') + '-CV.pdf'; }
  var TALL = 1.9; // photos taller than this (height / width) get a cropped gallery tile and a scrollable enlarged view
  var FOCUS = { top: 'center top', center: 'center', bottom: 'center bottom' };
  function focusPos(v) { // "top" | "center" | "bottom" | "85%"  ->  CSS object-position ('' if not recognised)
    v = String(v || '').trim();
    if (FOCUS[v]) return FOCUS[v];
    return /^\d{1,3}%$/.test(v) ? 'center ' + v : '';
  }
  function whenLoaded(img, fn) { if (img.complete && img.naturalWidth) fn(); else img.addEventListener('load', fn); }
  function isTall(img) { return img.naturalWidth > 0 && img.naturalHeight / img.naturalWidth > TALL; }
  function ext(href, kids) { return h('a', { href: href, target: '_blank', rel: 'noopener noreferrer' }, kids); }

  /* ---------- news helpers ---------- */
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function fmtDate(s) { // "2026-09-26" -> "Sep 26, 2026"; "2026-09" -> "Sep 2026"; anything else is shown as typed
    var raw = String(s || '').trim();
    var m = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/.exec(raw);
    if (!m) return raw;
    if (!m[2]) return m[1];
    if (+m[2] < 1 || +m[2] > 12) return raw;
    return MON[+m[2] - 1] + ' ' + (m[3] ? (+m[3]) + ', ' : '') + m[1];
  }
  function normDoi(d) { return String(d || '').replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').trim().toLowerCase(); }
  function sortedNews() { // newest first; same date keeps the order written in content.js
    return ((S.news && S.news.items) || []).map(function (it, i) { return { it: it, i: i }; })
      .sort(function (a, b) {
        var da = a.it.date || '', db = b.it.date || '';
        return da < db ? 1 : da > db ? -1 : a.i - b.i;
      })
      .map(function (x) { return x.it; });
  }
  function pressFor(doi) { // news items attached to a paper through its DOI
    var d = normDoi(doi);
    if (!d) return [];
    return sortedNews().filter(function (n) { return n.link && normDoi(n.doi) === d; });
  }

  /* ---------- dialogs ---------- */

  function closeButton(dlg) {
    return h('button', { class: 'dlg-close', type: 'button', 'aria-label': 'Close', onclick: function () { dlg.close(); } }, icon('close'));
  }

  function openLightbox(item) {
    var lb = $('#lightbox');
    var img = h('img', { src: item.image, alt: plain(item.title) });
    lb.classList.remove('scroll');
    whenLoaded(img, function () {
      var tall = isTall(img);
      lb.classList.toggle('scroll', tall);
      if (tall) img.style.width = Math.min(img.naturalWidth, 520) + 'px'; // never enlarge beyond the file's own width
    });
    lb.replaceChildren(
      closeButton(lb),
      h('figure', { style: 'margin:0' },
        img,
        (item.title || item.caption) && h('figcaption', null, rich(item.title), item.caption && h('span', null, rich(item.caption)))
      )
    );
    lb.showModal();
  }

  function openProfile() {
    var dlg = $('#profile-dialog');
    var P = S.profile || {};
    var L = S.links || {};
    var links = [];
    if (L.scholar) links.push(ext(L.scholar, 'Google Scholar'));
    if (L.orcid) links.push(ext(L.orcid, 'ORCID'));
    if (L.profile) links.push(ext(L.profile, 'Institutional profile'));
    if (S.email) links.push(h('a', { href: mailto() }, 'Email'));

    dlg.replaceChildren(
      h('div', { class: 'pf-banner' }, closeButton(dlg)),
      h('div', { class: 'pf-body' },
        h('div', { class: 'pf-photo' }, h('img', { src: S.about.photo, alt: '' })),
        h('h2', null, S.fullName || S.name),
        P.role && h('p', { class: 'pf-role' }, P.role),
        (P.rows && P.rows.length) ? h('div', { class: 'pf-rows' },
          P.rows.map(function (r) { return h('div', null, h('h3', null, r.heading), h('p', null, lines(r.lines))); })
        ) : null,
        links.length ? h('div', { class: 'pf-links' }, links) : null
      )
    );
    dlg.showModal();
  }

  ['profile-dialog', 'lightbox'].forEach(function (id) {
    var dlg = document.getElementById(id);
    dlg.addEventListener('click', function (e) {
      // clicking the dark backdrop (or anywhere on the enlarged photo) closes it
      if (e.target === dlg || id === 'lightbox') dlg.close();
    });
  });

  /* ---------- About page ---------- */

  function newsCard(it) {
    var kind = it.type || 'Press';
    var isPress = /^press/i.test(kind);
    return h('article', { class: 'news-card' + (isPress ? ' press' : '') },
      h('div', { class: 'news-top' },
        h('span', { class: 'news-type' }, kind),
        it.date && h('span', { class: 'news-date' }, fmtDate(it.date))
      ),
      it.outlet && h('div', { class: 'news-outlet' }, it.outlet),
      h('h3', null, it.link
        ? h('a', { href: it.link, target: '_blank', rel: 'noopener noreferrer' }, rich(it.title))
        : rich(it.title)),
      it.byline && h('p', { class: 'news-by' }, 'By ' + it.byline),
      it.note && h('p', { class: 'news-note' }, rich(it.note)),
      it.link && h('span', { class: 'news-go', 'aria-hidden': 'true' }, 'Read article', icon('external'))
    );
  }

  function renderNews() {
    var N = S.news || {};
    var items = sortedNews();
    if (!items.length) return null;
    var limit = N.homeCount > 0 ? N.homeCount : 3;
    var expanded = false;
    var grid = h('div', { class: 'news-grid' });
    var toggle = h('button', { class: 'btn ghost pill', type: 'button', onclick: function () { expanded = !expanded; draw(); } });

    function draw() {
      grid.replaceChildren();
      items.slice(0, expanded ? items.length : limit).forEach(function (it) { grid.append(newsCard(it)); });
      toggle.hidden = items.length <= limit;
      toggle.textContent = expanded ? 'Show fewer' : 'Show all (' + items.length + ')';
      toggle.setAttribute('aria-expanded', String(expanded));
    }
    draw();

    return h('section', { class: 'wrap news' },
      h('div', { class: 'news-head' },
        h('h2', null, N.title || 'In the news'),
        N.intro && h('p', null, rich(N.intro))
      ),
      grid,
      h('div', { class: 'news-foot' }, toggle)
    );
  }

  function renderGallery() {
    var G = S.gallery;
    if (!G || !G.items || !G.items.length) return null;

    var cats = [];
    G.items.forEach(function (it) { if (it.category && cats.indexOf(it.category) < 0) cats.push(it.category); });

    var current = 'all';
    var grid = h('div', { class: 'gallery-grid' });
    var filterBar = null;

    function draw() {
      grid.replaceChildren();
      G.items.forEach(function (it) {
        if (current !== 'all' && it.category !== current) return;
        if (current === 'all' && it.hideFromAll) return;
        var img = h('img', { src: it.image, alt: plain(it.title), loading: 'lazy' });
        var tile = h('button', {
            class: 'g-item', type: 'button',
            'aria-label': 'Enlarge photo' + (it.title ? ': ' + plain(it.title) : ''),
            onclick: function () { openLightbox(it); }
          },
            img,
            (it.title || it.caption) && h('span', { class: 'cap' },
              h('b', null, rich(it.title)), it.caption && h('span', null, rich(it.caption)))
          );
        var pos = focusPos(it.focus);
        if (pos) tile.style.setProperty('--focus', pos);
        whenLoaded(img, function () { tile.classList.toggle('capped', isTall(img)); });
        grid.append(tile);
      });
      if (filterBar) {
        Array.prototype.forEach.call(filterBar.children, function (b) {
          b.setAttribute('aria-pressed', String(b.dataset.cat === current));
        });
      }
    }

    if (cats.length >= 2) {
      filterBar = h('div', { class: 'filters', role: 'group', 'aria-label': 'Filter photos' },
        ['all'].concat(cats).map(function (c) {
          return h('button', {
            type: 'button', 'data-cat': c, 'aria-pressed': 'false',
            onclick: function () { current = c; draw(); }
          }, c === 'all' ? 'All' : c);
        })
      );
    }
    draw();

    return h('section', { class: 'gallery-band' },
      h('div', { class: 'wrap' },
        h('div', { class: 'gallery-head' },
          h('div', null, h('h2', null, G.title || 'Photography'), G.intro && h('p', null, G.intro)),
          filterBar
        ),
        grid
      )
    );
  }

  function renderContactCta() {
    var L = S.links || {};
    if (!S.email && !L.profile) return null;
    return h('section', { class: 'wrap' },
      h('div', { class: 'cta' },
        h('h2', null, 'Get in touch'),
        h('p', null, 'Interested in collaboration or learning more about the research? Feel free to reach out.'),
        h('div', { class: 'actions' },
          S.email && h('a', { class: 'btn', href: mailto() }, icon('mail'), 'Send an email'),
          L.profile && h('a', { class: 'btn ghost', href: L.profile, target: '_blank', rel: 'noopener noreferrer' }, 'Institutional profile', icon('external'))
        )
      )
    );
  }

  function renderAbout() {
    var A = S.about;
    var pdf = S.cv && S.cv.pdf;
    var frag = document.createDocumentFragment();
    [
      h('section', { class: 'hero' },
        h('h1', null, S.name),
        S.title && h('p', { class: 'hero-title' }, S.title),
        S.tagline && h('p', { class: 'hero-tagline' }, rich(S.tagline))
      ),
      h('section', { class: 'wrap' },
        h('div', { class: 'about-grid' },
          h('div', { class: 'about-photo' }, h('img', { src: A.photo, alt: A.photoAlt || '' })),
          h('div', { class: 'about-bio' },
            h('h2', null, 'About me'),
            (A.paragraphs || []).map(function (p) { return h('p', null, rich(p)); }),
            h('div', { class: 'actions' },
              h('a', { class: 'btn', href: '#cv' }, 'View curriculum vitae'),
              pdf && h('a', { class: 'btn ghost', href: pdf, download: cvFileName() }, icon('download'), 'Download full CV')
            )
          )
        )
      ),
      renderNews(),
      renderGallery(),
      renderContactCta()
    ].forEach(function (el) { if (el) frag.append(el); });
    return frag;
  }

  /* ---------- Research page ---------- */

  function sectionRule(text, primary) {
    return h('div', { class: 'section-rule' + (primary ? ' primary' : '') }, h('h2', null, text));
  }

  function renderResearch() {
    var R = S.research;
    return h('div', { class: 'page stack' },
      h('header', null,
        h('h1', { class: 'page-title' }, 'Research Questions'),
        R.intro && h('p', { class: 'page-lede' }, rich(R.intro))
      ),

      (R.current && R.current.length) ? h('section', null,
        sectionRule('Current research', true),
        h('div', { class: 'project-grid' },
          R.current.map(function (p) {
            return h('article', { class: 'project' },
              p.image && h('button', {
                class: 'thumb' + (p.imageFit === 'contain' ? ' contain' : ''), type: 'button', 'aria-label': 'Enlarge image: ' + plain(p.title),
                onclick: function () { openLightbox({ image: p.image, title: p.title }); }
              }, h('img', { src: p.image, alt: '', loading: 'lazy' })),
              h('div', { class: 'body' },
                h('div', { class: 'meta' }, h('span', { class: 'status' }, 'Active'), p.label && h('span', { class: 'label' }, p.label)),
                h('h3', null, rich(p.title)),
                h('p', null, rich(p.description)),
                p.link && h('div', { class: 'more' }, ext(p.link, 'Read more'))
              )
            );
          })
        )
      ) : null,

      (R.future && R.future.items && R.future.items.length) ? h('section', null,
        sectionRule(R.future.title || 'Future directions', true),
        R.future.intro && h('p', { class: 'future-intro' }, rich(R.future.intro)),
        h('div', { class: 'future-grid' },
          R.future.items.map(function (f) {
            return h('article', { class: 'future' },
              h('h3', null, rich(f.title)),
              h('p', null, rich(f.description))
            );
          })
        )
      ) : null,

      (R.past && R.past.length) ? h('section', null,
        sectionRule('Past research highlights'),
        h('div', { class: 'past-grid' },
          R.past.map(function (p) {
            return h('article', { class: 'past' },
              h('div', null, h('h3', null, rich(p.title)), h('p', null, rich(p.description))),
              (p.tags && p.tags.length) ? h('div', { class: 'tags' }, p.tags.map(function (t) { return h('span', null, t); })) : null
            );
          }),
          S.email && h('div', { class: 'past collab' },
            h('strong', null, 'Interested in collaboration?'),
            h('a', { class: 'btn pill', href: mailto('Research collaboration') }, icon('mail'), 'Get in touch')
          )
        )
      ) : null,

      h('section', { class: 'record' },
        h('h2', null, 'Publications and CV'),
        h('p', null, 'Publications, education and skills are listed on my curriculum vitae.'),
        h('a', { class: 'btn pill', href: '#cv' }, 'View CV')
      )
    );
  }

  /* ---------- CV page ---------- */

  var printHooks = null;
  window.addEventListener('beforeprint', function () { if (printHooks) printHooks.before(); });
  window.addEventListener('afterprint', function () { if (printHooks) printHooks.after(); });

  var TAG_ORDER = ['First Author', 'Review', 'Perspective', 'Editorial', 'Pre-print', 'Thesis'];

  function highlightAuthors(text) {
    var name = S.highlightAuthor;
    if (!name) return [text];
    var re = new RegExp('(' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return text.split(re).map(function (part, i) { return i % 2 ? h('b', null, part) : part; });
  }

  function renderCV() {
    var pubs = (S.publications || []).map(function (p, i) { p._i = i; return p; })
      .slice().sort(function (a, b) { return (b.year - a.year) || (a._i - b._i); });

    var hasSelected = pubs.some(function (p) { return p.selected; });
    var state = { q: '', tag: null, all: !hasSelected };

    var tags = [];
    pubs.forEach(function (p) { (p.tags || []).forEach(function (t) { if (tags.indexOf(t) < 0) tags.push(t); }); });
    tags.sort(function (a, b) {
      var ia = TAG_ORDER.indexOf(a), ib = TAG_ORDER.indexOf(b);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });

    var title = h('h2');
    var list = h('div');
    var toggle = h('button', { class: 'btn ghost pill', type: 'button', onclick: function () { state.all = !state.all; draw(); } });
    var chips = tags.map(function (t) {
      return h('button', {
        class: 'chip', type: 'button', 'aria-pressed': 'false', 'data-tag': t,
        onclick: function () { state.tag = state.tag === t ? null : t; draw(); }
      }, h('i', { class: 'tag-' + slug(t) }), t);
    });

    function visible() {
      var q = state.q.trim().toLowerCase();
      return pubs.filter(function (p) {
        // default view = "selected" papers; searching or filtering looks through everything
        if (!state.all && !q && !state.tag && !p.selected) return false;
        if (state.tag && (p.tags || []).indexOf(state.tag) < 0) return false;
        if (q && [p.title, p.authors, p.journal, p.year].join(' ').toLowerCase().indexOf(q) < 0) return false;
        return true;
      });
    }

    function pubCard(p) {
      var doi = p.doi ? String(p.doi).replace(/^https?:\/\/(dx\.)?doi\.org\//i, '') : '';
      var press = pressFor(doi);
      var sameOutlet = {};
      press.forEach(function (n) { sameOutlet[n.outlet] = (sameOutlet[n.outlet] || 0) + 1; });
      return h('article', { class: 'pub' },
        (p.tags && p.tags.length) ? h('div', { class: 'tags' }, p.tags.map(function (t) { return h('span', { class: 'tag tag-' + slug(t) }, t); })) : null,
        h('h3', null, p.title),
        h('div', { class: 'ref' },
          highlightAuthors(p.authors || ''), ' ',
          p.year ? '(' + p.year + '). ' : '',
          h('i', null, p.journal || ''),
          p.details ? ', ' + p.details : ''
        ),
        (doi || press.length) ? h('div', { class: 'pub-links' },
          doi && h('a', { class: 'doi', href: 'https://doi.org/' + doi, target: '_blank', rel: 'noopener noreferrer' }, icon('link'), 'DOI'),
          press.map(function (n) {
            var label = (n.type || 'Press') + ' \u00b7 ' + (n.outlet || 'Link');
            if (sameOutlet[n.outlet] > 1 && n.date) label += ' (' + fmtDate(n.date) + ')'; // tell two articles from one outlet apart
            return h('a', { class: 'press-chip', href: n.link, target: '_blank', rel: 'noopener noreferrer', title: plain(n.title) }, icon('news'), label);
          })
        ) : null
      );
    }

    function draw() {
      var shown = visible();
      var filtering = state.all || state.tag || state.q.trim();
      title.textContent = filtering ? 'Publications (' + shown.length + ')' : 'Selected Publications';
      toggle.textContent = state.all ? 'Show selected only' : 'View all publications (' + pubs.length + ')';
      toggle.hidden = !hasSelected;
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.tag === state.tag)); });

      list.replaceChildren();
      if (!shown.length) {
        list.append(h('div', { class: 'empty' },
          state.q.trim() ? 'No publications match "' + state.q.trim() + '".' : 'No publications to show.',
          h('button', { type: 'button', onclick: function () { state.q = ''; state.tag = null; search.value = ''; draw(); } }, 'Clear search and filters')
        ));
      } else {
        shown.forEach(function (p) { list.append(pubCard(p)); });
      }
    }

    var search = h('input', {
      type: 'search', placeholder: 'Search by title, author, journal or year', 'aria-label': 'Search publications',
      oninput: function (e) { state.q = e.target.value; draw(); }
    });

    // When printing, temporarily show every paper.
    var saved;
    printHooks = {
      before: function () { saved = { q: state.q, tag: state.tag, all: state.all }; state.q = ''; state.tag = null; state.all = true; draw(); },
      after: function () { if (saved) { state.q = saved.q; state.tag = saved.tag; state.all = saved.all; draw(); } }
    };

    var cv = S.cv || {};
    var L = S.links || {};
    var action = cv.pdf
      ? h('a', { class: 'btn', href: cv.pdf, download: cvFileName() }, icon('download'), 'Download full CV (PDF)')
      : h('button', { class: 'btn', type: 'button', onclick: function () { window.print(); } }, icon('printer'), 'Print / save as PDF');

    var sections = (S.cvSections || []).map(function (sec) {
      return h('div', null,
        h('div', { class: 'cv-h' }, icon(/educ/i.test(sec.title) ? 'school' : 'list'), h('h2', null, sec.title)),
        h('div', { class: 'timeline' },
          (sec.items || []).map(function (it) {
            return h('div', { class: 'tl-item' },
              it.years && h('div', { class: 'yrs' }, it.years),
              h('h3', null, it.title),
              it.institution && h('p', null, it.institution)
            );
          })
        )
      );
    });

    var root = h('div', { class: 'page' },
      h('section', { class: 'cv-hero' },
        h('div', null,
          h('div', { class: 'print-only' },
            h('strong', null, S.fullName || S.name),
            [S.title, S.email, L.orcid].filter(Boolean).join('  |  ')
          ),
          h('h1', null, 'Curriculum Vitae'),
          cv.intro && h('p', null, rich(cv.intro))
        ),
        h('div', { class: 'cv-actions no-print' }, action, cv.updated && h('small', null, 'Updated: ' + cv.updated))
      ),

      h('div', { class: 'cv-grid' },
        h('aside', { class: 'cv-side' },
          sections,
          (S.skills && S.skills.length) ? h('div', { class: 'skills' },
            h('h3', null, icon('terminal'), 'Technical proficiency'),
            h('ul', null, S.skills.map(function (s) { return h('li', null, s); }))
          ) : null
        ),
        h('div', null,
          h('div', { class: 'cv-h' }, icon('book'), title),
          chips.length ? h('div', { class: 'pub-tools' }, chips) : null,
          h('div', { class: 'search' }, icon('search'), search),
          list,
          h('div', { class: 'pub-foot' },
            toggle,
            L.scholar && h('a', { class: 'btn ghost pill', href: L.scholar, target: '_blank', rel: 'noopener noreferrer' }, 'Google Scholar', icon('external'))
          )
        )
      )
    );
    draw();
    return root;
  }

  /* ---------- Literature Feed page ---------- */

  function renderLiterature() {
    var L = S.literature || {};
    var query = L.pubmedQuery || '';
    var label = L.pubmedLabel || query;
    var count = L.pubmedCount || 6;

    var pill = h('span', { class: 'status-pill' }, h('i'), h('span'));
    var list = h('div', { class: 'lit-list' });
    var refresh = h('button', { class: 'btn ghost', type: 'button', onclick: load }, icon('refresh'), 'Refresh');

    function setPill(kind, text) {
      pill.className = 'status-pill' + (kind === 'live' ? ' live' : '');
      pill.lastChild.textContent = text;
    }

    function pubmedLink() { return 'https://pubmed.ncbi.nlm.nih.gov/?sort=date&term=' + encodeURIComponent(query); }

    function card(item, kind, href, goText) {
      return h('article', { class: 'lit' },
        h('div', { class: 'kind ' + (kind === 'Curated read' ? 'curated' : '') }, kind),
        h('h3', null, kind === 'Curated read' ? rich(item.title) : item.title),
        h('p', null, [item.authors ? item.authors + ' ' : '', item.year ? '(' + item.year + '). ' : '', h('i', null, item.journal || '')]),
        href && h('a', { class: 'go', href: href, target: '_blank', rel: 'noopener noreferrer' }, goText, icon('external'))
      );
    }

    function fetchJSON(url) {
      return fetch(url).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
    }

    function load() {
      if (!query) { list.replaceChildren(h('div', { class: 'note' }, 'No PubMed search is set. Add one to pubmedQuery in content.js.')); setPill('warn', 'Not configured'); return; }
      var base = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
      refresh.disabled = true;
      setPill('warn', 'Loading');
      list.replaceChildren(h('div', { class: 'skeleton' }), h('div', { class: 'skeleton' }), h('div', { class: 'skeleton' }));

      fetchJSON(base + 'esearch.fcgi?db=pubmed&retmode=json&sort=pub_date&retmax=' + count + '&term=' + encodeURIComponent(query))
        .then(function (d) {
          var ids = (d.esearchresult && d.esearchresult.idlist) || [];
          if (!ids.length) return { ids: [], result: {} };
          return fetchJSON(base + 'esummary.fcgi?db=pubmed&retmode=json&id=' + ids.join(','))
            .then(function (s) { return { ids: ids, result: s.result || {} }; });
        })
        .then(function (o) {
          if (!list.isConnected) return; // person already navigated away
          list.replaceChildren();
          if (!o.ids.length) {
            list.append(h('div', { class: 'note' }, 'PubMed returned no results for this search.'));
          }
          o.ids.forEach(function (id) {
            var d = o.result[id] || {};
            var names = (d.authors || []).map(function (a) { return a.name; });
            var authors = names.slice(0, 6).join(', ') + (names.length > 6 ? ', et al.' : '');
            list.append(card({
              title: cleanText(d.title) || 'Untitled',
              authors: authors,
              journal: cleanText(d.fulljournalname || d.source),
              year: d.pubdate ? String(d.pubdate).slice(0, 4) : ''
            }, 'PubMed ' + id, 'https://pubmed.ncbi.nlm.nih.gov/' + id + '/', 'Read on PubMed'));
          });
          setPill('live', 'Live from PubMed');
        })
        .catch(function (err) {
          console.warn('PubMed request failed:', err);
          if (!list.isConnected) return;
          list.replaceChildren(h('div', { class: 'note' },
            'Could not reach PubMed just now. ',
            ext(pubmedLink(), 'Open the search on PubMed'), '.'));
          setPill('warn', 'PubMed unavailable');
        })
        .then(function () { refresh.disabled = false; });
    }

    var curated = (L.curated || []).map(function (c) { return card(c, 'Curated read', c.link, 'Access publication'); });

    var root = h('div', { class: 'page' },
      h('section', { class: 'lit-head' },
        h('div', null,
          h('div', null, h('h1', null, 'Literature Feed'), pill),
          L.intro && h('p', null, L.intro)
        ),
        refresh
      ),
      h('div', { class: 'lit-grid' },
        h('section', { class: 'lit-col' },
          h('h2', null, icon('book'), 'Curated reads'),
          h('p', { class: 'sub' }, 'Hand-picked papers worth reading.'),
          h('div', { class: 'lit-list' }, curated.length ? curated : h('div', { class: 'note' }, 'Nothing here yet. Add items to "curated" in content.js.'))
        ),
        h('section', { class: 'lit-col' },
          h('h2', null, icon('rss'), 'PubMed feed'),
          h('p', { class: 'sub' }, query ? ['Most recent results for "' + label + '" on PubMed. ', ext(pubmedLink(), 'See all')] : ''),
          list
        )
      )
    );
    load();
    return root;
  }

  /* ---------- Routing ---------- */

  var PAGES = {
    about: { label: 'About', render: renderAbout },
    research: { label: 'Research', render: renderResearch },
    cv: { label: 'CV', render: renderCV },
    literature: { label: 'Literature Feed', render: renderLiterature }
  };

  var navLinks = $('#nav-links');
  var menuBtn = $('#menu-btn');

  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }

  function route() {
    var key = (location.hash || '#about').slice(1);
    if (!PAGES[key]) key = 'about';
    printHooks = null;
    main.replaceChildren();
    try {
      main.append(PAGES[key].render());
    } catch (err) {
      console.error(err);
      main.append(h('div', { class: 'page' }, h('div', { class: 'note' },
        'This page could not be displayed. A recent edit to content.js is the likely cause (a missing comma, quote or bracket). Details are in the browser console.')));
    }
    Array.prototype.forEach.call(navLinks.querySelectorAll('a'), function (a) {
      if (a.dataset.page === key) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    document.title = key === 'about' ? S.name : PAGES[key].label + ' | ' + S.name;
    setMenu(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    main.style.animation = 'none'; void main.offsetWidth; main.style.animation = '';
  }

  /* ---------- Header / footer wiring ---------- */

  $('#brand-name').textContent = S.name;
  $('#footer-name').textContent = S.name;
  $('#footer-year').textContent = new Date().getFullYear();

  var mailBtn = $('#nav-mail');
  mailBtn.replaceChildren(icon('mail'));
  if (S.email) { mailBtn.href = mailto(); mailBtn.hidden = false; }

  var profileBtn = $('#nav-profile');
  profileBtn.replaceChildren(icon('user'));
  profileBtn.addEventListener('click', openProfile);

  menuBtn.replaceChildren(icon('menu'));
  menuBtn.addEventListener('click', function () { setMenu(!navLinks.classList.contains('open')); });

  // Clicking the link for the page you're already on scrolls back to the top.
  document.querySelectorAll('.nav a, .brand').forEach(function (a) {
    a.addEventListener('click', function () {
      if (a.getAttribute('href') === (location.hash || '#about')) window.scrollTo({ top: 0, behavior: 'smooth' });
      setMenu(false);
    });
  });

  window.addEventListener('hashchange', route);
  route();
})();
