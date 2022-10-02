$(document).ready(function() {
    $("#form-login").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            }
        }
    });

    $("#form-registro").validate({
        rules: {
            nombre: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            },
            password2: {
                equalTo: "#password"
            }
        },
        messages: {
            password2: {
                equalTo: "Las contraseñas no coinciden"
            }
        }
    });

    $("#form-prueba").validate({
        rules: {
            alternativas: {
                required: true,
                minlength: 4,
                maxlength: 4
            }
        },
        messages: {
            alternativas: {
                required: "Debes seleccionar todas las alternativas",
                maxlength: "No selecciones mas de {0} alternativa por pregunta",
                minlength: "Debes responder todas las preguntas"
            }
        },
        errorElement : 'div',
        errorLabelContainer: '.errorTxt'
    });
});
