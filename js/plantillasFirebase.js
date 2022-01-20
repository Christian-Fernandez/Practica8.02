"use strict";

import * as script from "./script_firebase.js";

//Función que muestra en el DOM el producto que se le pasa.
export const printear = (documento) => {
  return `<div class="celda"><p><b>Nombre: </b>${documento.data().nombre}</p><p><b>Peso: </b>${
    documento.data().peso}</p><p><b>Precio: </b>${documento.data().precio}€</p><img src="${documento.data().imagen}"><p><b>Descripción: </b>${documento.data().descripcion}</p></div>`;
};

//Función que printea el carrito.
export const printear_carrito = (documento,tabla) => {

    var texto = `<tr><th>${documento.data().nombre}</th><th colspan="2">${documento.data().propietario}</th><th colspan="2">${documento.data().fecha}</th></tr> <tr><th>Imagen</th><th>Nombre</th><th>Descripción</th><th>peso</th><th>precio</th></tr>`;
    for (let i = 0; i < documento.data().productos.length; i++) {
      script.obtenerProducto(documento.data().productos[i], texto, i, tabla);
    }
};

//Función que printea los productos en el select.
export const printear_añadirProductos = (documento) => {
  return `<option value="${documento.id}">${documento.data().nombre}</option>`;
};

//Función que printea los carritos en el select.
export const printear_añadirCarritos = (documento) => {

  return `<option value="${documento.id}">${documento.data().nombre}</option>`;
};

//Función que printea los tr de la tabla.
export const printear_tabla = (documento) => {

  return `<tr><td><img src="${documento.data().imagen}"></td><td>${documento.data().nombre}</td><td>${documento.data().descripcion}</td><td>${documento.data().peso}</td><td>${documento.data().precio}</td></tr>`;
};

//Función que muestra solo el div con el identificador mostrar_productos.
export const navProducto = () => {

    document.getElementById("mostrar_carrito").classList.add("ocultar");
    document.getElementById("crear_carrito").classList.add("ocultar");
    document.getElementById("añadir_producto").classList.add("ocultar");
    document.getElementById("mostrar_productos").classList.remove("ocultar");
    document.getElementById("editar_producto").classList.add("ocultar");
};

//Función que muestra solo el div con el identificador crear_carrito.
export const navCrearCarrito = () => {

    document.getElementById("mostrar_carrito").classList.add("ocultar");
    document.getElementById("mostrar_productos").classList.add("ocultar");
    document.getElementById("crear_carrito").classList.remove("ocultar");
    document.getElementById("añadir_producto").classList.add("ocultar");
    document.getElementById("editar_producto").classList.add("ocultar");
};

//Función que muestra solo el div con el identificador mostrar_carrito.
export const navVerCarrito = () => {

    document.getElementById("mostrar_carrito").classList.remove("ocultar");
    document.getElementById("mostrar_productos").classList.add("ocultar");
    document.getElementById("crear_carrito").classList.add("ocultar");
    document.getElementById("añadir_producto").classList.add("ocultar");
    document.getElementById("editar_producto").classList.add("ocultar");
};

//Función que muestra solo el div con el identificador añadir_producto.
export const navAñadirProducto = () => {

    document.getElementById("mostrar_carrito").classList.add("ocultar");
    document.getElementById("mostrar_productos").classList.add("ocultar");
    document.getElementById("crear_carrito").classList.add("ocultar");
    document.getElementById("añadir_producto").classList.remove("ocultar");
    document.getElementById("editar_producto").classList.add("ocultar");
};

//Función que muestra solo el div con el identificador editar_producto.
export const navEditarProducto = () => {

    document.getElementById("mostrar_carrito").classList.add("ocultar");
    document.getElementById("mostrar_productos").classList.add("ocultar");
    document.getElementById("crear_carrito").classList.add("ocultar");
    document.getElementById("añadir_producto").classList.add("ocultar");
    document.getElementById("editar_producto").classList.remove("ocultar");
};





