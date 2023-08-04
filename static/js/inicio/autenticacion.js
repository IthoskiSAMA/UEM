document.addEventListener("DOMContentLoaded", () => {
    var form_login = document.getElementById('form-login');
    if (form_login != null) {
        form_login.onsubmit = function(e) {
            e.preventDefault();
            var formData = new FormData(this);
            $.ajax({
                type: "POST",
                url: "/autenticar/",
                data: formData,
                dataType: "json",
                cache: false,
                contentType: false,
                processData: false
            })
            .done(function (response) {
                if (response['resultado'] === 1) {
                    window.location.href = '/tablero-secretaria';
                }
                else if (response['resultado'] === 0) {
                    document.getElementById('iconModalInformativo').className = "fa-solid fa-triangle-exclamation icon-modal me-3";
                    document.getElementById('titleModalInformativo').textContent = "Error al iniciar sesión";
                    document.getElementById('bodyModalInformativo').textContent = "Correo o contraseña incorrecta.";
                    $('#modalInformativo').modal('show');
                }
            })
            .fail(function (response) {
                console.log("Error");
                console.log(response);
            });
        };
    }

    var form_recuperar_pass = document.getElementById('form-verificar-correo');
    if (form_recuperar_pass != null) {
        form_recuperar_pass.onsubmit = function(e) {
            e.preventDefault();
            alert("verificar correo")
        };
    }
});