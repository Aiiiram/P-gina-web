function iniciarReloj() {

    if (document.getElementById("reloj-digital")) {
        let fecha = new Date();
        let horas = fecha.getHours();
        let minutos = fecha.getMinutes();
        let segundos = fecha.getSeconds();

        if (horas < 10) horas = "0" + horas;
        if (minutos < 10) minutos = "0" + minutos;
        if (segundos < 10) segundos = "0" + segundos;

        document.getElementById("reloj-digital").innerHTML = horas + ":" + minutos + ":" + segundos;
        setTimeout(iniciarReloj, 1000);
    }
}

window.onload = function() {
    iniciarReloj();
    cargarContador();
};

let estado = 0; 

function ocultar() {
    let imagenes = document.getElementsByTagName('img');

    if (estado == 0) {
        for (let i = 0; i < imagenes.length; i++) {
            imagenes[i].style.visibility = 'hidden';
        }
        estado = 1;
    } 
    else {
        for (let i = 0; i < imagenes.length; i++) {
            imagenes[i].style.visibility = 'visible';
        }
        estado = 0;
    }
}

function cargarContador() {
    if (document.getElementById("valor-contador")) {

        let guardado = localStorage.getItem("contador");
        let valor = guardado ? parseInt(guardado) : 0;
        
        document.getElementById("valor-contador").innerHTML = valor;
        actualizarColorContador(valor);
    }
}

function cambiarContador(accion) {
    let elemento = document.getElementById("valor-contador");
    let valor = parseInt(elemento.innerHTML);

    if (accion === 'incrementar') {
        valor++;
    } else if (accion === 'decrementar') {
        valor--;
    } else if (accion === 'reset') {
        valor = 0;
    }

    elemento.innerHTML = valor;
    localStorage.setItem("contador", valor);
    actualizarColorContador(valor);
}

function actualizarColorContador(valor) {
    let elemento = document.getElementById("valor-contador");

    if (valor > 0) {
        elemento.style.color = "green";
    } else if (valor < 0) {
        elemento.style.color = "red";
    } else {
        elemento.style.color = "black";
    }
}

function evaluarAccesoParque() {

    let edad = parseInt(document.getElementById("edadPersona").value);
    let edadAcompanante = parseInt(document.getElementById("edadAcompanante").value);
    let checkboxAutorizacion = document.getElementById("checkboxAutorizacion");

    if (isNaN(edad)) {
        alert("Por favor, introduce una edad válida.");
        return;
    }

    if (edad < 5) {
        alert("Resultado: No puede entrar al parque (menor de 5 años).");
    } 
    else if (edad >= 5 && edad <= 12) {
        if (!isNaN(edadAcompanante) && edadAcompanante > 18) {
            alert("Resultado: Puede entrar al parque, ya que va con un adulto acompañante.");
        } else {
            alert("Resultado: No puede entrar. Los niños de entre 5 y 12 años necesitan un acompañante mayor de 18 años.");
        }
    } 
    else if (edad > 12 && edad <= 60) {
        alert("Resultado: Acceso concedido de manera normal.");
    } 
    else if (edad > 60) {
        if (checkboxAutorizacion.checked) {
            alert("Resultado: Acceso concedido con autorización especial.");
        } else {
            alert("Resultado: No puede entrar. Al ser mayor de 60 años requiere marcar la casilla de autorización especial.");
        }
    }
}
