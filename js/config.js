// Все личные данные и проекты — здесь. Пустые поля на сайте просто не показываются.

export const profile = {
  name: 'Максим Могилин',
  role: 'Frontend-разработчик',
  intro: 'Делаю быстрые, аккуратные и адаптивные веб-приложения — от игр до дашбордов. Люблю, когда интерфейс одинаково хорошо работает и на телефоне, и на большом экране.',
  location: 'Россия · удалённо или в офисе',
  github: 'YOUR_GITHUB',          // ник на GitHub
  telegram: '',                   // ник в Telegram без @
  email: '',                      // почта для связи
  designsUrl: '',                 // ссылка на сайт с дизайнами
};

export const skills = [
  { group: 'Языки', items: ['JavaScript (ES2023)', 'HTML5', 'CSS3', 'TypeScript'] },
  { group: 'Фронтенд', items: ['Адаптивная вёрстка', 'Web Components', 'PWA', 'Canvas / Web Audio', 'Chart.js'] },
  { group: 'Инструменты', items: ['Git и GitHub', 'GitHub Pages', 'REST API', 'Figma', 'DevTools'] },
];

// live — путь относительно корня github.io, поэтому работает для любого ника.
export const projects = [
  {
    id: 'last-signal',
    title: 'Последний сигнал',
    tagline: 'Текстовый sci-fi хоррор в браузере',
    description: 'Интерактивная история на заброшенной станции: подозрительный ИИ, запас кислорода, мини-игра «взлом» и 5 концовок. Собственный движок сцен, сохранения, звук на Web Audio API.',
    tags: ['JavaScript', 'Игровой движок', 'Web Audio', 'PWA'],
    live: '/last-signal/',
    featured: true,
  },
  {
    id: 'finance-tracker',
    title: 'Финтрек',
    tagline: 'Трекер личных финансов',
    description: 'Доходы и расходы по категориям, графики за полгода, поиск и фильтры, экспорт в CSV. Работает офлайн и устанавливается на телефон как приложение.',
    tags: ['JavaScript', 'Chart.js', 'localStorage', 'Service Worker'],
    live: '/finance-tracker/',
  },
  {
    id: 'weather-app',
    title: 'Небо',
    tagline: 'Погода в любом городе',
    description: 'Поиск городов с подсказками, геолокация, прогноз по часам и на неделю, избранные города. Фон и анимации меняются под погоду и время суток.',
    tags: ['JavaScript', 'REST API', 'Fetch / async', 'CSS-анимации'],
    live: '/weather-app/',
  },
];
