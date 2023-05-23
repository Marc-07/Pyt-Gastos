// Variables 

const formulario = document.querySelector('#agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')





//Eventos

EventListeners();
function EventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}



//Clases



//Funciones
function preguntarPresupuesto(){
    const presupuestoUsuario = prompt ('¿Cúal es tu presupuesto?');

    console.log(presupuestoUsuario);
}