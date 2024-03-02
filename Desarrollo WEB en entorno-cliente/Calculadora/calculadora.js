// Movidas.
let botones;
let numeros = "0123456789";
let tCalculo = "+-x/%";
let ultimo = null;
window.onload = function () {


    document.addEventListener("keydown", pulsar);

    // Punto A (sombra interior botones)

    function sombraInt() {
        this.classList.toggle("sombraInt");
    }

    // Event Listeners

    botones = document.getElementsByClassName("boton");
    for (elemento of botones) {
        elemento.addEventListener('mousedown', sombraInt);
        elemento.addEventListener('mouseup', sombraInt);
        elemento.addEventListener('click', pulsar);
    }

    function pulsar(event) {

        let dato;
        if (event.type == "keydown") {
            dato = event.key;
        } else {
            dato = this.innerText;
        }

        switch (dato) {
            case "C":
            case "c":
                borrarPantalla(dato);
                break;
            case "=":
            case "Enter":
                operar(dato);
                break;
            case "x":
                teclaCalc(dato);
                break;
            case "«":
            case "Backspace":
                borrar(dato);
                break;
            case "-":
                teclaCalc(dato);
                break;
            case "/":
                teclaCalc(dato);
                break;
            case "%":
                teclaCalc(dato);
                break;
            case "+":
                teclaCalc(dato);
                break;
            case "()":
            case "*":
                parentesis(dato);
                break;
            default:
                escribir(dato);
                break;
        }
    }
    // Punto B (Al pulsar sobre botones númericos, se irá construyendo la cifra en
    // la caja de texto, siempre se añadiran por la derecha)

    function escribir(tecla) {

        //COMPROBAR SI ES UN NUMERO U OPERACION O PUNTO
        if (tCalculo.includes(tecla) || numeros.includes(tecla) || tecla == "." || tecla == "()" || tecla == "(") {
            if (pantalla.value == "0") {
                if (numeros.includes(tecla)) {
                    pantalla.value = tecla;
                } else {
                    pantalla.value += tecla;
                }
            } else {
                pantalla.value += tecla;
            }
        }

    }

    // Punto C (Las teclas de calculo solo funcionaran cuando haya número escritos
    // de antes, y solo se podran poner una vez.)

    function teclaCalc(tecla) {

        if (!(tCalculo.includes(tecla) && tCalculo.includes(pantalla.value[pantalla.value.length - 1]))) {
            //PODEMOS ESCRIBIR EL OPERADOR
            pantalla.value += tecla;
        }

        ultimo = pantalla.value.substring(pantalla.value.length - 2, pantalla.value.length - 1);
        if (ultimo == "0" && pantalla.value.length == 2 && tCalculo.includes(tecla)) {
            pantalla.value = pantalla.value.substring(0, pantalla.value.length - 1);
        }
    }

    // Punto D (El igual solo funcionara cuando tengamos un calculo que devuelva algo)

    function operar() {
        pantalla.value = pantalla.value.replaceAll("%", "*1/100*");
        pantalla.value = pantalla.value.replaceAll("x", "*");
        pantalla.value = eval(pantalla.value);
    }

    // Punto E (Funciones de teclas que no son números)

    // Punto E.a (C: Borrará la pantalla y pondrá de nuevo un 0)

    function borrarPantalla() {
        pantalla.value = "0";
    }

    // Punto E.c (<<: Borrará las cifras de una en una y de derecha a izquierda)

    function borrar() {
        pantalla.value = pantalla.value.substring(0, pantalla.value.length - 1);
        if (pantalla.value == "") {
            pantalla.value = "0";
        }
    }

    // Punto E.e ((): Añadirá paréntesis al cálculo indicado en la pantalla)

    function parentesis() {
        pantalla.value = "(" + pantalla.value + ")";
    }

    // Punto F (Al utilizar el teclado, si el botón que pulsamos corresponde con
    // algun botón del teclado de la calculadora, este tendrá el mismo comportamiento
    // que el botón correspondiente. Cualquier otro no funcionará. Para el botón de borrar
    // de uno en uno, bastará con pulsar la tecla de borrado.)
}