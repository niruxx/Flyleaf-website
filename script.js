const passages = [
  'Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, “and what is the use of a book,” thought Alice “without pictures or conversations?”',
  'So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.',
  'There was nothing so very remarkable in that; nor did Alice think it so very much out of the way to hear the Rabbit say to itself, “Oh dear! Oh dear! I shall be late!” (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural).'
];
let page = 0;
const bookmarks = new Set();
const reader = document.querySelector('#reader');
const bookmark = document.querySelector('#bookmark');
function renderPage() {
  document.querySelector('#passage').textContent = passages[page];
  document.querySelector('#page-count').textContent = `${page + 1} / ${passages.length}`;
  document.querySelector('#prev-page').disabled = page === 0;
  document.querySelector('#next-page').disabled = page === passages.length - 1;
  const saved = bookmarks.has(page);
  bookmark.setAttribute('aria-pressed', String(saved));
  bookmark.setAttribute('aria-label', saved ? 'Remove bookmark from this demo page' : 'Bookmark this demo page');
  bookmark.textContent = saved ? '◆' : '◇';
}
document.querySelector('#prev-page').addEventListener('click', () => { if (page > 0) { page--; renderPage(); } });
document.querySelector('#next-page').addEventListener('click', () => { if (page < passages.length - 1) { page++; renderPage(); } });
bookmark.addEventListener('click', () => { bookmarks.has(page) ? bookmarks.delete(page) : bookmarks.add(page); renderPage(); });
document.querySelectorAll('button[data-paper]').forEach(button => {
  button.addEventListener('click', () => {
    reader.dataset.paper = button.dataset.paper;
    document.querySelectorAll('button[data-paper]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  });
});
document.querySelector('#font-size').addEventListener('input', event => {
  reader.style.setProperty('--reader-size', `${event.target.value}px`);
  document.querySelector('#font-value').textContent = `${event.target.value} px`;
});
renderPage();
