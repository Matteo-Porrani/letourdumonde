
const page2 = document.querySelector('.page2');

const continentsList = ['Europe', 'Afrique', 'Asie', 'Amériques', 'Océanie'];
const continentsListEng = ['Europe', 'Africa', 'Asia', 'Americas', 'Oceania'];

let currContinent ='Europe';
const heroTitle = document.querySelector('.hero__title h2');
const countriesUl = document.querySelector('.country__list');

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
    const countryLi = `<li class="country__link" data-code="${country.cca3}">${country.translations.fra.common}</li>`;
    countriesLis.push(countryLi);
  });

  countriesUl.innerHTML = countriesLis.join('');

  // après avoir injecté les éléments dans le DOM on applique un gestionnaire d'événement
  const countryLinks = document.querySelectorAll('.country__link');
  countryLinks.forEach(countryLink => {

    console.log('adding listener on ' + countryLink);
    countryLink.addEventListener('click', function(e) {
  
      getOneCountry(e.target.dataset.code.toLowerCase());

      page2.classList.remove('hidden');
    });
  })

}

// Initialise la page avec currContinent ='Europe'
refreshContinent(currContinent);





/*

<h2 id="countryName"></h2>
<p id="countryCapital"></h2>
<p id="countrySurface"></h2>
<p id="countryPopulation"></h2>

*/

const countryName = document.querySelector('#countryName');
const countryCapital = document.querySelector('#countryCapital');
const countryArea = document.querySelector('#countryArea');
const countryPopulation = document.querySelector('#countryPopulation');





function getOneCountry(countryCode) {

  fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
    .then(res => res.json())
    .then(data => {
      if (data) {
        showOneCountry(data[0]);
      }
    });

}



function showOneCountry(country) {

    countryName.textContent = country.name.common;
    countryCapital.textContent = country.capital;
    countrySurface.textContent = country.area;

} 