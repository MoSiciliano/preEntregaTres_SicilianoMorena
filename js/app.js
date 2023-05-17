const productosArray = [
    //Baño
    {
        id: "001-b",
        nombrePrincipal : "vanitory nordico L",
        precio: 25000,
        imagen :"./img/baño/baño-01.webp",
        seccion :"baño",
        cantidad :1
    },
    {
        id: "002-b",
        nombrePrincipal : "vanitory nordico XS",
        precio: 30000,
        imagen :"./img/baño/baño-02.webp",
        seccion :"baño",
        cantidad :1
    },
    {
        id: "003-b",
        nombrePrincipal : "vanitory nórdico XL",
        precio: 25000,
        imagen :"./img/baño/baño-03.webp",
        seccion :"baño",
        cantidad :1
    },
    //habitación
    {
        id: "001-h",
        nombrePrincipal : "Cajonera nórdica",
        precio: 25000,
        imagen :"./img/habitacion/habitacion-01.webp",
        seccion :"habitacion",
        cantidad :1
    },
    {
        id: "002-h",
        nombrePrincipal : "Mesa de luz",
        precio: 12000,
        imagen :"./img/habitacion/habitacion-02.webp",
        seccion :"habitacion",
        cantidad :1
    },
    //living
    {
        id: "001-l",
        nombrePrincipal : "Mesa ratona escandinava",
        precio: 15000,
        imagen :"./img/living/living-01.webp",
        seccion :"living",
        cantidad :1

    },
    {
        id: "002-l",
        nombrePrincipal : "Mesa para Tv XL",
        precio: 50000,
        imagen :"./img/living/living-02.webp",
        seccion :"living",
        cantidad :1
    },
    {
        id: "003-l",
        nombrePrincipal : "Mesa de Tv Nórdica",
        precio: 35000,
        imagen :"./img/living/living-03.webp",
        seccion :"living",
        cantidad :1
        
    }
]


//////////////////////-------Almacenado para el DOM-------///
const contenedorProductos = document.querySelector("#contain--productosArray")
const botonCategorias = document.querySelectorAll(".boton--categoria")
const tituloCategoria = document.querySelector("#titulo--principal--tienda")
let botonAgregar = document.querySelectorAll(".agregar--carrito")
const numeroCarrito = document.querySelector(".contador--numeros")
const verCarrito = document.querySelector(".contenedor--botones--nav")
const modalContainer = document.querySelector("#modal--contenedor")

let carritoConProductos= JSON.parse(localStorage.getItem("carrito")) || [];


//////////////////////------Funcion para Mostrar todod los productos en el DOM------//
function mostrarProductos (producSelect){
    contenedorProductos.innerHTML = "";
    producSelect.forEach(producto => {
        let content = document.createElement ("div")
        content.className= "col-lg-3 col-md-6 col-sm-6 d-flex";
        content.innerHTML = `
        <div class="card w-100 my-2 shadow-2-strong category">
            <img src="${producto.imagen}" class="card-img-top" style="aspect-ratio: 1 / 1" / alt="${producto.nombrePrincipal}>
            <div class="card-body d-flex flex-column">
               <h5 class="card-title titulo--producto">${producto.nombrePrincipal}</h5>
               <p class="card-text">$${producto.precio}</p>
               <button type="button" class="agregar--carrito btn btn-light" id="${producto.id}">Agregar </button>
            </div>
        </div>
        `;
        contenedorProductos.append(content);
    })

    botonesAgregar();

}
mostrarProductos(productosArray);



//////////////////////Funcion para filtrar las categorias---------//

botonCategorias.forEach(boton=>{
    boton.addEventListener("click",(e)=>{
       
        if (e.currentTarget.id != "todos") {
            const productoSeccion = productosArray.find(producto => producto.seccion === e.currentTarget.id)
            tituloCategoria.innerText = productoSeccion.seccion.toLocaleUpperCase();
            const seccionBoton = productosArray.filter(producto => producto.seccion === e.currentTarget.id )
            mostrarProductos(seccionBoton)
        } else {
            tituloCategoria.innerText = "Todos nuestros productos".toLocaleUpperCase();
            mostrarProductos(productosArray);
        } 

    } )
})

/////////////////////FUNCION PARA QUE FUNCIONEN LOS BOTONES AGREGAR CARRITO////

function botonesAgregar (){
    botonAgregar = document.querySelectorAll(".agregar--carrito");
   
    botonAgregar.forEach (boton=>{
        boton.addEventListener("click", agregarCarrito)
    })

}

function agregarCarrito (e){
    //Lo llamo por ID
    const idElemento = e.currentTarget.id;
    const productoAgregar = productosArray.find(producto=> producto.id === idElemento);
    
    //como hacer para que no se agregue mil veces al array

    const repetido = carritoConProductos.some(producto => producto.id === idElemento)
    if(repetido){
        //si esta que se sume
        carritoConProductos.map((producto)=>{
            if(producto.id === idElemento){
                producto.cantidad++;
            }
        })


    }else{
        //si no esta el producto que se agregue!
        //Se suben al carritoProductos (vacio)
        carritoConProductos.push(productoAgregar);
    }
   
    actualizarNumeroCarrito();
    guardarLocalStorage();

};


