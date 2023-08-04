
document.addEventListener("DOMContentLoaded", () => {
    var selecProvincia = document.getElementById('selecProvincia');
    selecProvincia.value = 13;

    var selecProvinciaRep = document.getElementById('selecProvinciaRep');
    selecProvinciaRep.value = 13;
});

var inputCedula = document.getElementById('inputCedula');
inputCedula.onblur = function(e) {
    e.preventDefault();
    verificarExisteEstudiante(this.value);
};


$('#form-datos-generales').on('submit', function (e) { 
    e.preventDefault();
    eliminarEspacios();
    var formData = new FormData(this);
    $.ajax({
        type: "POST",
        url: "/est-agg-info-general/",
        data: formData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function (response) {
        insertar_alerta("Información registrada exitosamente", "div-informacion-general", "success");
        var estudiante_id = document.getElementById('estudiante_id');
        estudiante_id.value = response['estudiante_id'];
        document.getElementById('btnGuardarInfoGeneral').className = "btn btn-primary disabled";
        mostrarSecciones();
    })
    .fail(function (response) {
        //insertar_alerta("Ocurrió un error al registrar", "div-informacion-general", "danger");
        abrirModalInformativo(icon_error, "Aviso", "No se ha podido registrar al estudiante");
    });
});

function mostrarSecciones(e) {
    //var seccion01 = document.getElementById('seccion-info-general');
    var seccion02 = document.getElementById('seccion-info-academica-1-2');
    var seccion03 = document.getElementById('seccion-info-academica-2-2');
    var seccion04 = document.getElementById('seccion-anexos');
    var seccion05 = document.getElementById('seccion-info-representante');

    seccion02.hidden = false;
    seccion03.hidden = false;
    seccion04.hidden = false;
    seccion05.hidden = false;
};//{};



var btn_subir_foto = document.getElementById('btnSubirFoto');
var input_foto_perfil = document.getElementById('inputFotoPerfilEstudiante');
var img_subida = document.getElementById('imgSubida');

btn_subir_foto.onclick = function (e) {
    if (document.getElementById('estudiante_id').value !== "0") {
        input_foto_perfil.click();
        input_foto_perfil.onchange = function() {
            var archivos = input_foto_perfil.files;
            if (!archivos || !archivos.length) {
                abrirModalInformativo(icon_warning, "¡Aviso!", "No se pudo agregar la imagen");
                return;
            }
            else {
                var primerArchivo = archivos[0];
                var objectURL = URL.createObjectURL(primerArchivo);
                img_subida.src = objectURL;

                var btnSubmitFotoPerfil = document.getElementById('btnSubmitFotoPerfil');
                btnSubmitFotoPerfil.hidden = false;
            }
        };
    } else {
        abrirModalInformativo(icon_info, "¡Información!", "Registre primero un estudiante");
    }
    
}



$('#form-foto-perfil').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    formData.append('estudiante_id', document.getElementById('estudiante_id').value);
    $.ajax({
        type: "POST",
        url: "/est-agg-foto-perfil/",
        data: formData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function (response) {
        insertar_alerta("Foto guardada exitosamente", "div-informacion-general", "success");
        document.getElementById('btnSubmitFotoPerfil').className = "btn btn-primary w-100 disabled";
    })
    .fail(function (response) {
        insertar_alerta("Ocurrió un error al guardar la foto", "div-informacion-general", "danger");
    });
});



$('#form-info-academica').on('submit', function (e) { 
    e.preventDefault();
    eliminarEspacios();
    var formData = new FormData(this);
    formData.append('estudiante_id', document.getElementById('estudiante_id').value);
    $.ajax({
        type: "POST",
        url: "/est-agg-info-academica/",
        data: formData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function (response) {
        insertar_alerta("Información registrada exitosamente", "form-info-academica", "success");
        document.getElementById('btn-guardar-info-academica').className = "btn btn-primary disabled";
    })
    .fail(function (response) {
        insertar_alerta("Ocurrió un error al registrar", "form-info-academica", "danger");
    });
});


// Las opciones de agregar curso y anexos están en acciones-estudiantes


$('#form-info-representante').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    formData.append('estudiante_id', document.getElementById('estudiante_id').value);
    $.ajax({
        type: "POST",
        url: "/est-agg-representante/",
        data: formData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function (response) {
        document.getElementById('btn-guardar-info-representante').className = "btn btn-primary disabled";
        insertar_alerta("Información registrada exitosamente", "form-info-representante", "success");
    })
    .fail(function (response) {
        insertar_alerta("Ocurrió un error al registrar", "form-info-representante", "danger");
    });
});