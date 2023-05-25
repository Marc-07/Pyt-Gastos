// Variables 

const formulario = document.querySelector('#agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')





//Eventos

eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto)
}



//Clases

class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto]
        console.log(this.gastos);
    }

}

//Esta es la clase de la interfaz

class UI{
    insertarPresupuesto(cantidad){

        //Extrayendo los valores
        const {presupuesto, restante} = cantidad;
        
        //Agregar al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante 
    }

    imprimirAlerta(mensaje, tipo){
        //Crear div

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if (tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }
        
        //Mensaje de Error
        divMensaje.textContent = mensaje;

        //Insertar en el HTML
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        //Quitar el HTML
        setTimeout(() => {
            divMensaje.remove();
        },3000)
    }

    agregarGastoListado(gastos){

        this.limpiarHTML(); //Elimina el HTML previo

       // Iterar sobre los gastos
       gastos.forEach(gasto =>{
        const {cantidad, nombre, id} = gasto;

        //Crear un LI

        const nuevoGasto = document.createElement('li');
        nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
        //nuevoGasto.setAttribute('data-id', id); // (Es la forma vieja)
        nuevoGasto.dataset.id = id;
        console.log(nuevoGasto);

        //Agregar el HTML del gasto 
        nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> ${cantidad}</span>
        `;

        //Botón para borrar el gasto
        const  btnBorrar = document.createElement('button');
        btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
        btnBorrar.innerHTML = 'borrar &times;'

        nuevoGasto.appendChild(btnBorrar);

        //Agregar al HTML
        gastoListado.appendChild(nuevoGasto)

       });
    }

    limpiarHTML(){
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild);
        }
    };
}


//Instanciar
const ui = new UI();
let presupuesto;

//Funciones
function preguntarPresupuesto(){
    const presupuestoUsuario = prompt ('¿Cúal es tu presupuesto?');

    //console.log (Number(presupuestoUsuario));

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario || presupuestoUsuario <= 0)){
        window.location.reload();
    }

    presupuesto = new Presupuesto (presupuestoUsuario);
    console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto);
}

//Añade Gastos

function agregarGasto (e){
    e.preventDefault();

    //Leer los datos del formulario

    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number (document.querySelector('#cantidad').value);

    //Validar

    if (nombre === '' || cantidad === ''){
        ui.imprimirAlerta('Ambos campos son obligatorio', 'error');

        return;
    }else if (cantidad <= 0 || isNaN(cantidad) ){
        ui.imprimirAlerta('Cantidad no valida', 'error')

        return;

    }

    //Generar Objeto con el gasto

    const gasto = {nombre, cantidad, id: Date.now()} //Se tiene un Id sin base de datos.

    //Añade un nuevo gasto

    presupuesto.nuevoGasto(gasto);
    //console.log(gasto);

    //To' bn!
    ui.imprimirAlerta('Gasto Agregado Correctamente');

    //Imprimir los gastos
    const {gastos} = presupuesto;
    ui.agregarGastoListado(gastos)

    //Reinicia el formulario
    formulario.reset();
    
}