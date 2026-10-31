import { profile, stats, skills, sections, designs } from './config.js?v=3';

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
// Каждый раздел свёрнут: видна полоска иконок и кнопка «Показать». Карточки раскрываются по нажатию.
const card = (p, i) => `
  <article class="card" style="--c:${p.color};--d:${i * 40}ms">
    <a class="card__cover" href="${p.live}"${extAttrs(p.live)} aria-label="Открыть «${p.title}»">
      <span class="card__icon" aria-hidden="true">${p.icon}</span>
      <span class="card__num">${String(i + 1).padStart(2, '0')}</span>
    </a>
    <div class="card__body">
      <span class="card__tagline">${p.tagline}</span>
      <h3 class="card__title">${p.title}</h3>
      <p class="card__desc">${p.desc}</p>
      <ul class="tags">${p.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
      <div class="card__actions"><a class="btn btn--primary btn--sm" href="${p.live}"${extAttrs(p.live)}>Открыть ↗</a></div>
    </div>
  </article>`;

$('#sections').innerHTML = sections.map((s) => `
  <section class="section section--fold" id="${s.id}" data-open="false">
    <div class="fold reveal">
      <button class="fold__head" aria-expanded="false" aria-controls="${s.id}-cards">
        <span class="fold__text">
          <span class="fold__title">${s.title} <span class="section__count">${s.items.length}</span></span>
          <span class="fold__lead">${s.lead}</span>
        </span>
        <span class="fold__icons" aria-hidden="true">${s.items.slice(0, 6).map((p) => `<i style="--c:${p.color}">${p.icon}</i>`).join('')}${s.items.length > 6 ? `<i class="more">+${s.items.length - 6}</i>` : ''}</span>
        <span class="fold__btn"><span class="fold__label">Показать</span> <b>▾</b></span>
      </button>
      <div class="fold__body" id="${s.id}-cards"><div class="fold__inner">
        <div class="cards">${s.items.map(card).join('')}</div>
        ${s.all ? `<a class="btn btn--ghost fold__all" href="${s.all.href}">${s.all.label} →</a>` : ''}
      </div></div>
    </div>
  </section>`).join('');

function setOpen(section, open) {
  section.dataset.open = open;
  const head = section.querySelector('.fold__head');
  head.setAttribute('aria-expanded', open);
  section.querySelector('.fold__label').textContent = open ? 'Свернуть' : 'Показать';
}
document.querySelectorAll('.section--fold').forEach((sec) => {
  sec.querySelector('.fold__head').addEventListener('click', () => {
    const open = sec.dataset.open !== 'true';
    setOpen(sec, open);
    if (!open) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
// Переход из меню (или по ссылке #games) сразу раскрывает раздел
function openFromHash() {
  if (!/^#[\w-]+$/.test(location.hash)) return;
  const sec = document.querySelector(`.section--fold${location.hash}`);
  if (sec) setOpen(sec, true);
}
window.addEventListener('hashchange', openFromHash);
document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', () => {
  const href = a.getAttribute('href');
  if (!/^#[\w-]+$/.test(href)) return;
  const sec = document.querySelector(`.section--fold${href}`);
  if (sec) setOpen(sec, true);
}));
openFromHash();

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
