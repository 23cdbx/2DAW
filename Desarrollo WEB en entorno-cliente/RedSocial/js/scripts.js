//SELECT con los usuarios
let usuariosSel;
//JSON con todos los usuarios
let usuarios;

//Div donde cargaremos los datos del usuario seleccionado
let datosUsuarios;

//Div donde tenemos los botones. Permanecerá oculto mientras no haya seleccionado un usuario
let botonera;

//Div donde mostraremos los posts
let zonaPosts;

//Div donde mostraremos las fotos;
let zonaAlbums;

//Div donde mostraremos las fotos;
let zonaFotos;

//Boton Posts
let mostrarPosts;

//Boton Fotos
let mostrarFotos;

let idUser = 0;

var parametros = {tipo:"", clase:"", id:"", texto:"", src:"", href:"", value:""};


window.onload = async function() {
    //Seleccionamos el SELECT
    usuariosSel = document.querySelector("#usuarios");
    //Añadimos change al SELECT
    usuariosSel.addEventListener("change", mostrarDatosUsuario);
    //Seleccionamos el div donde cargaremos los datos de los usuarios.
    datosUsuarios = document.querySelector("#info");

    zonaPosts = document.getElementById("posts");
    zonaFotos = document.getElementById("fotos");
    zonaAlbums = document.getElementById("albums");

    mostrarPosts = document.getElementById("mostrarPosts");
    mostrarFotos = document.getElementById("mostrarFotos");

    mostrarPosts.addEventListener("click", showPosts);
    mostrarFotos.addEventListener("click", showAlbums);

    botonera = document.querySelector("#botonera");

    await cargarUsuarios();

    cargarSelectUsuarios();
}

//Obtenemos el JSON de la dirección indicada
async function cargarUsuarios() {
    let url = "https://jsonplaceholder.typicode.com/users";
    //A COMPLETAR
    await fetch(url)
        .then(data => data.json())
        .then(info => {
            usuarios = info;
        });
}
//Función que devuelve el sexo del usuario
async function estimarGenero(nombre) {
    console.log(nombre);
    partes = nombre.split(" ");
    nombre = partes[0];
    let url = `https://api.genderize.io?name=${nombre}`;
    //A COMPLETAR
    let sexo;
    await fetch(url).then(data => data.json()).then(info => {
        sexo = info.gender;
        console.log(info);
        if(sexo == "male"){
            sexo = "./img/male.png";
        }else {
            sexo = "./img/female.png";
        }
    });
    return sexo;
}
//Función que devuelve la edad del usuario
async function calcularEdad(nombre) {
    let url = `https://api.agify.io/?name=${nombre}`;
    //A COMPLETAR
    // La api no funciona
}

//Cargamos el JSON de usuarios en el select
//<option value=[id del usuario]>[nombre del usuario]</option>
function cargarSelectUsuarios() {
    reiniciarParametros();
    for (let i = 0; i < 10; i++) {
        usuariosSel.innerHTML += `<option value="${usuarios[i].id}">${usuarios[i].name}</option>`
    }
}

//Función genérica para la creación de elementos
function crearElemento() {
    //A COMPLETAR SI SE QUIERE
}

