"use strict";

// Un constructor de la clase personaje
class personaje {
    constructor(nombre, intentos, x, y) {
        this.nombre = nombre;
        this.intentos = intentos;
        this.x = x;
        this.y = y;
    }
}

// Creo la variable personaje para que sea global...
var personaje1;

window.onload = function () {
    dibujarPuntuacion();
    // Creo los sonidos que deberian de funcionar pero no funcionan por google
    var audio = new Audio("assets/sonidos/musicaInicio.mp3");
    audio.loop = true;
    audio.play();
    // Le añado u nevent listener a la confirmacion del nombre, para que cuando se pulse el boton de confirmar, se ejecute la funcion y habilite
    // el boton de jugar.
    document.getElementById("confNombre").addEventListener("click", function () {
        // Recojo el nombre que introduce el usuario y hago las comprobaciones necesarias
        var nombre = document.getElementById("nombre").value;
        var expresion = /^[a-zA-Z]+$/;
        if (nombre.length < 4) {
            alert("El nombre es incorrecto. Debe de tener 4 o más letras.");
        } else if (nombre.search(expresion) == -1) {
            alert("El nombre no puede tener números.");
        } else {
            // Si el nombre es correcto, 
            fetch(`https://daw209.000webhostapp.com/control-nombre.php?nombre=${nombre}`)
                .then((respuesta) => {
                    if (respuesta.ok) {
                        return respuesta.text();
                    } else {
                        throw new Error("Error en la llamada Ajax");
                    }
                }).then((veredicto) => {
                    if (veredicto == "Ok") {
                        var audio = new Audio("../assets/sonidos/sonidoMenu.wav");
                        audio.muted = true;
                        audio.play();
                        audio.muted = false;
                        document.getElementById("title").innerHTML = "A luchar, heroe " + nombre;
                        document.getElementById("jugar").disabled = false;
                        document.getElementById("jugar").addEventListener("click", function () {
                            var main = document.getElementById("main");
                            var inicio = document.getElementById("inicio");
                            main.removeChild(inicio);
                            dibujarTablero();
                            personaje1 = new personaje(nombre, 0, 0, 0);
                            var intentos = 0;
                            dibujarPersonaje(personaje1, 0, 0);
                            document.getElementById("botonDado").addEventListener("click", function () {
                                if (document.getElementsByClassName("dividendo").length == 0) {
                                    var dado = lanzarDado();
                                    var div1 = document.createElement("div");
                                    div1.style.width = "100%";
                                    div1.style.height = "100%";
                                    div1.style.backgroundColor = "rgba(0,0,0,0.5)";
                                    div1.zIndex = "-5";
                                    div1.className = "dividendo"
                                    var div2 = document.createElement("div");
                                    div2.style.width = "100%";
                                    div2.style.height = "100%";
                                    div2.style.backgroundColor = "rgba(0,0,0,0.5)";
                                    div2.zIndex = "99";
                                    div2.className = "dividendo"
                                    var div3 = document.createElement("div");
                                    div3.style.width = "100%";
                                    div3.style.height = "100%";
                                    div3.style.backgroundColor = "rgba(0,0,0,0.5)";
                                    div3.zIndex = "99";
                                    div3.className = "dividendo"
                                    var div4 = document.createElement("div");
                                    div4.style.width = "100%";
                                    div4.style.height = "100%";
                                    div4.style.backgroundColor = "rgba(0,0,0,0.5)";
                                    div4.zIndex = "99";
                                    div4.className = "dividendo"
                                    var table = document.getElementById("tabla");
                                    if (personaje1.y + dado <= 9) {
                                        var celdaSY = table.rows[personaje1.x].cells[personaje1.y + dado];
                                        celdaSY.appendChild(div1);
                                        div1.addEventListener("click", function nombreUno() {
                                            dibujarPersonaje(personaje1, personaje1.x, personaje1.y + dado);
                                            celdaSY.style.border = "none";
                                            intentos++;
                                            personaje1.intentos = intentos;
                                            var divs = document.getElementsByClassName("dividendo");
                                            while (divs.length > 0) {
                                                divs[0].remove();
                                            }
                                            if (personaje1.y == 9 && personaje1.x == 9) {
                                                finalizarJuego(personaje1.nombre, personaje1.intentos);
                                            }
                                        });
                                    }
                                    if (personaje1.x + dado <= 9) {
                                        var celdaBX = table.rows[personaje1.x + dado].cells[personaje1.y];
                                        celdaBX.appendChild(div2);
                                        div2.addEventListener("click", function () {
                                            dibujarPersonaje(personaje1, personaje1.x + dado, personaje1.y);
                                            celdaBX.style.border = "none";
                                            intentos++;
                                            personaje1.intentos = intentos;
                                            var divs = document.getElementsByClassName("dividendo");
                                            while (divs.length > 0) {
                                                divs[0].remove();
                                            }
                                            if (personaje1.y == 9 && personaje1.x == 9) {
                                                finalizarJuego(personaje1.nombre, personaje1.intentos);
                                            }
                                        }
                                        );
                                    }
                                    if (personaje1.y - dado >= 0) {
                                        var celdaSX = table.rows[personaje1.x].cells[personaje1.y - dado];
                                        celdaSX.appendChild(div3);
                                        div3.addEventListener("click", function () {
                                            dibujarPersonaje(personaje1, personaje1.x, personaje1.y - dado);
                                            celdaSX.style.border = "none";
                                            intentos++;
                                            personaje1.intentos = intentos;
                                            var divs = document.getElementsByClassName("dividendo");
                                            while (divs.length > 0) {
                                                divs[0].remove();
                                            }
                                            if (personaje1.y == 9 && personaje1.x == 9) {
                                                finalizarJuego(personaje1.nombre, personaje1.intentos);
                                            }
                                        }
                                        );
                                    }
                                    if (personaje1.x - dado >= 0) {
                                        var celdaBY = table.rows[personaje1.x - dado].cells[personaje1.y];
                                        celdaBY.appendChild(div4);
                                        div4.addEventListener("click", function () {
                                            dibujarPersonaje(personaje1, personaje1.x - dado, personaje1.y);
                                            celdaBY.style.border = "none";
                                            intentos++;
                                            personaje1.intentos = intentos;
                                            var divs = document.getElementsByClassName("dividendo");
                                            while (divs.length > 0) {
                                                divs[0].remove();
                                            }
                                            if (personaje1.y == 9 && personaje1.x == 9) {
                                                finalizarJuego(personaje1.nombre, personaje1.intentos);
                                            }
                                        }
                                        );
                                    }
                                } else {
                                    alert("Muevete, crack.");
                                }
                            });
                        });

                    } else {
                        alert("El nombre es impar. El numero debe de ser par.");
                    }
                }).catch((error) => {
                    console.error(error);
                });
        }
    });
    document.getElementById("jugar").addEventListener("click", function () {
        var audio = new Audio("../assets/sonidos/sonidoMenu.wav");
        audio.muted = true;
        audio.play();
        audio.muted = false;
    }
    );
    document.getElementById("nombre").addEventListener("keyup", function () {
        var audio = new Audio("../assets/sonidos/sonidoTexto.wav");
        audio.muted = true;
        audio.play();
        audio.muted = false;
    }
    );
}

