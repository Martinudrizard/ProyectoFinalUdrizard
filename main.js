// Header
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
      <input type="text" placeholder="Escribi tu marca" id="search" class="search-input" />
      <button class="search-button">Buscar</button>
    </div>
    <div class="cart-icon">
      <a href="./cart.html">
        <img src="./iconos/carrito.png" alt="Carrito" />
      </a>
    </div>
  </div>
`;

// futuros Links
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

//array
const paletas = [
  {
    id: 1,
    marca: "adidas",
    modelo: "METALBONE HRD 3.3",
    precio: 450,
    imagen: "./imagenes/adidashrd3.3.jpg",
  },
  {
    id: 2,
    marca: "adidas",
    modelo: "METALBONE PRO EDT BY ALE GALAN",
    precio: 550,
    imagen: "./imagenes/adidas.2024.jpg",
  },
  {
    id: 3,
    marca: "nox",
    modelo: "NOX AT10 GENIUS 18K AGUSTIN TAPIA 2024",
    precio: 324,
    imagen: "./imagenes/NOX AT10 GENIUS 18K AGUSTIN TAPIA 2024.jpg",
  },
  {
    id: 4,
    marca: "nox",
    modelo: "NOX LA10 BY LEO AUGSBURGER 2024",
    precio: 219,
    imagen: "./imagenes/NOX LA10 BY LEO AUGSBURGER 2024.jpg",
  },
  {
    id: 5,
    marca: "babolat",
    modelo: "BABOLAT TECHNICAL VIPER JUAN LEBRON 2024",
    precio: 379.95,
    imagen: "./imagenes/BABOLAT TECHNICAL VIPER JUAN LEBRON 2024.jpg",
  },
  {
    id: 6,
    marca: "babolat",
    modelo: "BABOLAT TECHNICAL VERON JUAN LEBRON 2024",
    precio: 259.94,
    imagen: "./imagenes/BABOLAT TECHNICAL VERON JUAN LEBRON 2024.jpg",
  },
  {
    id: 7,
    marca: "bullpadel",
    modelo: "BULLPADEL VERTEX 03 2024",
    precio: 259.94,
    imagen: "./imagenes/vertex.jpg",
  },
  {
    id: 8,
    marca: "bullpadel",
    modelo: "BULLPADEL HACK 03 2024",
    precio: 259.94,
    imagen: "./imagenes/neuron.jpg",
  },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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

renderProducts(paletas);

// Agregar al Carrito
const agregarAlCarrito = (id) => {
  let producto = paletas.find((elemento) => elemento.id === id);
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

//Búsqueda de Productos
const inputSearch = document.getElementById("search");
if (inputSearch) {
  inputSearch.addEventListener("input", (evento) => {
    let value = evento.target.value.toLowerCase();
    let arrayFiltrado = paletas.filter(
      (producto) =>
        producto.marca.toLowerCase().includes(value) ||
        producto.modelo.toLowerCase().includes(value)
    );
    renderProducts(arrayFiltrado);
  });
}
