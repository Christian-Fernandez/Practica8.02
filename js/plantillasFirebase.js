"use strict";

export const printear = (documento) => {
  return `<div class="celda"><p><b>Nombre: </b>${documento.data().nombre}</p><p><b>Peso: </b>${
    documento.data().peso}</p><p><b>Precio: </b>${documento.data().precio}€</p><img src="${documento.data().imagen}"><p><b>Descripción: </b>${documento.data().descripcion}</p></div>`;
};

