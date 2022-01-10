//Clase Agenda
export class Agenda{

    //Constructor de la clase Agenda.
    constructor() {
        //Si el localStorage usuarios existe o no esta vació recoge los datos del localStorage.
        if(localStorage.getItem("usuarios") !== null){
            this.datos=JSON.parse(localStorage.getItem("usuarios"));
            //Sino empieza con un array vacío.
        }else {
            this.datos = [];
        }
    }

    //Función que pregunta si desea borrar el contacto.
    borrarContacto(e){
        if (confirm("¿Desea borrar este contacto?")) {
            return true;
        }
    }

    //Función que añade al array de la agenda un nuevo contacto.
    anadirContacto(nombreP,apellidosP,direccionP,telefonoP){
        let contacto= {
            nombre: nombreP.value,
            apellidos:apellidosP.value,
            direccion: direccion.value,
            telefono: telefonoP.value

        };
        return contacto;
    }

    //Función que obtiene el array de la agenda.
    getDatos(){
        return this.datos;
    }

    //Función que devuelve el array con los contactos buscados por nombre o apellido.
    buscarContacto(tipo){

        let dato;

        switch (tipo) {
            case "0": dato=document.getElementById("nombre").value
                return this.datos.filter(
                    (contacto) =>
                        contacto.nombre.toLowerCase().indexOf(dato.toLowerCase()) >= 0

                );;
            case "1":dato=document.getElementById("apellido").value
                return this.datos.filter(
                    (contacto) =>
                        contacto.apellidos.toLowerCase().indexOf(dato.toLowerCase()) >= 0

                );

            case "2": dato=document.getElementById("telefono").value
                return this.datos.filter(
                    (contacto) =>
                        contacto.telefono.toLowerCase().indexOf(dato.toLowerCase()) >= 0

                );

        }

    }

    //Función que ordena la agenda por orden alfabético de nombre o apellido , que se le pasa por parametro.
    ordenarAgenda(tipo){

        switch (tipo) {
            case "0":
            return this.datos.sort((x, y) =>{
                if( x.nombre > y.nombre){
                    return 1;
                }else{
                    return -1;
                }});
            case "1":   return this.datos.sort((x, y) =>{
                if( x.apellidos > y.apellidos){
                    return 1;
                }else{
                    return -1;
                }});
        }
    }

    //Función que comprueba que los datos que añadiremos a la agenda no están vacíos.
    comprobarDatos(){
        if(document.getElementById("nombre").value.trim().length<=0||document.getElementById("apellido").value.trim().length<=0||document.getElementById("direccion").value.trim().length<=0||document.getElementById("telefono").value.trim().length<=0){
            return false;
        }else{
            return true;
        }
    }


}