
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

IDS PARA EL HTML ==>> a_xxxx = admin.html, c_xxxx = camarero.html, m_xxxx = mesa.html 

*/

function subir(clave, valor) {
    localStorage.setItem(clave, valor);
}
function bajar(clave) {
    return localStorage.getItem(clave);
}

//
function iniciarTicket() {
    var fecha = new Date;
    var fechaticket = fecha.getDay() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes()
    var ticket = {
        id_ticket: 0,
        fecha: fechaticket,
        id_mesa: 0,
        nombre_camarero: "camarero3",
        comanda: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        total: 0,
        pagado: false,
    }
    subir("ticket", JSON.stringify(ticket))
}
function guardarTicket() {
    var fecha = new Date;
    var fechaticket = fecha.getDay() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes();
    var ticketsLista = [JSON.parse(localStorage.getItem("ticket"))];
    console.log(ticketsLista)
    var id_anterior = ticketsLista[ticketsLista.length - 1].id_ticket;
    var ticket = {
        id_ticket: id_anterior + 1,
        fecha: fechaticket,
        id_mesa: 0,
        nombre_camarero: "camarero3",
        comanda: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        total: 0,
        pagado: false,
    };
    ticketsLista.push(ticket);
    subir("ticket", JSON.stringify(ticketsLista));
}

//Inicializamos datos basicos para el restaurante: menu, mesa y camareros
function iniciar() {
    if (localStorage.length == 0) {
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
                comanda: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
            listaMesas.push(mesa);
        }

        subir("mesa", JSON.stringify(listaMesas));

        var menu = {
            "id_articulo": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            'nombre': ['tinto', 'blanco', 'cerveza', 'refresco', 'zumo', 'café', 'café especial', 'gazpacho', 'ensalada mixta', 'ensaladilla', 'lasaña', 'puré de verduras', 'secreto ibérico', 'escalope de pollo', 'bacalao a la riojana', 'hamburguesa', 'tarta de queso', 'fruta del tiempo', 'flan de la casa', 'tarta de la abuela', 'Varios'],
            'precio': [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5]
        }
        subir('menu', JSON.stringify(menu));
    }
}

//---------------------------------------- FUNCIONES INDEX ---------------------------------
//Funcion logIn de camareros y admin

function iniciarSesion() {
    let loginUser = document.getElementById("a_nombre").value;
    let loginPass = document.getElementById("password").value;
    let users = JSON.parse(localStorage.camarero);
    let username = users.map(element => element.nombre_camarero);
    let password = users.map(element => element.password);
    let id_camarero = users.map(element => element.id_camarero);
    if (loginUser == "admin" && loginPass == "nimda") {
        window.location = "admin.html"
    }
    else {
        console.log(username.length)
        console.log(username)
        console.log(loginUser)
        console.log(loginPass)
        console.log(password)
        loginok = false
        for (let i = 0; i < username.length; i++) {
            if (loginUser == username[i] && loginPass == password[i]) {
                window.location = "camarero.html";
                localStorage.setItem("camareroActual", id_camarero[i]);
                loginok = true
            }
        }
        if (!loginok) { alert("Usuario y/o contraseña incorrecta") }
    }
}

// Funcion para que el cliente pueda ver el ticket de su consumicion y pagarlo.

