let peliculas = [];
let peliculaElegida;
let letra;
let letras = [];
let puntuacion;
let tecla;
let santa;
let errores = 0;
window.onload = function() {

    santa = document.getElementsByClassName("extremidad");
    for(let extremidad of santa){
        extremidad.classList.add("esconder");
    }

    // Esto es lo que genera el teclado en pantalla
    var teclado = document.getElementById("teclado");
    for(let teclaActual = 65; teclaActual <= 90;teclaActual++) {
        tecla = document.createElement("button");
        tecla.innerText = String.fromCharCode(teclaActual);
        tecla.classList.add("tecla");
        teclado.appendChild(tecla);

        tecla.addEventListener("click", comprobar);
    }

    // Primero, en la parte inferior aparecerán tantas líneas horizontales como letras
    // formen el título de la película
    
    // Creamos un array que guarda las peliculas.
    peliculas = ["Solo en casa", "The holiday", "El Grinch", "Pesadilla antes de Navidad", "Frozen", "The Family Man", "Love Actually", "Jack Frost", "Elf", "The Polar Express", "Cuento de Navidad", "Una Navidad de locos", "Un padre en apuros", "El origen de los guardianes"];
    // Hacemos una funcion let extremidades;para seleccionar un valor aleatorio
    function seleccionarPeli(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    // Establecemos que el valor de "peliculaElegida" es el de la posicion aleatoria del array
    // que nos genera la funcion.
    peliculaElegida = peliculas[seleccionarPeli(0, 13)];
    // Hacemos variables que almacenen la caja con id titulo, y otro que cree un parrafo
    let titulo = document.getElementById("titulo");
    let parrafo = document.createElement("p");
    // Le añadimos estilo al parrafo
    parrafo.classList.add("parrafo");
    // Hacemos el foreach
    for(let caracter of peliculaElegida){
        // Le decimos que si el caracter es un espacio, que cree un span para el caracter, unimos el caracter al parrafo, y el parrafo a la caja titulo
        // por ultimo le damos estilo al caracter espacio.
        if(caracter === " "){
            /*const espacio = document.createElement("span");
            espacio.innerHTML = "&nbsp; ";
            parrafo.appendChild(espacio);
            titulo.appendChild(parrafo);*/
            caracter = document.createElement("span");
            parrafo.appendChild(caracter);
            titulo.appendChild(parrafo);
            caracter.classList.add("cajaLetraEspacio");
        // Hacemos igual que con los espacios, pero esta vez para los spans que contengan letras
        }else {
            caracter = document.createElement("span");
            parrafo.appendChild(caracter);
            titulo.appendChild(parrafo);
            caracter.classList.add("cajaLetra");
        }
    }

    function comprobar(){
        puntuacion = document.getElementById("puntuacion");
        //Añadimos la letra a última letra usada, eliminando la anterior.
        if(!letras.includes(this.innerText)){
            ultimaLetra(this);
            letrasUsadas(this);
        }
        //Si no está, añadimos la letra a letrasUsadas.
        if(peliculaElegida.toLowerCase().includes(this.innerText.toLowerCase())) {
            for(let i = 0; i < peliculaElegida.length; i++){
                letra = peliculaElegida[i];
                if(letra.toString().toLowerCase().includes(this.innerText.toLowerCase())){
                    parrafo.childNodes[i].textContent = this.innerText;
                }
            }
            //Sumamos los puntos    

        } else {
            fallo();
        }
            /*
            for(let i = 0; i < peliculaElegida.length; i++){
                let letra = peliculaElegida[i];
                if(letra.toString().toLowerCase().includes(this.innerText)){
                    parrafo.childNodes[i].innerText = this.innerText;
                }else{
                    fallo();
                }
            }*/
        }


    function fallo(){
        //if(!(letra.toString().toLowerCase().includes(this.innerText))){
        santa[errores].classList.remove("esconder");
        errores++;
            /*if(contador == 1){
                extremidad[contador].classList.remove("esconder");
            }*/
                
           // }
    }

    function ultimaLetra(elemento){
        letras.push(elemento.innerText);
        let lastletter = document.getElementById("lastletter");
        let clone = elemento.cloneNode(true);
        lastletter.innerHTML = "";
        lastletter.appendChild(clone);
    }

    function letrasUsadas(elemento){
        letras.push(elemento.innerText);
        let usedletter = document.getElementById("usedletters");
        let clone2 = elemento.cloneNode(true);
        usedletter.appendChild(clone2);
        
    }



    // En el cuadro superior derecho aparecerá la puntuación, que siempre mantendrá el formato con
    // 5 dígitos, y se calculará de la siguiente forma:
    // 0 fallos = 1000 puntos por acierto
    // por cada fallo, se restaran 100 a los 1000 iniciales, y si la letra se repite dentro del titulo
    // por cada vez que se repita serán otros 1000 mas, ej: si en el titulo hay 3 letras A, nos darán
    // 3000 puntos

    // Se me ha ocurrido que puedo ir cambiando la cantidad según se vayan sumando los puntos, y printearla
    // en el div, de una manera parecida a como se hacía en la calculadora, para controlar lo de que
    // se vayan restando según los fallos puedo hacer un contador por cada vez que se muestre una parte
    // de papa noel, y dependiendo del valor del contador, que vaya restando a la cantidad que se suma
    // por acierto.

    // Esto ultimo tambien me serviria para sabér cuando has perdido el juego

    // Probablemente le falten más cosas, pero a primera vista, se ve que falta declarar con un let
    // la variable "tecla"

    // Orden de cosas que tienen que pasar al pulsar una tecla: 
        // 1. la tecla pulsada se debe añadir a la caja "ultima letra usada"
        // 2. comprobar si la tecla ya ha sido pulsado, si es así se vera reflejado (se marcara momentaneamente)
        //    en la caja "letras usadas", para hacer esto puedo usar un array que almacene
        //    las letras que he usado.
        // 3. si no ha sido usada, comprobamos que se encuentre en el string de la pelí elegida
        // 4. si no esta, le quitamos la clase que oculta las partes de papa noel, a una de las partes (obvio)
        // 5. si esta, vamos mostrando cada una de las letras, y sumando los puntos generados.
        // (esto es practicamente un copia pega del pdf, pero esque ya estaba muy bien explicado)

    // Hay que hacer que se pueda tanto, escribir con las teclas de la pantalla, como con las del teclado
    // para hacerlo, podemos usar el código que utilizamos para hacer lo mismo en la calculadora (ez)

    // Lo ultimo es mostrar los mensajes, dependiendo del resultado de la partida, se me ocurren dos formas
    // de hacerlo, una es usando un alert (posiblemente esta sea la forma mas chunga de hacerlo), dandole
    // estilo con css, así le podemos poner el mensaje que queramos y tenemos incorporado el botón, al que le vamos
    // a decir que recarge la página volviendo a empezar el juego, con una pelicula diferente, y la otra
    // que seguro que no funciona, es creando con dom un div, con texto y boton, aunque no se como hacer
    // que el boton del div recarge la página, y ademas, pensandolo sobre la marcha, creo que no va a ser viable
    // lo del div porque es importante que no podamos interactuar con el resto de la página mientras este
    // mensaje se muestra en pantalla.

    // Habiendo hecho todo esto ya estaría todo hecho, y tendriamos un ahorcado funcional
}