function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            //var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function eliminarEspacios() {
    var inputs = document.querySelectorAll("input[type=text]");
    inputs.forEach(element => {
        element.value = element.value.trim();
    });
}

// Estados
estado_aprobado = "badge bg-success";
estado_reprobado = "badge bg-secondary";
estado_retirado = "badge bg-danger";
estado_en_curso = "badge bg-warning text-dark";
estado_graduado = "badge bg-info";
estados = [estado_en_curso, estado_aprobado, estado_reprobado, estado_retirado, estado_graduado];

icon_warning = "fa-triangle-exclamation";
icon_error = "fa-circle-exclamation";
icon_success = "fa-circle-check";
icon_info = "fa-square-info";
icon_question = "fa-question";
icon_hand_like = "fa-thumbs-up";
icon_server = "fa-server";
icon_wifi_disconnect = "fa-wifi-slash";
icon_cloud_disconnect = "fa-cloud-slash";
icon_male = "fa-person";
icon_female = "fa-person-dress";
icon_maintenance = "fa-person-digging"


function insertar_alerta(mensaje, nodo_padre, clase_alerta) {
    var padre = document.getElementById(nodo_padre);
    var nodo_alert = document.createElement('div');
    nodo_alert.className = "alert alert-"+ clase_alerta;
    nodo_alert.textContent = mensaje;
    padre.appendChild(nodo_alert);
};


function abrirModalInformativo(clase_icon, title, body) {
    document.getElementById('iconModalInformativo').className = "fa-solid "+clase_icon+" icon-modal me-3";
    document.getElementById('titleModalInformativo').textContent = title;
    document.getElementById('bodyModalInformativo').textContent = body;
    $('#modalInformativo').modal('show');
};


function abrirModalDeAcciones(clase_icon, title, body, nombre_accion, clase_accion) {
    document.getElementById('iconModalDeAcciones').className = "fa-solid "+clase_icon+" icon-modal me-3";
    document.getElementById('titleModalDeAcciones').textContent = title;
    document.getElementById('bodyModalDeAcciones').textContent = body;
    document.getElementById('btnAccion').textContent = nombre_accion;
    document.getElementById('btnAccion').className = "btn btn-" + clase_accion;
    $('#modalDeAcciones').modal('show');
};

function cerrarModalDeAcciones() {
    document.getElementById('iconModalDeAcciones').className = "fa-solid  icon-modal me-3";
    document.getElementById('titleModalDeAcciones').textContent = '';
    document.getElementById('bodyModalDeAcciones').textContent = '';
    document.getElementById('btnAccion').textContent = '';
    document.getElementById('btnAccion').className = "btn btn-primary";
    //$('#modalDeAcciones').hide();
    $('#modalDeAcciones').modal('hide');
};



// Función para validar campos de sólo letras
function soloLetras(event) {
    var regex = new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
    validarEspaciosEntrePalabras(event, key);
}

// Función para validar campos de número de teléfonos
function soloTelefono(event) {
    var regex = new RegExp("^[0-9-/()+ ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
    validarEspaciosEntrePalabras(event, key);
}

// Función para validar campos de número de teléfonos
function soloNumerosLetras(event) {
    var regex = new RegExp("^[a-zA-Z0-9-.]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
}

// Función para validar campos de correo
function soloCorreo(event) {
    var regex = new RegExp("^[a-zA-Z0-9-.@_]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
}

// Función para validar campos direcciones
function soloDirecciones(event) {
    var regex = new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9-_., ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
    validarEspaciosEntrePalabras(event, key);
}

function validarEspaciosEntrePalabras(event, key) {
    if (key === " "){
        if (event.target.value.substring(event.target.value.length-1, event.target.value.length) === key) {
            event.preventDefault();
            return false;
        }
        return true;
    }
}