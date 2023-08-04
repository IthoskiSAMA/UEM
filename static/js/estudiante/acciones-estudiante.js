
function generarPDfEstudiante(estudiante_id) {
    abrirModalInformativo(icon_info, "¡Información!", "Función en mantenimiento");
};


function editarEstudiante(estudiante_id) {
    window.location.href = '/editar-estudiante/' + estudiante_id;
};


function verificarExisteEstudiante(cedula) {
    var csrftoken = getCookie('csrftoken');
    $.ajax({
        type: "POST",
        url: "/est-verificar-existe/",
        data: {"cedula": cedula, csrfmiddlewaretoken: csrftoken },
        dataType: "json"
    })
    .done(function (response) {
        if (response["resultado"] === 1) {
            inputCedula.className = "form-control input-success";
            document.getElementById('btnGuardarInfoGeneral').disabled = false;
        }
        else if (response["resultado"] === 0) {
            inputCedula.className = "form-control input-error";
            document.getElementById('btnGuardarInfoGeneral').disabled = true;
            abrirModalInformativo(icon_info, "¡Información!", "Ya existe un estudiante registrado con el mismo número de cédula");
        }
    })
    .fail(function (response) {
        abrirModalInformativo(icon_error, "¡Error!", "Ha ocurrido un error al intentar eliminar el estudiante");
    });
};


// Función para ELIMINAR ESTUDIANTE
function eliminarEstudiante (estudiante_id) {
    abrirModalDeAcciones(icon_warning, "Eliminar estudiante", "¿Está usted seguro de eliminar este estudiante?", "Eliminar", "danger");
    document.getElementById("btnAccion").onclick = function(e) {
        e.preventDefault();
        cerrarModalDeAcciones();
        abrirModalInformativo(icon_info, "Permisos de SuperUsuario", "Se ha enviado una solicitud de permisos para borrar el estudiante.");
        /*var csrftoken = getCookie('csrftoken');
        $.ajax({
            type: "POST",
            url: "/est-eli-estudiante/",
            data: {"estudiante_id": estudiante_id, csrfmiddlewaretoken: csrftoken },
            dataType: "json"
        })
        .done(function (response) {
            document.getElementById('estudiante-' + estudiante_id).remove();
            abrirModalInformativo(icon_info, "¡Información!", "Estudiante eliminado correctamente");
        })
        .fail(function (response) {
            abrirModalInformativo(icon_error, "¡Error!", "Ha ocurrido un error al intentar eliminar el estudiante");
        });*/
    };
};


// Formulario para AGREGAR CURSO
$('#form-info-curso').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    formData.append('estudiante_id', document.getElementById('estudiante_id').value);
    $.ajax({
        type: "POST",
        url: "/est-agg-info-curso/",
        data: formData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function (response) {
        console.log(response)
        var tabla_cuerpo_cursos = document.getElementById('tabla-cuerpo-cursos');
        selecGrado = document.getElementById('selecGrado');
        selecNivel = document.getElementById('selecNivel');
        selecParalelo = document.getElementById('selecParalelo');
        selecEspecialidad = document.getElementById('selecEspecialidad');
        selecPeriodo = document.getElementById('selecPeriodo');
        selecEstado = document.getElementById('selecEstado');
        var fila = '<tr id="curso-'+response["info_curso_id"]+'">'
                        +'<td id="curso-grado-'+response["info_curso_id"]+'">'+ selecGrado.options[selecGrado.selectedIndex].text +'</td>'
                        +'<td id="curso-nivel-'+response["info_curso_id"]+'">'+ selecNivel.options[selecNivel.selectedIndex].text +'</td>'
                        +'<td id="curso-paralelo-'+response["info_curso_id"]+'">'+ selecParalelo.options[selecParalelo.selectedIndex].text +'</td>'
                        +'<td id="curso-especialidad-'+response["info_curso_id"]+'">'+ selecEspecialidad.options[selecEspecialidad.selectedIndex].text +'</td>'
                        +'<td id="curso-periodo-'+response["info_curso_id"]+'">'+ selecPeriodo.options[selecPeriodo.selectedIndex].text +'</td>'
                        +'<td><h6 class="m-0"><span id="curso-estado-'+response["info_curso_id"]+'" class="'+estados[selecEstado.selectedIndex]+'">'+ selecEstado.options[selecEstado.selectedIndex].text +'</span></h6></td>'
                        +'<td>'
                            + '<div class="d-flex align-items-center">'
                            + '<i class="fa-light fa-pen-to-square icon" onclick="abrirModalEditarCurso('+response["info_curso_id"]+')"></i>'
                            + '<i class="fa-light fa-trash-can icon" onclick="eliminarCurso('+response["info_curso_id"]+')"></i>'
                            + '</div>'
                        +'</td></tr>';
        tabla_cuerpo_cursos.innerHTML = tabla_cuerpo_cursos.innerHTML + fila;
        fila = null;
    })
    .fail(function (response) {
        console.log(response);
    });
});


// Función para ELIMINAR CURSO
function eliminarCurso(curso_id) {
    abrirModalDeAcciones(icon_warning, "Eliminar curso", "¿Está usted seguro de eliminar este curso?", "Eliminar", "danger");
    document.getElementById("btnAccion").onclick = function(e) {
        e.preventDefault();
        cerrarModalDeAcciones();

        var csrftoken = getCookie('csrftoken');
        $.ajax({
            type: "POST",
            url: "/est-eliminar-curso/",
            data: {"curso_id": curso_id, csrfmiddlewaretoken: csrftoken },
            dataType: "json"
        })
        .done(function (response) {
            document.getElementById('curso-' + curso_id).remove();
            abrirModalInformativo(icon_info, "¡Información!", "Curso eliminado correctamente");
        })
        .fail(function (response) {
            abrirModalInformativo(icon_error, "¡Error!", "Ha ocurrido un error al intentar eliminar el curso");
        });
    };
};


