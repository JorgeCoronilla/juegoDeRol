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

        if (i%2 == 0 ){
            var mesa = {
                numero: `${i}`,
                estado: 'cerrada',
                id_camarero: 0,
                comanda: []
            } }else {
                var mesa = {
                    numero: `${i}`,
                    estado: 'abierta',
                    id_camarero: 2,
                    comanda: []
                }

            }
            listaMesas.push(mesa);

        }
       /* var mesa = {
            numero: `${i}`,
            estado: 'cerrada',
            id_camarero: 0,
            comanda: []
        }*/
    
    
    subir("mesa", JSON.stringify(listaMesas));

    var menu = {
        "id_articulo": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        'nombre': ['tinto', 'blanco', 'cerveza', 'refresco', 'zumo', 'café', 'café especial', 'gazpacho', 'ensalada mixta', 'ensaladilla', 'lasaña', 'puré de verduras', 'secreto ibérico', 'escalope de pollo', 'bacalao a la riojana', 'hamburguesa', 'tarta de queso', 'fruta del tiempo', 'flan de la casa', 'tarta de la abuela'],
        'precio': [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5]
    }
    subir('menu', JSON.stringify(menu));
}


var camareroPrueba = {
    id_camarero: 1,
    nombre_camarero: `Jorge`,
    password: "1234",
    mesasActuales: {},
    mesasAtendidas: {}
}

iniciar();
function camareroIn() {
    var camareros = JSON.parse(bajar('camarero'));
    var camareroActual = camareros[1]
    var mesas = JSON.parse(bajar('mesa'));
    document.getElementById('c_nombre').innerText = camareros[1].nombre_camarero
    console.log(mesas);
    cargarMesas(camareroActual, mesas);
}

function cargarMesas(camareroActual, mesas) {

    for (let i = 0; i < 10; i++) {
        if (mesas[i].estado == 'abierta' && mesas[i].id_camarero == camareroActual.id_camarero) {
            var divMesa = document.createElement('button');
            divMesa.className = `c_mesasA mesa${i}`;
            divMesa.addEventListener('click', () => { checkMesa(`${i+1}`); })
            var numero = document.createTextNode((mesas[i].numero));
            divMesa.appendChild(numero);
            document.querySelector('.c_cpntainer1').appendChild(divMesa);
        }
        if (mesas[i].estado == 'cerrada') {
            var divMesa = document.createElement('button');
            divMesa.className = `c_mesasC mesa${i}`;
            divMesa.addEventListener('click', () => { checkMesa(`${i+1}`); })
            var numero = document.createTextNode((mesas[i].numero));
            divMesa.appendChild(numero);
            document.querySelector('.c_cpntainer2').appendChild(divMesa);
        }
    }
}

    function checkMesa(num){
console.log(num);
    }

    function historial(camarero) {

    }
