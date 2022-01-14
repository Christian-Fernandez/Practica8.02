"use strict";

import * as script from "./script_firebase.js";

//Función que muestra en el DOM el producto que se le pasa.
export const printear = (documento) => {
  return `<div class="celda"><p><b>Nombre: </b>${documento.data().nombre}</p><p><b>Peso: </b>${
    documento.data().peso}</p><p><b>Precio: </b>${documento.data().precio}€</p><img src="${documento.data().imagen}"><p><b>Descripción: </b>${documento.data().descripcion}</p></div>`;
};

export const printear_carrito = (documento) => {
  var tabla = `<table><tr><th>${documento.data().nombre}</th><th>${documento.data().propietario}</th><th>${documento.data().fecha}</th></tr> <tr><th>Imagen</th><th>Nombre</th><th>Descripción</th><th>peso</th><th>precio</th></tr>`;
  for(let i=0;i<documento.data().productos.length;i++){
    let datos = script.obtenerProducto(documento.data().productos[i]);
      tabla += `<tr><td><img src="${datos.data().imagen}"></td><td>${datos.data().nombre}</td><td>${datos.data().descripcion}</td><td>${datos.data().peso}</td><td>${datos.data().precio}</td></tr>`;
  }
  tabla += `</table>`
  return tabla;
};

export const printear_añadirProductos = (documento) => {
  return `<option value="${documento.id}">${documento.data().nombre}</option>`;
};

export const printear_añadirCarritos = (documento) => {

  return `<option value="${documento.id}">${documento.data().nombre}</option>`;
};



