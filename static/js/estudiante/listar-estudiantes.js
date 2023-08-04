
document.addEventListener("DOMContentLoaded", () => {
    $.ajax({
        type: "GET",
        url: "/obtener-estudiantes/",
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function (response) {
        mostrarDatosEnTabla(response);
    })
    .fail(function (response) {
        abrirModalInformativo(icon_error, "Error", "No se ha podido cargar los datos requeridos");
    });
});

document.getElementById('frmBuscarEstudiante').onsubmit = function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
        type: "POST",
        url: "/buscar-estudiante/",
        data: formData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function (response) {
        if (response["resultado"] == 0) {
            abrirModalInformativo(icon_info, "¡Aviso!", "No hay estudiantes que coincidan con los datos ingresados");
        }
        else if (response["resultado"] == 1) {
            mostrarDatosEnTabla(response);
        }
    })
    .fail(function (response) {
        abrirModalInformativo(icon_error, "Error", "No se ha podido cargar los datos requeridos");
    });
};

function mostrarDatosEnTabla(datos) {
    //Crear un objeto JsonArray
    var tableDataArray = [];

    datos["listaEstudiantes"].forEach(estudiante => {
        var acciones = '<div class="d-flex align-items-center">'
                            +'<i class="fa-light fa-file-pdf icon" onclick="generarPDfEstudiante('+estudiante.id+')"></i>'
                            +'<i class="fa-light fa-pen-to-square icon" onclick="editarEstudiante('+estudiante.id+')"></i>'
                            +'<i class="fa-light fa-trash-can icon" onclick="eliminarEstudiante('+estudiante.id+')"></i>'
                        +'</div>';
        tableDataArray.push({
            "id": estudiante.id,
            "cedula": estudiante.cedula,
            "apellidos": estudiante.apellidos,
            "nombres": estudiante.nombres,
            "celular": estudiante.celular != null || estudiante.celular != "" ? estudiante.celular : "Sin datos",
            "acciones": acciones
        });
    });

    state = {
        'querySet': tableDataArray,
        'page': 1,
        'rows': 10,
        'window': 10,
    };
    buildTable(state, 'tablebodyListaEstudiantes');
}