const contArr = ['Europe', 'Afrique', 'Asie', 'Amériques', 'Océanie'];
const contCodes = ['eur', 'afr', 'asi', 'ame', 'oce'];

const paths = document.querySelectorAll('path');
const continents = document.querySelectorAll('.continent');

// BUG -- adapter !
const output = document.querySelector('.continent__name');

continents.forEach(continent => {
  continent.addEventListener('click', selectContinent);
})

function selectContinent(e) {

  // reset all paths to gray
  resetPathColor();

  // NEW -- replace current country list with loader
  // delete current list items
  // countryListPrimary.innerHTML = '<div class="loader__wrapper"><div class="lds-dual-ring"></div></div>';
  countryListPrimary.innerHTML = '<div class="loader__wrapper"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>';

  // set the title
  output.textContent = contArr[parseInt(e.target.dataset.code)];
  output.dataset.code = e.target.dataset.code;

  // get all elements having the selected data-code (ex : data-code="0")
  const selectedPaths = document.querySelectorAll(`[data-code="${e.target.dataset.code}"]`);

  // apply class .active (and color )
  selectedPaths.forEach(p => p.classList.add('active'));






  currContinent = continentsList[parseInt(e.target.dataset.code)];
  currContinentEng = continentsListEng[parseInt(e.target.dataset.code)];

  refreshContinent(currContinentEng);

}

function resetPathColor() {
  paths.forEach(path => path.classList.remove('active'));
}
