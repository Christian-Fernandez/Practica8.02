"use strict";

import * as plantillas from "./plantillasJSON.js";
import {Agenda} from "./agenda.js";

window.onload = () => {
    //Comprobamos que el navegador soporta localStorage.
    if (typeof Storage !== "undefined") {
        //Creamos una nueva agenda.
        const db = new Agenda();
        //Mostramos por pantalla los contactos
        document.getElementById("datos").innerHTML =
            plantillas.pintarUserJSON(db.getDatos());

        //Al hacer clic sobre un elemento con id guardar , guardaremos a la agenda el contacto.
        document.getElementById("guardar").addEventListener(
            "click",
            () => {
                // Creo el objeto con los datos del formulario.
                if(db.comprobarDatos()){
                let contacto = db.anadirContacto(document.getElementById("nombre"),document.getElementById("apellido"),document.getElementById("direccion"),document.getElementById("telefono"));
                db.datos.push(contacto);
                // Guardo el usuario en la base de datos.
                localStorage.setItem("usuarios", JSON.stringify(db.getDatos()));
                //Lo imprimimos por pantalla.
                document.getElementById("datos").innerHTML =
                    plantillas.pintarUserJSON(db.getDatos());
                    plantillas.limpiar(document.getElementById("formulario"));
                }
            },
            false
        );

        // Borrar un objeto JSON al hacer clic en un elemento con clase borrar.
        document.addEventListener(
            "click",
            (e) => {
                if (e.target.classList.contains("borrar")) {
                    if(db.borrarContacto(e.target)){
                        db.getDatos().splice(e.id, 1);
                        localStorage.setItem("usuarios", JSON.stringify(db.getDatos()));
                        document.getElementById("datos").innerHTML =
                            plantillas.pintarUserJSON(db.getDatos());
                    }
                }
            },
            false
        );

        //Al hacer clic en un elemento con id buscar , busca los datos insertados en nombre o bien apellido.
        document.getElementById("buscar").addEventListener(
            "click",
            (e) => {
               let buscar = db.buscarContacto(document.getElementById("selección").value);
                document.getElementById("datos").innerHTML =
                    plantillas.pintarUserJSON(buscar);
            },
            false
        );

        //Al hacer clic en un elemento con id ordenar.
        document.getElementById("ordenar").addEventListener(
            "click",
            (e) => {
                //Guarda el resultado de la función ordenarAgenda.
                let ordenar = db.ordenarAgenda(document.getElementById("selección2").value);
                //Imprimimos por pantalla el resultado.
                document.getElementById("datos").innerHTML =
                    plantillas.pintarUserJSON(ordenar);
            },
            false
        );

        //Al hacer clic en un elemento con id actualizar , mostrara por pantalla todos los contactos existentes.
        document.getElementById("actualizar").addEventListener(
            "click",
            (e) => {
                document.getElementById("datos").innerHTML =
                    plantillas.pintarUserJSON(db.getDatos());
                    plantillas.limpiar(document.getElementById("formulario"));
            },
            false
        );


    } else {
        console.error("Este navegador no soporta la tecnología localStorage.");
    }
};