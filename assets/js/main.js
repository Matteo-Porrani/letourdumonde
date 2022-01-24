
const continentsList = ['Europe', 'Afrique', 'Asie', 'Amériques', 'Océanie'];
const continentsListEng = ['Europe', 'Africa', 'Asia', 'Americas', 'Oceania'];

let currContinent ='Europe';
const heroTitle = document.querySelector('.hero__title h2');
const countriesUl = document.querySelector('.countries__list');

// gestionnaire d'événement <select>
document.hero__menu.continent.addEventListener('change', () => {

  currContinent = continentsList[parseInt(document.hero__menu.continent.value)];
  currContinentEng = continentsListEng[parseInt(document.hero__menu.continent.value)];

  refreshContinent(currContinentEng);
  heroTitle.textContent = currContinent;
});



function refreshContinent(continentName) {

  fetch('https://restcountries.com/v3.1/all')
  .then(res => res.json())
  .then(data => {
    // console.log(data);

    const filteredData = data.filter(country => {
      if (country.region === continentName) {
        return country;
      }
    })
    .sort((a, b) => {
      return (a.translations.fra.common > b.translations.fra.common) ? 1 : -1;
    });

    console.log(filteredData);

    if (filteredData) {
      displayCountries(filteredData);
    }

  });
}



function displayCountries(countryList) {

  let countriesLis = [];

  countryList.forEach(country => {
    const countryLi = `
    <li class="country">
      <a href="${country.maps.openStreetMaps}" target="_blank"
      class="country__link">${country.translations.fra.common}</a>
    </li>`;
    countriesLis.push(countryLi);
  });

  countriesUl.innerHTML = countriesLis.join('');
}

// Initialise la page avec currContinent ='Europe'
refreshContinent(currContinent);

