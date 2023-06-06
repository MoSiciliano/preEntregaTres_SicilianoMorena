let productosArray = [];

/*fetch("./js/productos.json")
  .then((response) => response.json())
  .then((data) => {
    productosArray = data;
    mostrarProductos(productosArray);
  });*/

async function traerProductosArrayJson() {
  try {
    const response = await fetch("./js/productos.json");
    const data = await response.json();
    productosArray = data;
    mostrarProductos(productosArray);
  } catch {
    console.log(err);
  }
}
traerProductosArrayJson();

//////////////////////-------Almacenado para el DOM-------///
const contenedorProductos = document.querySelector("#contain--productosArray");
const botonCategorias = document.querySelectorAll(".boton--categoria");
const tituloCategoria = document.querySelector("#titulo--principal--tienda");
let botonAgregar = document.querySelectorAll(".boton--agregar--producto");
const numeroCarrito = document.querySelector(".contador--numeros");

//array del carrito
let carritoConProductos = JSON.parse(localStorage.getItem("carrito")) || [];

//////////////////////------Funcion para Mostrar todod los productos en el DOM------//
function mostrarProductos(producSelect) {
  contenedorProductos.innerHTML = "";
  producSelect.forEach((producto) => {
    let content = document.createElement("div");
    content.className = "col-lg-3 col-md-4 col-sm-6 d-flex";
    content.innerHTML = `
        <div class="card w-100 my-2 shadow-2-strong category">
            <img src="${producto.imagen}" class="card-img-top" style="aspect-ratio: 1 / 1" / alt="${producto.nombrePrincipal}>
            <div class="card-body d-flex flex-column">
               <h5 class="card-title titulo--producto">${producto.nombrePrincipal}</h5>
               <p class="card-text">$${producto.precio}</p>
               <button type="button" class="boton--agregar--producto btn btn-light" id="${producto.id}">Agregar </button>
            </div>
        </div>
        `;
    contenedorProductos.append(content);
  });

  botonesAgregar();
}
mostrarProductos(productosArray);

//////////////////////Funcion para filtrar las categorias---------//

botonCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    if (e.currentTarget.id != "todos") {
      const productoSeccion = productosArray.find(
        (producto) => producto.seccion === e.currentTarget.id
      );
      tituloCategoria.innerText = productoSeccion.seccion.toLocaleUpperCase();
      const seccionBoton = productosArray.filter(
        (producto) => producto.seccion === e.currentTarget.id
      );
      mostrarProductos(seccionBoton);
    } else {
      tituloCategoria.innerText =
        "Todos nuestros productos".toLocaleUpperCase();
      mostrarProductos(productosArray);
    }
  });
});

/////////////////////FUNCION PARA QUE FUNCIONEN LOS BOTONES AGREGAR CARRITO////

function botonesAgregar() {
  botonAgregar = document.querySelectorAll(".boton--agregar--producto");

  botonAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarCarrito);
  });
}

function agregarCarrito(e) {
  Toastify({
    text: "Agregado al carrito",
    duration: 2000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background:
        "linear-gradient(to right, rgb(255, 156, 131),  rgb(250, 236, 225))",
      borderRadius: "1rem",
      fontSize: ".80rem",
    },
    offset: {
      x: 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: "3.5rem", // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    onClick: function () {}, // Callback after click
  }).showToast();

  //Lo llamo por ID
  const idElemento = e.currentTarget.id;
  const productoAgregar = productosArray.find(
    (producto) => producto.id === idElemento
  );

  //como hacer para que no se agregue mil veces al array
  if (carritoConProductos.some((producto) => producto.id === idElemento)) {
    //si esta que se sume
    carritoConProductos.map((producto) => {
      if (producto.id === idElemento) {
        producto.cantidad++;
      }
    });
  } else {
    //si no esta el producto que se agregue!
    //Se suben al carritoProductos (vacio)
    carritoConProductos.push(productoAgregar);
  }
  ////////////////LOCAL STORAGE EN MI PROYECTO!!//////////
  localStorage.setItem("carrito", JSON.stringify(carritoConProductos));
  actualizarNumeroCarrito();
  modalContainer.style.display = "none";
  pintarCarrito();
}

//numerito del carrito
const actualizarNumeroCarrito = () => {
  numeroCarrito.style.display = "block";

  const carritoCantidad = carritoConProductos.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numeroCarrito.innerText = carritoCantidad;
};

////////////////////////JSON para traer productos//////
const carritoConProductosLs = localStorage.getItem("carrito");
if (carritoConProductosLs) {
  carritoConProductos = JSON.parse(carritoConProductosLs);
  actualizarNumeroCarrito();
} else {
  carritoConProductos = [];
}
