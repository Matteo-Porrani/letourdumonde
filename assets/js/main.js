
let filteredData;

const page1 = document.querySelector('.page1');
const page2 = document.querySelector('.page2');

const continentsList = ['Europe', 'Afrique', 'Asie', 'Amériques', 'Océanie'];
const continentsListEng = ['Europe', 'Africa', 'Asia', 'Americas', 'Oceania'];

let currContinent ='Europe';
const heroTitle = document.querySelector('.hero__title h2');
const countriesUl = document.querySelector('.country__list');


// T*T -- utilities

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// T*T

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

    filteredData = data.filter(country => {
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

    countryLink.addEventListener('click', function(e) {
  
      getOneCountry(e.target.dataset.code.toLowerCase());

      window.scrollTo({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });

      page2.classList.remove('hidden');
      page1.classList.add('out');
    });
  })

}

// Initialise la page avec currContinent ='Europe'
refreshContinent(currContinent);





const countryName = document.querySelector('#countryName');
const countryFlag = document.querySelector('#countryFlag');
const countryCapital = document.querySelector('#countryCapital');
const countryArea = document.querySelector('#countryArea');
const countryPopulation = document.querySelector('#countryPopulation');
const countryBorders = document.querySelector('#countryBorders');

const countryCarSide = document.querySelector('#countryCarSide');
const countryCodes = document.querySelector('#countryCodes');

const countryMap = document.querySelector('#countryMap');




function getOneCountry(countryCode) {

  fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
    .then(res => res.json())
    .then(data => {
      if (data) showOneCountry(data[0]);
    });
}



function showOneCountry(country) {
    countryName.textContent = country.translations.fra.common;
    countryFlag.src = country.flags.png;

    countryCapital.textContent = country.capital;
    countryArea.innerHTML = `${numberWithCommas(country.area)} km<sup>2</sup>`;
    countryPopulation.textContent = numberWithCommas(country.population);
    
    const codeBorders = country.borders;

    const translatedBorders = codeBorders.map(code => {
      return (filteredData.find(item => item.cca3 === code)).translations.fra.common;
    })

    // console.log(translatedBorders);

    countryBorders.textContent = translatedBorders.join(', ');





    countryCarSide.textContent = (country.car.side === 'right') ? 'droite' : 'gauche';
    countryCodes.textContent = `${country.cca3} / ${country.ccn3}`;

    countryCoatOfArms.src = country.coatOfArms.png;
}



const backButton = document.querySelector('#backButton');

backButton.addEventListener('click', () => {
  page1.classList.remove('out');
  page2.classList.add('hidden');
});

