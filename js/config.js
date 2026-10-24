// Все тексты, контакты и проекты сайта — здесь.

export const profile = {
  name: 'Максим',
  headline: 'Делаю сайты, которые приносят деньги',
  intro: 'Моя задача — писать для людей интересные и уникальные сайты: от лендинга, который продаёт, до браузерной игры, в которую хочется вернуться. Каждый проект адаптирован под телефон и ПК.',
  github: 'mmmaksmog-commits',
  whatsapp: '79933042196',      // для ссылки wa.me — только цифры
  whatsappLabel: '8 993 304-21-96',
  phone: '+79283042196',        // для звонка tel:
  phoneLabel: '8 928 304-21-96',
  formEmail: 'mysikkk@gmail.com', // куда приходят заявки с формы (через FormSubmit)
};

export const stats = [
  { value: '15', label: 'проектов в портфолио' },
  { value: '6', label: 'стилей дизайна' },
  { value: '100%', label: 'адаптивность' },
];

export const skills = {
  languages: ['JavaScript', 'TypeScript', 'Python', 'C++', 'HTML / CSS'],
  tools: ['Git и GitHub', 'Vite', 'Figma'],
};

const gh = (repo) => `https://github.com/${profile.github}/${repo}`;
// Наши проекты лежат на <ник>.github.io/<repo>/, поэтому ссылки — от корня сайта.
const own = (repo) => ({ live: `/${repo}/`, repo: gh(repo) });

export const sections = [
  {
    id: 'games',
    title: 'Игры',
    lead: 'Браузерные игры, в которые можно играть с телефона и ПК, без установки.',
    items: [
      { icon: '🛰️', color: '#22c55e', title: 'Последний сигнал', tagline: 'Sci-fi хоррор-квест', desc: 'Заброшенная станция, подозрительный ИИ, кислород как таймер, взлом кодов и 5 концовок.', tags: ['JavaScript', 'Web Audio'], ...own('last-signal') },
      { icon: '⛏️', color: '#f59e0b', title: 'Осколки Первого мира', tagline: '2D-песочница', desc: 'Пиксельный мир с крафтом, жителями, подземельями и боссами. Сохранения в браузере.', tags: ['TypeScript', 'Phaser', 'React'], ...own('shards-of-first-world') },
      { icon: '🦠', color: '#19ffd2', title: 'Agar.io by mysik', tagline: 'Аркада в стиле Agar.io', desc: 'Поглощай клетки, собирай бонусы и комбо, выживай против умных AI и включай режим мутации.', tags: ['Canvas', 'AI', 'Web Audio'], live: 'https://mmmaksmog-commits.github.io/Agar-Io-by-mystic/', repo: gh('Agar-Io-by-mystic') },
      { icon: '🔤', color: '#a855f7', title: '5 букв', tagline: 'Словесная головоломка', desc: 'Угадай слово из пяти букв за шесть попыток. Слово дня, свободный режим и статистика.', tags: ['JavaScript', 'Логика'], ...own('five-letters') },
      { icon: '🏃', color: '#ec4899', title: 'Неон-ран', tagline: 'Бесконечный раннер', desc: 'Прыгай через препятствия в неоновом городе. Скорость растёт, рекорд сохраняется.', tags: ['Canvas', 'Физика'], ...own('neon-run') },
    ],
  },
  {
    id: 'trackers',
    title: 'Трекеры',
    lead: 'Приложения, которые помогают следить за деньгами, привычками и собой. Данные хранятся на устройстве.',
    items: [
      { icon: '💸', color: '#6366f1', title: 'Финтрек', tagline: 'Личные финансы', desc: 'Доходы и расходы, графики по категориям, экспорт в CSV, работа офлайн.', tags: ['Chart.js', 'PWA'], ...own('finance-tracker') },
      { icon: '✅', color: '#22c55e', title: 'Привычки', tagline: 'Трекер привычек', desc: 'Отмечай привычки каждый день, следи за сериями и тепловой картой за год.', tags: ['JavaScript', 'localStorage'], ...own('habit-tracker') },
      { icon: '🏋️', color: '#f97316', title: 'Тренировки', tagline: 'Журнал тренировок', desc: 'Упражнения, подходы и веса, личные рекорды и график прогресса.', tags: ['JavaScript', 'SVG-графики'], ...own('workout-log') },
      { icon: '🍅', color: '#ef4444', title: 'Фокус', tagline: 'Помодоро-таймер', desc: 'Работа по помидорам, учёт времени по проектам и статистика за неделю.', tags: ['JavaScript', 'Notifications'], ...own('focus-timer') },
      { icon: '🌈', color: '#eab308', title: 'Настроение', tagline: 'Дневник настроения', desc: 'Отмечай настроение и что на него повлияло. Календарь и закономерности.', tags: ['JavaScript', 'Аналитика'], ...own('mood-diary') },
    ],
  },
  {
    id: 'apps',
    title: 'Полезные приложения',
    lead: 'Небольшие сервисы, которые решают одну задачу — быстро и красиво.',
    items: [
      { icon: '⛅', color: '#3b82f6', title: 'Небо', tagline: 'Погода', desc: 'Поиск городов, геолокация, прогноз по часам и на неделю, живой фон под погоду.', tags: ['REST API', 'Fetch'], ...own('weather-app') },
      { icon: '🎬', color: '#e11d48', title: 'Что посмотреть', tagline: 'Выбор фильма', desc: 'Новинки и популярное обновляются сами каждую ночь: постеры, описания, поиск по всей базе, рулетка и список «посмотреть позже».', tags: ['Serverless', 'SPARQL'], ...own('movie-picker') },
      { icon: '💱', color: '#14b8a6', title: 'Курс', tagline: 'Конвертер валют', desc: 'Актуальные курсы 30+ валют, быстрый обмен направления и избранные пары.', tags: ['REST API', 'Intl'], ...own('currency-converter') },
      { icon: '🔐', color: '#8b5cf6', title: 'Пароль', tagline: 'Генератор паролей', desc: 'Надёжные пароли и фразы, оценка стойкости и время на взлом.', tags: ['Web Crypto', 'Безопасность'], ...own('password-generator') },
      { icon: '🔳', color: '#64748b', title: 'QR', tagline: 'Генератор QR-кодов', desc: 'QR для ссылки, Wi-Fi или контакта. Свои цвета и скачивание PNG.', tags: ['Canvas', 'JavaScript'], ...own('qr-generator') },
    ],
  },
];

export const designs = {
  title: 'Галерея дизайнов',
  desc: 'Шесть живых сайтов в разных стилях: минимализм, необрутализм, glassmorphism, люкс, киберпанк и эко. Выберите стиль — сделаю похожий под ваш бизнес.',
  ...own('designs'),
};
