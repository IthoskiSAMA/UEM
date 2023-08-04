document.addEventListener("DOMContentLoaded", () => {
    var seccion_info_academica_1_2 = document.getElementById('seccion-info-academica-1-2');
    var seccion_info_academica_2_2 = document.getElementById('seccion-info-academica-2-2');
    var seccion_anexos = document.getElementById('seccion-anexos');
    var seccion_info_representante = document.getElementById('seccion-info-representante');

    var inputNacimientoHidden = document.getElementById('inputNacimientoHidden');
    if (inputNacimientoHidden.value !== "None") {
        var inputNacimiento = document.getElementById('inputNacimiento');
        var fecha = inputNacimientoHidden.value;
        fecha = fecha.split(" ");
        var fecha_nacimiento = new Date(fecha[0] + "-" + fecha[2] + "-" + fecha[4])
        var dia = fecha_nacimiento.getDate();
        var mes = fecha_nacimiento.getMonth() + 1;
        var anio = fecha_nacimiento.getFullYear();
        // Formatear los valores obtenidos para que tengan dos dígitos
        dia = dia < 10 ? "0" + dia : dia;
        mes = mes < 10 ? "0" + mes : mes;
        var fecha_02 = anio.toString() + "-" + mes.toString() + "-" + dia.toString();
        inputNacimiento.value = fecha_02
    }
    
    seccion_info_academica_1_2.hidden = false;
    seccion_info_academica_2_2.hidden = false;
    seccion_anexos.hidden = false;
    seccion_info_representante.hidden = false;

    llenarInformacionAdicional();

    var selecProvincia = document.getElementById('selecProvincia');
    selecProvincia.value = 13;

    var selecProvinciaRep = document.getElementById('selecProvinciaRep');
    selecProvinciaRep.value = 13;
});


var inputCedula = document.getElementById('inputCedula');
var cedulaEstudiante = inputCedula.value;
inputCedula.onblur = function(e) {
    e.preventDefault();
    if (cedulaEstudiante !== this.value) {
        verificarExisteEstudiante(this.value);
    }
};


