'use strict';

const typeSerieName = document.querySelector('.js-input');
const button = document.querySelector('.js-btn');
let serieSearched = document.querySelector('.js__full-series');
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
      series = data;
      paintSeriesImage();
      setLocalStorage();
      getLocalStorage();
    });
}
function paintSeriesImage() {
  serieSearched.innerHTML = '';
  let paintHTML = ' ';
  //   debugger;

  for (const serie of series) {
    console.log('entra por aqui');
    if (serie.show.image !== null) {
      console.log('No soy dexter');
      paintHTML += `<li class="js-series__list full__series"><span>${serie.show.name}</span>`;
      paintHTML += `<img class="img__color" src="${serie.show.image.medium}"/>`;
      paintHTML += `</li>`;
    } else {
      paintHTML += `<li class="js-series__list"><span>${serie.show.name}</span>`;
      paintHTML += `<img class="img__color" src="https://via.placeholder.com/210x295/ffffff/666666/?
        text=TV"/>`;
      paintHTML += `</li>`;
      console.log('soy dexter');
    }
  }
  serieSearched.innerHTML = serieSearched.innerHTML + paintHTML;
  addListener();
}

button.addEventListener('click', getApiSeries);
let favoriteShow = [];

function favoriteSerie(ev) {
  console.log('entro y no hagooo nada');

  let clicked = ev.currentTarget;

  if (clicked === true) {
    eachSerie.classlist.add('img__clicked');
  } else {
    eachSerie.classlist.add('img__color');
  }
  //   console.log(favoriteShow);
  //   eachSerie.push(favoriteShow);

  //   //   let favoriteShow = ev.currentTarget.id;
  //   let favoriteShow = series[i];
  //   if (favoriteSerieHTML === clicked) {
  //     favoriteSerieHTML = true;
  //   } else {
  //     favoriteSerieHTML = false;
  //   }
}
// favoriteSerie();

function addListener() {
  //convierto en una lista clicable y
  let clickedImage = document.querySelectorAll('.js-series__list');

  for (const eachSerie of clickedImage) {
    eachSerie.addEventListener('click', favoriteSerie);
    console.log('Estoy añadiendo el evento');
  }
}

function setLocalStorage() {
  const jsonData = JSON.stringify(series);
  localStorage.setItem('typeData2', jsonData);
  //   console.log('entra a recoger datos');
}

function getLocalStorage() {
  //   console.log('traigo los datos guardados');
  const localDataA = localStorage.getItem('typeData2');
  const localDataB = JSON.parse(localDataA);
}
