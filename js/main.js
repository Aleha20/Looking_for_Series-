'use strict';

let typeSerieName = document.querySelector('.js-input');
const button = document.querySelector('.js-btn');
let serieSearched = document.querySelector('.js-series__list');
let favoriteSeries = document.querySelector('.js-favorite__series');

//ejecuto el fetch (petición al servidor, se va ejecutando)
//devuelve una promesa de q llegará la R/ sobre la q puedo hacer then
//mientras se ejecuta hago el then, trabajo con la respuesta de otra variable (response).
//en response estará la respuesta a la promesa q me han hecho
//al este primer then le paso una función donde tengo a response (R del servidor)
//y sobre el q puedo ejecutar el json a la R/ q me han dado
//que devuelve otra promesa
//como es asíncrono necesito otro then para recoger la respuesta que me da en formato json
//a este segundo then le debo hacer otra función y le paso parámetro data donde recojo la R/
// es decir data contiene el objeto q devuelve el servidor.
// una vez tenga el objeto uso el innerHTML para añadir lo que quiero a la web.

let series = [];

function getApiSeries() {
  console.log('pido los datos 1');
  fetch(`http://api.tvmaze.com/search/shows?q=tronos`)
    .then(function (response) {
      console.log('entra por aqui, muestra los datos?');
      return response.json(); // debo hacer este return para poder pasarle de algún modo al siguiente then la R/
    })
    //este segundo then tiene el parámetro data que contiene el objeto q devuelve el  servidor
    .then(function (data) {
      //   document.body.innerHTML = data.result;
      console.log('pido los datos 2 que voy a usar');

      //Pongo la ruta a la que accedo img/título
      console.log(data);
      series = data; // aquí solo llamo a todos los datos xq los necesito no
      //no la ruta sola de cada objeto porq eso es lo q me devolvería
      paintSeriesImage();
    });
}
getApiSeries();

function paintSeriesImage() {
  //declaro una const vacía porq es donde va a
  //volcar cada (let) resultado de la iteración
  let paintHTML = ' '; //para buscar cada serie lo recorro con un for
  console.log('entra en la funcion paint');
  for (const serie of series) {
    console.log(serie.show.image.medium); //consigo la ruta a donde quiero ir
    paintHTML += `<div class="js-series__list">${serie.show.name}`;
    paintHTML += `<img src="${serie.show.image.medium}"/>`;
    paintHTML += `</div>`;
    console.log('entra por el for');
  }
  serieSearched.innerHTML = paintHTML;
  //   typeSerieName = input.value;
}
paintSeriesImage();

// button.click();
button.addEventListener('click', paintSeriesImage);

// function resetPage(){
//     if (typeSerieName === "");
//     innerHTML = "";
//     else {
//         innerHTML = input.value;
//     }
// }
// resetPage();
