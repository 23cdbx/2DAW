//Variables para la seleccion por parte de la maquina, del color a eliminar
let colores = ["rojo", "verde", "azul"];
let color;

//Cronometro
let horas = 0;
let minutos = 0;
let segundos = 0;
let intervalo;

//Elementos HTML
let cronometro;
let tablero;
let jugar;
let queEliminar;

//Dimensiones de la pantalla, para establecer donde tienen que crearse las pelotas
let anchoPantalla;
let altoPantalla;

//Selector de numero de pelotas por partida
let numeroPelotas = 0;

//Modos de juego
let modoTodas = false;
let modoUna = false;

let cuentaPelotas = 0;

//Modo eliminar un color
let fallos = 0;
let aciertos = 0;


window.onload = function () {
    numeroPelotas = document.getElementById("cantidad");

    //Resolucion pantalla
    anchoPantalla = screen.width;
    altoPantalla = screen.height;

    //tablero de juego
    tablero = document.getElementById("tablero");
    //Cronometro
    cronometro = document.getElementById("hms");
    //Boton jugar
    jugar = document.getElementById("jugar");
    //Modo de juego
    queEliminar = document.getElementById("queEliminar");

    jugar.addEventListener("click", comenzar);
    cronometro.innerText = "00:00:00"

    botonesFormulario();
}

//Funcion para el funcionamiento de los botones de modo
function botonesFormulario() {
    let botones = document.getElementById("queEliminar").getElementsByTagName("div");
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", seleccionar);
    }
}

//Funcion para colorear los botones de modo
function seleccionar() {
    let botones = document.getElementById("queEliminar").getElementsByTagName("div");
    for (let i = 0; i < botones.length; i++) {
        botones[i].classList.toggle("seleccionado");
    }
}

//Funcion que genera el color a eliminar
function avisoColor() {
    let numero = aleatorio(2);
    console.log("posicion: " + numero);
    color = colores[numero];
    let texto = document.createTextNode("Tienes que eliminar las pelotas de color:");
    let pelota = document.createElement("div");
    let boton = document.createElement("button");
    let modo = document.getElementById("modo");
    boton.innerText = "Jugar";
    boton.addEventListener("click", generarPelotas);
    pelota.className = "selectorColor " + color;
    modo.innerHTML = "";
    modo.appendChild(texto);
    modo.appendChild(pelota);
    modo.appendChild(boton);
    modoUna = true;
}
/*************************************CODIGO A COMPLETAR****************************************/
function comenzar() {
    /**Seleccionamos el numero de pelotas.
    Comprobamos el modo de juego y, o bien vamos a avisoColor() que nos genera un color que eliminar, o bien vamos
    directamente a generarPelotas()**/
    let modoJuego = document.getElementsByClassName("seleccionado")[0].id;
    if (modoJuego === "modoTodas") {
        generarPelotas();
        modoTodas = true;
    } else {
        avisoColor();
    }
}



//Funion que genera el numero de pelotas seleccionado
function generarPelotas() {

    /**En funcion del modo de juego, crearemos todas con color aleatorio, o el 50% del color indicado, y el resto de
    forma aleatoria.
    Las pelotas deben tener unas dimensiones entre 10px y 200px de lado, y deben aparecer dentro de las dimensiones
    del tablero.
    Comienza a andar el cronometro**/
    cronometrar();
    if (modoUna) {
        modo.classList.add("ocultar");
        for (let i = 0; i < numeroPelotas.value; i++) {
            crearPelota();
        }
    } else {
        modo.classList.add("ocultar");
        for (let i = 0; i < numeroPelotas.value; i++) {
            crearPelota();
        }
    }
}

