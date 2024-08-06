let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para renderizar los productos en el carrito
const renderProducts = (arrayProductos) => {
  let containerCart = document.getElementById("container-cart");
  containerCart.innerHTML = "";

  arrayProductos.forEach((producto) => {
    // Asegurarse de que `precio` esté definido y sea un número
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
            <button onclick="eliminarDelCarrito(${
              producto.id
            })">Eliminar</button>
        `;
    containerCart.appendChild(productCard);
  });
};

// Renderizar productos al cargar la página
renderProducts(carrito);

// Función para eliminar un producto del carrito
const eliminarDelCarrito = (id) => {
  carrito = carrito.filter((elemento) => elemento.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderProducts(carrito);
};

// Función para restar la cantidad de un producto
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

// Función para sumar la cantidad de un producto
const sumarCantidad = (id) => {
  let productoEncontrado = carrito.find((elemento) => elemento.id === id);
  if (productoEncontrado) {
    productoEncontrado.quantity = (productoEncontrado.quantity || 1) + 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProducts(carrito);
  }
};
