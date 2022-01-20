"use strict";
import { app } from "./datos_firebase.js";
import * as script from "./script_firebase.js";
import * as plantillas from "./plantillasFirebase.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  setPersistence,
  signOut,
  browserLocalPersistence,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";

const auth = getAuth(app);
const divError = document.getElementById("divError");


export const persistAccount = () => {
  setPersistence(auth, browserLocalPersistence);
};

export const createAccount = async (email, pass) => {
  try {
    const create = await createUserWithEmailAndPassword(auth, email, pass);
    const correo = create.user.email;
    const id = create.user.uid;
    let datos=correo.split("@");
    const usuario = datos[0];
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var dia= dd + '/' + mm  + '/' + yyyy;


    const objetoUsuario=script.crearUsuario(usuario,id,document.getElementById("rol").value,dia);
    script.guardarUsuario(objetoUsuario);
    hideLoginError();
    persistAccount();
    if(create.document.getElementById("rol").value=="editor"){
      plantillas.navEditor();
      plantillas.navProducto();
    }else{
      plantillas.navUsuario();
      plantillas.navProducto();
    }
  } catch (error) {
    showRegisterError(error);
  }
};



export const hideLoginError = () => {
  divError.style.display = "none";
  messageError.innerHTML = "";
};

export const showRegisterError = (error) => {
  divError.style.display = "block";
  const messageError = document.getElementById("messageError_register");

  switch (error.code) {
    case "auth/invalid-email":
      messageError.innerHTML = "Por favor introduzca un correo valido";
      break;
    case "auth/wrong-password":
      messageError.innerHTML = "La contraseña es incorrecta";
      break;
    case "auth/invalid-password":
      messageError.innerHTML = "Contraseña incorrecta";
      break;
    case "auth/user-not-found":
      messageError.innerHTML = "El usuario no existe";
      break;
    case "auth/user-disabled":
      messageError.innerHTML = "El usuario está deshabilitado";
      break;
    case "auth/email-already-in-use":
      messageError.innerHTML = "El correo ya esta en uso";
      break;
    case "auth/weak-password":
      messageError.innerHTML =
        "La contraseña debe tener como mínimo 6 caracteres";
      break;
    case "auth/popup-blocked":
      messageError.innerHTML = "";
      break;
    case "auth/popup-closed-by-user":
      messageError.innerHTML = "";
      break;
    case "auth/cancelled-popup-request":
      messageError.innerHTML = "";
      break;
    case "auth/too-many-requests":
      messageError.innerHTML =
        "Hemos bloqueado todas las solicitudes de este dispositivo debido a una actividad inusual. Vuelve a intentarlo más tarde.";
      break;
    default:
      messageError.innerHTML =
        "Ha surgido un error inesperado, inténtelo de nuevo";
      break;
  }
};
export const showLoginError = (error) => {
  divError.style.display = "block";
  const messageError = document.getElementById("messageError");

  switch (error.code) {
    case "auth/invalid-email":
      messageError.innerHTML = "Por favor introduzca un correo valido";
      break;
    case "auth/wrong-password":
      messageError.innerHTML = "La contraseña es incorrecta";
      break;
    case "auth/invalid-password":
      messageError.innerHTML = "Contraseña incorrecta";
      break;
    case "auth/user-not-found":
      messageError.innerHTML = "El usuario no existe";
      break;
    case "auth/user-disabled":
      messageError.innerHTML = "El usuario está deshabilitado";
      break;
    case "auth/email-already-in-use":
      messageError.innerHTML = "El correo ya esta en uso";
      break;
    case "auth/weak-password":
      messageError.innerHTML =
          "La contraseña debe tener como mínimo 6 caracteres";
      break;
    case "auth/popup-blocked":
      messageError.innerHTML = "";
      break;
    case "auth/popup-closed-by-user":
      messageError.innerHTML = "";
      break;
    case "auth/cancelled-popup-request":
      messageError.innerHTML = "";
      break;
    case "auth/too-many-requests":
      messageError.innerHTML =
          "Hemos bloqueado todas las solicitudes de este dispositivo debido a una actividad inusual. Vuelve a intentarlo más tarde.";
      break;
    default:
      messageError.innerHTML =
          "Ha surgido un error inesperado, inténtelo de nuevo";
      break;
  }
};


export const signAccount = async (email, pass) => {
  try {
    await signInWithEmailAndPassword(auth, email, pass);
    hideLoginError();
    persistAccount();
    comprobarAuth();

  } catch (error) {
    showLoginError(error);
  }
};

export const comprobarAuth = () => {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      script.queryRol(user.uid);
    } else {
      plantillas.navLogin();
    }
  });
};

export const comprobarAuthCarrito = (nombre,array,fecha) => {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      const correo = user.email;
      let datos=correo.split("@");
      const nuevoCarrito = script.crearCarrito(nombre,datos[0],array,fecha);
      script.guardarCarrito(nuevoCarrito);
    } else {
      plantillas.navLogin();
    }
  });
};

export const comprobarAuthMostrarCarrito = () => {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      const correo = user.email;
      let datos=correo.split("@");
      script.obtenerCarritos(datos[0]);
    } else {
      plantillas.navLogin();
    }
  });
};

export const comprobarAuthMostrarCarritoFiltrado = (filtrado) => {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      const correo = user.email;
      let datos=correo.split("@");
      script.ordenarCarritos(datos[0],filtrado);
    } else {
      plantillas.navLogin();

    }
  });
};


export const log_out = async () => {
  try {
    await signOut(auth);
    plantillas.navLogin();
  } catch (error) {
    console.log(error);
  }
};
