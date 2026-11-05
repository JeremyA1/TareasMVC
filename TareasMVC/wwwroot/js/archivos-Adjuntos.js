
let inputArchivoTarea = document.getElementById('archivoATarea');
function manejarClickAgregarArchivoAdjunto() {
    inputArchivoTarea.click();
}

async function manejarSeleccionArchivoTarea(event){
    const archivos = event.target.files;
    const archivosArreglo = Array.from(archivos);

    const idTarea = tareaEditarVM.id;
    const formData = new FormData();
    for (var i = 0; i < archivosArreglo.length; i++){
        formData.append("archivos",  archivosArreglo[i])
    }

    const respuesta = await fetch(`${urlArchivos}/${idTarea}`, {
        body: formData,
        method: "POST"
    });

    if (!respuesta.ok) {
        manejarErrorApi(respuesta);
        return;
    }

    const json = await respuesta.json();
    prepararArchivosAdjuntos(json);

    inputArchivoTarea.value = null;

}

function prepararArchivosAdjuntos(archivosAdjuntos) {
    archivosAdjuntos.forEach(archivoAdjunto => {
        let fechaCreacion = archivoAdjunto.fechaCreacion;
        if (archivoAdjunto.fechaCreacion.indexOf('Z') === -1) {
            fechaCreacion += 'Z';
        }

        const fechaCreacionDT = new Date(fechaCreacion);
        archivoAdjunto.publicado = fechaCreacionDT.toLocaleString();

        tareaEditarVM.archivosAdjuntos.push(
            new archivoAdjuntoViewModel({...archivoAdjunto, modoEdicion: false}));
    });
}

let tituloArchivoAdjuntoAnterior;
function manejarClickTituloarchivoAdjunto(archivoAdjunto) {
    archivoAdjunto.modoEdicion(true);
    tituloArchivoAdjuntoAnterior = archivoAdjunto.titulo();
    $("[name='txtArchivoAdjuntoTitulo']:visible").focus();
}

async function manejarFocusoutTituloArchivoAdjunto(archivoAdjunto) {
        archivoAdjunto.modoEdicion(false);
        const idTarea = archivoAdjunto.id;

        if(!archivoAdjunto.titulo()){
            archivoAdjunto.titulo(tituloArchivoAdjuntoAnterior);
        }

        if (archivoAdjunto.titulo() === tituloArchivoAdjuntoAnterior){
            return;
        }

        const data = JSON.stringify(archivoAdjunto.titulo());

        const respuesta = await fetch(`${urlArchivos}/${idTarea}`, {
            body: data,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok){
            manejarErrorApi(respuesta);
        }
}

function manejarClickBorrarARchivoAdjunto (archivoAdjunto){
    modalEditarTareaBootstrap.hide();


    confirmarAccion({
        callbackAceptar: () => {
            borrarArchivoAdjunto(archivoAdjunto);
            modalEditarTareaBootstrap.show();
        },
        callbackCancelar: () => {
            modalEditarTareaBootstrap.show();
        },
        titulo: 'Desea borrar este archivo adjunto?'

    });
}

async function borrarArchivoAdjunto (archivoAdjunto){
    const respuesta = await fetch(`${urlArchivos}/${archivoAdjunto.id}`, {
        method: 'DELETE'
    });


    if (!respuesta.ok){
        manejarErrorApi(respuesta);
        return;
    }

    tareaEditarVM.archivosAdjuntos.remove(function (item) {
        return item.id == archivoAdjunto.id
    });
}

function manejarClickDescargarArchivoAdjunto(archivoAdjunto) {
    descargarArchivo(archivoAdjunto.url, archivoAdjunto.titulo());
}



async function actualizarOrdenArchivosAdjuntos() {
    const idTarea = tareaEditarVM.id;
    const ids = obtenerIdsArchivosAdjuntos();
    const guardado = await enviarIdsArchivosAdjuntosAlBackend(ids, idTarea);

    if (tareaEditarVM.id !== idTarea) {
        return;
    }

    if (!guardado) {
        $("#reordenable-adjuntos").sortable("cancel");
        return;
    }

    const arregloOrganizado = tareaEditarVM.archivosAdjuntos.sorted(function (a, b) {
        return ids.indexOf(a.id.toString()) - ids.indexOf(b.id.toString());
    });

    tareaEditarVM.archivosAdjuntos([]);
    tareaEditarVM.archivosAdjuntos(arregloOrganizado);
}

function obtenerIdsArchivosAdjuntos() {
    const ids = $("#reordenable-adjuntos [name=txtArchivoAdjuntoTitulo]").map(function () {
        return $(this).attr('data-id');
    }).get();
    return ids;
}

async function enviarIdsArchivosAdjuntosAlBackend(ids, idTarea) {
    try {
        const respuesta = await fetch(`${urlArchivos}/ordenar/${idTarea}`, {
            method: 'POST',
            body: JSON.stringify(ids),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            await manejarErrorApi(respuesta);
            return false;
        }

        return true;
    } catch {
        mostrarMensajeError(errorInesperado);
        return false;
    }
}

$(function () {
    $("#reordenable-adjuntos").sortable({
        axis: 'y',
        stop: async function () {
            await actualizarOrdenArchivosAdjuntos();
        }
    });
}); 