function finalizarJuego(nombre, intentos) {
    var myStorage = window.localStorage;
    if (myStorage.getItem(nombre) == null) {
        myStorage.setItem(nombre, intentos);
    } else {
        if (myStorage.getItem(nombre) > intentos) {
            myStorage.setItem(nombre, intentos);
        }
    }
    alert("¡Has ganado! Record: " + myStorage.getItem(nombre));
    location.reload();
}

function dibujarPersonaje(personaje, x, y) {
    borrarAnterior(personaje.x, personaje.y);
    personaje.x = x;
    personaje.y = y;
    var tabla = document.getElementById("tabla");
    var celda = tabla.rows[x].cells[y];
    celda.innerHTML = `<img src="assets/spritelink.png" width="60" height="60">`;
}

function borrarAnterior(x, y) {
    var tabla = document.getElementById("tabla");
    var celda = tabla.rows[x].cells[y];
    celda.innerHTML = "";
}

function dibujarTablero() {
    var main = document.getElementById("main");
    main.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    main.style.padding = "10px";

    var tabla = document.createElement("table");
    tabla.setAttribute("id", "tabla");
    tabla.setAttribute("border", "1");
    tabla.setAttribute("align", "center");
    tabla.setAttribute("width", "80%");
    tabla.setAttribute("height", "80%");
    for (var i = 0; i < 10; i++) {
        var fila = document.createElement("tr");
        fila.setAttribute("id", "fila" + i);
        for (var j = 0; j < 10; j++) {
            var celda = document.createElement("td");
            var itext = i.toString();
            var jtext = j.toString();
            celda.setAttribute("id", itext + jtext);
            celda.setAttribute("width", "70px");
            celda.setAttribute("height", "70px");
            celda.setAttribute("class", "celda");
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    main.appendChild(tabla);
    document.getElementById("99").style.backgroundImage = "url('assets/sueloCofre.png')";

    var seccionDado = document.createElement("section");
    seccionDado.setAttribute("id", "seccionDado");
    seccionDado.setAttribute("align", "center");
    seccionDado.setAttribute("width", "auto");
    seccionDado.setAttribute("height", "auto");
    var dado = document.createElement("img");
    dado.setAttribute("id", "dado");
    dado.setAttribute("src", "assets/dados/rand.svg");
    dado.setAttribute("width", "100px");
    dado.setAttribute("height", "100px");
    dado.setAttribute("align", "center");
    dado.setAttribute("alt", "Dado");
    var botonDado = document.createElement("button");
    botonDado.setAttribute("id", "botonDado");
    botonDado.setAttribute("type", "button");
    botonDado.setAttribute("class", "btn btn-primary");
    botonDado.innerHTML = "Lanzar dado";
    seccionDado.appendChild(dado);
    seccionDado.appendChild(botonDado);
    main.appendChild(seccionDado);
}

function dibujarPuntuacion (){
    var puntuacion = document.getElementById("puntuaje");
    var lista = document.createElement("ol");
    var myStorage = window.localStorage;
    var keys = Object.keys(myStorage);
    keys.sort(function (a, b) {
        return myStorage[a] - myStorage[b];
    }
    );
    for (var i = 0; i < keys.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = keys[i] + ": " + myStorage[keys[i]];
        lista.appendChild(li);
    }
    puntuacion.appendChild(lista);
}

function lanzarDado() {
    var dado = Math.floor(Math.random() * 6) + 1;
    $({ deg: 0 }).animate({ deg: 360 }, {
        duration: 600,
        step: function (now) {
            var scale = (1 * now / 360);
            $('#dado').css({
                transform: 'rotate(' + now + 'deg) scale(' + scale + ')'
            });
        }
    });
    document.getElementById("dado").src = "assets/dados/" + dado + ".svg";
    return dado;
}