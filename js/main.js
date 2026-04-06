// ─── Hotlist Data ────────────────────────────────────────────
// To add/edit items: update the arrays below.
// Each item: { title, meta, note, tag }
//   title  — main display name
//   meta   — author, creator, year, etc.
//   note   — short take (optional)
//   tag    — label shown on the right (optional)

const hotlist = {
  books: [
    {
      title: "The Pragmatic Programmer",
      meta: "David Thomas & Andrew Hunt",
      note: "Required reading. Changed how I think about craft.",
      tag: "Engineering"
    },
    {
      title: "A Philosophy of Software Design",
      meta: "John Ousterhout",
      note: "Short, dense, and genuinely useful.",
      tag: "Engineering"
    },
    {
      title: "Atomic Habits",
      meta: "James Clear",
      note: "Systems over goals. Stuck with me.",
      tag: "Mindset"
    },
    {
      title: "Thinking, Fast and Slow",
      meta: "Daniel Kahneman",
      note: "Explains why smart people make bad decisions.",
      tag: "Psychology"
    },
  ],

  tv: [
    {
      title: "Severance",
      meta: "Apple TV+, 2022–",
      note: "Best premise on TV. Existential dread dressed in office satire.",
      tag: "Sci-Fi"
    },
    {
      title: "The Bear",
      meta: "Hulu / Disney+, 2022–",
      note: "Most stressful show I love. Obsessive excellence on screen.",
      tag: "Drama"
    },
    {
      title: "Slow Horses",
      meta: "Apple TV+, 2022–",
      note: "Understated espionage. Gary Oldman at his best.",
      tag: "Thriller"
    },
    {
      title: "Succession",
      meta: "HBO, 2018–2023",
      note: "Shakespearean. Every character is a disaster. Perfect.",
      tag: "Drama"
    },
  ],

  movies: [
    {
      title: "Dune: Part Two",
      meta: "Denis Villeneuve, 2024",
      note: "Visually unlike anything else. Cinema.",
      tag: "Sci-Fi"
    },
    {
      title: "Past Lives",
      meta: "Celine Song, 2023",
      note: "Quiet and devastating. Stayed with me for weeks.",
      tag: "Drama"
    },
    {
      title: "Parasite",
      meta: "Bong Joon-ho, 2019",
      note: "Perfect film. No notes.",
      tag: "Thriller"
    },
    {
      title: "The Holdovers",
      meta: "Alexander Payne, 2023",
      note: "Old-school filmmaking. Genuinely funny and warm.",
      tag: "Comedy"
    },
  ],

  youtube: [
    {
      title: "Fireship",
      meta: "fireship.io",
      note: "100-second tech explainers done right.",
      tag: "Tech"
    },
    {
      title: "Theo — t3.gg",
      meta: "theo",
      note: "Strong opinions on the web ecosystem. Usually right.",
      tag: "Web Dev"
    },
    {
      title: "The Primeagen",
      meta: "ThePrimeagen",
      note: "Chaotic energy + genuine engineering depth.",
      tag: "Tech"
    },
    {
      title: "Kurzgesagt",
      meta: "Kurzgesagt – In a Nutshell",
      note: "Makes you feel small and curious in the best way.",
      tag: "Science"
    },
  ],
};

// ─── Render Hotlist ──────────────────────────────────────────
function renderHotlist() {
  Object.entries(hotlist).forEach(([category, items]) => {
    const list = document.getElementById(`list-${category}`);
    if (!list) return;

    list.innerHTML = items.map(item => `
      <li class="hotlist-item">
        <div class="item-main">
          <span class="item-title">${item.title}</span>
          ${item.meta  ? `<span class="item-meta">${item.meta}</span>` : ''}
          ${item.note  ? `<span class="item-note">${item.note}</span>` : ''}
        </div>
        ${item.tag ? `<span class="item-tag">${item.tag}</span>` : ''}
      </li>
    `).join('');
  });
}

// ─── Tabs ────────────────────────────────────────────────────
function initTabs() {
  const tabs   = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      document.getElementById(`panel-${target}`).classList.add('active');
    });
  });
}

// ─── Theme Toggle ────────────────────────────────────────────
function initTheme() {
  const html   = document.documentElement;
  const button = document.querySelector('.theme-toggle');

  // Respect system preference on first visit
  const stored = localStorage.getItem('theme');
  if (stored) {
    html.setAttribute('data-theme', stored);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    html.setAttribute('data-theme', 'light');
  }

  button.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// ─── Year ────────────────────────────────────────────────────
function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// ─── Init ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderHotlist();
  initTabs();
  setYear();
});
