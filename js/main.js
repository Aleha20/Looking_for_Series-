'use strict';

const typeSerieName = document.querySelector('.js-input');
const button = document.querySelector('.js-btn');
let serieSearched = document.querySelector('.js__full-series');
let favoriteSeries = document.querySelector('.js-favorite__series');
const newBtnexam = document.querySelector('.js-new__btn-exam');
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
      // setLocalStorage();
      getLocalStorage();
    });
}

//añadir un id único a cada li para eso utilizo la i del for, para poder sustituir el forOf por el ForComún, y q funcione
//añado el id q me he creado en mi variable de serie, pero debo añadir mi S porq ahora trabajo con el forComún (todo mi array);

function paintSeriesImage() {
  serieSearched.innerHTML = '';
  let paintHTML = ' ';
  for (let i = 0; i < series.length; i++) {
    paintHTML += `<li class="js-series__list full__series" id="${series[i].show.id}"><span>${series[i].show.name}</span>`;

    if (series[i].show.image !== null) {
      paintHTML += `<p>${series[i].show.status}</p>`;
      paintHTML += `<img class="img__color" src="${series[i].show.image.medium}"/>`;
      paintHTML += `</li>`;
    } else {
      paintHTML += `<img class="img__color" src="https://via.placeholder.com/210x295/ffffff/666666/?
        text=TV"/>`;
      paintHTML += `</li>`;
    }
  }
  console.log('Soy el array de series', series);
  serieSearched.innerHTML = serieSearched.innerHTML + paintHTML;
}
//para hacer el evento y usar el elemento clicado es currentTarget, apesar del currentTarget necesito darle un id identificador único
//q sea dinámico q se agregue cada vez q se agregue un <li> porq sino me trae todos los <li>
// debo declarar la variable chosen fuera para poder utilizarla en la función de pintar mis favoritos
let addFavoritesChosen = [];

let chosen;
function favoriteTv(ev) {
  const favoriteItem = ev.currentTarget; //HTML
  console.log('Soy nueva constante', favoriteItem);
  chosen = parseInt(favoriteItem.id); //verificar q lo q he clicado se encuentra, si esta lo saco y sino meto con el push
  console.log('Soy chosen', chosen);
  const favoriteClicked = addFavoritesChosen.indexOf(chosen); //mi objeto
  const isFavoriteAlready = favoriteClicked !== -1;
  console.log(isFavoriteAlready);
  //Hemos hecho el fin para recoger el objet con el q vamos a trabajar
  //Series.find revisar que es lo q está sumando en cada entrada
  const favoriteChoose = series.find(function (favorite) {
    return favorite.show.id === chosen;
  });
  //Es un if para filtrar si el array está vacío o está lleno
  if (addFavoritesChosen.length < 1) {
    //entro por aqui si el array está vacio
    addFavoritesChosen.push(favoriteChoose);
    console.log('Entro en el if de fuerta');
  } else {
    //entra si en el array hay al menos un elemento
    console.log('Entro en el else de fuera');
    //Método Iván para tener una foto fija del array con el que queremos trabajar
    const arrayNuevo = addFavoritesChosen.slice(0);
    console.log('soy favorite choose', favoriteChoose);
    for (const eachElement of arrayNuevo) {
      console.log('entro en el for');
      //condicional para oincluir o quitar objetos del array de favoritos según su id
      if (chosen !== eachElement.show.id) {
        addFavoritesChosen.push(favoriteChoose);

        console.log('Estoy en el if');
      } else {
        addFavoritesChosen.splice(favoriteClicked, 1); //sino pongo el 1 me borran todos.

        console.log('Estoy en el else');
      }
      // console.log('Entro y soy FavoriteChoose', favoriteChoose);
      // addFavoritesChosen.push(favoriteChoose);
      // }
    }
  }
  console.log('Soy el array de favoritos', addFavoritesChosen);

  setLocalStorage();
  paintFavoriteSeries();
  addListenerFavorites();
  //   addFavoritesChosen, en consola me muestra que clicked/unclicked
}

//convierto mi array en una lista clicable y este for va a recoger todos mis <li> (cada serie) y escucho el evento sobre esa unidad

function addListenerFavorites() {
  const favoriteShows = document.querySelectorAll('.js-series__list');
  for (const favoriteShow of favoriteShows) {
    favoriteShow.addEventListener('click', favoriteTv);
  }
}
function paintFavoriteSeries() {
  favoriteSeries.innerHTML = '';
  let paintHTML = ' ';
  for (let i = 0; i < addFavoritesChosen.length; i++) {
    if (addFavoritesChosen[i] !== null) {
      paintHTML += `<li class="js-series__list full__series" id="${chosen}"><span>${addFavoritesChosen[i]}</span>`;
      paintHTML += `</li>`;
    } else {
      paintHTML += `<li class="js-series__list" id="${chosen}"><span>${addFavoritesChosen[i]}</span>`;
      paintHTML += `<img class="img__color" src="https://via.placeholder.com/210x295/ffffff/666666/?
        text=TV"/>`;
      paintHTML += `</li>`;
    }
  }

  favoriteSeries.innerHTML = favoriteSeries.innerHTML + paintHTML;
}
//para hacer mi array nuevo y guardar los elementos q vienen dados apartir de una respuesta del servidor
//los tenemos q guardar en el array despues de que la R/ del servidor haya ocurrido

function setLocalStorage() {
  const jsonData = JSON.stringify(addFavoritesChosen);
  localStorage.setItem('typeData2', jsonData);
  //   console.log('entra a recoger datos');
}

function getLocalStorage() {
  //   console.log('traigo los datos guardados');
  const localDataA = localStorage.getItem('typeData2');
  const localDataB = JSON.parse(localDataA);
}
button.addEventListener('click', getApiSeries);
//Examen
function createNewFavoritesExam() {
  for (let i = 0; i < addFavoritesChosen.length; i++) {
    const newWay = addFavoritesChosen[i];
    console.log('Soy', newWay);
  }
}
newBtnexam.addEventListener('click', createNewFavoritesExam);
