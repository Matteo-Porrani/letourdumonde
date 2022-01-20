
const continents = ['Europe', 'Afrique', 'Asie', 'Amériques', 'Océanie'];
let currContinent;
const heroTitle = document.querySelector('.hero__title h2');

document.hero__menu.continent.addEventListener('change', (e) => {

  currContinent = continents[parseInt(document.hero__menu.continent.value)];
  heroTitle.textContent = currContinent;

});