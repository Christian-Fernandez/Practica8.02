"use strict";
import * as plantillas from "./plantillasFirebase.js";
import { app } from "./datosFirebase.js";
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
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

//*** Enlace a las bibliotecas Firebase -> https://firebase.google.com/docs/web/learn-more?authuser=0#libraries-cdn

window.onload = () => {

    const db = getFirestore(app);
    const coleccion = collection(db, "Productos");

    /*** Leer datos.
     *  doc         -> Obtiene la referencia a un documento. Parámetros -> referencia a una colección y un id.
     *  getDoc      -> Obtiene los datos de un documento. Parámetro -> referencia a un documento.
     *  getDocs     -> Obtiene todos los documentos de una colección. Parámetro -> referencia a una colección.
     *  onSnapShot  -> Obtiene enlace en tiempo real a la base de datos.
     *  data()      -> Método para acceder a la información del documento.
     *  id          -> identificacdor del documento (está fuera del método data()).
     */

        //*** Uso del doc *****************/
    const obtenerProducto = async (id) => {
            // Referencia al documento (sólo el id).
            const pruebaRef = await doc(coleccion, id);
            // Se obtiene el documento de la colección.
            const pruebaDoc = await getDoc(pruebaRef);
            console.log(`Impreso desde pruebaRef: ${pruebaRef.id}`);
            console.log(
                `Impreso desde pruebaDoc: ${pruebaDoc.id} ${pruebaDoc.data().nombre}`
            );
        };


    const obtenerProductos = async () => {
        const feosDocumentos = await getDocs(feosColeccion);
        feosDocumentos.docs.map((documento) => {
            datos.innerHTML += plantillas.pintarFeo(documento);
            console.log(
                `${documento.data().nombre} ${
                    documento.data().apellidos
                } tiene como aficiones ${documento.data().aficiones}`
            );
        });
    };

    const obtenerFeosSnap = async () => {
        const feosDocumentos = await onSnapshot(feosColeccion, (col) => {
            datos.innerHTML = "";
            col.docs.map((documento) => {
                datos.innerHTML += plantillas.pintarFeo(documento);
                console.log(
                    `${documento.data().nombre} ${
                        documento.data().apellidos
                    } tiene como aficiones ${documento.data().aficiones}`
                );
            });
        });
    };


    const filtrarLista = async (campo, valor,orden) => {
        const consulta = await query(
            feosColeccion,
            where(campo, "==", valor),
            orderBy(campo, orden)
        );

       return consulta;
    };

};