
/*El pronóstico del tiempo **/
let urltiempo="https://api.openweathermap.org/data/2.5/weather?q=cordoba&appid=cf21726ebcc5b5a61f5457f04b230845";

    $.get(urltiempo, function(datos){
      
        let contenido= `<div> 
                        <h2>${datos.name} </h2>
                        <p>Clima:${datos.weather[0].description} </p>
                        <p>Temp máx:${datos.main.temp_max} </p>
                        <p>Temp mín:${datos.main.temp_min} </p>
                        </div>`;
        $(".body").append(contenido);
    })



  
/* Dos formas de cargar

$("#cargar").click(function(e){
    
    
    let nombre=document.getElementById ("nombre");
    let precio=document.getElementById ("precio");
    let stock=document.getElementById ("stock");
    
    let cerveza=new cervezas(contador,nombre.value, precio.value, stock.value);
    contador=contador+1;
    lista [contador]=cerveza;

    // Carga automáticamente
    let rica= new cervezas(1,"rica", 100, 500 );
    let rubia= new cervezas(2,"rubia", 150, 400);
    let morocha= new cervezas(3,"morocha", 180, 300);
    let suave= new cervezas(4,"suave", 150, 600);
    let old= new cervezas(5,"old", 170, 460 );
    let amarga= new cervezas(6,"amarga", 200, 200 );
   
   let lista= [ rica, rubia, morocha, suave, old, amarga];
    
    
   let listaJSON= JSON.stringify (lista);
   localStorage.setItem("cervezas",listaJSON);
   

   let enJSON=localStorage.getItem("cervezas");
   listaCervezas= JSON.parse (enJSON);
   
})
**/

/*Elección cerveza con cantidad **/

eleccionCerveza= (e)=> {
  /*limpiar nombre de la cerveza**/
  let borrar = document.getElementById("nombreVariable");
  if (borrar!=null) {borrar.parentNode.removeChild(borrar); }
     

let hijo= e.target;
let padre=hijo.parentNode.parentNode;
nombre=padre.querySelector("h5").textContent;
idCervezaUbicacion=ubicacionArreglo(nombre);

const div=document.createElement("div");

div.innerHTML=` 

        <h6 id="nombreVariable" class="mt-2">Nombre:${nombre}</h6>
`
espacioNombre.appendChild(div);


  }

/*-------------------Selector de botón de compra------------------- **/

let botonesCompra=document.body.querySelectorAll(".botonCompra");

for (let boton of botonesCompra){
  
    boton.addEventListener("click", eleccionCerveza);
  
     }
   
 /*---------------------------------Funciones para carrito------------------------------------- **/
// Cantidad cargada en el carrito
function cambioCarrito(cant) {   
   // borrar contador carrito
  let borrar = document.querySelector(".cantCarro");
  if (borrar!= null) {borrar.parentNode.removeChild(borrar); }

    let cantidad=document.createElement("cantidad");
    cantidad.innerHTML=`<span class="cantCarro text-black" style="margin-left: 1133px;position: absolute;" >${cant}</span> `
    carritoCantidad.appendChild(cantidad);
}

/*Para que no se repita la cerveza en el carrito  **/
function NoRepetirCerveza(nom){
  let salir="no";
  carrito.forEach(venta =>{
  
  if (venta.nombre==nom){
    
    const div=document.createElement("div");
          
    div.innerHTML=` 
      
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
   <strong>¡Ya fue elegida!</strong> Modifique en carrito.
   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
  </div>`
  introduccion.appendChild(div);
  
  salir="si";

  return false;
  
   }
  
  return true;

})
if (salir=="no") return true;

  }

  
/*Determina si hay stock suficiente **/
const hayStock = (cuantas, stock) => {
    if (cuantas > stock) {
    
        const div=document.createElement("div");
        
        div.innerHTML=` 
     
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>¡Stock insuficiente!</strong> Elegir una cantidad menor a ${stock}.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
</div>`

introduccion.appendChild(div);
       
        return false;
    }
    else { 
        
        return true;
    }
}

 

/*A partir de la selección de la cerveza devuelve la posición en el array **/

