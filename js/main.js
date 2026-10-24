import { profile, skills, projects } from './config.js';

const $ = (s) => document.querySelector(s);
const repoUrl = (id) => `https://github.com/${profile.github}/${id}`;
const hasGithub = profile.github && profile.github !== 'YOUR_GITHUB';

// Мини-превью проектов, нарисованные на CSS — без скриншотов.
const PREVIEWS = {
  'last-signal': `
    <div class="pv pv--signal">
      <span class="pv-signal__alert">[ ТРЕВОГА: O₂ — КРИТИЧЕСКИЙ ]</span>
      <span>Ты просыпаешься в криокапсуле…</span>
      <span class="pv-signal__echo">ЭХО › Доброе утро, инженер.</span>
      <span class="pv-signal__choice">1 Дёрнуть аварийный рычаг</span>
      <span class="pv-signal__choice">2 Ждать, пока ИИ откроет капсулу</span>
      <span class="pv-signal__cursor">&gt; _</span>
    </div>`,
  'finance-tracker': `
    <div class="pv pv--fin">
      <div class="pv-fin__card"><small>Баланс</small><b>50 236 ₽</b></div>
      <div class="pv-fin__bars">${[38, 62, 45, 80, 55, 70].map((h, i) => `<i style="height:${h}%;animation-delay:${i * 0.08}s"></i>`).join('')}</div>
    </div>`,
  'weather-app': `
    <div class="pv pv--sky">
      <span class="pv-sky__icon">⛅</span>
      <b class="pv-sky__temp">18°</b>
      <span class="pv-sky__city">Москва · Переменная облачность</span>
    </div>`,
};

// ---------- Профиль ----------
document.title = `${profile.name} — ${profile.role}`;
$('#logo').textContent = profile.name.split(' ').map((w) => w[0]).join('');
$('#name').textContent = profile.name;
$('#role').textContent = profile.role;
$('#intro').textContent = profile.intro;
$('#location').textContent = profile.location;
$('#footerName').textContent = profile.name;
$('#year').textContent = new Date().getFullYear();

// ---------- Проекты ----------
const projectCard = (p) => `
  <article class="project ${p.featured ? 'project--featured' : ''} reveal">
    <a class="project__preview" href="${p.live}" aria-label="Открыть ${p.title}">${PREVIEWS[p.id] ?? ''}</a>
    <div class="project__body">
      ${p.featured ? '<span class="badge">Главный проект</span>' : ''}
      <h3 class="project__title">${p.title}</h3>
      <p class="project__tagline">${p.tagline}</p>
      <p class="project__desc">${p.description}</p>
      <ul class="tags">${p.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
      <div class="project__links">
        <a class="btn btn--primary btn--sm" href="${p.live}">Открыть ↗</a>
        ${hasGithub ? `<a class="btn btn--sm" href="${repoUrl(p.id)}" target="_blank" rel="noopener">Код на GitHub</a>` : ''}
      </div>
    </div>
  </article>`;

const designsCard = () => {
  const ready = Boolean(profile.designsUrl);
  const ext = /^https?:/.test(profile.designsUrl) ? ' target="_blank" rel="noopener"' : '';
  return `
  <article class="project project--designs reveal">
    <a class="project__preview" ${ready ? `href="${profile.designsUrl}"${ext}` : ''} aria-label="Галерея дизайнов">
      <div class="pv pv--designs">
        <i class="d1"></i><i class="d2"></i><i class="d3"></i><i class="d4"></i>
      </div>
    </a>
    <div class="project__body">
      <h3 class="project__title">Галерея дизайнов</h3>
      <p class="project__tagline">Разные стили сайтов, которые я могу сделать</p>
      <p class="project__desc">Шесть живых сайтов: минимализм, необрутализм, glassmorphism, люкс, киберпанк и эко. Каждый можно открыть на телефоне и ПК — и заказать похожий.</p>
      <div class="project__links">
        ${ready
          ? `<a class="btn btn--primary btn--sm" href="${profile.designsUrl}"${ext}>Смотреть дизайны ↗</a>`
          : '<span class="btn btn--sm is-disabled">Скоро</span>'}
        ${hasGithub && !ext ? `<a class="btn btn--sm" href="${repoUrl('designs')}" target="_blank" rel="noopener">Код на GitHub</a>` : ''}
      </div>
    </div>
  </article>`;
};

$('#projectList').innerHTML = projects.map(projectCard).join('') + designsCard();

// ---------- Навыки ----------
$('#skillList').innerHTML = skills.map((s) => `
  <div class="skill reveal">
    <h3 class="skill__group">${s.group}</h3>
    <ul class="tags tags--lg">${s.items.map((i) => `<li>${i}</li>`).join('')}</ul>
  </div>`).join('');

// ---------- Контакты ----------
const contacts = [
  hasGithub && { label: 'GitHub', value: `@${profile.github}`, href: `https://github.com/${profile.github}` },
  profile.telegram && { label: 'Telegram', value: `@${profile.telegram}`, href: `https://t.me/${profile.telegram}` },
  profile.email && { label: 'Почта', value: profile.email, href: `mailto:${profile.email}` },
].filter(Boolean);
$('#contactLinks').innerHTML = contacts.length
  ? contacts.map((c) => `
    <a class="contact-link" href="${c.href}" ${c.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>
      <span class="contact-link__label">${c.label}</span>
      <span class="contact-link__value">${c.value}</span>
      <span class="contact-link__arrow" aria-hidden="true">↗</span>
    </a>`).join('')
  : '<p class="muted">Контакты скоро появятся.</p>';

// ---------- Тема ----------
const THEME_KEY = 'portfolio_theme';
const root = document.documentElement;
try { const t = localStorage.getItem(THEME_KEY); if (t) root.dataset.theme = t; } catch { /* ignore */ }
$('#themeBtn').addEventListener('click', () => {
  const current = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  root.dataset.theme = current === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem(THEME_KEY, root.dataset.theme); } catch { /* ignore */ }
});

// ---------- Появление при прокрутке ----------
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
  }
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