function pintar() {
    if (modoUna) {
        if (color === "rojo") {
            colorcete = "rgb(" + 0 + ", " + aleatorio(0, 255) + ", " + aleatorio(0, 255) + ")";
        } else if (color === "verde") {
            colorcete = "rgb(" + aleatorio(0, 255) + ", " + 0 + ", " + aleatorio(0, 255) + ")";
        } else if (color === "azul") {
            colorcete = "rgb(" + aleatorio(0, 255) + ", " + aleatorio(0, 255) + ", " + 0 + ")";
        }
        return colorcete;
    } else {
        colorcete = "rgb(" + aleatorio(0, 255) + " " + aleatorio(0, 255) + " " + aleatorio(0, 255) + ")";
        return colorcete;
    }
}

let contador = 0;
function darColor(pelota) {
    let mitad = numeroPelotas.value / 2;
    if (contador < mitad) {
        pelota.style.background = pintar();
        contador++;
    } else {
        pelota.classList.add(color);
    }
}

//Funcion que crea cada pelota con los parametros ancho, alto y posicion de forma aletoria y la devuelve.
function crearPelota() {
    let pelota = document.createElement("div");
    let top = aleatorio(0, 80);
    let left = aleatorio(0, 80);
    let random = aleatorio(10, 200);
    pelota.style.top = top + "%";
    pelota.style.left = left + "%";
    pelota.style.width = random;
    pelota.style.height = random;
    pelota.classList.add("pelota");
    tablero.appendChild(pelota);
    pelota.addEventListener("dblclick", eliminarPelota);
    if (modoUna) {
        darColor(pelota);
    } else {
        pelota.style.background = pintar();
    }
    return pelota;
}

function eliminarPelota() {
    //Eliminamos la pelota
    //Sumamos aciertos en funcion del modo
    this.classList.add("ocultar");
    let aciertoPantalla = document.getElementById("aciertos");
    if (modoUna) {
        if (!this.classList.contains(color)) {
            fallos = document.getElementById("fallos");
            fallos.innerText++;
            cuentaPelotas++;
        } else {
            aciertoPantalla.innerText++;
            aciertos++;
            cuentaPelotas++;
            console.log(aciertos);
        }
        if (aciertos >= numeroPelotas.value / 2) {
            finPartida();
        }
    } else {
        aciertoPantalla.innerText++;
        cuentaPelotas++;
        if (cuentaPelotas >= numeroPelotas.value) {
            finPartida();
        }
    }
}

//Funcion que convierte a segundos en funcion de lo que indiquen las variables horas, minutos y segundos.
function convertirASegundos() {
    let resultado = segundos + (minutos * 60) + (horas * 3600);
    return resultado;
}

/*********************************************FIN CODIGO A COMPLETAR**************************/
function finPartida() {
    parar();
    let mensajeFinal;
    if (modoUna) mensajeFinal = "Has eliminado " + cuentaPelotas + " pelotas, " + aciertos + " de color " + color + ", en " + convertirASegundos() + " segundos";
    else mensajeFinal = "Has eliminado " + cuentaPelotas + " pelotas, en " + convertirASegundos() + " segundos";
    tablero.innerHTML = mensajeFinal;
}

function aleatorio(max, min) {
    if (min) return Math.round(Math.random() * (max - min) + min);
    else return Math.round(Math.random() * max);
}

/**********************CRONOMETRO***************************/
//Comienza a cronometrar
function cronometrar() {
    crearReloj();
    intervalo = setInterval(crearReloj, 1000);
}

function crearReloj() {
    let hAux, mAux, sAux;
    segundos++;
    if (segundos > 59) {
        minutos++;
        segundos = 0;
    }
    if (minutos > 59) {
        horas++;
        minutos = 0;
    }
    if (horas > 24) horas = 0;

    if (segundos < 10) sAux = "0" + segundos;
    else sAux = segundos;
    if (minutos < 10) mAux = "0" + minutos;
    else mAux = minutos;
    if (horas < 10) hAux = "0" + horas;
    else hAux = horas;

    cronometro.innerText = hAux + ":" + mAux + ":" + sAux;
}
//Detiene el cronometro
function parar() {
    clearInterval(intervalo);
}