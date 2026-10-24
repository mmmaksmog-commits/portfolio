import { profile, stats, skills, sections, designs } from './config.js';

const $ = (s) => document.querySelector(s);
const waUrl = (text = '') => `https://wa.me/${profile.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
const isExternal = (url) => /^https?:/.test(url);
const extAttrs = (url) => (isExternal(url) ? ' target="_blank" rel="noopener"' : '');

// ---------- Hero ----------
$('#brandName').textContent = profile.name;
$('#name').textContent = profile.name;
$('#headline').textContent = profile.headline;
$('#intro').textContent = profile.intro;
$('#heroWa').href = waUrl('Здравствуйте! Хочу обсудить сайт.');
$('#stats').innerHTML = stats.map((s) => `<li><b>${s.value}</b><span>${s.label}</span></li>`).join('');
$('#year').textContent = new Date().getFullYear();
$('#footerGh').href = `https://github.com/${profile.github}`;

// ---------- Разделы проектов ----------
const card = (p, i) => `
  <article class="card reveal" style="--c:${p.color};--d:${i * 60}ms">
    <a class="card__cover" href="${p.live}"${extAttrs(p.live)} aria-label="Открыть «${p.title}»">
      <span class="card__icon" aria-hidden="true">${p.icon}</span>
      <span class="card__num">0${i + 1}</span>
    </a>
    <div class="card__body">
      <span class="card__tagline">${p.tagline}</span>
      <h3 class="card__title">${p.title}</h3>
      <p class="card__desc">${p.desc}</p>
      <ul class="tags">${p.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
      <div class="card__actions">
        <a class="btn btn--primary btn--sm" href="${p.live}"${extAttrs(p.live)}>Открыть ↗</a>
        ${p.repo ? `<a class="btn btn--ghost btn--sm" href="${p.repo}" target="_blank" rel="noopener">Код</a>` : ''}
      </div>
    </div>
  </article>`;

$('#sections').innerHTML = sections.map((s) => `
  <section class="section" id="${s.id}">
    <div class="section__head reveal">
      <h2 class="section__title">${s.title} <span class="section__count">${s.items.length}</span></h2>
      <p class="section__lead">${s.lead}</p>
    </div>
    <div class="cards">${s.items.map(card).join('')}</div>
  </section>`).join('');

// ---------- Дизайны ----------
$('#designsCard').href = designs.live;
$('#designsTitle').textContent = designs.title;
$('#designsDesc').textContent = designs.desc;

// ---------- Навыки ----------
$('#langs').innerHTML = skills.languages.map((l) => `<li>${l}</li>`).join('');
$('#tools').innerHTML = skills.tools.map((t) => `<li>${t}</li>`).join('');

// ---------- Контакты ----------
const contacts = [
  { cls: 'wa', label: 'WhatsApp', value: profile.whatsappLabel, href: waUrl('Здравствуйте! Хочу обсудить сайт.'), icon: '💬', hint: 'Написать' },
  { cls: 'tel', label: 'Телефон', value: profile.phoneLabel, href: `tel:${profile.phone}`, icon: '📞', hint: 'Позвонить' },
  { cls: 'gh', label: 'GitHub', value: `@${profile.github}`, href: `https://github.com/${profile.github}`, icon: '💻', hint: 'Код проектов' },
];
$('#contacts').innerHTML = contacts.map((c) => `
  <a class="contact contact--${c.cls}" href="${c.href}"${extAttrs(c.href)}>
    <span class="contact__icon" aria-hidden="true">${c.icon}</span>
    <span class="contact__text"><small>${c.label}</small><b>${c.value}</b></span>
    <span class="contact__hint">${c.hint} →</span>
  </a>`).join('');

// ---------- Форма заявки (FormSubmit: письмо приходит на почту без своего сервера) ----------
const form = $('#orderForm');
const status = $('#formStatus');

function setStatus(text, type = '') {
  status.textContent = text;
  status.className = `form__status ${type}`;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  if (data._honey) return; // бот
  if (!data.name.trim() || !data.contact.trim()) {
    setStatus('Заполните имя и контакт для связи', 'is-error');
    form.querySelector(data.name.trim() ? '[name=contact]' : '[name=name]').focus();
    return;
  }
  const btn = form.querySelector('button[type=submit]');
  btn.disabled = true;
  setStatus('Отправляю…');
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${profile.formEmail}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        Имя: data.name,
        Контакт: data.contact,
        Тип: data.type,
        Описание: data.message || '—',
        _subject: `Новая заявка с сайта: ${data.type}`,
        _template: 'table',
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || String(json.success) !== 'true') throw new Error(json.message || 'send failed');
    form.reset();
    setStatus('Спасибо! Заявка отправлена — скоро свяжусь с вами.', 'is-ok');
  } catch {
    const text = `Здравствуйте! Меня зовут ${data.name}. Нужен сайт: ${data.type}. ${data.message || ''} Контакт: ${data.contact}`;
    status.className = 'form__status is-error';
    status.innerHTML = `Не удалось отправить. <a href="${waUrl(text)}" target="_blank" rel="noopener">Отправить через WhatsApp</a>`;
  } finally {
    btn.disabled = false;
  }
});

// ---------- Мобильное меню ----------
const burger = $('#burger');
burger.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  burger.setAttribute('aria-expanded', open);
});
$('#navLinks').addEventListener('click', (e) => {
  if (e.target.closest('a')) { document.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); }
});

// ---------- Активный раздел в меню ----------
const links = [...document.querySelectorAll('.nav__links a')];
const spy = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${e.target.id}`));
  }
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));

// ---------- Появление при прокрутке ----------
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
  }
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
