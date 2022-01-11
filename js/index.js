"use strict"

import * as script from "./script_firebase.js";
import * as plantillas from "./plantillasFirebase.js";

window.onload = ()=> {

    var buscador = document.getElementById("buscador");
    var filtrar = document.getElementById("selección");
    var ordenar = document.getElementById("selección2");



    document.getElementById("mostrar").addEventListener(
        "click",
        (e) => {
            script.obtenerProductos();
        },
        false
    );

    document.getElementById("buscador").addEventListener(
        "keyup",
        (e) => {
            script.filtrarProductos(filtrar.value,buscador.value);
        },
        false
    );

    filtrar.addEventListener(
        "change",
        (e) => {
            script.filtrarProductos(filtrar.value,buscador.value);
        },
        false
    );

    document.getElementById("ordenar").addEventListener(
        "click",
        (e) => {
            script.ordenarProductos(ordenar.value);
        },
        false
    );


}