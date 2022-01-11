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
            if(filtrar.value=="nombre"){
                script.filtrarProductos(filtrar.value,buscador.value);
            }else{
                script.filtrarProductos(filtrar.value,parseInt(buscador.value));
            }
        },
        false
    );

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

    document.getElementById("ordenar").addEventListener(
        "click",
        (e) => {
            script.ordenarProductos(ordenar.value);
        },
        false
    );


}