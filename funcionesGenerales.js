
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
/*Para que no se repita la cerveza en el carrito  **/
function NoRepetirCerveza(nom){
  let salir="no";
  console.log("no repite",carrito);
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


  /*........................Comienzo proceso de cargar al carrito ................................  **/

  $("#seleccionarCervezaModal").click(function(e){
let total=0;
/*limpiar nombre de la cerveza**/
let borrar = document.getElementById("nombreVariable");
 borrar.parentNode.removeChild(borrar); 
/*Muestra el monto de la selección de UN producto **/

  let inputCantidad=document.body.querySelector("#cantidadCompra");

   if (hayStock (inputCantidad.value,listaCervezas[idCervezaUbicacion-1].stock ) ) //LLama a la función para evaluar stock.
  { if (paso===0)
    {total=ventaGuardada(inputCantidad.value);
    }
    else
    if (NoRepetirCerveza(nombre)) {
    
        total=ventaGuardada(inputCantidad.value);
   }
  }
 

   
       carritoAux.forEach(venta =>{
       totalPorCerveza= venta.precio* venta.cantidad;
       totalVenta=totalVenta+totalPorCerveza;
       let showDatos=document.createElement("div");
       
       showDatos.innerHTML=`
       
       <div id="muestraVenta" class="row text-center">
                 <div class="col-2">
                     <h6 ">${venta.nombre}</h6>
                 </div>
                 <div class="col-2">
                     <h6 >${venta.precio}</h6>
                 </div>
                 <div class="col-2">
                     <h6 >${venta.cantidad}</h6>
                  </div>
                  <div class="col-2">
                   <h6>${totalPorCerveza}</h6>
               </div> 
               </div> 
                 <div class="col-2">
                  <button type="button" class=" quitar"> Eliminar </button>

                 </div>
               </div>
               </div>    
                 `

       completarProductos.appendChild(showDatos);
  
        
})


let showTotal=document.createElement("div");
showTotal.innerHTML=`
          <div id="precioTotal" class=" d-flex justify-content-end">
          <h3>Total: <span class="totalPrecio">${totalVenta}</span> </h3>
          </div>  `
completarProductos.appendChild(showTotal);

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


/*Elección cerveza con cantidad **/

eleccionCerveza= (e)=> {
  
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
/*Vaciar completamente el carrito **/
 $("#terminar").click(function(e){
    
    vaciarBotonCarrito();
    vaciarH6Carrito();
    vaciarTotalCarrito();
    carritoAux.splice(0);
    carrito.splice(0);
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
/* Funciones que borran contenido del carrito  **/
  function vaciarH6Carrito(){
    let borrarDatos= completarProductos.querySelectorAll("h6");
    //borrar total
    
    for(let i=0; i<=borrarDatos.length-1;i++){ 
        
        borrarDatos[i].parentNode.removeChild(borrarDatos[i]);
       
    }



 }
    
  function vaciarTotalCarrito(){
    let borrar =completarProductos.querySelectorAll("h3");
    
    if (borrar.length>=1){
        borrar[0].parentNode.removeChild(borrar[0]);
    }

 }
  

  function vaciarBotonCarrito(){
       
    let borrarBoton =completarProductos.querySelectorAll(".quitar");
    
    
    for(let i=0; i<=borrarBoton.length-1;i++){ 
        
        borrarBoton[i].parentNode.removeChild(borrarBoton[i]);

    }
 }

 /*Ventanas para mostrar información **/

$("#divShowStock").hide();

$("#divShowStock").css("width", "1100px");
$("#divShowStock").css("height", "200px");
$("#divShowStock").css("background-color","#663c5c");


$("#cargar").click(function(e){
    $("#divCarga").slideDown(1000);
       
 }
    )
 
/*Muestra el stock  **/

function vaciarStock(){
       
  let borrar=divShowStock.querySelectorAll("p");
  
  
  for(let i=0; i<=borrar.length-1;i++){ 
      
      borrar[i].parentNode.removeChild(borrar[i]);

  }
}

function cerrar()
{$("#divShowStock").hide();
vaciarStock();

}
        $("#stock").click(function(e){
        $("#divShowStock").slideDown(1000);
        listadoCer=listaCervezas;
    let datosToShow="";
    for (let i=0; i< listadoCer.length-1; i++)
    {
        cerveza=listadoCer[i];
        datosToShow=`Cerveza: ${cerveza.nombre} Cantidad: ${cerveza.stock} Precio: ${cerveza.precio} \n`;
        
        let mensaje=document.createElement("p");

        mensaje.innerHTML=`<p>${datosToShow} </p>`
        divShowStock.appendChild(mensaje);

    } 
    let mensaje=document.createElement("p");

    mensaje.innerHTML=`<button type="button" class="btn-close" aria-label="Cerrar" onclick="cerrar()"></button> `;
    divShowStock.appendChild(mensaje);

   actualizarStock(listadoCer);
   

 }
               
  )
