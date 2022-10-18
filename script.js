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
    localStorage.getItem(clave);
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
    
    var listaMesas=[];
    for (let i = 1; i < 11; i++) {
        var mesa = {
            numero: `${i}`,
            estado: 'cerrada',
            id_camarero: 0,
            comanda: {}
        }
        listaMesas.push(mesa);
    }
    subir("mesa", JSON.stringify(listaMesas));

    var menu = {
        "id_articulo": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        'nombre': ['tinto', 'blanco', 'cerveza', 'refresco', 'zumo', 'café', 'café especial', 'gazpacho', 'ensalada mixta', 'ensaladilla', 'lasaña', 'puré de verduras', 'secreto ibérico', 'escalope de pollo', 'bacalao a la riojana', 'hamburguesa', 'tarta de queso', 'fruta del tiempo', 'flan de la casa', 'tarta de la abuela'],
        'precio': [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5]
    }
    subir('menu', JSON.stringify(menu));
}