ubicacionArreglo=(nombre)=>{
    let idCerveza=-1;
if (nombre=="La más rica"){
   idCerveza=1;
} else 
    if (nombre=="La rubia"){
     idCerveza=2;
}
  else 
      if (nombre=="La morocha"){
         idCerveza=3;
}
else 
      if (nombre=="La más suave"){
         idCerveza=4;
}
else 
      if (nombre=="La más Old"){
         idCerveza=5;
}
else 
      if (nombre=="La más amarga"){
         idCerveza=6;
}

return idCerveza;

}

/*Limpia nombre de la cerveza con botón cancelar **/


 $("#borrar").click(function(e){
  let borrar = document.getElementById("nombreVariable");
  borrar.parentNode.removeChild(borrar);

}
  )

  
  /*Se van guardando en array las elecciones de las cervezas **/
function ventaGuardada(cantidad){
    paso=1;
    const ventas=new venta(id, nombre, listaCervezas[idCervezaUbicacion-1].precio, cantidad);
    carrito.push(ventas);
    carritoAux.push(ventas);
    console.log("ventaguardada",carrito, carritoAux);
    id=id+1;
    total=listaCervezas[idCervezaUbicacion-1].precio * cantidad;
    return total;
}

/*Vaciar completamente el carrito **/
$("#terminar").click(function(e){
  productos.innerHTML = '';
  carritoAux.splice(0);
  carrito.splice(0);
  cant=0;
  cambioCarrito(cant);
  totalVenta=0;
  
  })

function eliminarDelCarrito(cont){                       //no me funciona. Los botones están activados.
console.log("paso", cont);
//Elimina del array.  
//carrito.splice(ubicacion, 1);

//e.target.parentNode.removeChild(e.target);
/*let borrar =muestraVenta.querySelectorAll("h6");
console.log(borrar);
for ( let i=0; i<= borrar.length-1; i++){
  
  paraBorrar=borrar[i]
  console.log(paraBorrar);
  paraBorrar.parentNode.removeChild(paraBorrar);
  cant=cant-1;
  cambioCarrito(cant);

}
**/

}

/*Actualiza para que no se repitan en el carrito  **/
function limpiarCarrito(){
  carritoAux.splice(0, carritoAux.length);
  let borrar =completarProductos.querySelectorAll("h3");
  
  if (borrar.length>1){
      borrar[0].parentNode.removeChild(borrar[0]);
  }
  
}


  /*............................Comienzo proceso de carga  carrito ....................................  **/
  
  $("#seleccionarCervezaModal").click(function(e){

/*limpiar nombre de la cerveza**/
let borrar = document.getElementById("nombreVariable");
 borrar.parentNode.removeChild(borrar); 
/*Muestra el monto de la selección de UN producto **/

  let inputCantidad=document.body.querySelector("#cantidadCompra");

   if (hayStock (inputCantidad.value,listaCervezas[idCervezaUbicacion-1].stock ) ) //LLama a la función para evaluar stock.
  { if (paso===0)
    {total=ventaGuardada(inputCantidad.value);
    cant=cant+1;
    cambioCarrito(cant);
    }
    else
    if (NoRepetirCerveza(nombre)) {
        cant=cant+1;
        total=ventaGuardada(inputCantidad.value);
        cambioCarrito(cant);
   }
  }
 
       carritoAux.forEach(venta =>{
       totalPorCerveza= venta.precio* venta.cantidad;
       totalVenta=totalVenta+totalPorCerveza;
       let showDatos=document.createElement("div");
       
       showDatos.innerHTML=`
       
       <div id="muestraVenta" class="row modal-header text-center">
                 <div class="col-md-2">
                     <p class=muestraV>${venta.nombre}</p>
                 </div>
                 <div class="col-md-2">
                     <p class=muestraV>${venta.precio}</p>
                 </div>
                 <div class="col-md-2">
                     <p class=muestraV>${venta.cantidad}</p>
                  </div>
                  <div class="col-md-2">
                   <p class=muestraV>${totalPorCerveza}</p>
                  </div> 
               
                 <div class="col-md-2">
                  <button type="button" class=" quitar"> Eliminar </button>

              
               </div>
               </div>    
                 `

       productos.appendChild(showDatos);
  
        
})


let showTotal=document.createElement("div");
showTotal.innerHTML=`
          <div id="precioTotal" class=" d-flex justify-content-end">
          <h3 class="totalPrecio" >Total: <span >${totalVenta}</span> </h3>
          </div>  `
productos.appendChild(showTotal);



// Eliminar por selección del botón


const quitar =completarProductos.querySelectorAll(".quitar");
    
for(let i=0; i<=quitar.length-1;i++){ 
    
    quitar[i].addEventListener("click",eliminarDelCarrito(i));

}

//Limpiar el carro
limpiarCarrito();

totalPorCerveza=0;

  }
    )
