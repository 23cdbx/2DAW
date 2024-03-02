// Variables
let modal;
let fondo;
let codigo;
let numero;
let data;
let data2 = [];
let data3;
let estadoSeleccionado;

window.onload = function () {
    
    modal = document.getElementById("modal");
    fondo = document.getElementById("fondo");

    añadeEvento();

};
// Esta funcion añade un addEventListener al hacer click en un estado, se llama en window.onload 
function añadeEvento() {
    let estados = document.querySelectorAll("area");
    for (let estado of estados) {
        estado.addEventListener("click", function() {
            estadoSeleccionado = this;
            codigo = this.dataset.cod;
            cargarDatos(codigo);
        });
    }
}
// Le quita la clase "oculto" al modal y al fondo, llamo a la funcion "mostrarDatos" y le pongo un addEventListener a fondo como si fuese un boton de "x";
function mostrarModal() {
    modal.classList.remove("oculto");
    fondo.classList.remove("oculto");

    mostrarDatos(estadoSeleccionado);

    fondo.addEventListener("click", ocultarModal);
}
// Le añade la clase "oculto" al modal y al fondo
function ocultarModal() {
    modal.classList.add("oculto");
    fondo.classList.add("oculto");
}

// Funcion que se encarga de cargar los datos de las distintas apis. Llama al final a la funcion "mostrarModal".
async function cargarDatos(codigo){

    let url1 = `https://api.covidtracking.com/v1/states/${codigo.toLowerCase()}/info.json`;
    await fetch(url1).then(datos => datos.json()).then(info => {
        data = info;
        numero = info.fips;
    });
    for(let i = 0; i <= 2; i++){
        let url2 = `https://api.census.gov/data/2019/pep/charagegroups?get=POP&HISP=${i}&for=state:${numero}`;
        await fetch(url2).then(datos => datos.json()).then(info => {
            console.log(`HISPANOS(${i}): ${info[1][0]} `);
            data2[i] = info;
        });
    }
    let url3 = `https://api.covidtracking.com/v1/states/${codigo.toLowerCase()}/current.json`;
    await fetch(url3).then(datos => datos.json()).then(info => {
        data3 = info;
    });

    mostrarModal();
}

// Funcion que se encarga de mostrar en pantalla los datos necesarios de las apis usando dom.
function mostrarDatos(estado) {

    let titulo = document.getElementById("titulo");
    titulo.innerText = estado.title;

    let poblaciones = document.querySelectorAll(".poblacion");
    poblaciones[0].innerText = data2[0][1][0]+"\n [100%]";
    poblaciones[1].innerText = data2[1][1][0]+"\n ["+calculadoraPorcentajes(data2[0][1][0], data2[1][1][0])+"%]";
    poblaciones[2].innerText = data2[2][1][0]+"\n ["+calculadoraPorcentajes(data2[0][1][0], data2[2][1][0])+"%]";

    let notas = document.getElementById("notas");
    notas.innerText = data.notes;

    let descripcion = document.querySelectorAll(".descripcion");

    let fecha = data3.date;
    let fechaString = fecha.toString();
    let anio = parseInt(fechaString.slice(0, 4));
    let mes = parseInt(fechaString.slice(4, 6));
    let dia = parseInt(fechaString.slice(6, 8));

    let fechaFormateada = dia+"/"+mes+"/"+anio;

    descripcion[0].innerText = fechaFormateada;
    descripcion[1].innerText = data3.death+"\n ["+calculadoraPorcentajes(data2[0][1][0], data3.death)+"%]";
    descripcion[2].innerText = data3.deathIncrease+"\n ["+calculadoraPorcentajes(data2[0][1][0], data3.deathIncrease)+"%]";
    descripcion[3].innerText = data3.hospitalizedCurrently+"\n ["+calculadoraPorcentajes(data2[0][1][0], data3.hospitalizedCurrently)+"%]";
    descripcion[4].innerText = data3.hospitalizedIncrease+"\n ["+calculadoraPorcentajes(data2[0][1][0], data3.hospitalizedIncrease)+"%]";
    descripcion[5].innerText = data3.totalTestResults+"\n ["+calculadoraPorcentajes(data2[0][1][0], data3.totalTestResults)+"%]";
    descripcion[6].innerText = data3.totalTestResultsIncrease+"\n ["+calculadoraPorcentajes(data2[0][1][0], data3.totalTestResultsIncrease)+"%]";
    descripcion[7].innerText = data3.positive+"\n ["+calculadoraPorcentajes(data2[0][1][0], data3.positive)+"%]";
    descripcion[8].innerText = data3.positiveIncrease+"\n ["+calculadoraPorcentajes(data2[0][1][0], data3.positiveIncrease)+"%]";
    descripcion[9].innerText = data3.negative+"\n ["+calculadoraPorcentajes(data2[0][1][0], data3.negative)+"%]";
    descripcion[10].innerText = data3.negativeIncrease+"\n ["+calculadoraPorcentajes(data2[0][1][0], data3.negativeIncrease)+"%]";
}

// Funcion que se encarga de calcular los porcentajes, tanto de la poblacion, como del resto.
function calculadoraPorcentajes(valor1, valor2){
    let calculo = valor2*100/valor1;
    return calculo.toFixed(2);
}