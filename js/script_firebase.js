"use strict";
import * as plantillas from "./plantillasFirebase.js";
import { app } from "./datos_firebase.js";
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    addDoc,
    onSnapshot,
    updateDoc,
    arrayUnion,
    doc,
    query,
    where,
    orderBy,
    limit,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

//*** Enlace a las bibliotecas Firebase -> https://firebase.google.com/docs/web/learn-more?authuser=0#libraries-cdn

    const db = getFirestore(app);
    const coleccion = collection(db,"Productos");
    const coleccion_carrito = collection(db,"carrito");

    //Función que obtiene los productos solicitados de la base de datos.
    export const obtenerProductos = async () => {
        let productos = await getDocs(coleccion);
        document.getElementById("datos").innerHTML ="";

        productos.docs.map((documento) => {
            document.getElementById("datos").innerHTML += plantillas.printear(documento);

        });
    };

    //Función que obtiene los productos solicitados de la base de datos.
    export const obtenerAñadirProductos = async () => {
        let productos = await getDocs(coleccion);
        document.getElementById("select_producto").innerHTML ="";

        productos.docs.map((documento) => {
            document.getElementById("select_producto").innerHTML += plantillas.printear_añadirProductos(documento);

        });
    };



//Función que obtiene un producto solicitados de la base de datos.
export const obtenerProducto = async (id) => {
    let productos = await doc(coleccion,id);

    const pruebaDoc = await getDoc(productos);
    return pruebaDoc;

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


//Función que obtiene los productos solicitados de la base de datos.
export const obtenerCarritos = async () => {
    let productos = await getDocs(coleccion_carrito);
    document.getElementById("datos").innerHTML ="";

    productos.docs.map((documento) => {
        document.getElementById("datos_carrito").innerHTML += plantillas.printear_carrito(documento);

    });
};

export const obtenerAñadirCarritos = async () => {
    let productos = await getDocs(coleccion_carrito);
    document.getElementById("select_carrito").innerHTML ="";

    productos.docs.map((documento) => {
        document.getElementById("select_carrito").innerHTML += plantillas.printear_añadirCarritos(documento);
    });
};


export const crearCarrito = (nombre,propietario,array,fecha) => {
    let nuevoFeo = {
        nombre: nombre,
        productos: array,
        propietario: propietario,
        fecha: fecha,
    };

    return nuevoFeo;
};

export const guardarCarrito = async (feo) => {
    const guardado = await addDoc(coleccion_carrito, feo);
};

export const actualizarProductosCarrito = async (id,dato) => {
    const pruebaRef = await doc(coleccion_carrito, id);
    await updateDoc(pruebaRef, {
        productos: arrayUnion(dato),
    });
};



