// funcionalidad para abrir y cerrar el carrito

const modalContenedor = document.querySelector('.modalContenedor');
const abrirCarrito = document.getElementById('carrito');
const cerrarCarrito = document.getElementById('btn-cerrar-carrito');

abrirCarrito.addEventListener('click', () => {
    modalContenedor.classList.add('modalCotizacionActive')
});

cerrarCarrito.addEventListener('click', () => {
    modalContenedor.classList.remove('modalCotizacionActive')
});