const wip = false;



const continentsList = ['Europe', 'Afrique', 'Asie', 'Amériques', 'Océanie'];
const continentsListEng = ['Europe', 'Africa', 'Asia', 'Americas', 'Oceania'];


// gestion des filtres
let dataFilters = {
  area: false,
  pop: false
}



let filteredData;

const page1 = document.querySelector('.page1');
const page2 = document.querySelector('.page2');

let currContinent = 'Europe';

// MK -- declaration avec 'var'
var currContinentEng = 'Europe';

const heroTitle = document.querySelector('.hero__title');
const countryListPrimary = document.querySelector('.country__list--primary');
const countryCount = document.querySelector('.country__count');


// A*A -- utilities ########################################################

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// A*A -- ##################################################################

function refreshContinent(continentName) {

  fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {
      // console.log ALL countries
      console.log(data);


      // filtres
      const areaMin = dataFilters.area ? 1500 : -10;
      const popMin = dataFilters.pop ? 500000 : 0;

      filteredData = data.filter(country => {
        if (country.region === continentName
          && country.area > areaMin
          && country.population > popMin
        ) {
          return country;
        }
      })
        .sort((a, b) => {
          // return (a.translations.fra.common > b.translations.fra.common) ? 1 : -1;
          return a.translations.fra.common.localeCompare(b.translations.fra.common);
        });

      // console.log ONLY countries of selected continent
      console.log(filteredData);

      if (filteredData) {
        displayCountries(filteredData);

        // NEW -- code provisoire pour travailler sur .page2
        if (wip) {
          getOneCountry('FRA');
          page2.classList.remove('page--hidden');
          page1.classList.add('out');
        }

      }

    });
}


function displayCountries(countryList) {

  // console.log(countryList.length);
  countryCount.textContent = countryList.length;

  let countriesLis = [];

  countryList.forEach(country => {
    const countryLi = `<li class="country__link" data-code="${country.cca3}">
      <img class="thumb__flag" src="${country.flags.png}"></img>
      <span class="country__name">${country.translations.fra.common}</span>
    </li>`;
    countriesLis.push(countryLi);
  });

  countryListPrimary.innerHTML = countriesLis.join('');

  // après avoir injecté les éléments dans le DOM on applique un gestionnaire d'événement
  const countryLinks = document.querySelectorAll('.country__link');
  countryLinks.forEach(countryLink => {

    countryLink.addEventListener('click', function (e) {

      getOneCountry(this.dataset.code.toLowerCase());

      // ramène le scroll au top si la card du pays cliqué est très en bas dans le document
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });

      // BUG -- affichage PAGE 2 désactivé
      page2.classList.remove('page--hidden');
      page1.classList.add('out');
    });
  })

}

// Initialise la page avec currContinent ='Europe'
refreshContinent(currContinent);








// get DOM elements for '.page2'
const countryNavContinent = document.querySelector('.country__nav__continent');
const page2CountryList = document.querySelector('.page2__country__list');

const countryInfo = document.querySelector('.country__info');

console.log(countryInfo);

const headerCountryName = document.querySelector('#headerCountryName');
const countryFlag = document.querySelector('#countryFlag');
const countryCapital = document.querySelector('#countryCapital');
const countryArea = document.querySelector('#countryArea');
const countryPopulation = document.querySelector('#countryPopulation');
const countryBorders = document.querySelector('#countryBorders');

const countryCarSide = document.querySelector('#countryCarSide');
const countryCodes = document.querySelector('#countryCodes');

// BUG -- ???????????????
const countryMap = document.querySelector('#countryMap');


const countryHeraldicImage = document.querySelector('.country__heraldic__image');







function getOneCountry(countryCode) {

  fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
    .then(res => res.json())
    .then(data => {
      if (data) showOneCountry(data[0]);
    });
}



function showOneCountry(country) {
  headerCountryName.textContent = country.translations.fra.common;
  countryFlag.src = country.flags.png;

  countryCapital.textContent = country.capital;
  countryArea.innerHTML = `${numberWithCommas(country.area)} km<sup>2</sup>`;
  countryPopulation.textContent = numberWithCommas(country.population);


  let translatedBorders = country.borders || ['info indisponible'];
  /*

  let translatedBorders;
  const codeBorders = country.borders;
  if (codeBorders) {

    translatedBorders = codeBorders.map(code => {
      return (filteredData.find(item => item.cca3 === code)).translations.fra.common;
    })

  } else {
    translatedBorders = ['-'];
  }

  */

  // console.log(translatedBorders);

  countryBorders.textContent = translatedBorders.join(', ');

  countryCarSide.textContent = (country.car.side === 'right') ? 'droite' : 'gauche';
  countryCodes.textContent = `${country.cca3} / ${country.ccn3}`;

  countryCoatOfArms.src = country.coatOfArms.png || 'https://via.placeholder.com/300?text=image+indisponible';



  // NEW -- liste des pays dans '.country__list--secondary'

  countryNavContinent.textContent = currContinent;

  const accessibleCountries = filteredData.map(country => {
    return `<li>
    <span class="page2NavItem">${country.translations.fra.common}</span>
    </li>`
  });

  page2CountryList.innerHTML = accessibleCountries.join('');


  // NEW -- image de fond très claire

  // countryInfo.setAttribute('background-image', `linear-gradient(rgba(250, 250, 250, .95), rgba(250, 250, 250, .95)), url("${country.coatOfArms.png}");`);
  countryInfo.setAttribute('background-image', `url('${country.coatOfArms.png}')`);

}


function resetCountry() {

  const countryFields = [
    headerCountryName,
    countryFlag,
    countryCapital,
    countryArea,
    countryPopulation,
    countryBorders,
    countryCarSide,
    countryCodes
  ];

  countryFields.forEach(field => field.innerHTML = '');

  countryHeraldicImage.src = '';

}





// gestionnaire bouton de retour à l'accueil
const backButton = document.querySelector('#backButton');

backButton.addEventListener('click', () => {
  resetCountry();

  page1.classList.remove('out');
  page2.classList.add('page--hidden');
});



// T*T -- FILTERS

const searchFilters = document.querySelectorAll('input[type="checkbox"]');

searchFilters.forEach(filter => filter.addEventListener('change', checkboxChange));

function checkboxChange(e) {
  // console.log(e.target.name);
  // console.log(e.target.checked);

  switch (e.target.name) {

    case 'filterArea':
      dataFilters.area = e.target.checked;
      console.log('current filterArea value');
      console.log(dataFilters.area);
      break;
    case 'filterPop':
      dataFilters.pop = e.target.checked;
      console.log('current filterPop value');
      console.log(dataFilters.pop);
      break;
  }

  refreshContinent(currContinentEng);
}