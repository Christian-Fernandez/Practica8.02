// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";

//Configuración de firebase.
const firebaseConfig = {

    apiKey: "AIzaSyDVMz6AuLixxCHTDKYDBGxzUBQR8rUWN-M",

    authDomain: "lista-de-compra-56359.firebaseapp.com",

    projectId: "lista-de-compra-56359",

    storageBucket: "lista-de-compra-56359.appspot.com",

    messagingSenderId: "178336207022",

    appId: "1:178336207022:web:b15ae14c59fe22520a1d3f"

};

// Inicializamos Firebase.
const app = initializeApp(firebaseConfig);

export { app };
