/* ============================================================================
   CONTENT FILE  -  this is the ONLY file you need to edit for text changes.

   How it works
   - Everything between "quotes" is text you can change.
   - Keep the commas, brackets [ ] and braces { } exactly where they are.
   - To add an item to a list, copy one whole { ... }, block, paste it right
     after another one, and change the text.
   - To remove an item, delete the whole { ... }, block.
   - Photos: put the image file in the images/ folder, then use its path
     here, e.g. "images/gallery/my-photo.jpg". File names are case-sensitive.
   - Italics: put *asterisks* around a word to italicize it, e.g. *Streptocarpus*.
     Works in the tagline, bio, research text, gallery captions and curated reads
     (not in the publication list).
   - If something breaks after an edit, it is almost always a missing comma
     or a missing quote mark. Check the line just above where you edited.
   ============================================================================ */

window.SITE = {

  /* ---------- Basics ---------- */
  name: "Andrew Willoughby",              // shown in the header and footer
  fullName: "Dr. Andrew Willoughby",      // shown in the profile pop-up
  title: "NSF PGRP Postdoctoral Fellow",  // small line under your name on the home page. "" to hide.
  tagline: "I study stem cells, development, and evolution, currently focused on regeneration in *Streptocarpus*.",   // one-line summary on the home page
  email: "andrew.willoughby@duke.edu",    // "Get in touch" buttons open an email to this address. Use "" to hide them.
  description: "Academic website and research portfolio of Andrew Willoughby: plant regeneration, meristem biology, and plant genomics.",

  links: {                                // use "" to hide any of these
    scholar: "https://scholar.google.com/citations?user=6mnAdcEAAAAJ&hl=en",
    orcid: "https://orcid.org/0000-0002-8616-5236",
    profile: "https://scholars.duke.edu/person/andrew.willoughby"   // "Duke profile" button
  },

  /* ---------- Profile pop-up (the person icon in the header) ---------- */
  profile: {
    role: "NSF PGRP Postdoctoral Fellow",
    rows: [
      { heading: "Current affiliation", lines: ["Duke University (Lucia Strader & John Willis Labs)", "Department of Biology"] },
      { heading: "Prior affiliation",   lines: ["University of North Carolina at Chapel Hill (Zachary Nimchuk Lab)", "Ph.D. in Biology (CLE signaling, 2024)"] },
      { heading: "Office",              lines: ["Biological Sciences Building, Science Dr", "Duke University, Durham, NC"] }   // delete this whole line if you'd rather not list an office
    ]
  },

  /* ---------- Home page: About ---------- */
  about: {
    photo: "images/profile.png",          // swap the file (or this path) to change the photo
    photoAlt: "A violet-flowered plant",  // describe the photo (for screen readers)
    paragraphs: [
      "If you've ever made a cutting of a plant, you've taken advantage of the remarkable abilities of plants to make new organs (like roots and new leaves) when needed. Plants make new organs throughout their life from tissues called meristems, and can regenerate their meristems when damaged. Regeneration isn't just useful for sharing your favorite houseplant, it is required in research, agriculture, conservation, and the biotech industry. However, many plants are difficult to regenerate, creating bottlenecks in these essential processes.",
      "I am interested in studying signaling during plant reproduction, development, and where they intersect. This has led to a fascination with plant regeneration, spurred on by our societal needs to improve regeneration recalcitrance. I am an NSF Plant Genome Research Program Postdoctoral Fellow at Duke University working with Lucia Strader and John Willis.",
      "I completed my PhD at the University of North Carolina at Chapel Hill with Zachary Nimchuk, where I worked on how peptide hormones in the CLE peptide family control development. Outside of the lab you can find me taking pictures and making art (below) or hanging out with my fish (data not shown)."
    ]
  },

  /* ---------- Home page: In the news ----------
     Press coverage and announcements. Shown as cards on the home page (between
     your bio and the photo gallery), newest first. The list sorts itself by date,
     so you can paste a new item anywhere. Delete the whole news: { ... }, block to
     remove the section.

     To ADD one: copy a whole { ... }, block below, paste it, change the text.

     Fields:
       type     "Press" (media coverage) or "Announcement" (news about you from an institution)
       outlet   who published it
       title    the headline, as published
       byline   the article's author ("" if none)
       date     YYYY-MM-DD  (YYYY-MM or just YYYY also work)
       link     the article's web address. For a paywalled article, use the outlet's
                free "gift" / share link if it offers one.
       note     optional short line on the card, e.g. "Co-author of the study". "" for none.
       doi      optional. If it matches the DOI of a paper in your publication list,
                a small press badge appears on that paper on the CV page.
     homeCount: how many cards show before a "Show all" button appears.
  */
  news: {
    title: "In the news",
    intro: "",
    homeCount: 3,
    items: [
      {
        type: "Press",
        outlet: "The New York Times",
        title: "In an $80 Motel Room, a Discovery to Shed Light on the Origins of Life",
        byline: "Carolyn Y. Johnson",
        date: "2026-09-26",
        link: "https://www.nytimes.com/2026/09/26/science/motel-science-discovery.html",
        note: "Co-author of the study",
        doi: "10.1111/jpy.70230"
      },
      {
        type: "Announcement",
        outlet: "UNC Department of Biology",
        title: "Andrew Willoughby selected for Joint Genome Institute’s 2025 Community Science Program!",
        byline: "",
        date: "2024-10-10",
        link: "https://bio.unc.edu/news/andrew-willoughby-selected-for-joint-genome-institutes-2025-community-science-program/",
        note: "",
        doi: ""
      },
      {
        type: "Announcement",
        outlet: "DOE Joint Genome Institute",
        title: "The JGI announces FY25 awardees for our Community Science Program Annual Call",
        byline: "",
        date: "2024-09-26",
        link: "https://jgi.doe.gov/user-science/science-stories/jgi-announces-fy25-awardees-our-community-science-program-annual-call",
        note: "",
        doi: ""
      },
      {
        type: "Announcement",
        outlet: "Iowa State University Crop Bioengineering Center",
        title: "Guest speaker Dr. Andrew Willoughby from Duke University - March 26th, 12-1:00pm",
        byline: "",
        date: "2025-03-26",
        link: "https://www.cropbioengineering.iastate.edu/event/2025/guest-speaker-dr-andrew-willoughby-duke-university-march-26th-12-100pm",
        note: "",
        doi: ""
      },
      {
        type: "Press",
        outlet: "Addgene Blog",
        title: "RUBY-Red Siliques",
        byline: "Andrew Willoughby",
        date: "2022-03-01",
        link: "https://blog.addgene.org/ruby-red-siliques",
        note: "Guest blog post",
        doi: ""
      },
      {
        type: "Press",
        outlet: "ASPB Plant Science Today",
        title: "I’m Plant Scientist Andrew Willoughby, and this is how I work",
        byline: "Ian Street",
        date: "2016-03-04",
        link: "https://blog.aspb.org/im-plant-scientist-andrew-willoughby-and-this-is-how-i-work/",
        note: "",
        doi: ""
      },
      {
        type: "Press",
        outlet: "USA Today",
        title: "Scientists join world of crowd funding",
        byline: "Associated Press",
        date: "2014-07-09",
        link: "https://www.usatoday.com/story/news/nation/2014/07/09/scientists-crowd-funding/12442255/",
        note: "",
        doi: ""
      },
      {
        type: "Press",
        outlet: "Arkansas Times",
        title: "2014 Arkansas Times Academic All-Star Team",
        byline: "Arkansas Times Staff",
        date: "2014-04-24",
        link: "https://arktimes.com/news/cover-stories/2014/04/24/2014-arkansas-times-academic-all-star-team",
        note: "",
        doi: ""
      }
    ]
  },

  /* ---------- Home page: photo gallery ----------
     To ADD a photo:    1) drop the file in images/gallery/
                        2) copy one { ... }, block below and change image + title
     To REMOVE a photo: delete its { ... }, block
     Photos keep their natural proportions and flow down three columns
     (top to bottom, then left to right), so any mix of portrait and
     landscape photos works.

     Fields:
       image     path to the file
       title     shown on hover and in the enlarged view
       caption   optional extra line (technique, place, year...). "" for none
       category  optional filter label, e.g. "Microscopy" or "Field".
                 Filter buttons appear automatically once your photos use
                 two or more different category names.
       focus     optional: "top", "center", "bottom", or a percentage such as "85%" (how far down). Very tall photos (more than about
                 1.9x taller than wide) show as a cropped tile in the gallery and open
                 full-size, scrollable, when clicked. "focus" picks which part the tile
                 shows (default "center"). Try a few percentages until it looks right.
       hideFromAll  optional. Add hideFromAll: true to keep a photo out of
                 the "All" view, so it only shows under its own category
                 button (handy for very tall or very wide images).
  */
  gallery: {
    title: "Gallery",
    intro: "",
    items: [
      { image: "images/gallery/leaf-vertical.png",              title: "Indeterminate cotyledon",                 caption: "Focus stacking",                                                  category: "Photography" },
      { image: "images/gallery/leaf-with-roots-wide.png",       title: "Mature vegetative unifoliate *Streptocarpus*", caption: "Focus stacking",                                             category: "Photography" },
      { image: "images/gallery/plant-yellow-flowers.png",       title: "*Microchirita elphinstonia*",             caption: "Focus stacking",                                                  category: "Photography" },
      { image: "images/gallery/stigma-pollen-sem.jpg",          title: "Lettuce stigma with pollen",              caption: "SEM - unfixed uncoated",                                          category: "Microscopy" },
      { image: "images/gallery/flowering-stem.jpg",             title: "*perianthia* *Arabidopsis* mutant",       caption: "BMC Research in Progress Photo Competition Highly Commended",     category: "Photography" },
      { image: "images/gallery/root-tip-confocal.jpg",          title: "*Arabidopsis* root meristem",             caption: "Confocal - stained",                                              category: "Microscopy" },
      { image: "images/gallery/green-anole.jpg",                title: "Green anole",                             caption: "Daniel Stowe Conservancy",                                        category: "Photography" },
      { image: "images/gallery/caterpillar.jpg",                title: "Caterpillar",                             caption: "Duke Gardens",                                                    category: "Photography" },
      { image: "images/gallery/seed-sem.jpg",                   title: "*Arabidopsis* seed",                      caption: "SEM - unfixed uncoated",                                          category: "Microscopy" },
      { image: "images/gallery/purple-plant-in-flower.jpg",     title: "RUBY-expressing *Arabidopsis*",           caption: "Focus stacking",                                                  category: "Photography" },
      { image: "images/gallery/lighter-ruby-arabidopsis.jpg",   title: "Lighter RUBY-expressing *Arabidopsis*",   caption: "",                                                                category: "Photography" },
      { image: "images/gallery/root-confocal.jpg",              title: "Meristematic cells in root",              caption: "Confocal - stained",                                              category: "Microscopy", focus: "90%", hideFromAll: true },
      { image: "images/gallery/wt-and-ruby-lettuce.jpg",        title: "WT and RUBY-expressing lettuce",          caption: "",                                                                category: "Photography" },
      { image: "images/gallery/mushroom-and-fern.jpg",          title: "Mushroom and fern",                       caption: "Focus stacking",                                                  category: "Photography" },
      { image: "images/gallery/double-white-flowers.jpg",       title: "*agamous* mutant *Arabidopsis*",          caption: "",                                                                category: "Photography" },
      { image: "images/gallery/pink-flowers.png",               title: "Col-0 *Arabidopsis* inflorescence",       caption: "Focus stacking",                                                  category: "Photography" },
      { image: "images/gallery/yellow-flower-head.jpg",         title: "Lettuce capitulescence",                  caption: "Focus stacking",                                                  category: "Photography" },
      { image: "images/gallery/streptocarpus-rexii.jpg",        title: "*Streptocarpus rexii*",                   caption: "Focus stacking",                                                  category: "Photography" },
      { image: "images/gallery/nls-gfp.jpg",                    title: "NLS-GFP",                                 caption: "Confocal",                                                        category: "Microscopy" },
      { image: "images/gallery/strep-art-1.jpg",                title: "*Streptocarpus* pattern I",               caption: "",                                                                category: "Art" },
      { image: "images/gallery/seedling-cartoon.jpg",           title: "Seedling",                                caption: "",                                                                category: "Art" },
      { image: "images/gallery/rexii-logo.png",                 title: "*Streptocarpus rexii* logo",              caption: "",                                                                category: "Art" },
      { image: "images/gallery/seedling-sam.jpg",               title: "Seedling shoot apical meristem",          caption: "",                                                                category: "Art" },
      { image: "images/gallery/strep-art-2.jpg",                title: "*Streptocarpus* pattern II",              caption: "",                                                                category: "Art" },
      { image: "images/gallery/seed-cartoon.jpg",               title: "*Paulinella marae*",                      caption: "",                                                                category: "Art" },
      { image: "images/gallery/rexii-line-logo.png",            title: "*Streptocarpus rexii* line logo",         caption: "",                                                                category: "Art", hideFromAll: true },
      { image: "images/gallery/root-apical-meristem.webp",      title: "Root Apical Meristem",                    caption: "",                                                                category: "Art" },
      { image: "images/gallery/shoot-apical-meristem.webp",     title: "Shoot Apical Meristem",                   caption: "",                                                                category: "Art" }
    ]
  },

  /* ---------- Research page ---------- */
  research: {
    intro: "My research asks how plant cells initiate and regain access to meristematic programs, the gene-expression and regulatory networks that establish and maintain plant stem cell populations, and how evolutionary modifications to these processes shape the plant body.",
    current: [
      {
        title: "Developing *Streptocarpus* as a new model system",
        label: "Regeneration",           // small grey label next to "Active"
        description: "I am developing the genus *Streptocarpus* as a new model system for plant regeneration due to the unique meristem biology found in this genus. The goal is to study meristem initiation and develop tools to overcome regeneration recalcitrance in other plants.",
        image: "images/research/regeneration.webp",
        link: ""                          // optional web address; adds a "Read more" button
      },
      {
        title: "Gesnomics: Comparative Genomics of Gesneriaceae",
        label: "Evolutionary biology",
        description: "Leveraging next-generation sequencing, and high quality assemblies, I am exploring the diversity within the Gesneriaceae family. By comparing these genomes, I aim to identify conserved regulatory modules and divergent pathways that contribute to the evolution of the unique morphological traits observed within the family.",
        image: "images/research/gesneriaceae-tree.png",
        imageFit: "contain",              // optional: show the whole image on white instead of cropping it to fill (for diagrams)
        link: ""
      }
    ],
    /* FUTURE DIRECTIONS (appears between Current and Past research).
       The text below is PLACEHOLDER text: replace it with your own.
       Copy a whole { ... }, block to add another direction; delete one to remove it.
       Set  intro  to a short paragraph if you want one above the cards ("" hides it).
       To hide the whole section, delete everything from  future: {  to its closing  },  */
    future: {
      title: "Future directions",
      intro: "",
      items: [
        {
          title: "Overcoming regeneration recalcitrance in crop species",
          description: "Future work will involve testing mechanisms to overcome regeneration recalcitrance in crop species. Many agriculturally important plants are difficult to regenerate, which limits genetic improvement and biotechnology. I aim to test whether insights from regeneration-competent species can be used to improve regeneration in these crops."
        },
        {
          title: "Using *Streptocarpus* to answer fundamental questions about meristem biology",
          description: "I will use *Streptocarpus* to answer fundamental questions about meristem biology. Its unusual meristem biology makes it a powerful system for asking how meristems are initiated and maintained, and how they are modified over the course of development and evolution."
        }
      ]
    },
    past: [
      {
        title: "CLE Signaling and Root Development",
        description: "CLE peptide hormones shape many aspects of plant development, but the mechanisms behind CLE signaling have historically been opaque. I participated in identifying new developmental roles for CLE signaling and mechanistic insights into CLE receptor function.",
        tags: ["Peptide Signaling", "Stem Cells"]
      },
      {
        title: "Floral Innovation and Development",
        description: "I have studied signaling during plant reproduction and floral development in *Arabidopsis thaliana* and evolutionary innovations in Asteraceae development.",
        tags: ["Morphology", "Evo-Devo"]
      }
    ]
  },

  /* ---------- CV page ---------- */
  cv: {
    intro: "NSF PGRP Postdoctoral Fellow at Duke University specializing in plant regeneration and meristem biology.",
    pdf: "cv.pdf",   // The "Download full CV" button. To update your CV, replace the file cv.pdf in this folder.
                     // If you set this to "", the button prints/saves the CV page as a PDF instead.
    updated: ""      // e.g. "September 2026". Leave "" to hide.
  },

  /* Timeline-style sections on the CV page (left column).
     Add as many as you like: Positions, Awards, Talks, Teaching, Service...
     Copy a whole { title: ..., items: [ ... ] }, block to add a new section.  */
  cvSections: [
    {
      title: "Education",
      items: [
        { years: "2018 - 2024", title: "Ph.D. in Biology",                institution: "University of North Carolina at Chapel Hill" },
        { years: "2014 - 2018", title: "B.Sc. Plant Biology with Honors", institution: "University of Oklahoma" }
      ]
    }
    // ---- Example of a second section. To use it: delete the // at the start of each line,
    // ---- and add a comma after the closing } of the Education section above.
    // {
    //   title: "Awards",
    //   items: [
    //     { years: "2024", title: "Name of award", institution: "Who gave it" }
    //   ]
    // }
  ],

  skills: [
    "Scanning Electron Microscopy",
    "Confocal Microscopy",
    "Molecular Cloning",
    "Transgenic Plants",
    "R",
    "Python"
  ],

  /* ---------- Publications (shown on the CV page) ----------
     Fields:  title, authors, journal, year, details (volume/pages, may be ""),
              doi (just the number, no https://doi.org/), tags, selected
     tags:    any of these (or your own): "First Author", "Review", "Pre-print",
              "Perspective", "Editorial", "Thesis".  Use [] for none.
     selected: true  -> shown in the default "Selected Publications" list.
     The list sorts itself newest-first, so you can paste new papers anywhere.
     The name below is highlighted in bold in every author list. */
  highlightAuthor: "Willoughby",

  publications: [
    {
      title: "Crawling under the radar: Two novel Paulinella species expand knowledge about the ecology and evolution of a primary plastid-containing amoeba lineage",
      authors: "J Van Etten, S Han, JA Burns, D Lhee, AC Willoughby, TG Stephens, E Chille, RS Sleith, D Bhattacharya, HS Yoon",
      journal: "Journal of Phycology",
      year: 2026,
      details: "",   // add volume/pages here once the journal assigns them
      doi: "10.1111/jpy.70230",
    },
    {
      title: "BAM1/2 receptor kinase signaling drives CLE peptide-mediated formative cell divisions in Arabidopsis roots",
      authors: "AD Crook, AC Willoughby, O Hazak, S Okuda, KR VanDerMolen, CL Soyars, P Cattaneo, NM Clark, R Sozzani, M Hothorn, CS Hardtke, ZL Nimchuk",
      journal: "Proceedings of the National Academy of Sciences",
      year: 2020,
      details: "117 (51), 32750-32756",
      doi: "10.1073/pnas.2018565117",
      tags: ["First Author"],
      selected: true,
    },
    {
      title: "WOX going on: CLE peptides in plant development",
      authors: "AC Willoughby, ZL Nimchuk",
      journal: "Current opinion in plant biology",
      year: 2021,
      details: "63, 102056",
      doi: "10.1016/j.pbi.2021.102056",
      tags: ["First Author", "Review"],
      selected: true,
    },
    {
      title: "More extraordinary model systems for regeneration",
      authors: "JE García-Arrarás, C Li, T Rozario, M Srivastava, A Willoughby",
      journal: "Development",
      year: 2025,
      details: "152 (20), dev205215",
      doi: "10.1242/dev.205215",
      tags: ["Perspective", "First Author"],
      selected: true,
    },
    {
      title: "A conserved module regulates receptor kinase signaling in immunity and development",
      authors: "TA DeFalco, P Anne, SR James, AC Willoughby, F Schwanke, O Johanndrees, Y Genolet, P Derbyshire, Q Wang, S Rana, AM Pullen, FLH Menke, C Zipfel, CS Hardtke, ZL Nimchuk",
      journal: "Nature Plants",
      year: 2022,
      details: "8 (4), 356-365",
      doi: "10.1038/s41477-022-01134-w",
      selected: true,
    },
    {
      title: "Floral innovation through modifications in stem cell peptide signaling",
      authors: "DS Jones, R Selby, P Jiménez-Sandoval, AC Willoughby, E Yaklich, AT DiBattista, J Baczynski, F Wang, T Zhang, V Gurung, AD Crook, AO Roman, E Moore-Pollard, R Schuld, JR Mandel, P Elomaa, JM Burke, J Santiago, ZL Nimchuk",
      journal: "bioRxiv",
      year: 2025,
      details: "Preprint",
      doi: "10.1101/2025.06.27.661788",
      tags: ["Pre-print"],
      selected: true,
    },
    {
      title: "The HK5 and HK6 cytokinin receptors mediate diverse developmental pathways in rice",
      authors: "CA Burr, J Sun, MV Yamburenko, A Willoughby, C Hodgens, SL Boeshore, A Elmore, J Atkinson, ZL Nimchuk, A Bishopp, GE Schaller, JJ Kieber",
      journal: "Development",
      year: 2020,
      details: "147 (20), dev191734",
      doi: "10.1242/dev.191734",
    },
    {
      title: "MILDEW RESISTANCE LOCUS O Function in Pollen Tube Reception Is Linked to Its Oligomerization and Subcellular Distribution",
      authors: "DS Jones, J Yuan, BE Smith, AC Willoughby, EL Kumimoto, SA Kessler",
      journal: "Plant Physiology",
      year: 2017,
      details: "175 (1), 172-185",
      doi: "10.1104/pp.17.00523",
    },
    {
      title: "Arabidopsis thaliana MLO genes are expressed in discrete domains during reproductive development",
      authors: "TC Davis, DS Jones, AJ Dino, NI Cejda, J Yuan, AC Willoughby, SA Kessler",
      journal: "Plant Reproduction",
      year: 2017,
      details: "30 (4), 185-195",
      doi: "10.1007/s00497-017-0313-2",
    },
    {
      title: "Cellular distribution of secretory pathway markers in the haploid synergid cells of Arabidopsis thaliana",
      authors: "DS Jones, X Liu, AC Willoughby, BE Smith, R Palanivelu, SA Kessler",
      journal: "The Plant Journal",
      year: 2018,
      details: "94 (1), 192-202",
      doi: "10.1111/tpj.13848",
    },
    {
      title: "Canalization of flower production across thermal environments requires Florigen and CLAVATA signaling",
      authors: "ES Smith, A John, AC Willoughby, DS Jones, VC Galvão, C Fankhauser, ZL Nimchuk",
      journal: "Current Biology",
      year: 2025,
      details: "35 (14), 3341-3355.e4",
      doi: "10.1016/j.cub.2025.06.001",
    },
    {
      title: "A New Zosterophyll with Novel Emergence and Cuticle Features from the Early Devonian of New Brunswick, Canada",
      authors: "PG Gensel, A Milano, A Willoughby, J Belcher",
      journal: "International Journal of Plant Sciences",
      year: 2025,
      details: "186 (3), 152-166",
      doi: "10.1086/734304",
    },
    {
      title: "Apical hook opening of plant seedlings: Unfolding the role of auxin and the cell wall",
      authors: "AC Willoughby, LC Strader",
      journal: "Developmental cell",
      year: 2024,
      details: "59 (24), 3194-3196",
      doi: "10.1016/j.devcel.2024.11.018",
      tags: ["Editorial"],
    },
    {
      title: "CRISPR, chimerism, and chromothripsis: A technique for studying DNA repair in plants",
      authors: "AC Willoughby",
      journal: "The Plant Cell",
      year: 2023,
      details: "35 (11), 3916-3917",
      doi: "10.1093/plcell/koad221",
      tags: ["Editorial"],
    },
    {
      title: "Aberrant RNA identification reveals triggers of transgene silencing",
      authors: "AC Willoughby",
      journal: "The Plant Cell",
      year: 2025,
      details: "koaf274",
      doi: "10.1093/plcell/koaf274",
      tags: ["Editorial"],
    },
    {
      title: "Gene duplication dynamics and regulatory evolution shape the diversification of Asteraceae",
      authors: "ER Moore-Pollard, PA Ellestad, BR Cliver, J Baczyński, MD Pollard, Z Meharg, AC Willoughby, S Drewry, A Harkess, JM Bonifacino, ZL Nimchuk, JM Burke, DS Jones, JR Mandel",
      journal: "bioRxiv",
      year: 2025,
      details: "2025.10.29.685401",
      doi: "10.1101/2025.10.29.685401",
      tags: ["Pre-print"],
    },
    {
      title: "Illuminating growth: Celebrating the life and legacy of Dr. Joanne Chory",
      authors: "J Brusslan, J Kumar, N Lohani, PQ Ng, M Singla-Rastogi, A Willoughby, AS Yadav",
      journal: "Plant physiology",
      year: 2025,
      details: "199 (2), kiaf455",
      doi: "10.1093/plphys/kiaf455",
      tags: ["Editorial"],
    },
    {
      title: "It’s a small world: Sinningia double flower cultivars share the same GLOBOSA1 allele",
      authors: "AC Willoughby",
      journal: "The Plant Cell",
      year: 2025,
      details: "37 (3), koaf031",
      doi: "10.1093/plcell/koaf031",
      tags: ["Editorial"],
    },
    {
      title: "Illuminating the future: Enhanced glowing plants achieved by rewiring metabolism",
      authors: "AC Willoughby",
      journal: "The Plant Cell",
      year: 2025,
      details: "37 (1), koae286",
      doi: "10.1093/plcell/koae286",
      tags: ["Editorial"],
    },
    {
      title: "Air plant genomes shed light on photosynthesis innovation",
      authors: "AC Willoughby",
      journal: "The Plant Cell",
      year: 2024,
      details: "36 (10), 3897-3898",
      doi: "10.1093/plcell/koae213",
      tags: ["Editorial"],
    },
    {
      title: "CLE Signaling in Root Development and Its Cytoplasmic Requirements",
      authors: "AC Willoughby",
      journal: "The University of North Carolina at Chapel Hill",
      year: 2024,
      details: "PhD Dissertation",
      doi: "10.17615/41687v20s",
      tags: ["First Author", "Thesis"],
    },
    {
      title: "Mind the pretzels and the pint: The PUB keeps you thirsty",
      authors: "AC Willoughby",
      journal: "The Plant Cell",
      year: 2023,
      details: "35 (10), 3639-3640",
      doi: "10.1093/plcell/koad194",
      tags: ["Editorial"],
    },
    {
      title: "Rapid strawberry domestication left room to grow",
      authors: "AC Willoughby",
      journal: "The Plant Cell",
      year: 2024,
      details: "36 (5), 1570-1571",
      doi: "10.1093/plcell/koae015",
      tags: ["Editorial"],
    },
  ],

  /* ---------- Literature Feed page ---------- */
  literature: {
    intro: "New papers on the Gesneriaceae family pulled live from PubMed, plus a few reads I recommend.",

    // The live PubMed feed. Change the search words to follow a different topic.
    pubmedQuery: "Gesneriaceae[Title/Abstract]",
    pubmedLabel: "Gesneriaceae",   // what the page calls the topic
    pubmedCount: 8,                // how many recent papers to show

    // Hand-picked reads. Copy a whole { ... }, block to add one.
    curated: [
{
        title: "A single dominant GLOBOSA allele accounts for repeated origins of hose-in-hose flowers in *Sinningia* (Gesneriaceae)",
        authors: "Yang, X., et al.",
        journal: "The Plant Cell",
        year: 2024,
        link: "https://doi.org/10.1093/plcell/koae283"
      },
      {
        title: "A new formal classification of Gesneriaceae",
        authors: "Weber, A., Clark, J.L., & Möller, M.",
        journal: "Selbyana",
        year: 2013,
        link: "https://journals.flvc.org/selbyana/article/view/123016/122025"
      },
{
        title: "The Role of KNOX Genes in the Evolution of Morphological Novelty in *Streptocarpus*",
        authors: "Harrison, J., Möller, M, Langdale, J., Cronk, Q., & Hudson, A.",
        journal: "The Plant Cell",
        year: 2005,
        link: "https://doi.org/10.1105/tpc.104.028936"
      }


    ]
  }
};
