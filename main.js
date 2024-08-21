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
    <div class="search-container">
      <input type="text" placeholder="Escribí tu marca" id="search" class="search-input" />
      <button class="search-button">Buscar</button>
    </div>
    <div class="cart-icon">
      <a href="./cart.html">
        <img src="./iconos/carrito.png" alt="Carrito" />
      </a>
    </div>
  </div>
`;

// Cargar los enlaces de navegación
const navLinks = document.getElementById("nav-links");
navLinks.innerHTML = `
  <div class="nav-links">
    <p data-link="ofertas">Ofertas</p>
    <p data-link="paletas">Paletas</p>
    <p data-link="packs">Packs</p>
    <p data-link="accesorios">Accesorios</p>
    <p data-link="bolsos">Bolsos y mochilas</p>
  </div>
`;

// Cargar productos desde el JSON al iniciar
document.addEventListener("DOMContentLoaded", () => {
  fetch("./info.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta de la red");
      }
      return response.json();
    })
    .then((productos) => {
      renderProducts(productos);
      // Guardar los productos en una variable global para usarlos en la búsqueda
      window.paletas = productos;
    })
    .catch((error) => {
      console.error("Error al cargar el archivo JSON:", error);
    });
});

// Renderizar Productos
const renderProducts = (arrayProductos) => {
  let containerProducts = document.getElementById("products-container");
  containerProducts.innerHTML = "";

  arrayProductos.forEach((producto) => {
    let productCard = document.createElement("div");
    productCard.className = "producto";
    productCard.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.modelo}" />
      <h3>${producto.modelo}</h3>
      <p>Marca: ${producto.marca}</p>
      <p class="price">$${producto.precio.toFixed(2)}</p>
      <button onclick="agregarAlCarrito(${producto.id})">
        Agregar al carrito
      </button>
    `;
    containerProducts.appendChild(productCard);
  });
};

// Agregar al Carrito
const agregarAlCarrito = (id) => {
  let producto = window.paletas.find((elemento) => elemento.id === id);
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let productoEnElCarrito = carrito.find((elemento) => elemento.id === id);

  if (productoEnElCarrito) {
    productoEnElCarrito.quantity += 1;
    Swal.fire({
      title: "Carrito actualizado",
      text: `${producto.modelo} SE AÑADIO AL CARRITO.`,
      icon: "success",
      confirmButtonText: "Aceptar",
      timer: 3000,
    });
  } else {
    carrito.push({ ...producto, quantity: 1 });
    Swal.fire({
      title: "Producto agregado",
      text: `${producto.modelo} se ha añadido al carrito.`,
      icon: "success",
      confirmButtonText: "Aceptar",
      timer: 3000,
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Búsqueda de Productos
const inputSearch = document.getElementById("search");
if (inputSearch) {
  inputSearch.addEventListener("input", (evento) => {
    let value = evento.target.value.toLowerCase();
    let arrayFiltrado = window.paletas.filter(
      (producto) =>
        producto.marca.toLowerCase().includes(value) ||
        producto.modelo.toLowerCase().includes(value)
    );
    renderProducts(arrayFiltrado);
  });
}
