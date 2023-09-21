// Saludo de Bienvenida

alert('¡Hola! Bienvenido a Blog de Viaje. Este es el cotizador de paquetes turísticos para verano del 2024');

// creo variables let

let nombre = prompt ("¿Como te llamas?");
let paqueteElegido = '';
let paqueteElegidoError = '';
let cantidadAdultos = 0;
let cantidadNinos = 0;
let precio = 0;
let subtotal = 0;
let subtotal2 = 0;
let askAgain = true;

// creo un array de objetos con los detalles de los paquetes turísticos. Lo guardo en la variable paquetes.

const paquetes = [
  {nombre: "ITALIA", precio: 1700, categoria: "A"},
  {nombre: "FRANCIA", precio: 1800, categoria: "A"},
  {nombre: "INGLATERRA", precio: 1900, categoria: "A"},
  {nombre: "PUNTACANA", precio: 1200, categoria: "B"},
  {nombre: "MEXICO", precio: 1300, categoria: "B"},
  {nombre: "PANAMA", precio: 1300, categoria: "B"},
  {nombre: "ORLANDO", precio: 1500, categoria: "C"},
  {nombre: "CALIFORNIA", precio: 1600, categoria: "C"},
  {nombre: "MIAMI", precio: 1550, categoria: "C"},
  {nombre: "BUZIOS", precio: 800, categoria: "D"},
  {nombre: "RIO", precio: 900, categoria: "D"},
  {nombre: "NATAL", precio: 1000, categoria: "D"}
];

// Creo un ciclo do while para el bucle que se genera en la búsqueda del destino. El ciclo comienza con una pregunta acerca de los distintos destinos disponibles. Esta pregunta puede tener 5 posibles respuestas que corresponden a las categorías de los objetos del Array anteriormente creado.

do {

  let destino = prompt('Hola '+nombre+' ¿Que destino preferís? Elegí entre las opciones: A) Europa. B) Caribe. C) Norte América. D) Brasil. E) Medio Oriente').toUpperCase();

  // Una vez que el usuario elige una categoría necesito filtrar dentro del array los objetos que tienen esa categoría. Es decir los paquetes que hay disponibles para ese destino. Para lograr esto utilizo una funcion de orden superior: Filter. El resultado del filtro lo guardo en la variable destinoElegido.

  const destinoElegido = paquetes.filter (paquete => 
  paquete.categoria === destino);

  console.log(destinoElegido);

  // Si el usuario eligió la categoría A, B, C o D el largo de la variable destinoElegido será mayor a cero, caso contrario si el usuario eligió la categoría E o bien ingreso mal el valor, el largo de esa variable no será mayor a cero. Entonces aplico if else para estas dos posibilidades.

  if (destinoElegido.length > 0) {

      // Si el usuario eligió A, B, C o D necesito mostrarle el resultado de su búsqueda. Para esto edito el Array encerrado en la variable destinoElegido con la función de orden superior map para que solo muestre el nombre de cada objeto dentro del Array. Lo transformo en string con join para poder mostrarlo. Le muestro el resultado y necesito cortar el ciclo por eso declaro false a la variable askAgain.

      const resultadoBusqueda = destinoElegido.map(item => item.nombre).join(', ');
      
      paqueteElegido = prompt('Genial '+nombre+' hemos encontrado estos paquetes: '+resultadoBusqueda+ '. Escribe a continuación cual te interesa cotizar.').toUpperCase();

      // Encerré dentro de la variable paqueteElegido el nombre del paquete que quiere cotizar el usuario.

      askAgain = false;
  } else {

      // Si no eligió ni la categoría A, B, C o D el array destinoElegido estará vacío y necesito que se le muestre esto al usuario y que se le vuelva a preguntar que destino prefiere. Entonces el bucle se vuelve a iniciar.

      alert('Lo siento '+nombre+' no hay paquetes disponibles para la categoría seleccionada.');
  }
} while (askAgain);

// Tengo el nombre del paquete que quiere cotizar el usuario en la variable paqueteElegido. Pero necesito encontrar el objeto que tiene ese nombre dentro del array de objetos. Para eso utilizo una funcion de orden superior: Find. El resultado lo guardo en la variable resultadoPaquete.

const resultadoPaquete = paquetes.find (paquete => paquete.nombre === paqueteElegido);

console.log(resultadoPaquete);


// Si el usuario no colocó bien el nombre del paquete en el prompt de la línea 52, entonces la variable resultadoPaquete arrojará "undefined" porque no encuentra ningún nombre de paquete que coincida con ese valor, por ende no podemos continuar. Para solucionar esto uso if else. Si resultadoPaquete es undefined se le comunica al usuario y se le vuelve a pedir que coloque el nombre del paquete. Se guarda ese dato en la variable paqueteElegidoError.

if (typeof resultadoPaquete === "undefined"){

      paqueteElegidoError = prompt('Lo siento '+nombre+' tenés que escribir exacto el nombre del paquete elegido.').toUpperCase();

  } else {

      alert ('Buenisimo '+nombre+' te haré algunas preguntas más antes de darte la cotización.')

}

// Utilizó la misma lógica y herramientas para encontrar el objeto que posee ese nombre.

const resultadoPaqueteError = paquetes.find (paquete => paquete.nombre === paqueteElegidoError);

console.log(resultadoPaqueteError); 

// Continuo con las preguntas para cotizar:

cantidadAdultos = Number(prompt('¿Cuantos pasajeros adultos, mayores de 12 años, viajan?'));
cantidadNinos = Number(prompt('¿Cuantos pasajeros niños, menores de 12 años, viajan?')); 

// Calculo el subtotal (variable let declarada al inicio). Tanto la variable resultadoPaquete o bien resultadoPaqueteError me arrojan el paquete exacto a cotizar. Necesito únicamente el precio de ese paquete. Entonces calculo el subtotal multiplicando el precio del paquete por la cantidad de pasajeros que viajan. Los menores pagan la mitad. El calculo del subtotal será distinto en cada caso y es por eso que utilizo if else.

if (typeof resultadoPaquete === "undefined"){

  subtotal = resultadoPaqueteError.precio * (cantidadAdultos + cantidadNinos/2);

  } else {

  subtotal = resultadoPaquete.precio * (cantidadAdultos + cantidadNinos/2);

}

console.log(subtotal);

alert('El costo de tu paquete es: U$S '+subtotal+ ' + IMP');

    
// Calculo los impuestos. Aplico el IVA.

let subtotalConIva = subtotal * 1.21

console.log(subtotalConIva);
            
alert('Sumando los impuestos te quedaría: U$S '+subtotalConIva);

// Creo una función con condicionales if else para aplicar un cupón. Si no aplica el cupón o lo aplica mal no se obtiene el descuento.

const aplicarDescuento = (subtotalConIva) => {
    let cupon = prompt('¡¡Hoy es tu día de suerte '+nombre+'!! Ingresá el código cincoOff y obtené un descuento del 5% en el total');
    const descuento = 0.05; 

    if (cupon === "cincoOff") { 
        return subtotalConIva * (1 - descuento);
    } else {
        return subtotalConIva;
    }
};

// invoco la función recientemente creada

const precioFinal = aplicarDescuento(subtotalConIva);

console.log(precioFinal);

// Creo una funcion para mostrar el precio final

const mostrarDetalle = (precioFinal) => {
    alert('El precio final de tu paquete es: US$ ' +precioFinal);
    alert('Gracias '+nombre+' por cotizar tu paquete con nosotros. ¡Hasta la próxima!');
};

// invoco la función recientemente creada

mostrarDetalle(precioFinal);






