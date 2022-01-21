"use strict"

import * as script from "./script_firebase.js";
import * as plantillas from "./plantillasFirebase.js";
import  * as auth from "./firebase_auth.js";
import {comprobarAuthMostrarCarrito} from "./firebase_auth.js";

window.onload = ()=> {

    //Variables globales del DOM.
    var buscador = document.getElementById("buscador");
    var filtrar = document.getElementById("selección");
    var ordenar = document.getElementById("selección2");
    var productos = document.getElementById("productos");
    var carrito = document.getElementById("carrito");
    var crear_carrito = document.getElementById("mostrar_crear_carrito");
    var añadir_producto = document.getElementById("añadirProducto");

    auth.comprobarAuth();
    script.obtenerAñadirProductos();


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

    //AddEventListener que al hacer clic sobre el identificador ordenar ejecutara la función ordenarProductos.
    productos.addEventListener(
        "click",
        (e) => {
            plantillas.navProducto();
        },
        false
    );

    //AddEventListener que al hacer clic sobre el identificador ordenar ejecutara la función ordenarProductos.
    carrito.addEventListener(
        "click",
        (e) => {
            plantillas.navVerCarrito();
        },
        false
    );


    //AddEventListener que al hacer clic sobre el identificador ordenar ejecutara la función ordenarProductos.
    crear_carrito.addEventListener(
        "click",
        (e) => {
            plantillas.navCrearCarrito();
        },
        false
    );


    //AddEventListener que al hacer clic sobre el identificador añadirProducto ejecutara la función navAñadirProducto.
    añadir_producto.addEventListener(
        "click",
        (e) => {
            plantillas.navAñadirProducto();
        },
        false
    );

    //AddEventListener que al hacer clic sobre el identificador modificar_productos ejecutara la función navEditarProducto.
    document.getElementById("modificar_productos").addEventListener(
        "click",
        (e) => {
            plantillas.navEditarProducto();
        },
        false
    );

    //AddEventListener que al hacer clic sobre el identificador crear ejecutara las funciónes script.guardarCarrito(nuevoCarrito) ,script.obtenerAñadirProductos(),script.obtenerAñadirCarritos();.
    document.getElementById("crear").addEventListener(
        "click",
        (e) => {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();


            var dia= dd + '/' + mm  + '/' + yyyy;

            auth.comprobarAuthCarrito(document.getElementById("nombre").value,{},dia);
            script.obtenerAñadirProductos();
            auth.comprobarAuth();
        },
        false
    );

    //AddEventListener que al hacer clic sobre el identificador btnAñadir ejecutara la función actualizarProductosCarrito y obtenerCarrito .
    document.getElementById("btnAñadir").addEventListener(
        "click",
        (e) => {
           script.actualizarProductosCarrito(document.getElementById("select_carrito").value,document.getElementById("select_producto").value)
            script.obtenerCarrito(document.getElementById("select_carrito").value);
        },
        false
    );

    //AddEventListener que al hacer cambio sobre el identificador select_carrito ejecutara la función obtenerCarrito.
    document.getElementById("select_carrito").addEventListener(
        "change",
        (e) => {
            script.obtenerCarrito(document.getElementById("select_carrito").value);
        },
        false
    );

    //AddEventListener que al hacer clic sobre el identificador mostrarCarrito ejecutara la función obtenerCarritos.
    document.getElementById("mostrarCarrito").addEventListener(
        "click",
        (e) => {
            auth.comprobarAuthMostrarCarrito();
        },
        false
    );


    //AddEventListener que al hacer un cambio sobre el identificador select_producto2 ejecutara la función editarObtenerProducto.
    document.getElementById("select_producto2").addEventListener(
        "change",
        (e) => {
            script.editarObtenerProducto(e.target.value);
        },
        false
    );

    //AddEventListener que al hacer clic sobre el identificador select_producto2 ejecutara la función editarProducto.
    document.getElementById("btnModificar").addEventListener(
        "click",
        (e) => {
            script.editarProducto(document.getElementById("select_producto2").value,document.getElementById("imagen_modificar").value,document.getElementById("nombre_modificar").value,document.getElementById("descripcion_modificar").value,document.getElementById("peso_modificar").value,document.getElementById("precio_modificar").value);
        },
        false
    );

    //AddEventListener que al hacer clic sobre el identificador boton_register ejecutara la función createAccount.
    document.getElementById("boton_register").addEventListener(
        "click",
        (e) => {
            auth.createAccount(document.getElementById("usuario_register").value,document.getElementById("clave_register").value,document.getElementById("nombre_completo").value);
        },
        false
    );

    //AddEventListener que al hacer clic sobre el identificador ir_register ejecutara la función navRegister.
    document.getElementById("ir_register").addEventListener(
        "click",
        (e) => {
            plantillas.navRegister();
        },
        false
    );
    //AddEventListener que al hacer clic sobre el identificador ir_register ejecutara la función navRegister.
    document.getElementById("logOut").addEventListener(
        "click",
        (e) => {
            auth.log_out();
        },
        false
    );

    //AddEventListener que al hacer clic sobre el identificador boton_login ejecutara la función signAccount.
    document.getElementById("boton_login").addEventListener(
        "click",
        (e) => {
            auth.signAccount(document.getElementById("usuario").value,document.getElementById("clave").value);
        },
        false
    );





}