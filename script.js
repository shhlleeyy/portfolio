// Small interactive JS: filtering, modal, theme, contact placeholder
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');
const projectsGrid = document.getElementById('projectsGrid');
const modal = document.getElementById('modalBackdrop');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');
const themeToggle = document.getElementById('themeToggle');
const yearEl = document.getElementById('year');

yearEl.textContent = new Date().getFullYear();

filters.forEach(btn=>btn.addEventListener('click', ()=>{
const f = btn.getAttribute('data-filter');
filterProjects(f);
}));

function filterProjects(filter){
cards.forEach(card=>{
    const tags = card.dataset.tags.split(',').map(t=>t.trim());
    if(filter==='all' || tags.includes(filter)){
    card.style.display='flex';
    } else card.style.display='none';
});
}

// Modal logic: clicking "View" shows a larger description
document.querySelectorAll('.viewBtn').forEach((b,i)=>{
b.addEventListener('click', ()=>openModal(cards[i]));
});
document.querySelectorAll('.card').forEach((c)=>{
c.addEventListener('keydown', (e)=>{ if(e.key==='Enter') openModal(c); });
});

function openModal(card){
const title = card.querySelector('h3').textContent;
const img = card.querySelector('img').src;
const desc = card.querySelector('p').textContent;
modalContent.innerHTML = `
    <h2>${title}</h2>
    <img src="${img}" alt="${title}" style="width:100%;max-height:360px;object-fit:cover;border-radius:8px;margin:8px 0">
    <p style="color:var(--muted)">${desc}</p>
    <p><strong>Tech:</strong> ${card.dataset.tags}</p>
    <div style="display:flex;gap:8px;margin-top:10px"><a class="btn" href="#">Open demo</a><a class="btn" href="#">Open code</a></div>
`;
modal.style.display='flex';
modal.setAttribute('aria-hidden','false');
document.body.style.overflow='hidden';
modalClose.focus();
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });
function closeModal(){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); document.body.style.overflow='auto'; }

// Theme toggle
const root = document.documentElement;
const storedTheme = localStorage.getItem('theme');
if(storedTheme) root.setAttribute('data-theme', storedTheme);
themeToggle.addEventListener('click', ()=>{
const cur = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
root.setAttribute('data-theme', cur);
localStorage.setItem('theme', cur);
themeToggle.setAttribute('aria-pressed', cur==='light');
});

// Contact placeholder
function handleContact(e){
e.preventDefault();
const form = e.target;
const data = {name:form.name.value, email:form.email.value, message:form.message.value};
alert('This demo form does not send messages. Connect it to a backend or use Formspree.\n' + JSON.stringify(data, null, 2));
form.reset();
}

// Download resume stub: replace href with your resume file
document.getElementById('downloadResume').addEventListener('click', (e)=>{
e.preventDefault();
alert('Replace the download link with your resume PDF.');
});

// Accessibility: focus trap basic (keeps keyboard on modal while open)
document.addEventListener('focus', (e)=>{
if(modal.style.display==='flex' && !modal.contains(e.target)){
    e.stopPropagation(); modalClose.focus();
}
}, true);

// Initial filter
filterProjects('all');