// Formulario para AGREGAR ANEXO
$('#form-anexo-estudiante').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    formData.append('estudiante_id', document.getElementById('estudiante_id').value);
    $.ajax({
        type: "POST",
        url: "/est-agg-anexo/",
        data: formData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function (response) {
        var selecTipoAnexo = document.getElementById('selecTipoAnexo');
        mostrarAnexoEnLaTabla(
            parseInt(selecTipoAnexo.options[selecTipoAnexo.selectedIndex].value), 
            response["info_anexo_id"], 
            response["info_anexo_name"], 
            selecPeriodo.options[selecPeriodo.selectedIndex].text,
            response["info_anexo_url"]);
    })
    .fail(function (response) {
        abrirModalInformativo(icon_error, "¡Error!", "Ha ocurrido un error al intentar guardar el archivo");
    });
});


function mostrarAnexoEnLaTabla(tipo_anexo_id, anexo_id, anexo_nombre, anexo_periodo, anexo_url) {
    btn_tab_id = "";
    tablabody_id = "";
    switch (tipo_anexo_id) {
        case 1:
            btn_tab_id = "promocion-tab";
            tablabody_id = "tablebodyPromocion"
            break;
        case 2:
            btn_tab_id = "notasppe1-tab";
            tablabody_id = "tablebodyNotasPPE1"
            break;
        case 3:
            btn_tab_id = "notasppe2-tab";
            tablabody_id = "tablebodyNotasPPE2"
            break;
        case 4:
            btn_tab_id = "actagrado-tab";
            tablabody_id = "tablebodyActaGrado"
            break;
        case 5:
            btn_tab_id = "titulo-tab";
            tablabody_id = "tablebodyTitulo"
            break;
    };
    var btn_tab_clic = document.getElementById(btn_tab_id);
    btn_tab_clic.click();
    var tablebody_content = document.getElementById(tablabody_id);

    selecPeriodo = document.getElementById('selecPeriodoAnexo');
    var fila = '<tr id="anexo-' +anexo_id+ '">'
                +'<td>'+ anexo_nombre +'</td>'
                +'<td>'+ anexo_periodo +'</td>'
                +'<td>'
                    + '<div class="d-flex align-items-center">'
                    + '<a target="_blank" href="' +anexo_url+ '"><i class="fa-light fa-eye icon"></i></a>'
                    + '<i class="fa-light fa-trash-can icon" onclick="eliminarAnexo(' +anexo_id+ ')"></i>'
                    + '</div>'
                +'</td></tr>';
    if (tablebody_content.innerHTML == '' || tablebody_content.innerHTML == null) {
        tablebody_content.innerHTML = fila;
    }
    else {
        tablebody_content.innerHTML = tablebody_content.innerHTML + fila;
    }
};


function abrirAnexoXTipo (anexo_id) {
    alert("Funcion arbir pdf " + anexo_id);
};


// Formulario para ELIMINAR ANEXO
function eliminarAnexo(anexo_id) {
    abrirModalDeAcciones(icon_warning, "Eliminar archivo", "¿Está usted seguro de eliminar este archivo?", "Eliminar", "danger");
    document.getElementById("btnAccion").onclick = function(e) {
        e.preventDefault();
        cerrarModalDeAcciones();

        var csrftoken = getCookie('csrftoken');
        $.ajax({
            type: "POST",
            url: "/est-eli-anexo/",
            data: {"anexo_id": anexo_id, csrfmiddlewaretoken: csrftoken },
            dataType: "json"
        })
        .done(function (response) {
            document.getElementById('anexo-' + anexo_id).remove();
            abrirModalInformativo(icon_info, "¡Información!", "Archivo eliminado correctamente");
        })
        .fail(function (response) {
            abrirModalInformativo(icon_error, "¡Error!", "Ha ocurrido un error al intentar eliminar el archivo");
        });
    };
};

$('#selecProvincia').on('change', function (e) {
    var csrftoken = getCookie('csrftoken');
    var params = { csrfmiddlewaretoken: csrftoken };
    $.ajax({
        type: "GET",
        url: "/obtener-ciudades-x-provincia/" + $('#selecProvincia').val(),
        data: params,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function (response) {
        var selecCiudad = document.getElementById('selecCiudad');
        selecCiudad.innerHTML = '';
        response.forEach(element => {
            var opt = document.createElement('option');
            opt.text = element.nombre;
            opt.value = element.id;
            selecCiudad.add(opt);
        });
    })
    .fail(function (response) {
        console.log(response);
    });
});



$('#selecProvinciaRep').on('change', function (e) {
    var csrftoken = getCookie('csrftoken');
    var params = { csrfmiddlewaretoken: csrftoken };
    $.ajax({
        type: "GET",
        url: "/obtener-ciudades-x-provincia/" + $('#selecProvinciaRep').val(),
        data: params,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function (response) {
        var selecCiudad = document.getElementById('selecCiudadRep');
        selecCiudad.innerHTML = '';
        response.forEach(element => {
            var opt = document.createElement('option');
            opt.text = element.nombre;
            opt.value = element.id;
            selecCiudad.add(opt);
        });
    })
    .fail(function (response) {
        console.log(response);
    });
});