function imprimirTicket(id_ticket_entrada) {
    let tabla = document.getElementById("t_tabla");
    let articulos = JSON.parse(localStorage.menu).nombre;
    console.log(articulos)
    let precios = JSON.parse(localStorage.menu).precio;
    console.log(precios)
    let ticketsLista = JSON.parse(localStorage.ticket);
    console.log("Lista de todos los tickets: " + ticketsLista)
    let ticket = ticketsLista.filter((element) => {
        if (element.id_ticket == id_ticket_entrada) {
            return element
        }
    })
    console.log("ticket: " + ticket)
    let comanda = ticket[0].comanda;
    console.log(comanda)
    var totalCuenta = 0;
    for (let i = 0; i < comanda.length; i++) {
        if (comanda[i] > 0) {
            var fila = document.createElement("tr");
            var articulo = document.createElement("td");
            var precio = document.createElement("td");
            var cant = document.createElement("td");
            var total = document.createElement("td");
            articulo.innerHTML = articulos[i];
            precio.innerHTML = precios[i];
            cant.innerHTML = comanda[i];
            total.innerHTML = comanda[i] * precios[i];
            fila.appendChild(articulo);
            fila.appendChild(cant);
            fila.appendChild(precio);
            fila.appendChild(total);
            tabla.appendChild(fila);
            totalCuenta += (comanda[i] * precios[i]);
        }
    }
    var p_total = document.getElementById("t_total");
    p_total.innerText = `${totalCuenta} €`;
    var p_camarero = document.getElementById("t_nombreCamarero");
    p_camarero.innerText = ticket[0].nombre_camarero;
    var p_id_ticket = document.getElementById("t_id_ticket");
    p_id_ticket.innerText = ticket[0].id_ticket;
    var p_id_mesa = document.getElementById("t_id_mesa");
    p_id_mesa.innerText = ticket[0].id_mesa;
}

function consulta_ticket(id_ticket) {
    localStorage.setItem("ticketSeleccionado", id_ticket);
    window.location = "ticket.html";
}


// ---------------------------------------PASARELA DE PAGO -----------------------------------
function pagar() {
    var ticketSeleccionado = localStorage.ticketSeleccionado
    console.log(ticketSeleccionado)
    var precio = JSON.parse(localStorage.ticket)[ticketSeleccionado].total
    console.log(precio)
    var p_total = document.getElementById("p_total")
    p_total.innerText = precio + "€"
}

function checkPago() {
    var visa = document.getElementById("num_tarjeta").value
    console.log(visa)
    var regexp = /^(?:4\d([\- ])?\d{6}\1\d{5}|(?:4\d{3}|5[1-5]\d{2}|6011)([\- ])?\d{4}\2\d{4}\2\d{4})$/
    var validation = true
    var validationCard = regexp.test(visa)
    console.log(validationCard)
    console.log((visa.match(/^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/)))
    console.log((visa.match(/^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/)))
    var nombre = document.getElementById("nombre_tarjeta").value;
    if (!nombre.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) {
        alert("El nombre introducido no es válido.");
        validation = false;
    }
    var mes = document.getElementById("mes_tarjeta").value;
    var ano = document.getElementById("ano_tarjeta").value;
    if (mes.length != 2 && mes <= 12) {
        alert("El Mes debe estar escrito con dos cifras.")
        validation = false;
    }

    if (ano.length != 2 && ano >= 22) {
        alert("El Año debe estar escrito con dos cifras.")
        validation = false;
    }
    var cvv = document.getElementById("cvv").value
    if (cvv.length != 3) {
        alert("El CVV debe tener tres cifras")
        validation = false
    }
    if (!validationCard) { alert("El número de tarjeta introducido no es Visa o Mastercard") }
    if (validation && validationCard) {
        alert("Operación finalizada con éxito.")
        window.location = "index.html"
    }

}
// ---------------------------------------------- FUNCIONES ADMIN -------------------------------------

function mostrarDatos() {
    let users = JSON.parse(localStorage.camarero);
    let username = users.map(element => element.nombre_camarero);
    let password = users.map(element => element.password);
    var placeholders_name = document.getElementsByClassName("userName");
    var placeholders_pass = document.getElementsByClassName("userPass");
    console.log(placeholders_name)
    console.log(placeholders_pass)
    for (let i = 0; i < placeholders_name.length; i++) {
        placeholders_name[i].placeholder = username[i];
        placeholders_pass[i].placeholder = password[i];
    };
}
function guardarCambios(){
    var name = document.getElementsByClassName("userName").value;
    var pass = document.getElementsByClassName("userPass").value;
    var placeholders_name = document.getElementsByClassName("userName");
    var placeholders_pass = document.getElementsByClassName("userPass");
    let users = JSON.parse(localStorage.camarero);
    for (let i = 0; i < placeholders_name.length; i++) {
        placeholders_name[i].placeholder = username[i];
        placeholders_pass[i].placeholder = password[i];
    };
}





