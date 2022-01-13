"use strict"

import * as script from "./script_firebase.js";
import * as plantillas from "./plantillasFirebase.js";

window.onload = ()=> {

    //Variables globales del DOM.
    var buscador = document.getElementById("buscador");
    var filtrar = document.getElementById("selección");
    var ordenar = document.getElementById("selección2");


    //AddEventListener que al hacer clic sobre el identificador mostrar ejecutara la función obtenerProductos.
    document.getElementById("mostrar").addEventListener(
        "click",
        (e) => {
            script.obtenerProductos();
        },
        false
    );

    //AddEventListener que al soltar una tecla sobre el identificador buscador ejecutara la función filtrarProductos.
    buscador.addEventListener(
        "keyup",
        (e) => {
            if(filtrar.value=="nombre"){
                script.filtrarProductos(filtrar.value,buscador.value);
            }else{
                script.filtrarProductos(filtrar.value,parseInt(buscador.value));
            }
        },
        false
    );

    //AddEventListener que al cambiar el filtrado sobre el identificador filtrar ejecutara la función filtrarProductos.
    filtrar.addEventListener(
        "change",
        (e) => {
            if(filtrar.value=="nombre"){
                script.filtrarProductos(filtrar.value,buscador.value);
            }else{
                script.filtrarProductos(filtrar.value,parseInt(buscador.value));
            }

        },
        false
    );

    //AddEventListener que al hacer clic sobre el identificador ordenar ejecutara la función ordenarProductos.
    ordenar.addEventListener(
        "click",
        (e) => {
            script.ordenarProductos(ordenar.value);
        },
        false
    );


}