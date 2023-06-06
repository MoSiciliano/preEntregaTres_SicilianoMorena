const verCarrito = document.querySelector(".contenedor--botones--nav");
const modalContainer = document.querySelector("#modal--contenedor");
let botonEliminarProducto = document.querySelectorAll(
  ".contenedor--boton--eliminar--producto"
);
const formularioComprarCarrito = document.querySelector("#formulario--compras");
//////////////////////FUNCION QUE MUESTRA EL  MODAL////////////////////
const pintarCarrito = () => {
  modalContainer.innerHTML = "";
  //header del modal cuando esta vacio
  if (carritoConProductos.length === 0) {
    const headerCarritoVacio = document.createElement("div");
    headerCarritoVacio.className = "carrito--vacio";
    headerCarritoVacio.innerHTML = `
        <h2 class="modal--header modal--header--titulo">Tu carrito de compras
            <i class="bi bi-x-circle modal--header modal--header--boton"></i>
        </h2>
        <p class="modal--body--vacio"> Tu carrito esta vacio
        <i  class="bi bi-emoji-frown btn"></i>
        </p>
        `;
    modalContainer.append(headerCarritoVacio);
    let botonCerrar = headerCarritoVacio.querySelector(".modal--header--boton");
    botonCerrar.addEventListener("click", () => {
      headerCarritoVacio.style.display = "none";
    });
    actualizarNumeroCarrito();
  } else {
    ///header del modal cuando esta lleno
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal--header";
    modalHeader.innerHTML = `
        <h2 class="modal--header--titulo">Tu carrito de compras</h2>
        `;
    //lo almaceno al header en el array modal--container
    modalContainer.append(modalHeader);

    //creo el boton de cerrar del header
    const modalBotonClose = document.createElement("button");
    modalBotonClose.className = "modal--header--boton";
    modalBotonClose.innerHTML = `<i class="bi bi-x-circle"></i>`;

    //lo appendeo al header
    modalHeader.append(modalBotonClose);

    //evento del bton para cerrar modal
    modalBotonClose.addEventListener("click", () => {
      modalContainer.style.display = "none";
    });

    //recorro el carrito con los productos agregados y creo el Body del modal
    carritoConProductos.forEach((producto) => {
      let carritoContendor = document.createElement("div");
      carritoContendor.className = "modal--body";
      //los creo nuevamente a los productos con sus props y
      carritoContendor.innerHTML = `
            <img  src= "${producto.imagen}">
            <h3>${producto.nombrePrincipal.toUpperCase()}</h3>
            <span class="restar">-</span>
            <p>cantidad:${producto.cantidad}</p>
            <span class="sumar">+</span  >
            <p>$${producto.precio}</p>
            <p>Subtotal:$${producto.cantidad * producto.precio}</p>
            `;
      //los appendeo  al carrito
      modalContainer.append(carritoContendor);

      let restar = carritoContendor.querySelector(".restar");
      let sumar = carritoContendor.querySelector(".sumar");
      restar.addEventListener("click", () => {
        if (producto.cantidad != 1) {
          producto.cantidad--;
        }
        pintarCarrito();
        actualizarNumeroCarrito();
      });
      sumar.addEventListener("click", () => {
        producto.cantidad++;
        pintarCarrito();
        actualizarNumeroCarrito();
      });

      let eliminar = document.createElement("div");
      eliminar.innerHTML = `
          <button  id="${producto.id}"  class="boton--eliminar--producto">
            <i class="bi bi-x-circle"></i>
          </button>
            `;
      eliminar.className = "contenedor--boton--eliminar--producto";
      eliminar.idName = carritoContendor.append(eliminar);
    });

    //Footer del modal
    //acumulo los precios de los productos del carrito
    const total = carritoConProductos.reduce(
      (acc, valor) => acc + valor.precio * valor.cantidad,
      0
    );

    const footerModal = document.createElement("section");
    footerModal.className = "modal--footer";
    footerModal.innerHTML = `
    <article class="contenedor--boton--vaciar--carrito">
      <button id="boton--vaciar--carrito"  class="boton--vaciar--carrito">
      <i class="bi bi-trash3">VACIAR CARRITO</i>
      </button>
    </article>
    <article class="contenedor--boton--comprar-carrito">
      <div class="contenedor--boton--comprar">
          <p class="total--pagar--carrito"> TOTAL: $${total}</p>
          <button id="boton--comprar--carrito" class="boton--comprar--carrito"> 
              COMPRAR
          </button>
      </div>
      </article>
        `;

    //lo appendeo al modal
    modalContainer.append(footerModal);
    /*CREO LA CONSTANTE Y EL QUERY SELECTOR PARA VACIAR CARRITO*/
    const botonVaciarCarrito = document.querySelector(
      "#boton--vaciar--carrito"
    );
    botonVaciarCarrito.addEventListener("click", vaciarCarrito);
    /*CREO LA CONSTANTE Y EL QUERY SELECTOR PARA COMPRAR CARRITO*/
    const botonComprarCarrito = document.querySelector(
      "#boton--comprar--carrito"
    );
    botonComprarCarrito.addEventListener("click", mostrarFormulario);
  }
  botonesEliminar();
};

