// Variables globales
let start;
let logo;
let titulo;
let protector;
let buttonAll;
let usuarios;
let zonaCartas;
let alumnos;
let botonAlu;
let botonProf;
let profesores;
let botonAsign;
let modal;
let asignaturas;

// Logica
window.onload = async function() {
    await cargaTodosUsuarios();
    await cargaTodosAlumnos();
    await cargarTodosProfesores();
    await cargarTodasAsignaturas();

    start = document.getElementById("start");
    start.addEventListener("click", empezar);

    buttonAll = document.getElementById("all");
    buttonAll.addEventListener("click", mostrarTodosUsuarios);

    botonAlu = document.getElementById("alumnos");
    botonAlu.addEventListener("click", mostrarTodosAlumnos);

    botonProf = document.getElementById("profesor");
    botonProf.addEventListener("click", mostrarTodosProfesores);

    botonAsign = document.getElementById("botAsign");
    botonAsign.addEventListener("click", mostrarModal);

    zonaCartas = document.getElementById("cartas");

    modal = document.getElementById('asignaturas');
}

function empezar() {
    protector = document.getElementById("protector");
    protector.classList.add("ocultar");

    logo = document.getElementById("logo");
    logo.classList.remove("ocultar");

    titulo = document.getElementById("titulo");
    titulo.classList.add("ocultar");
}

async function cargaTodosUsuarios(){
    let url = "http://diegogarcia.ddns.net/usuarios";

    await fetch(url)
        .then(data => data.json())
        .then(info => {
            usuarios = info;
        });
        
}

async function cargaTodosAlumnos(){
    let url = "http://diegogarcia.ddns.net/usuarios/alumno";

    await fetch(url)
        .then(data => data.json())
        .then(info => {
            alumnos = info;
        });
}

async function cargarTodosProfesores(){
    let url = "http://diegogarcia.ddns.net/usuarios/profesor";

    await fetch(url)
        .then(data => data.json())
        .then(info => {
            profesores = info;
        });
}

async function cargarTodasAsignaturas(){
    let url = "http://diegogarcia.ddns.net/asignaturas";

    await fetch(url)
        .then(data => data.json())
        .then(info => {
            asignaturas = info;
        })
}

function printeaCartas(users){
    console.log(users);

    while(zonaCartas.hasChildNodes()) {
        zonaCartas.removeChild(zonaCartas.lastChild);
    }

    for(let usuario of users){
        let divCarta = document.createElement("div");
        let cartaIMG = document.createElement("img");
        let cartaNombre = document.createElement("div");
        let cartaEmail = document.createElement("div");
        let cartaRol = document.createElement("div");
        
        cartaIMG.src = usuario.foto;
        cartaNombre.innerText = usuario.nombre + " " + usuario.apellidos;
        cartaEmail.innerText = usuario.correo;
        if(usuario.rol == "Alumno"){
            cartaRol.innerText = "A";
        }else {
            cartaRol.innerText = "P";
        }

        divCarta.classList.add("carta");
        cartaNombre.classList.add("nombre");
        cartaEmail.classList.add("email");
        cartaRol.classList.add("rol");
        cartaRol.classList.add(usuario.rol.toLowerCase());

        divCarta.appendChild(cartaIMG);
        divCarta.appendChild(cartaNombre);
        divCarta.appendChild(cartaEmail);
        divCarta.appendChild(cartaRol);

        zonaCartas.appendChild(divCarta);
    }
}

function mostrarTodosUsuarios(){
    printeaCartas(usuarios);
}

function mostrarTodosAlumnos(){
    printeaCartas(alumnos);
}

function mostrarTodosProfesores(){
    printeaCartas(profesores);
}

function mostrarModal(){
    modal.classList.remove("ocultar");
    protector.classList.remove("ocultar");

    printeaAsignaturasEnModal();

    let botonCierra = document.getElementById("sierra");
    botonCierra.addEventListener("click", ocultarModal);
}

function ocultarModal(){
    modal.classList.add("ocultar");
    protector.classList.add("ocultar");
}

function printeaAsignaturasEnModal(){
    console.log(asignaturas);
    let tabla = document.getElementById("realTabla");

    for(let asignatura of asignaturas){
        let fila = document.createElement("tr");
      //  fila.classList.add("filaCreada");
       // let filasCreadas = document.querySelectorAll("filaCreada");
      ///  for(let fila of filasCreadas){

            let materia = document.createElement("td");
            let horas = document.createElement("td");
            let profe = document.createElement("td");

            materia.innerText = asignatura.titulo;
            horas.innerText = asignatura.horas;
            profe.innerText = asignatura.profesor;

            fila.appendChild(materia);
            fila.appendChild(horas);
            fila.appendChild(profe);
            tabla.appendChild(fila);
      //  }
    }
    
}