function llenarInformacionAdicional() {
    $.ajax({
        type: "GET",
        url: "/est-get-info-adicional/" + document.getElementById("estudiante_id").value,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function (response) {
        if (response["resultado"] === 1) {
            if (response["unInformacionAcademica"].length > 0) {
                var jsonObject = response["unInformacionAcademica"][0];

                document.getElementById('inputFechaIngreso').value = jsonObject["fecha_ingreso"];
                document.getElementById('inputNumeroCarne').value = jsonObject["numero_carne"];
                document.getElementById('selecModalidaEstudios').value = jsonObject["modalidad_estudios_id"];
                document.getElementById('selecJornada').value = jsonObject["jornada_id"];
                document.getElementById('selecMatricula').value = jsonObject["numero_matricula_id"];
                document.getElementById('selecEstadoGeneral').value = jsonObject["estado_id"];
            }
            if (response["listaCursos"].length > 0) {
                response["listaCursos"].forEach(curso => {
                    var tabla_cuerpo_cursos = document.getElementById('tabla-cuerpo-cursos');
                    var fila = '<tr id="curso-'+curso["curso_id"]+'">'
                            +'<td id="curso-grado-'+curso["curso_id"]+'">'+ curso["grado"] +'</td>'
                            +'<td id="curso-nivel-'+curso["curso_id"]+'">'+ curso["nivel"] +'</td>'
                            +'<td id="curso-paralelo-'+curso["curso_id"]+'">'+ curso["paralelo"] +'</td>'
                            +'<td id="curso-especialidad-'+curso["curso_id"]+'">'+ curso["especialidad"] +'</td>'
                            +'<td id="curso-periodo-'+curso["curso_id"]+'">'+ curso["periodo"] +'</td>'
                            +'<td><h6 class="m-0"><span id="curso-estado-'+curso["curso_id"]+'" class="'+estados[parseInt(curso["estado_id"]) - 1]+'">'+ curso["estado"] +'</span></h6></td>'
                            +'<td>'
                                + '<div class="d-flex align-items-center">'
                                + '<i class="fa-light fa-pen-to-square icon" onclick="abrirModalEditarCurso('+curso["curso_id"]+')"></i>'
                                + '<i class="fa-light fa-trash-can icon" onclick="eliminarCurso('+curso["curso_id"]+')"></i>'
                                + '</div>'
                            +'</td></tr>';
                    tabla_cuerpo_cursos.innerHTML = tabla_cuerpo_cursos.innerHTML + fila;
                    fila = null;
                });
            }
            if (response["listaAnexos"].length > 0) {
                response["listaAnexos"].forEach(anexo => {
                    mostrarAnexoEnLaTabla(anexo["tipo_anexo_id"], 
                        anexo["anexo_id"], 
                        anexo["anexo_nombre"], 
                        anexo["anexo_periodo"], 
                        anexo["anexo_url"]);
                });
            }
            if (response["unRepresentante"].length > 0) {
                var representante = response["unRepresentante"][0];

                document.getElementById('inputApellidosRep').value = representante["apellidos"];
                document.getElementById('inputNombresRep').value = representante["nombres"];
                document.getElementById('inputCedulaRep').value = representante["cedula"];
                document.getElementById('selecPaisOrigenRep').value = representante["pais_id"];
                document.getElementById('inputTelefonoRep').value = representante["celular"];
                document.getElementById('selecProvinciaRep').value = representante["provincia_id"];
                document.getElementById('selecCiudadRep').value = representante["ciudad_id"];
                document.getElementById('inputDireccionRep').value = representante["direccion"];
            }
        }
        else if (response["resultado"] === 0) {
            console.log(response)
        }
        //abrirModalInformativo(icon_success, "¡Felicitaciones!", "Se ha modificado correctamente los datos del estudiante");
    })
    .fail(function (response) {
        console.log(response);
        //abrirModalInformativo(icon_error, "Error", "No se ha podido editar los datos del estudiante");
    });
};



$('#form-datos-generales').on('submit', function (e) { 
    e.preventDefault();
    eliminarEspacios();
    var formData = new FormData(this);
    $.ajax({
        type: "POST",
        url: "/est-editar-info-general/",
        data: formData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function (response) {
        abrirModalInformativo(icon_success, "¡Felicitaciones!", "Se ha modificado correctamente los datos del estudiante");
    })
    .fail(function (response) {
        abrirModalInformativo(icon_error, "Error", "No se ha podido editar los datos del estudiante");
    });
});



var btn_cambiar_foto = document.getElementById('btnCambiarFoto');
var input_foto_perfil = document.getElementById('inputFotoPerfilEstudiante');
var img_subida = document.getElementById('imgSubida');

btn_cambiar_foto.onclick = function (e) {
    e.preventDefault();
    input_foto_perfil.click();
    input_foto_perfil.onchange = function() {
        var archivos = input_foto_perfil.files;
        if (!archivos || !archivos.length) {
            abrirModalInformativo(icon_warning, "¡Aviso!", "No se pudo agregar la imagen");
            return false;
        }
        else {
            var primerArchivo = archivos[0];
            var objectURL = URL.createObjectURL(primerArchivo);
            img_subida.src = objectURL;

            var btnSubmitFotoPerfil = document.getElementById('btnSubmitFotoPerfil');
            btnSubmitFotoPerfil.hidden = false;
        }
    };
}

$('#form-foto-perfil').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    formData.append('estudiante_id', document.getElementById('estudiante_id').value);
    $.ajax({
        type: "POST",
        url: "/est-editar-foto-perfil/",
        data: formData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function (response) {
        abrirModalInformativo(icon_success, "¡Felicitaciones!", "Foto editada exitosamente");
    })
    .fail(function (response) {
        abrirModalInformativo(icon_error, "¡Error!", "No se ha podido editar la foto del estudiante");
    });
});


// Formulario para EDITAR INFORMACION ACADEMICA
$('#form-info-academica').on('submit', function (e) { 
    e.preventDefault();
    eliminarEspacios();
    var formData = new FormData(this);
    formData.append('estudiante_id', document.getElementById('estudiante_id').value);
    $.ajax({
        type: "POST",
        url: "/est-editar-info-academica/",
        data: formData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function (response) {
        abrirModalInformativo(icon_success, "¡Felicitaciones!", "Información académica 1/2 editada exitosamente");
    })
    .fail(function (response) {
        abrirModalInformativo(icon_error, "¡Error!", "No se ha podido editar la información académica 1/2 del estudiante");
    });
});


function abrirModalEditarCurso(curso_id) {
    document.getElementById('curso_id').value = curso_id;
    $('#modalEditarCurso').modal('show');
};


// Formulario para editar un curso
$('#form-editar-curso').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    //formData.append('estudiante_id', document.getElementById('estudiante_id').value);
    //solo se necesita el curso_id, y ya va incluido en el form
    $.ajax({
        type: "POST",
        url: "/est-editar-info-curso/",
        data: formData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function (response) {
        abrirModalInformativo(icon_success, "¡Felicitaciones!", "Curso editado correctamente");

        var grado = document.getElementById('curso-grado-' + response["curso_id"]);
        var nivel = document.getElementById('curso-nivel-' + response["curso_id"]);
        var paralelo = document.getElementById('curso-paralelo-' + response["curso_id"]);
        var especialidad = document.getElementById('curso-especialidad-' + response["curso_id"]);
        var periodo = document.getElementById('curso-periodo-' + response["curso_id"]);
        var estado = document.getElementById('curso-estado-' + response["curso_id"]);

        grado.innerText = response["grado"];
        nivel.innerText = response["nivel"];
        paralelo.innerText = response["paralelo"];
        especialidad.innerText = response["especialidad"];
        periodo.innerText = response["periodo"];
        estado.innerText = response["estado"];
        estado.className = estados[parseInt(response["estado_id"]) - 1];
    })
    .fail(function (response) {
        abrirModalInformativo(icon_error, "¡Error!", "Hubo un error al intentar editar el curso");
    });
});


// Formulario para EDITAR REPRESENTANTE
$('#form-info-representante').on('submit', function (e) { 
    e.preventDefault();
    eliminarEspacios();
    var formData = new FormData(this);
    formData.append('estudiante_id', document.getElementById('estudiante_id').value);
    $.ajax({
        type: "POST",
        url: "/est-editar-representante/",
        data: formData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function (response) {
        abrirModalInformativo(icon_success, "¡Felicitaciones!", "Información del representante editada exitosamente");
    })
    .fail(function (response) {
        abrirModalInformativo(icon_error, "¡Error!", "No se ha podido editar la información del representante");
    });
});


function abrirModalEditarCurso(curso_id) {
    document.getElementById('curso_id').value = curso_id;
    $('#modalEditarCurso').modal('show');
};