/*..............................Fin proceso de cargar carrito ...................................  **/


        $("#stock").click(function(e){
        $("#divShowStock").slideDown(1000);
      
        listadoCer=listaCervezas;
        mostrar=document.createElement("mostrar");
        mostrar.innerHTML=`


        <div  id="mostrarStock" class="row modal-header text-justify">
        <div class="col-md-2">
            <p class="pModal">Cerveza</p>
        </div>
        <div class="col-md-2 ">
            <p class="pModal">Stock</p>
        </div>
        <div class="col-md-2 ">
            <p class="pModal">Precio</p>
        </div>
        `
    divShowStock.appendChild(mostrar);

   
    for (let i=0; i< listadoCer.length-1; i++)
    {

        cerveza=listadoCer[i];
        mostrarStock=document.createElement("mostrarStock");
        mostrarStock.innerHTML=`
     <div class="row modal-header text-center" >
       <div class="col-md-2">
        <p class="pNuestrasDescrip">${cerveza.nombre}</p>
    </div>
    <div class="col-md-2">
        <p class="pNuestrasDescrip">${cerveza.stock}</p>
    </div>
    <div class="col-md-2">
        <p class="pNuestrasDescrip">${cerveza.precio}</p>
     </div>
   </div>`
        
        
        divShowStock.appendChild(mostrarStock);

    } 

    let mensaje=document.createElement("p");

    mensaje.innerHTML=`<button type="button" class="btn-close" aria-label="Cerrar" onclick="cerrar()"></button> `;
    divShowStock.appendChild(mensaje);

   actualizarStock(listadoCer);
   
 }
               
  )
  function cerrar(){
    $("#divShowStock").hide();
  divShowStock.innerHTML="";
  
  }


/*Ordena de mayor a menor del stock  **/
ordenarPorStock= (listadoCer) => {
    
    for ( var i=0; i<= listadoCer.length-2; i++){
    let cerveza;
       if ( listadoCer[i].stock < listadoCer[i+1].stock) {
         
        cerveza=listadoCer[i];
        listadoCer[i]=listadoCer[i+1];
        listadoCer[i+1]=cerveza;

        console.log (listadoCer[i].stock,listadoCer[i+1].stock );
       }
       listaCervezas=listadoCer;
    } 
    
 }

/*Actualiza el stock  **/
actualizarStock=(lista)=> {
    localStorage.clear("cervezas");
    let listaJSON= JSON.stringify (lista);
    localStorage.setItem("cervezas",listaJSON);
    
}


 /*Contacto  **/

 $("#NombreUsuario").on("change", function(e){
    nombre=e.target.value;
 })

 $("#emailUsuario").on("change", function(e){
    email=e.target.value;
})

$("#edadUsuario").on("change", function(e){
    edad=e.target.value;
})

$("#comentarioUsuario").on("change", function(e){
    comentario=e.target.value;
})

$("#enviar").click(function(e){
    //let padre=e.target.parentNode; probando
   // console.log(padre);
   let cliente=new clientes(nombre, email,edad,comentario);
    console.log(nombre, email,edad,comentario);
    let clientesJSON= JSON.stringify (cliente);
    localStorage.setItem("clientes",clientesJSON);

    let enJSON=localStorage.getItem("clientes");
    let listaClientes= JSON.parse (enJSON);
 }
    )


 /*Ventanas para mostrar información **/

$("#divShowStock").hide();

$("#divShowStock").css("width", "1100px");
$("#divShowStock").css("height", "500px");
$("#divShowStock").css("background-color","#986D8E");


$("#cargar").click(function(e){
    $("#divCarga").slideDown(1000);
       
 }
    )
 

