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
      addListenerFavorites();

      setLocalStorage();
      getLocalStorage();
    });
}

//añadir un id único a cada li para eso utilizo la i del for, para poder sustituir el forOf por el ForComún, y q funcione
//añado la id q me he creado en mi variable de serie, pero debo añadir mi S porq ahora trabajo con el forComún (todo mi array);

function paintSeriesImage() {
  serieSearched.innerHTML = '';
  let paintHTML = ' ';
  // for (const serie of series) {
  for (let i = 0; i < series.length; i++) {
    if (series[i].show.image !== null) {
      paintHTML += `<li class="js-series__list full__series" id="${series[i].show.id}"><span>${series[i].show.name}</span>`;
      paintHTML += `<img class="img__color" src="${series[i].show.image.medium}"/>`;
      paintHTML += `</li>`;
    } else {
      paintHTML += `<li class="js-series__list" id="${series[i].show.id}"><span>${series[i].show.name}</span>`;
      paintHTML += `<img class="img__color" src="https://via.placeholder.com/210x295/ffffff/666666/?
        text=TV"/>`;
      paintHTML += `</li>`;
    }
  }

  serieSearched.innerHTML = serieSearched.innerHTML + paintHTML;
}

//para hacer el evento y usar el elemento clicado es currentTarget, apesar del currentTarget necesito darle un id identificador unico
//porq sino me trae todos los <li>, id puedo traer el li para asignarle algo unico, valor dinámico q se agregue cada vez q se agregue un li

let addFavoritesChosen = [];

function favoriteTv(ev) {
  let chosen = parseInt(ev.currentTarget.id); //verificar q l q he clicado se encuentra si esta lo saco y sino meto con el push
  addFavoritesChosen.push(chosen);
  //   chosen.classList.add('img__clicked');

  console.log('soy el elegido', addFavoritesChosen);
}

//convierto en una lista clicable y este for va a recoger todos mis li donde cada <li> es una serie y escucho el evento sobre esa unidad

function addListenerFavorites() {
  const favoriteShows = document.querySelectorAll('.js-series__list');
  for (const favoriteShow of favoriteShows) {
    favoriteShow.addEventListener('click', favoriteTv);
  }
}
//para hacer mi array nuevo y guardar
//los elementos q vienen dados apartir de una respuesta del servidor
//los tenemos q guardar en el array despues de que la R/ del servidor haya ocurrido

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
button.addEventListener('click', getApiSeries);