//Buscamos la ciudad sugerida.
async function cargarCiudad(lat, lng) {
    let url = `https://geocode.xyz/${lat},${lng}?json=1`;
    //A COMPLETAR
    // La api no funciona
}
//Filtrado de info utilizando array.filter u otro sistema
async function mostrarDatosUsuario() {
    zonaPosts.innerHTML = "";
    zonaAlbums.innerHTML = "";
    zonaFotos.innerHTML = "";
    //A COMPLETAR

    while(datosUsuarios.hasChildNodes()) {
        datosUsuarios.removeChild(datosUsuarios.lastChild);
    }

    let usuariosSeleccionado;
    for(let usuario of usuarios) {
        if(usuario.id == this.value) {
            usuariosSeleccionado = usuario;
        }
    }

    let bordeFoto = document.createElement("div");
    bordeFoto.id = "foto";

    let fotanga = document.createElement("img");
    fotanga.src = await estimarGenero(usuariosSeleccionado.name);

    let tnombre = document.createElement("div");
    tnombre.classList.add("titulo");
    tnombre.innerText = "Nombre";

    let tedad = document.createElement("div");
    tedad.classList.add("titulo");
    tedad.innerText = "Edad";

    let temail = document.createElement("div");
    temail.classList.add("titulo");
    temail.innerText = "email";

    let tciudad = document.createElement("div");
    tciudad.classList.add("titulo");
    tciudad.innerText = "Ciudad";
    
    let tweb = document.createElement("div");
    tweb.classList.add("titulo");
    tweb.innerText = "Web";

    let dnombre = document.createElement("div");
    dnombre.classList.add("descripcion");
    dnombre.innerText = usuariosSeleccionado.name;

    let dedad = document.createElement("div");
    dedad.classList.add("descripcion");
    dedad.innerText = Math.floor(Math.random() * 100) + " años";

    let demail = document.createElement("div");
    demail.classList.add("descripcion");
    demail.innerHTML = `<a href="mailto:${usuariosSeleccionado.email}">${usuariosSeleccionado.email}</a>`;

    let dciudad = document.createElement("div");
    dciudad.classList.add("descripcion");
    dciudad.innerText = usuariosSeleccionado.address.city;

    let dweb = document.createElement("div");
    dweb.classList.add("descripcion");
    dweb.innerHTML = `<a target="_blank" href="${usuariosSeleccionado.website}">${usuariosSeleccionado.website}</a>`;

    datosUsuarios.appendChild(bordeFoto);
    bordeFoto.appendChild(fotanga);
    datosUsuarios.appendChild(tnombre);
    datosUsuarios.appendChild(dnombre);
    datosUsuarios.appendChild(tedad);
    datosUsuarios.appendChild(dedad);
    datosUsuarios.appendChild(temail);
    datosUsuarios.appendChild(demail);
    datosUsuarios.appendChild(tciudad);
    datosUsuarios.appendChild(dciudad);
    datosUsuarios.appendChild(tweb);
    datosUsuarios.appendChild(dweb);
    
    botonera.classList.remove("oculto");
    idUser = usuariosSeleccionado.id;
}

//Reiniciamos los parámetros para crear elementos.
function reiniciarParametros() {
    parametros = {tipo:"", clase:"", id:"", texto:"", src:"", href:"", value:""};
}

//Mostramos los posts en el div con id="posts"
async function showPosts() {
    zonaPosts.innerHTML = "";
    zonaAlbums.innerHTML = "";
    zonaFotos.innerHTML = "";
    await getPosts(idUser);
    //A COMPLETAR
    
}

//Obtenemos los posts del servidor
async function getPosts(idUser) {
    url = `https://jsonplaceholder.typicode.com/users/${idUser}/posts`;
    let post;
    await fetch(url).then(dato => dato.json()).then((publis) => {
        for (let publi of publis) {
            // Div para post
            post = document.createElement("div");
            post.classList.add("post");
            // Div para titular
            let titular = document.createElement("div");
            titular.classList.add("titular");
            titular.innerText = publi.title;
            // Div para cuerpo
            let cuerpo = document.createElement("div");
            cuerpo.classList.add("cuerpo");
            cuerpo.innerText = publi.body;
            // Apendchilds
            post.appendChild(titular);
            post.appendChild(cuerpo);
            zonaPosts.appendChild(post);
        }
    });

    
}

//Mostramos los albumes en el div con id="albumes"
async function showAlbums() {
    zonaPosts.innerHTML = "";
    zonaAlbums.innerHTML = "";
    //A COMPLETAR
    await getAlbums(idUser);
}

//Obtenemos los albumes del servidor
async function getAlbums() {
    url = `https://jsonplaceholder.typicode.com/users/${idUser}/posts`;
    //A COMPLETAR
    await fetch(url).then(dato => dato.json()).then((albums) => {
        for (let album of albums) {
            let albItem = document.createElement("a");
            albItem.classList.add("album");
            albItem.id = album.id;
            albItem.innerText = album.title;
            albItem.href = "#";
            zonaAlbums.appendChild(albItem);
            albItem.addEventListener('click', showFotos);
        }
    });
}

//Mostramos las fotos en el div id="fotos"
async function showFotos() {
    zonaFotos.innerHTML = "";
    zonaPosts.innerHTML = "";
    //A COMPLETAR
    await getFotos(this.id);
}

//Obtenemos las fotos del servidor
async function getFotos(idAlbum) {
    url = `https://jsonplaceholder.typicode.com/albums/${idAlbum}/photos`;
    //A COMPLETAR
    await fetch(url).then(dato => dato.json()).then((imgs) => {
        for(let img of imgs){
            let foto = document.createElement("img");
            foto.classList.add("foto");
            foto.src = img.thumbnailUrl;
            zonaFotos.appendChild(foto);
        }
    })
}
