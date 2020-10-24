'use strict';

const typeSerieName = document.querySelector('.js-input');
const button = document.querySelector('.js-btn');
let serieSearched = document.querySelector('.js-series__list');
let favoriteSeries = document.querySelector('.js-favorite__series');

let series = [];

function getApiSeries() {
  const inputValueSerieName = typeSerieName.value;
  console.log(inputValueSerieName);
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValueSerieName}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      series = data;
      console.log(series);
      paintSeriesImage();
      setLocalStorage();
      getLocalStorage();
    });
}
function paintSeriesImage() {
  serieSearched.innerHTML = '';
  let paintHTML = ' ';

  for (const serie of series) {
    paintHTML += `<div class="js-series__list"><li>${serie.show.name}`;
    paintHTML += `<img src="${serie.show.image.medium}"/>`;
    paintHTML += `</li></div>`;
  }
  serieSearched.innerHTML = serieSearched.innerHTML + paintHTML;
}

button.addEventListener('click', getApiSeries);

function setLocalStorage() {
  localStorage.setItem('typeData2', series);
  const jsonData = JSON.stringify(series);

  //   console.log('entra a recoger datos');
}

function getLocalStorage() {
  console.log('traigo los datos guardados');

  localStorage.getItem('typeData2');
  const localData = JSON.parse(jsonData);
}

// if (series[i] === null) {
//     paintHTML = `<img
//           src="https://via.placeholder.com/210x295/ffffff/666666/?
//       text=TV"
//         />`;
//   } else {
//     paintHTML = `<img src="series[i].show.image.medium" />`;
//   }
