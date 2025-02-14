let data;
let temaActual = null;
let indiceDetalle = 0;

fetch('temas/quimica.json')
    .then(response => response.json())
    .then(json => {
        data = json;
    })
    .catch(error => console.error('Error al cargar el JSON:', error));

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
