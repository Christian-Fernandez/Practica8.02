"use strict";
import * as plantillas from "./plantillasFirebase.js";
import { app } from "./datos_firebase.js";
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    onSnapshot,
    doc,
    query,
    where,
    orderBy,
    limit,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

//*** Enlace a las bibliotecas Firebase -> https://firebase.google.com/docs/web/learn-more?authuser=0#libraries-cdn

    const db = getFirestore(app);
    const coleccion = collection(db,"Productos");

    //Función que obtiene los productos solicitados de la base de datos.
    export const obtenerProductos = async () => {
        let productos = await getDocs(coleccion);
        document.getElementById("datos").innerHTML ="";

        productos.docs.map((documento) => {
            document.getElementById("datos").innerHTML += plantillas.printear(documento);

        });
    };

//Función que hace ua query a la base de datos para que devuelva los productos ordenados.
export const ordenarProductos = async (campo) => {
    const consulta = query(
        coleccion,
        orderBy(campo, "desc"),
    );

    document.getElementById("datos").innerHTML ="";
    const productosOrdenados = await getDocs(consulta);
    productosOrdenados.docs.map((documento) => {
        document.getElementById("datos").innerHTML += plantillas.printear(documento);

    });
};

//Función que se encarga de filtrar los productos mediante una query.
export const filtrarProductos = async (campo,valor) => {
    const consulta = query(
        coleccion,
        where(campo, ">=", valor),
    );

    document.getElementById("datos").innerHTML ="";
    const productosOrdenados = await getDocs(consulta);
    productosOrdenados.docs.map((documento) => {
        document.getElementById("datos").innerHTML += plantillas.printear(documento);

    });
};



