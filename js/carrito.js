//numerito del carrito
const actualizarNumeroCarrito = () =>{
    numeroCarrito.style.display = "block";

    const carritoLength = carritoConProductos.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    numeroCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}

actualizarNumeroCarrito();

const pintarCarrito = () =>{
    //header del modal
    if (carritoConProductos.length === 0) {

        const headerCarritoVacio = document.createElement("div")
        headerCarritoVacio.className = "carrito--vacio"
        headerCarritoVacio.innerHTML = `
        <h2 class="modal--header "modal--header--titulo">Tu carrito de compras
            <i class="bi bi-x-circle modal--header modal--header--boton"></i>
        </h2>
        <p class="modal--body--vacio"> Tu carrito esta vacio
        <i  class="bi bi-emoji-frown btn"></i>
        </p>
        `;
        modalContainer.append(headerCarritoVacio);

       let botonCerrar = headerCarritoVacio.querySelector(".modal--header--boton")
       botonCerrar.addEventListener("click", ()=>{
          headerCarritoVacio.style.display = "none";
       })


    } else {
        modalContainer.innerHTML = ``;
        modalContainer.style.display  = "flex";

        const modalHeader = document.createElement("div");
        modalHeader.className = "modal--header";
        modalHeader.innerHTML =`
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
        modalBotonClose.addEventListener("click",()=>{
           modalContainer.style.display = "none";
        })
       
        //recorro el carrito con los productos agregados y creo el Body del modal
        carritoConProductos.forEach((producto)=>{
            let carritoContendor = document.createElement ("div");
            carritoContendor.className = "modal--body";
            //los creo nuevamente a los productos con sus props y
            carritoContendor.innerHTML  = `
            <img  src= "${producto.imagen}">
            <h3>${producto.nombrePrincipal.toUpperCase()}</h3>
            <span class="restar">-</span>
            <p>cantidad:${producto.cantidad}</p>
            <span class="sumar">+</span  >
            <p>$${producto.precio}</p>
            <p>Total:$${producto.cantidad*producto.precio}</p>
            `;
            //los appendeo  al carrito
            modalContainer.append(carritoContendor);

            let restar = carritoContendor.querySelector(".restar");
            let sumar  = carritoContendor.querySelector(".sumar");
            restar.addEventListener("click",()=>{
                if(producto.cantidad != 1){
                producto.cantidad--;
                } 
                guardarLocalStorage();
                pintarCarrito();
            })
            sumar.addEventListener("click",()=>{
                producto.cantidad ++;
                guardarLocalStorage()
                pintarCarrito();

            })

            let eliminar = document.createElement("div")
            eliminar.innerHTML = `
            <i class="bi bi-x-circle"></i>
            `;
            eliminar.className = "eliminar--producto";
            carritoContendor.append(eliminar);

            eliminar.addEventListener ("click", eliminarProducto)
        });

        //Footer del modal
            //acumulo los precios de los productos del carrito
        const total = carritoConProductos.reduce((acc, valor)=> acc + valor.precio * valor.cantidad, 0);
        
        const totalApagar = document.createElement("div");
        totalApagar.className = "total--contenedor";
        totalApagar.innerHTML = `
        Total a pagar : $ ${total}
        `;
    
        //lo appendeo al modal
        modalContainer.append(totalApagar);
    } 
};

verCarrito.addEventListener("click", pintarCarrito);


const eliminarProducto  = ()=>{
    const foundId = carritoConProductos.find((producto) => producto.id);

    carritoConProductos = carritoConProductos.filter((carritoId)=>{
        return carritoId !== foundId; 
    })

    actualizarNumeroCarrito();
    guardarLocalStorage();
    pintarCarrito ();
}

//Local storage en mi proyecto

const guardarLocalStorage = ()=>{
    localStorage.setItem("carrito", JSON.stringify(carritoConProductos));
};


JSON.parse(localStorage.getItem("carrito"));

