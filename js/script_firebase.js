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
    increment,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
import {printear_tabla} from "./plantillasFirebase.js";

//*** Enlace a las bibliotecas Firebase -> https://firebase.google.com/docs/web/learn-more?authuser=0#libraries-cdn

    const db = getFirestore(app);
    const coleccion = collection(db,"Productos");
    const coleccion_carrito = collection(db,"carrito");
const coleccion_usuarios = collection(db,"Usuarios");

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
            document.getElementById("select_producto2").innerHTML += plantillas.printear_añadirProductos(documento);

        });

    };



//Función que obtiene un producto solicitados de la base de datos.
export const obtenerProducto = async (id,texto,i,tabla,lenght,peso,precio) => {
    let productos = await doc(coleccion,id);
    const datos = await getDoc(productos);

    if(i==0){

        tabla.innerHTML = texto;
    }

    tabla.innerHTML += plantillas.printear_tabla(datos);

    if(i==lenght-1){
        if(peso<7){
            var transporte=`Pesa un total de ${peso} kilos yo de ti iria andando así haces ejercicio.`;
        }else{
            var transporte=`Pesa un total de ${peso} kilos yo de ti iria en coche no vaya ser que te partas la espalda.`;
        }
        tabla.innerHTML += `<tr><th colspan="2">Peso Total:</th><th colspan="3">Precio Total:</th></tr><tr><td colspan="2">${transporte}</td><td colspan="3">${precio}</td></tr>`;
    }

};

//Función que hace una query a la base de datos para que devuelva los productos ordenados.
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
export const obtenerCarritos = async (propietario) => {
    document.getElementById("datos_carrito").innerHTML ="";

    const consulta = await query(
        coleccion_carrito,
        where("propietario", "==", propietario),
    );

    const carritos = await getDocs(consulta);
    carritos.docs.map((documento) => {
        let tables = document.createElement("table");
        tables.innerHTML="";
        tables.innerHTML += plantillas.printear_carrito(documento,tables);
        document.getElementById("datos_carrito").appendChild(tables);
    });

};

//Función que obtiene los carritos y los añade al select.
export const obtenerAñadirCarritos = async () => {
    let productos = await getDocs(coleccion_carrito);
    document.getElementById("select_carrito").innerHTML ="";

    productos.docs.map((documento) => {
        document.getElementById("select_carrito").innerHTML += plantillas.printear_añadirCarritos(documento);
    });
};

//Función que obtiene un carrito con el id que se le pasa por parametro y lo añade a una tabla.
export const obtenerCarrito = async (id) => {
    let carrito = await doc(coleccion_carrito,id);
    const datos = await getDoc(carrito);
    document.getElementById("datos_carrito2").innerHTML ="";

        let tables = document.createElement("table");
        tables.innerHTML="";
        tables.innerHTML += plantillas.printear_carrito(datos,tables);
        document.getElementById("datos_carrito2").appendChild(tables);

};

//Función que crea un nuevo carrito.
export const crearCarrito = (nombre,propietario,array,fecha) => {
    let nuevoCarrito = {
        nombre: nombre,
        productos: array,
        propietario: propietario,
        fecha: fecha,
        peso: 0,
        precio:0,
    };

    return nuevoCarrito;
};

//Función que guarda en la colección de carritos , el objeto que se le pasa por parametro.
export const guardarCarrito = async (objeto) => {
    const guardado = await addDoc(coleccion_carrito, objeto);
};

//Función que añade un producto a un carrito.
export const actualizarProductosCarrito = async (id,dato) => {

    const pruebaRef = await doc(coleccion_carrito, id);
    const carrito = await getDoc(pruebaRef);
    let productos = await doc(coleccion,dato);
    const datos = await getDoc(productos);
    const array = carrito.data().productos;
    if(!Array.isArray(array)){
        await updateDoc(pruebaRef, {
            productos: arrayUnion(dato),
            peso: increment(datos.data().peso),
            precio: increment(datos.data().precio),
        });

    }else {
        if (!array.includes(dato)) {
            await updateDoc(pruebaRef, {
                productos: arrayUnion(dato),
                peso: increment(datos.data().peso),
                precio: increment(datos.data().precio),

            });
        }
    }
    obtenerCarrito(document.getElementById("select_carrito").value);
};

//Función que hace una query a la base de datos para que devuelva los carritos ordenados.
export const ordenarCarritos = async (propietario,campo) => {
    const consulta = await query(
        coleccion_carrito,
        where("propietario", "==", propietario)

    );


    document.getElementById("datos").innerHTML ="";
    const carritosOrdenados = await getDocs(consulta);
    document.getElementById("datos_carrito").innerHTML ="";

    carritosOrdenados.docs.map((documento) => {
        let tables = document.createElement("table");
        tables.innerHTML="";
        tables.innerHTML += plantillas.printear_carrito(documento,tables);
        document.getElementById("datos_carrito").appendChild(tables);

    });
};

//Función que muestra en los inputs la información de dicho producto.
export const editarObtenerProducto = async (id) => {
    let productos = await doc(coleccion,id);
    const datos = await getDoc(productos);

    document.getElementById("imagen_modificar").value=datos.data().imagen;
    document.getElementById("nombre_modificar").value=datos.data().nombre;
    document.getElementById("descripcion_modificar").value=datos.data().descripcion;
    document.getElementById("peso_modificar").value=datos.data().peso;
    document.getElementById("precio_modificar").value=datos.data().precio;

};

//Función que permite editar un producto con los parametros que se le pasa.
export const editarProducto = async (id,imagen,nombre,descripcion,peso,precio) => {
    const pruebaRef = await doc(coleccion, id);
    await updateDoc(pruebaRef, {
        imagen: imagen,
        nombre: nombre,
        descripcion: descripcion,
        peso: parseFloat(peso),
        precio: parseFloat(precio),
    });
};

//Función que crea un nuevo usuario.
export const crearUsuario = (nombre,id,rol,fecha) => {
    let nuevoUsuario = {
        nombre: nombre,
        fecha: fecha,
        id: id,
        rol: rol,
    };

    return nuevoUsuario;
};

//Función que guarda en la colección de usuarios , el objeto que se le pasa por parametro.
export const guardarUsuario = async (objeto) => {
    const guardado = await addDoc(coleccion_usuarios, objeto);
};

//Función que hace una query en la colección de usuarios , con el id pasado por parametro.
export const queryRol = async (id) => {
    const consulta = await query(
        coleccion_usuarios,
        where("id", "==", id),
    );

    const rol = await getDocs(consulta);
    rol.docs.map((documento) => {

        if(documento.data().rol == "editor"){
            plantillas.navProducto();
            plantillas.navEditor();
        }else{
            plantillas.navProducto();
            plantillas.navUsuario();
        }

    });
};







