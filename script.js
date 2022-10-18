function subir(clave, valor) {
    localStorage.setItem(clave, valor);
}
function bajar(clave) {
    localStorage.getItem(clave);
}
//Inicializamos datos basicos para el restaurante: menu, mesa y camareros
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

//Desplegables del Menu
function iniciarDesplegables() {
    var menu = JSON.parse(localStorage.getItem('menu'));
    console.log(menu);
    var desplegables = document.getElementsByClassName('m_desplegables');

    let i = 0;
    while (i < 7) {
        //Bebidas
        let li = document.createElement('li');
        desplegables[0].append(li);
        li.innerHTML = (`<span class = 'articulo'>${menu.nombre[i]}</span>`);

        let span = document.createElement('span');
        span.innerHTML = (` <span class = 'restar'>-</span> <span class='cantidad'>0</span> <span class='sumar'>+</span>`);

        li.append(span);

        i++;
    };

    let j = 7;
    while (j < 12) {
        //Primeros
        let li = document.createElement('li');
        desplegables[1].append(li);
        li.innerHTML = (`<span class = 'articulo'>${menu.nombre[j]}</span>`);

        let span = document.createElement('span');
        span.innerHTML = (` <span class = 'restar'>-</span> <span class='cantidad'>0</span> <span class='sumar'>+</span>`);

        li.append(span);

        j++;
    }

    let k = 12;
    while (k < 16) {
        //Segundos
        let li = document.createElement('li');
        desplegables[2].append(li);
        li.innerHTML = (`<span class = 'articulo'>${menu.nombre[k]}</span>`);

        let span = document.createElement('span');
        span.innerHTML = (` <span class = 'restar'>-</span> <span class='cantidad'>0</span> <span class='sumar'>+</span>`);

        li.append(span);

        k++;
    }

    let m = 16;
    while (m < 20) {
        //Postres
        let li = document.createElement('li');
        desplegables[3].append(li);
        li.innerHTML = (`<span class = 'articulo'>${menu.nombre[m]}</span>`);

        let span = document.createElement('span');
        span.innerHTML = (` <span class = 'restar'>-</span> <span class='cantidad'>0</span> <span class='sumar'>+</span>`);

        li.append(span);

        m++;
    }

}

//Añadir y quitar cantidades de cada elemento del menu
function sumarYRestar() {
    var restar = document.getElementsByClassName('restar');
    var sumar = document.getElementsByClassName('sumar');
    var spanCantidad = document.getElementsByClassName('cantidad');

    for (let i = 0; i < sumar.length; i++) {
        restar[i].addEventListener('click', () => {
            let numero = parseInt(spanCantidad[i].innerHTML);
            if (numero > 0) {
                spanCantidad[i].innerHTML = numero - 1;
            } else {
                spanCantidad[i].innerHTML = numero;
            }

        });
        sumar[i].addEventListener('click', () => {
            let numero = parseInt(spanCantidad[i].innerHTML);
            spanCantidad[i].innerHTML = numero + 1;
        });
    }
}

//Añadir pedidos a la comanda
function añadirComanda() {
    var spanCantidad = document.getElementsByClassName('cantidad');
    var li = document.getElementsByTagName('li');
    var articulo = document.getElementsByClassName('articulo');
    var comanda = [{}];

    var añadir = document.getElementById('m_añadir');
    añadir.addEventListener('click', () => {
        for (let i = 0; i < li.length; i++) {
            let cantidad = spanCantidad[i].innerHTML;
            if (cantidad > 0) {
                console.log(cantidad);
                console.log(articulo[i].innerHTML);
                comanda.push({'articulo': articulo[i].innerHTML, 'cantidad': cantidad});
                console.log(comanda);
            }
        }
    });
}

window.addEventListener('load', () => {
    iniciar();
    iniciarDesplegables();
    sumarYRestar();
    añadirComanda()
});
