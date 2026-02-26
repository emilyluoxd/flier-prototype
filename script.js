/* ============================================
   STREET ARCHIVE — script.js
   ============================================ */

// ── FLIER DATA ────────────────────────────────
// To add a new flier:
// 1. Add a new entry here with a unique ID (e.g. "F020")
// 2. Add the img tag in index.html with matching data-id
// 3. Point imgSrc to your asset filename

const FLIERS = {

  // ── ADD MORE FLIERS BELOW ──────────────────
  // Copy this block and fill in your details:
  //
  // "F010": {
  //   title: "Your Flier Title",
  //   imgSrc: "assets/your-flier.png",
  //   tags: ["tag1", "tag2", "tag3"],
  //   note: "Short description of the flier.",
  //   meta: "Location · Date · photographed Month Year"
  // },

  "F005": {
    title: "Drag the Pipeline – Fundraiser for Indigenous Land Defenders",
    imgSrc: "assets/fliers/F005.png",
    tags: ["activism", "Indigenous rights", "drag"],
    note: "Support from the frontlines. DJ set, dance party. Wordplay on drag + pipeline.",
    meta: "West End / Burrard · Feb 5 · photographed Feb 2026"
  },

  "F009": {
    title: "Sip 'n' Paint – Galentines",
    imgSrc: "assets/fliers/F009.png",
    tags: ["community", "galentines", "hand-illustrated feel"],
    note: " Saturday Feb 21, 3–5pm. Studio 403 at the ARC. Bring your own booze. Warm DIY feel despite being digitally made.",
    meta: "Commercial/Powell · Feb 21 · photographed Feb 2026"
  },

   "F010": {
    title: "Fish Brain",
    imgSrc: "assets/fliers/F010.png",
    tags: ["Emoji", "sticker"],
    meta: "E 1st AVE/Lorne Street · photographed Feb 2026"
  },

  "F011": {
    title: "As...mo",
    imgSrc: "assets/fliers/F011.png",
    tags: ["torn", "flier"],
    meta: "E 1ST AVE/Main Street · photographed Feb 2026"
  },

    "F012": {
    title: "Emerald Security ",
    imgSrc: "assets/fliers/F012.png",
    tags: ["worn", "typography"],
    meta: "E 1st AVE/Lorne Street · photographed Feb 2026"
  },


  "F014": {
    title: "Notice: This Property Is Not For Sale",
    imgSrc: "assets/fliers/F014.png",
    tags: ["Hand-lettered"],
    note: "A statement piece",
    meta: "Hamilton ST · Feb 2026"
  },

  "F017": {
    title: "Greta Thunberg Quote + Wolf Silhouette",
    imgSrc: "assets/fliers/F017.png",
    tags: ["Activism", "Climate", "Typographic"],
    note: "A st'We cannot save the world by playing the rules — Greta Thunberg.' Mixed font sizes, DIY layout. Beside a separate black wolf silhouette sticker/poster.atement piece",
    meta: "Olympic Village, The Birds · Feb 2026"
  },

  "F018": {
    title: "Cluster of stickers",
    imgSrc: "assets/fliers/F018.png",
    tags: ["Weathered", "Sticker design", "Typographic"],
    note: "Two readable stickers: 'artworks bynu' gothic lettering and 'safetywear.ca' red logo. Surface heavily covered in graffiti and torn flier remnants. Documents decay of street surfaces over time.",
    meta: "Olympic Village, The Birds · Feb 2026"
  },
  
  "F019": {
    title: "Naughty & Nice 19+ Market",
    imgSrc: "assets/fliers/F019.png",
    tags: ["nightlife", "dark aesthetic"],
    note: "Sunday Feb 15th, 5–10pm. Hobby + Co. presents. $15 includes 1 cocktail. Lap dance workshop $20. Posted on painted concrete wall featuring Monopoly game board art with Scottie dog and red hotel.",
    meta: "Olympic Village, The Birds · Feb 2026"
  },

};


// ── SCROLL TO PAN ─────────────────────────────
const scene = document.getElementById('scene');
const viewport = document.getElementById('viewport');
const scrollHint = document.getElementById('scrollHint');

let currentX = 0;
let targetX = 0;
const SCENE_WIDTH = parseInt(getComputedStyle(document.documentElement)
  .getPropertyValue('--scene-width'));

function getMaxScroll() {
  return -(SCENE_WIDTH - window.innerWidth);
}

// Smooth lerp animation
function lerp(a, b, t) { return a + (b - a) * t; }

function animate() {
  currentX = lerp(currentX, targetX, 0.1);
  scene.style.transform = `translateX(${currentX}px)`;
  requestAnimationFrame(animate);
}
animate();

// Wheel scroll → horizontal pan
viewport.addEventListener('wheel', (e) => {
  e.preventDefault();
  targetX -= e.deltaY * 1.2;
  targetX = Math.max(getMaxScroll(), Math.min(0, targetX));
  scrollHint.classList.add('hidden');
}, { passive: false });

// Touch / drag support
let isDragging = false;
let dragStartX = 0;
let dragStartScene = 0;

viewport.addEventListener('pointerdown', (e) => {
  if (e.target.classList.contains('flier-pin')) return;
  isDragging = true;
  dragStartX = e.clientX;
  dragStartScene = targetX;
  viewport.setPointerCapture(e.pointerId);
});

viewport.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  const delta = e.clientX - dragStartX;
  targetX = dragStartScene + delta;
  targetX = Math.max(getMaxScroll(), Math.min(0, targetX));
});

viewport.addEventListener('pointerup', () => { isDragging = false; });


// ── MODAL ─────────────────────────────────────
const modal = document.getElementById('modal');
const modalCard = document.getElementById('modalCard');
const modalImg = document.getElementById('modalImg');
const backTitle = document.getElementById('backTitle');
const tagRow = document.getElementById('tagRow');
const backNote = document.getElementById('backNote');
const backMeta = document.getElementById('backMeta');
const flipBtn = document.getElementById('flipBtn');
const closeBtn = document.getElementById('closeBtn');

function openFlier(id) {
  const data = FLIERS[id];
  if (!data) return;

  // Populate
  modalImg.src = data.imgSrc;
  backTitle.textContent = data.title;
  backNote.textContent = data.note;
  backMeta.textContent = data.meta;

  tagRow.innerHTML = '';
  data.tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    tagRow.appendChild(span);
  });

  // Reset card state
  modalCard.classList.remove('flipped');
  flipBtn.textContent = 'Turn Around';
  modal.classList.add('active');
}

function closeModal() {
  modal.classList.remove('active');
  modalCard.classList.remove('flipped');
  flipBtn.textContent = 'Turn Around';
}

// Attach click to all flier pins
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('flier-pin')) {
    openFlier(e.target.dataset.id);
  }
});

flipBtn.addEventListener('click', () => {
  modalCard.classList.toggle('flipped');
  flipBtn.textContent = modalCard.classList.contains('flipped')
    ? 'Turn Back' : 'Turn Around';
});

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Keyboard close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});


// ── INTRO ─────────────────────────────────────
const intro = document.getElementById('intro');
const introBtn = document.getElementById('introBtn');

introBtn.addEventListener('click', () => {
  intro.classList.add('hidden');
  setTimeout(() => intro.style.display = 'none', 900);
});