// Фильтр программ по категориям
const grid = document.getElementById('swGrid');
document.querySelectorAll('.sw-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.sw-chip').forEach((c) => c.classList.toggle('is-on', c === chip));
    const f = chip.dataset.f;
    grid.querySelectorAll('.sw').forEach((card) => { card.hidden = f !== 'all' && card.dataset.cat !== f; });
  });
});
