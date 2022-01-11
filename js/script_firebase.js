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


    export const obtenerProductos = async () => {
        let productos = await getDocs(coleccion);
        document.getElementById("datos").innerHTML ="";

        productos.docs.map((documento) => {
            document.getElementById("datos").innerHTML += plantillas.printear(documento);

        });
    };


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