//---------------------------------------- GRAFICA RESULTADOS -------------------------------------------------------------------------------------
const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
];

const data = {
    labels: labels,
    datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {}
};
/* const myChart = new Chart(
    document.getElementById('myChart'),
    config
); */


//Baja datos de las mesas y camarero logueado - llama a la función que carga la info
function camareroIn() {
    var camareros = JSON.parse(bajar('camarero'));
    var camareroActual = (camareros[1])
    //var camareroActual = parseInt(camareroActual);
    var mesas = JSON.parse(bajar('mesa'));
    document.getElementById('c_nombre').innerText = camareros[1].nombre_camarero
    cargarMesas(camareroActual, mesas);
}


function borra() {
    var mesasA = document.querySelector('.c_cpntainer1');
    var mesasC = document.querySelector('.c_cpntainer2');
    var mesasR = document.querySelector('.c_cpntainer3');
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
function checkMesa(indice, camareroActual) {
    var mesasArriba = JSON.parse(bajar('mesa'));
    mesasArriba[indice].estado = 'abierta';
    mesasArriba[indice].id_camarero = camareroActual.id_camarero;
    subir('mesa', JSON.stringify(mesasArriba));
    camareroIn();
    enviaMesa(indice)
}

function enviaMesa(indice) {
    subir('mesaActual', indice);
    window.location = "mesa.html"
}
function historial(camareroActual) {
    var tickets = JSON.parse(bajar('ticket'));
    console.log("Entra en tickets");
    console.log(tickets);
    console.log(camareroActual);
    console.log(camareroActual.nombre_camarero)
    for (let i = 0; i < tickets.length; i++) {
        console.log(tickets[i].nombre_camarero)
        if (tickets[i].nombre_camarero == camareroActual.nombre_camarero) {
            var idTicket = parseInt(tickets[i].id_ticket)
            var botonTicket = document.createElement('button');
            botonTicket.className = `c_ticket`;
            botonTicket.addEventListener('click', () => { imprimirTicket(idTicket); })
            var id = document.createTextNode(`Fecha: ${tickets[i].fecha} | id: ${idTicket}`);
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


//Iniciar desplegables del Menu
function iniciarDesplegables() {
    var menu = JSON.parse(localStorage.getItem('menu'));
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
    //Recoger mesaActual
    var mesa = JSON.parse(localStorage.getItem('mesa'));
    // localStorage.setItem('mesaActual', 1);
    var mesaActual = parseInt(localStorage.getItem('mesaActual'));
    document.querySelector('h1').innerHTML = 'Mesa' + ' ' + mesaActual;
    document.querySelector('#m_cerrarMesa').innerHTML = 'Cerrar Mesa' + ' ' + mesaActual;
    var comanda = mesa[mesaActual].comanda;

    //Añadir cantidades
    var spanCantidad = document.getElementsByClassName('cantidad');
    var li = document.getElementsByTagName('li');

    var añadir = document.getElementById('m_añadir');
    añadir.addEventListener('click', () => {
        for (let i = 0; i < li.length; i++) {
            let cantidad = spanCantidad[i].innerHTML;
            if (cantidad > 0) {
                comanda[i] = parseInt(comanda[i]) + parseInt(cantidad);
                spanCantidad[i].innerHTML = 0;
            }
        }
        mesa[mesaActual].comanda = comanda;
        localStorage.setItem('mesa', JSON.stringify(mesa));
    });
    return [mesa, mesaActual]
}

//funcion desplegables para reutilizar en los clicks
function desplegar(desplegable) {
    let display = desplegable.style.display;
    if (display == 'none') {
        desplegable.style.display = 'block';
    } else {
        desplegable.style.display = 'none';
    }
}
//TICKET
class Ticket {
    constructor(id_ticket, fecha, id_mesa, nombre_camarero, comanda, total, pagado) {
        this.id_ticket = id_ticket;
        this.fecha = fecha;
        this.id_mesa = id_mesa;
        this.nombre_camarero = nombre_camarero;
        this.comanda = comanda;
        this.total = total;
        this.pagado = pagado;
    }

    get ticketInfo() {
        return "Dimension1: " + this.dimension1 + "\nDimension2" + this.dimension2 + "\n";
    }
    set ticketInfo(dimensiones) {
        this.dimension1 = dimensiones[0];
        this.dimension2 = dimensiones[1];
    }

}

//Cerrar Mesa
function cerrarMesa(mesa, mesaActual) {
    var fecha = new Date;
    var fechaticket = fecha.getDay() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes();
    let users = JSON.parse(localStorage.camarero);
    let username = users.map(element => element.nombre_camarero);
    var camareroActual = localStorage.getItem("camareroActual")
    switch (camareroActual) {
        case "1": camareroActual = username[0]
            break;
        case "2": camareroActual = username[1]
            break;
        case "3": camareroActual = username[2]
            break;
        case "4": camareroActual = username[3]
            break;
    }
    var menu = JSON.parse(localStorage.getItem('menu'));
    var total = 0;
    var pagado = false;
    var ticketsLista = JSON.parse(localStorage.getItem("ticket"));
    var inicioTicket = [];
    for (let i = 0; i < mesa[mesaActual].comanda.length; i++) {
        total += mesa[mesaActual].comanda[i] * menu.precio[i];
    }
    /*     var p = new Puntuacion(date, aciertos);
    var puntuaciones = [];
    // recogemos la info del storage, le añadimos el ultimo resultado y volvemos a guardar
    var historial = localStorage.getItem("historial");
    if (!historial) {
        puntuaciones.push(p);
        localStorage.setItem("historial", JSON.stringify(puntuaciones));
    } else {
        historial = JSON.parse(historial);
        historial.push(p);
        localStorage.setItem("historial", JSON.stringify(historial));
    } */
    if (!ticketsLista) {
        var newTicket = new Ticket(0, fechaticket, mesaActual, camareroActual, mesa[mesaActual].comanda, total, pagado);
        inicioTicket.push(newTicket);
        localStorage.setItem("ticket", JSON.stringify(inicioTicket))
    } else {
        var id_anterior = ticketsLista[ticketsLista.length - 1].id_ticket + 1;
        console.log(ticketsLista)
        var newTicket = new Ticket(id_anterior, fechaticket, mesaActual, camareroActual, mesa[mesaActual].comanda, total, pagado);
        ticketsLista.push(newTicket);
        localStorage.setItem("ticket", JSON.stringify(ticketsLista))
    }
    //constructor(id_ticket, fecha, id_mesa, nombre_camarero, comanda, total, pagado)
    mesa[mesaActual].estado = 'cerrada';
    mesa[mesaActual].comanda = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    localStorage.setItem('mesa', JSON.stringify(mesa));
}


window.addEventListener('load', () => {
    iniciarDesplegables();
    sumarYRestar();
    var añadir = añadirComanda();

    var cerrar = document.querySelector('#m_cerrarMesa');
    cerrar.addEventListener('click', () => {
        cerrarMesa(añadir[0], añadir[1]);
    });

    //Estilo desplegable
    var desplegables = document.getElementsByClassName('m_desplegables');
    var opciones = document.querySelectorAll('.m_opciones h2');
    for (let i = 0; i < opciones.length; i++) {
        opciones[i].addEventListener('click', () => {
            desplegar(desplegables[i]);
        });
    }
});



//Ver comanda en el cuerpo de la Mesa Actual
//Guardar id ticket, comanda mesa actual,
// TICKETS.html == Imprimir el numero de mesa, camarero id tickets.
// pago.html == crear la pasarela
// admin.html == mostrar rendimiento camareros en grafica.