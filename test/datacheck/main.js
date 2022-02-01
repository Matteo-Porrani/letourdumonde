const tbody = document.querySelector('#tbody');


fetch('https://restcountries.com/v3.1/all')
  .then(res => res.json())
  .then(data => {

  data = data.filter(country => {
      if (country.region === 'Oceania') {
        return country;
      }
    })



    /*
    // SORT BY CCN3
    data.sort((a, b) => {
      return (a.ccn3 > b.ccn3) ? 1 : -1;
    });

    // SORT BY AREA DESC
    data.sort((a, b) => {
      return (parseInt(a.area) > parseInt(b.area)) ? -1 : 1;
    });
    */

    // SORT BY SUBREGION
    data.sort((a, b) => {
      return (a.subregion > b.subregion) ? 1 : -1;
    });

    // SORT BY REGION
    data.sort((a, b) => {
      return (a.region > b.region) ? 1 : -1;
    });






    // console.log(data);

    const lines = data.map((country, index) => {

      return `<tr>

        <td>${index + 1}</td>
        <td class='text-blue'><i>${country.continents[0]}</i></td>
        <td class="upp tbk ${(!country.region) ? 'text-red' : ''}">${country.region}</td>
        <td class="${(!country.subregion) ? 'text-red' : ''}">${country.subregion}</td>

        <td class='al-c'>
          <img class='thumb-flag' src='${country.flags.png}' alt='flag'>
        </td>
        
        <td class='al-c ${(!country.coatOfArms.png) ? 'text-red' : ''}'>
          <img class='thumb-flag' src='${country.coatOfArms.png}' alt='none'>
        </td>
        
        <td class='al-c tbk ${(!country.cca3) ? 'text-red' : ''}'>${country.cca3}</td>  
        <td class='al-c tbk ${(!country.ccn3) ? 'text-red' : ''}'>${country.ccn3}</td>

        <td class="${(!country.name.common) ? 'text-red' : ''}">${country.name.common}</td> 
        <td class="tbk text-blue ${(!country.translations.fra.common) ? 'text-red' : ''}">${country.translations.fra.common}</td> 
        <td class="${(!country.capital) ? 'text-red' : ''}">${country.capital}</td> 
        <td class='al-r'>${country.area} km<sup>2</sup></td> 
        <td class='al-r'>${country.population}</td> 

        <td class="al-c ${(!country.borders) ? 'text-red' : ''}">
          ${(!country.borders) ? 'undefined' : country.borders.length}
        </td>
        
        <td>${country.car.side}</td> 
      </tr>`;

    });

    tbody.innerHTML = lines.join('');

  });