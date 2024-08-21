// Cargar el encabezado
const header = document.getElementById("header");
header.innerHTML = `
  <div class="header-content">
    <h1>
      <span class="title-top">Padel</span><span class="title-bottom">Express</span>
    </h1>
    <img src="./iconos/logo.png" alt="Logo" />
    <div class="header-info">
      <span class="info-item">Envío Gratis</span>
      <span class="info-item">Los Mejores Precios</span>
      <img src="./iconos/whatsapp.png" class="icono-wpp" alt="Ícono" />
    </div>
  </div>
`;

// Cargar productos y carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Renderizar productos en el carrito
const renderProducts = (arrayProductos) => {
  let containerCart = document.getElementById("container-cart");
  containerCart.innerHTML = "";

  arrayProductos.forEach((producto) => {
    const precio = producto.precio ? producto.precio.toFixed(2) : "N/A";

    let productCard = document.createElement("div");
    productCard.className = "producto";
    productCard.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.modelo}" />
      <h3>${producto.modelo}</h3>
      <p>Marca: ${producto.marca}</p>
      <p class="price">$${precio}</p>
      <div class="container-btns">
        <button onclick="restarCantidad(${producto.id})">-</button>
        <p class="quantity">${producto.quantity || 1}</p>
        <button onclick="sumarCantidad(${producto.id})">+</button>
      </div>
      <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
    `;
    containerCart.appendChild(productCard);
  });
};

// Eliminar un producto del carrito
const eliminarDelCarrito = (id) => {
  carrito = carrito.filter((elemento) => elemento.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderProducts(carrito);
};

// Restar la cantidad de un producto
const restarCantidad = (id) => {
  let productoEncontrado = carrito.find((elemento) => elemento.id === id);
  if (productoEncontrado && productoEncontrado.quantity > 1) {
    productoEncontrado.quantity -= 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProducts(carrito);
    Toastify({
      text: "Cantidad reducida",
      gravity: "bottom",
      position: "right",
      backgroundColor: "peru",
      close: true,
    }).showToast();
  } else if (productoEncontrado && productoEncontrado.quantity === 1) {
    eliminarDelCarrito(productoEncontrado.id);
  }
};

// Sumar la cantidad de un producto
const sumarCantidad = (id) => {
  let productoEncontrado = carrito.find((elemento) => elemento.id === id);
  if (productoEncontrado) {
    productoEncontrado.quantity = (productoEncontrado.quantity || 1) + 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProducts(carrito);
    Toastify({
      text: "Cantidad aumentada",
      gravity: "bottom",
      position: "right",
      backgroundColor: "green",
      close: true,
    }).showToast();
  }
};

// Inicializar la página de carrito
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(carrito);
});
