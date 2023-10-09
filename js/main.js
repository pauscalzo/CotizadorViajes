// creo variables 

let subtotal = 0;
let impuestos = 0;
let selectDestinos = document.getElementById("destinos");
let selectPaquetes = document.getElementById("paquetes");
let cotizaciones = [];

// Declaro función mostrarOpcion para que se pinten en el DOM las opciones de destinos o paquetes con js.

function mostrarOpcion (array, posicion) {
    let item ="<option selected disabled>--Seleccione--</option>"
    for (let i = 0; i < array.length; i++){
        item += `<option value="${array[i]}">${array[i]}</option>`
    } 
    return posicion.innerHTML = item;
};

// Ejecuto la función mostrarOpcion para destinos

mostrarOpcion (destinos, selectDestinos);

// Ejecuto la función mostrarOpcion para paquetes. Creo un switch para desplegar los paquetes que corresponden a cada destino.

const recortar = (array, inicio, fin, posicion) => {
    let recortarArray = array.slice(inicio, fin);
    mostrarOpcion (recortarArray, posicion);
};

selectDestinos.addEventListener ('change', function(){
    let valor = selectDestinos.value;
        switch (valor) {
            case "Europa":
                recortar(paquetes, 0, 3, selectPaquetes);
                break;
            case "Caribe":
                recortar(paquetes, 3, 6, selectPaquetes);
                break;
            case "NorteAmerica":
                recortar(paquetes, 6, 9, selectPaquetes);
                break;
            case "Brasil":
                recortar(paquetes, 9, 12, selectPaquetes);
                break;
            }
});

// Al escuchar el click sobre el boton cotizar se ejecuta la funcion tomarValores.

const cotizar = document.getElementById("cotizar");

cotizar.addEventListener("click", tomarValores);
 
// Declaro la funcion tomarValores. 

const respuesta = document.getElementById("respuesta");

function tomarValores () {

    selectPaquetes = document.getElementById("paquetes").value; // tomo el valor que se selecciono en el select de paquetes.
    const paqueteElegido = precioPaquetes.find (paquete => paquete.nombre == selectPaquetes); // busco el paquete dentro del array precioPaquetes que coincide con el nombre seleccionado por el usuario. Lo encierro en una variable denominada paqueteElegido.
    paqueteElegido.cantidadAdultos = Number(document.getElementById("adultos").value); // edito en el array paqueteElegido la cantidad de adultos y niños.
    paqueteElegido.cantidadNinos = Number(document.getElementById("ninos").value);

    subtotal = (paqueteElegido.precio * paqueteElegido.cantidadAdultos) + (paqueteElegido.precio * paqueteElegido.cantidadNinos/2); // calculo el precio y los impuestos.
    impuestos = subtotal * 0.21;

    const respuestaContenedor = document.getElementById("respuestaContenedor");

    cotizaciones.push(paqueteElegido); // envío el paqueteElegido editado al array vacio cotizaciones.
    actualizarCotizaciones (cotizaciones); // actualizo el contador del carrito.
    agregarCotizacion (cotizaciones); // actualizo el modal del carrito.
    respuesta.classList.add('respuestaActive'); // muestro el contenedor deonde estará la respuesta.
    
    
    return respuestaContenedor.innerHTML = `
        <h5>El presupuesto de tu paquete para ${paqueteElegido.cantidadAdultos} adultos y ${paqueteElegido.cantidadNinos} niños con destino a ${selectPaquetes} es de USD ${subtotal}<span class="letraChica"> + USD ${impuestos} de impuestos.</span> Gracias por cotizar con nosotros.</h5>
    ` // retorna la respuesta para el usuario.
};


// Declaro las funciones para actualizar el contador del carrito.

const actualizarCotizaciones = (cotizaciones) => {
    const totalCantidad = cotizaciones.reduce((acc, item) => acc + item.cantidad, 0);
    pintarCotizaciones (totalCantidad);  
};

const pintarCotizaciones = (totalCantidad) => {
    const contadorCarrito = document.getElementById('contador');
    contadorCarrito.innerText = totalCantidad;
};

// Declaro la función para actualizar el modal del carrito.

const contenedor = document.getElementById('cotizacionesContenedor');

const agregarCotizacion = (cotizaciones) => {
    contenedor.innerHTML = '';

    cotizaciones.forEach(paqueteElegido => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>- Paquete: ${paqueteElegido.nombre}. Precio: USD ${(paqueteElegido.precio * paqueteElegido.cantidadAdultos) + (paqueteElegido.precio * paqueteElegido.cantidadNinos/2)} + imp. n° Adultos: ${paqueteElegido.cantidadAdultos} n° Niños: ${paqueteElegido.cantidadNinos}  <button class="botonEliminar" value="${paqueteElegido.id}"> X </button></p>
            
        `
        contenedor.appendChild(div);
    });
    guardarCotizacionesStorage(cotizaciones);
};

// Declaro la función para cerrar la respuesta al usuario cuando se escuche el click sobre la cruz.

const cerrarRespuesta = document.getElementById('btn-cerrar-respuesta');

cerrarRespuesta.addEventListener('click', () => {
    respuesta.classList.remove('respuestaActive')
});

// Declaro funciones para que se pueda eliminar una cotización del modal del carrito al clickear la cruz.

contenedor.addEventListener('click', (e) => {
    e.target.classList.contains('botonEliminar') && eliminarCotizacionRealizada(e.target.value);   
});

const eliminarCotizacionRealizada = (cotizacionId) => {
    const cotizacionEliminar = cotizaciones.findIndex(paqueteElegido => paqueteElegido.id == cotizacionId);
    cotizaciones.splice(cotizacionEliminar, 1);
    agregarCotizacion(cotizaciones);
    actualizarCotizaciones (cotizaciones);
};

// Declaro las funciones para guardar y luego recuperar las cotizaciones realizadas en localStorage.

const guardarCotizacionesStorage = (cotizaciones) => {
    localStorage.setItem('cotizacionesGuardadas', JSON.stringify(cotizaciones));
};

const obtenerCotizacionesStorage = () => {
    return JSON.parse(localStorage.getItem('cotizacionesGuardadas'));
};

const cargarCarrito = () => {
    if (localStorage.getItem('cotizacionesGuardadas')) {
        cotizaciones = obtenerCotizacionesStorage();
        agregarCotizacion(cotizaciones);
        actualizarCotizaciones (cotizaciones);
    }
};

cargarCarrito();




