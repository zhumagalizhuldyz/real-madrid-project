
const nameInput = document.getElementById('fan-name');             
const welcomeMessage = document.querySelector('#welcome-message'); 
document.getElementById('welcome-btn').addEventListener('click', () => {
  const name = nameInput.value.trim();
  welcomeMessage.textContent = name === ''
    ? 'Please enter your name first, then press the button.'
    : 'Hala Madrid, ' + name + '! Welcome to the Fan Zone!';
});


const themeBtn = document.getElementById('theme-btn');
themeBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  themeBtn.textContent = isDark ? 'Switch to light theme' : 'Switch to dark theme';
});


const faqButtons = document.querySelectorAll('.faq-question');
faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const answer = document.getElementById(button.getAttribute('aria-controls'));
    const willOpen = answer.hidden;           
    answer.hidden = !willOpen;
    button.setAttribute('aria-expanded', String(willOpen));
  });
});


const searchInput = document.getElementById('player-search');
const cards = document.querySelectorAll('.searchable');
const searchCount = document.getElementById('search-count');
const noResults = document.getElementById('no-results');


function normalize(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function filterPlayers() {
  const query = normalize(searchInput.value.trim());
  let visible = 0;
  cards.forEach((card) => {
    const title = normalize(card.querySelector('.player-name').textContent);
    const match = title.includes(query);
    card.classList.toggle('is-hidden', !match);
    if (match) visible++;
  });
  searchCount.textContent = 'Showing ' + visible + ' of ' + cards.length + ' players';
  noResults.hidden = visible !== 0;
}
searchInput.addEventListener('input', filterPlayers);
filterPlayers();


const favForm = document.getElementById('fav-form');
const favInput = document.getElementById('fav-input');
const favList = document.getElementById('fav-list');
const favCount = document.getElementById('fav-count');
const favError = document.getElementById('fav-error');

function updateFavCount() {
  favCount.textContent = favList.children.length;
}

favForm.addEventListener('submit', (event) => {
  event.preventDefault();                     
  const text = favInput.value.trim();
  if (text === '') {
    favError.textContent = 'Please enter a player name.';
    favInput.focus();
    return;
  }
  favError.textContent = '';

  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;                    
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'remove-btn';
  removeBtn.textContent = 'Remove';
  removeBtn.setAttribute('aria-label', 'Remove ' + text);
  removeBtn.addEventListener('click', () => {
    li.remove();                              
    updateFavCount();
  });
  li.append(span, removeBtn);
  favList.append(li);

  favInput.value = '';
  favInput.focus();
  updateFavCount();
});
updateFavCount();
