
alert('Hola! Bienvenido a Blog de Viaje. Este es el cotizador de paquetes turísticos para verano del 2024. Recordá que los niños viajan Gratis!');

let nombre = prompt ("Como te llamas?");

// creo variables
let paquete = '';
let precio = 0;
let subtotal = 0;
let askAgain = true;

// inicio un ciclo do while
do {
    paquete = prompt('Hola '+nombre+' ¿Que paquete promocional preferís? A) Europa. B) Punta Cana. C) Disney Florida. D) Buzios.').toUpperCase();
    cantidad = Number(prompt('¿Cuantos pasajeros adultos, mayores de 12 años, viajan?'));

    switch (paquete) {
      case 'A':
        precio = 1800;
        askAgain = false;
        break;
      case 'B':
        precio = 1200;
        askAgain = false;
        break;
      case 'C':
        precio = 1500;
        askAgain = false;
        break;
      case 'D':
        precio = 1000;
        askAgain = false;
        break;
      default:
        alert('Alguno de los datos ingresados no es correcto. Debes escribir A, B, C o D según la opción que prefieras.');
    }

} while (askAgain);

subtotal = precio * cantidad;
    
alert('El costo de tu paquete es: U$S '+subtotal+ ' + IMP');

    
// Aplico el IVA

let subtotalConIva = subtotal * 1.21
            
alert('Sumando los impuestos te quedaría: U$S '+subtotalConIva);

// Creo una función con condicionales if else para aplicar un cupón

const aplicarDescuento = (subtotalConIva) => {
    let cupon = prompt("Hoy es tu día de suerte!! Ingresá el código cincoOff y obtené un descuento del 5% en el total");
    const descuento = 0.05; 

    if (cupon === "cincoOff") { 
        return subtotalConIva * (1 - descuento);
    } else {
        return subtotalConIva;
    }
};

// invoco la función recientemente creada

const precioFinal = aplicarDescuento(subtotalConIva);


//Creo una funcion para mostrar el precio final

const mostrarDetalle = (precioFinal) => {
    alert('El precio total de su paquete es: US$ ' +precioFinal);
};

// invoco la función recientemente creada

mostrarDetalle(precioFinal);






