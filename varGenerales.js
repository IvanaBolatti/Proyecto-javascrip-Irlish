var resp="s";
var nombre="";
var cart = [];
var carrito=[];
var contador=0;
var lista= [];
var listaCervezas=[];
var botonSacar=[];
var id=0;
var botones=[];
var totalVenta=0;
var paso=0;
var carritoAux=[];

var idCervezaUbicacion=0;
var nombre="";
var email="";
var comentario="";
var edad="";
class cervezas{
    constructor(id, nombre, precio, stock){
        this.id= id;
        this.nombre=nombre;
        this.precio=precio;
        this.stock=stock;
    }
 }

 class venta{
    constructor(id, nombre, precio, cantidad){
      this.id=id;
      this.nombre=nombre;
      this.precio=precio;
      this.cantidad=cantidad;
       
    }
 }

class clientes{
   constructor(nombre, email,edad,comentario){
      this.nombre=nombre;
      this.email=email;
      this.edad=edad;
      this.comentario=comentario;
   }
}
let enJSON=localStorage.getItem("cervezas");
   listaCervezas= JSON.parse (enJSON);


 

             