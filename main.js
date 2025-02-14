let data;
let temaActual = null;
let indiceDetalle = 0;

fetch('temas/ia.json')
    .then(response => response.json())
    .then(json => {
        data = json;
        generarBotones();
        actualizarDialogoInicial();
    })
    .catch(error => console.error('Error al cargar el JSON:', error));

function generarBotones() {
    const opcionesContainer = document.querySelector('.opciones');
    if (data && data.opciones) {
        Object.keys(data.opciones).forEach(tema => {
            const boton = document.createElement('button');
            boton.classList.add('btn', 'btn-primary');
            boton.textContent = tema.charAt(0).toUpperCase() + tema.slice(1);  // Capitaliza la primera letra
            boton.onclick = () => seleccionarTema(tema);
            opcionesContainer.appendChild(boton);
        });
    }
}

function actualizarDialogoInicial() {
    const dialogo = document.getElementById("dialogo");
    if (data && data.text) {
        dialogo.innerHTML = `<p>${data.text}</p>`;
    }
}

function seleccionarTema(tema) {
    temaActual = tema;
    indiceDetalle = 0;
    actualizarDialogo();
    document.querySelector('.navegacion').style.display = 'flex';
}

function actualizarDialogo() {
    const dialogo = document.getElementById("dialogo");
    if (data && temaActual && data.opciones[temaActual]) {
        let detalles = data.opciones[temaActual].detalles;
        if (indiceDetalle >= 0 && indiceDetalle < detalles.length) {
            dialogo.innerHTML = `<p><strong>${detalles[indiceDetalle][0]}</strong></p><p>${detalles[indiceDetalle][1]}</p>`;
        }
    }
}

function cambiarDetalle(direccion) {
    const detalles = data.opciones[temaActual].detalles;
    indiceDetalle += direccion;
    if (indiceDetalle < 0) {
        indiceDetalle = 0;
    } else if (indiceDetalle >= detalles.length) {
        indiceDetalle = detalles.length - 1;
    }
    actualizarDialogo();
}