//////////////////////FUNCION QUE ABRE EL CARRITO////////////////////

verCarrito.addEventListener("click", () => {
  abrirCarrito();
  pintarCarrito();
});

function abrirCarrito() {
  modalContainer.style.display = "flex";
}

/////////////////////FUNCION QUE ABRE EL FORMULARIO////////////////////

function mostrarFormulario() {
  //Formulario de compra
  const formularioComprarCarrito = document.createElement("section");
  formularioComprarCarrito.id = "formulario--comprar";
  formularioComprarCarrito.className = "formulario--comprar form";
  formularioComprarCarrito.classList.add("form");
  formularioComprarCarrito.style.display = "flex";
  formularioComprarCarrito.innerHTML = `
  <form id="formulario" class="row g-3 container-fluid needs-validation" novalidate>
    <div class="col-md-6">
      <label for="inputName" class="form-label">Nombre</label>
      <input type="text" id="inputName" class="form-control" aria-describedby="passwordHelpBlock" required>   
      <div class="form-text">Enter your full name without special characters</div>
    </div>
    <div class="mb-3 col-md-6">
        <label for="exampleInputEmail1" class="form-label">Dirección email</label>
        <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp">
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="col-md-6">
      <label for="validationCustom03" class="form-label">City</label>
      <input type="text" class="form-control" id="validationCustom02" required>
      <div class="invalid-feedback">
        Please provide a valid city.
      </div>
    </div>
    <div class="col-md-6">
      <label for="validationCustom04" class="form-label">Country</label>
      <select class="form-select" id="validationCustom03" required>
        <option selected disabled value="">Choose...</option>
        <option>Argentina</option>
        <option>Uruguay</option>
        <option>Chile</option>
      </select>
      <div class="invalid-feedback">
        Please select a valid state.
      </div>
    </div>                                                               
    <div class="col-12">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
        <label class="form-check-label" for="invalidCheck">
          Agree to terms and conditions
        </label>
        <div class="invalid-feedback">
          You must agree before submitting.
        </div>
      </div>
    </div>
    <div id="boton--comprar--formulario" class="btn--contain--formulario">
      <button id="btn--formulario" class="btn--formulario" type="submit">Comprar</button>
    </div>
  </form>
  `;
  modalContainer.append(formularioComprarCarrito);

  const formulario = document.querySelector("#formulario");
  const inputNombre = document.querySelector("#inputName");
  const inputEmail = document.querySelector("#inputEmail");
  const botonComprarCarritoFormulario =
    document.querySelector("#btn--formulario");

  //////////////////////FUNCION QUE VALIDA EL FORM //////////

  formulario.addEventListener("submit", validacionFormulario);
  function validacionFormulario(e) {
    e.preventDefault();
    console.log(`Nombre: ${inputNombre.value}`);
    console.log(`Email: ${inputEmail.value}`);
  }

  //////////////////////FUNCION QUE COMPRA EL CARRITO DESDE EL FORMu //////////

  botonComprarCarritoFormulario.addEventListener("click", carritoComprado);
  function carritoComprado(e) {
    if (inputNombre.value === "" && inputEmail.value === "") {
      Swal.fire({
        position: "top-center",
        icon: "info",
        title: " completar todos los campos",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      modalContainer.style.display = "none";
      carritoConProductos = [];
      actualizarNumeroCarrito();
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `Tu compra se ha realizado con éxito ${inputNombre.value}, todos los datos serán enviados a ${inputEmail.value}`,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }
  ///////////TOMO LOS VALORES DE LOS INPUT DEL FORMULARIO, NOMBRE Y EMAIL
  //inputNombre.addEventListener("input", () => {});
}

///////////////////////FUNCION QUE ACTUALIZA BOTON ELIMINAR + EVENTO////////////////////
function botonesEliminar() {
  botonEliminarProducto = document.querySelectorAll(
    ".boton--eliminar--producto"
  );

  botonEliminarProducto.forEach((boton) => {
    boton.addEventListener("click", eliminarProductoCarrito);
  });
}
//////////////////////FUNCION QUE ELIMINA EL PRODUCTO //////////
const eliminarProductoCarrito = (e) => {
  Toastify({
    text: "Eliminado del carrito",
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

  const idBoton = e.currentTarget.id;

  const index = carritoConProductos.findIndex(
    (producto) => producto.id === idBoton
  );

  carritoConProductos.splice(index, 1);
  pintarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carritoConProductos));
  actualizarNumeroCarrito();
};

//////////////////////FUNCION QUE VACIA EL CARRITO //////////
function vaciarCarrito() {
  Swal.fire({
    title: "¿Estas seguro?",
    html: `Se borraran ${carritoConProductos.reduce(
      (acc, producto) => acc + producto.cantidad,
      0
    )} productos de tu carrito!`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, quiero borrarlo!",
    cancelButtonText: "No, no estoy seguro",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({ html: "Borrado!, Tu carrito fue borrado con exito." });
      carritoConProductos.length = 0;
      localStorage.setItem("carrito", JSON.stringify(carritoConProductos));
      modalContainer.style.display = "none";
      actualizarNumeroCarrito();
    }
  });
}
