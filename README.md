# 👋 Портфолио

Личный сайт-портфолио: обо мне, проекты, навыки и контакты.

### ▶️ [YOUR_GITHUB.github.io](https://YOUR_GITHUB.github.io/)

## Проекты на сайте

| Проект | Описание |
|---|---|
| [🛰️ Последний сигнал](https://github.com/YOUR_GITHUB/last-signal) | Текстовый sci-fi хоррор в браузере, 5 концовок |
| [💸 Финтрек](https://github.com/YOUR_GITHUB/finance-tracker) | Трекер финансов с графиками и офлайн-режимом |
| [⛅ Небо](https://github.com/YOUR_GITHUB/weather-app) | Погода с поиском, геолокацией и живым фоном |

## Особенности

- Без фреймворков: HTML, CSS и JavaScript-модули
- Все данные (имя, контакты, проекты) лежат в одном файле, [`js/config.js`](js/config.js)
- Превью проектов нарисованы на CSS, без скриншотов
- Светлая и тёмная тема, анимации при прокрутке, учёт `prefers-reduced-motion`
- Адаптивная вёрстка от 320 px до широких экранов

## Как добавить проект

Добавь объект в массив `projects` в `js/config.js`:

```js
{ id: 'my-app', title: 'Моё приложение', tagline: '…', description: '…', tags: ['JS'], live: '/my-app/' }
```
