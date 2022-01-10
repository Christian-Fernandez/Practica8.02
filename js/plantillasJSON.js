"use strict";

//Función que imprime por pantalla los contactos.
export const pintarUserJSON = (json) => {
  let texto = "";
  json.map((v, i, a) => {
    texto += `<div class="celda"><p><b>Nombre: </b>${v.nombre}</p><p><b>Apellidos: </b>${v.apellidos}</p><p><b>Dirección: </b>${v.direccion}</p><p><b>Teléfono: </b>${v.telefono}</p><input type="button" class="borrar" value="Borrar" /></div>`;
  });
  return texto;
};

//Función que limpia un formulario.
export const limpiar = (formulario) => {
  formulario.reset();
};
