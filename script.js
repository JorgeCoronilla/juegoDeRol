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
        'nombre': ['tinto', 'blanco', 'cerveza', 'refresco', 'zumo', 'café', 'café especial', 'gazpacho', 'ensalada mixta', 'ensaladilla', 'lasaña', 'puré de verduras', 'secreto ibérico', 'escalope de pollo', 'bacalao a la riojana', 'hamburguesa', 'tarta de queso', 'fruta del tiempo', 'flan de la casa', 'tarta de la abuela', 'Varios'],
        'precio': [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5]
    }
    subir('menu', JSON.stringify(menu));
}

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
function iniciarTicket() {
    var fecha = new Date;
    var fechaticket = fecha.getDay() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes()
    var ticket = {
        id_ticket: 0,
        fecha: fechaticket,
        id_mesa: 3,
        nombre_camarero: "camarero3",
        comanda: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        total: 546,
        pagado: false,
    }
    subir("ticket", JSON.stringify(ticket))
}
function guardarTicket() {
    var fecha = new Date;
    var fechaticket = fecha.getDay() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes();
    var ticketsLista = [JSON.parse(localStorage.getItem("ticket"))];
    console.log(ticketsLista)
    var id_anterior = ticketsLista[ticketsLista.length - 1].id_ticket
    var ticket = {
        id_ticket: id_anterior + 1,
        fecha: fechaticket,
        id_mesa: 3,
        nombre_camarero: "camarero3",
        comanda: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        total: 546,
        pagado: false,
    };
    ticketsLista.push(ticket)
    subir("ticket", JSON.stringify(ticketsLista));
}

function imprimirTicket(id_ticket_entrada) {
    let tabla = document.getElementById("t_tabla");
    let articulos = JSON.parse(localStorage.menu).nombre;
    console.log(articulos)
    let precios = JSON.parse(localStorage.menu).precio;
    console.log(precios)
    let ticketsLista = JSON.parse(localStorage.getItem("ticket"));
    console.log(ticketsLista)
    let ticket = ticketsLista.filter((element) => { 
        if(element.id_ticket == id_ticket_entrada){
            return element
        } })
    console.log(ticket)
    let comanda = ticket[0].comanda;
    console.log(comanda)
    var totalCuenta = 0;
    for(let i=0;i<comanda.length;i++){
        if(comanda[i]>0){
            var fila = document.createElement("tr");
            var articulo = document.createElement("td");
            var precio = document.createElement("td");
            var cant = document.createElement("td");
            var total = document.createElement("td");
            articulo.innerHTML = articulos[i];
            precio.innerHTML = precios[i];
            cant.innerHTML = comanda[i];
            total.innerHTML = comanda[i]*precios[i];
            fila.appendChild(articulo);
            fila.appendChild(cant);
            fila.appendChild(precio);
            fila.appendChild(total);
            tabla.appendChild(fila);
            totalCuenta+=(comanda[i]*precios[i]);
        }
    }
    var p_total = document.getElementById("t_total");
    console.log(p_total)
    console.log(totalCuenta)
    p_total.innerText = `${totalCuenta} €`


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
const myChart = new Chart(
    document.getElementById('myChart'),
    config
);