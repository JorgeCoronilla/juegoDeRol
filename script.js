/*

Localstorage

OBJETO CAMARERO 
- id_camarero : 1 - 4
- nombre_camarero: "fulanito"
- password: "pass"
- mesas actuales: {[id_mesa] , ...}
- mesas atendidas: {["fecha": date , "id_tiket" : 04094 , "total" : €]}
*/

/* 
menu = {
    id: []
    nombre:[] 
    precio:[]
}
*/

/*
ticket{
    id_ticket:'numero'
    fecha: getdate()
    id_mesa: 1-10 
    nombre_camarero: ""
    comanda:
    total: 
    pagado: true o false
}
*/
function subir(clave, valor) {
    localStorage.setItem(clave, valor);
}
function bajar(clave) {
    return localStorage.getItem(clave);
}
function iniciar() {
    var listaCamareros = [];
    for (let i = 1; i < 5; i++) {
        var camarero = {
            id_camarero: `${i}`,
            nombre_camarero: `camarero${i}`,
            password: "1234",
            mesasActuales: {},
            mesasAtendidas: {}
        }
        listaCamareros.push(camarero);
    }
    subir("camarero", JSON.stringify(listaCamareros))

    var listaMesas = [];
    for (let i = 1; i < 11; i++) {

        var mesa = {
            numero: `${i}`,
            estado: 'cerrada',
            id_camarero: 0,
            comanda: []
        }
    
    
    subir("mesa", JSON.stringify(listaMesas));

    var menu = {
        "id_articulo": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        'nombre': ['tinto', 'blanco', 'cerveza', 'refresco', 'zumo', 'café', 'café especial', 'gazpacho', 'ensalada mixta', 'ensaladilla', 'lasaña', 'puré de verduras', 'secreto ibérico', 'escalope de pollo', 'bacalao a la riojana', 'hamburguesa', 'tarta de queso', 'fruta del tiempo', 'flan de la casa', 'tarta de la abuela'],
        'precio': [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5]
    }
    subir('menu', JSON.stringify(menu));
}
}

var camareroPrueba = {
    id_camarero: 1,
    nombre_camarero: `Jorge`,
    password: "1234",
    mesasActuales: {},
    mesasAtendidas: {}
}

//Baja datos de las mesas y camarero logueado - llama a la función que carga la info
function camareroIn() {
    var camareros = JSON.parse(bajar('camarero'));
    var camareroActual = (camareros[1])
    //var camareroActual = parseInt(camareroActual);
    var mesas = JSON.parse(bajar('mesa'));
    document.getElementById('c_nombre').innerText = camareros[1].nombre_camarero
    cargarMesas(camareroActual, mesas);
}


function borra () {
    var mesasA =document.querySelector('.c_cpntainer1');
    var mesasC =document.querySelector('.c_cpntainer2');
    var mesasR =document.querySelector('.c_cpntainer3');
    borrarChild(mesasA);
    borrarChild(mesasC);
    borrarChild(mesasR);
}
//CARGA LA INFO EN EL HTML CAMARERO: MESAS ABIERTAS/OCUPADAS Y LIBRES
function cargarMesas(camareroActual, mesas) {
    //BORRA MESAS ANTERIORES PARA ACTUALIZAR
        borra();
    for (let i = 0; i < 10; i++) {
        //FILTRA MESAS ABIERTAS DEL CAMARERO Y LAS PINTA
        if (mesas[i].estado == 'abierta' && mesas[i].id_camarero == camareroActual.id_camarero) {
            var divMesa = document.createElement('button');
            divMesa.className = `c_mesasA`;
            divMesa.addEventListener('click', () => { enviaMesa(i); })
            var numero = document.createTextNode((mesas[i].numero));
            divMesa.appendChild(numero);
            document.querySelector('.c_cpntainer1').appendChild(divMesa);
        }
        
        //FILTRA MESAS DISPONIBLES Y LAS PINTA
        if (mesas[i].estado == 'cerrada') {
            var divMesa = document.createElement('button');
            divMesa.className = `c_mesasC`;
            divMesa.addEventListener('click', () => { checkMesa(i, camareroActual); })
            var numero = document.createTextNode((mesas[i].numero));
            divMesa.appendChild(numero);
            document.querySelector('.c_cpntainer2').appendChild(divMesa);
        }

         //FILTRA MESAS ABIERTAS DE OTROS CAMAREROS Y LAS PINTA
         if (mesas[i].estado == 'abierta' && mesas[i].id_camarero != camareroActual.id_camarero) {
            var divMesa = document.createElement('button');
            divMesa.className = `c_mesasR`;
            var numero = document.createTextNode(mesas[i].numero);
            divMesa.appendChild(numero);
            document.getElementsByClassName("c_cpntainer3")[0].appendChild(divMesa);
        }
    }
    historial(camareroActual);
}

//ENVÍA LA MESA A MESA.HTML
    function checkMesa(indice, camareroActual){
        var mesasArriba = JSON.parse(bajar('mesa'));
        mesasArriba[indice].estado = 'abierta';
        mesasArriba[indice].id_camarero = camareroActual.id_camarero;
        subir('mesa', JSON.stringify(mesasArriba));
        camareroIn();
        enviaMesa(indice)
    }

    function enviaMesa(indice){
        subir('mesaActual', indice);

    }
    function historial(camareroActual) {
        var tickets= JSON.parse(bajar('ticket'));
        console.log("Entra en tickets");
        console.log(tickets);
        console.log(camareroActual);
        console.log(camareroActual.nombre_camarero)
        for (let i=0;i<tickets.length;i++) {
            console.log(tickets[i].nombre_camarero)
            if (tickets[i].nombre_camarero == camareroActual.nombre_camarero) {
                var idTicket = parseInt(tickets[i].id_ticket)
                var botonTicket = document.createElement('button');
                botonTicket.className = `c_ticket`;
                botonTicket.addEventListener('click', () => { imprimirTicket(idTicket); })
                var id = document.createTextNode(`Fecha: ${tickets[i].fecha} | id: ${idTicket}` );
                botonTicket.appendChild(id);
                document.querySelector('c_historial').appendChild(botonTicket);
            }
        }
    }

    function borrarChild(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

   