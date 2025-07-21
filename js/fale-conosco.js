document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("fale-conosco");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Limpa mensagens anteriores
        document.querySelectorAll(".error-message").forEach(el => el.innerText = "");

        const fields = [
            { id: "assunto", message: "Por favor, selecione um assunto." },
            { id: "mensagem", message: "Por favor, escreva sua mensagem." },
            { id: "localidade", message: "Por favor, informe sua cidade e estado.", min: 3 },
            { id: "seu-nome", message: "O nome deve ter entre 10 e 80 caracteres.", min: 10, max: 80 },
            { id: "email", message: "Por favor, insira um e-mail válido.", regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
            { id: "telefone", message: "O telefone deve conter 10 ou 11 dígitos.", regex: /^\d{10,11}$/ }
        ];

        let isValid = true;

        fields.forEach(field => {
            const input = document.getElementById(field.id);
            const value = input.value.trim();

            if (!value || (field.min && value.length < field.min) || (field.max && value.length > field.max) || (field.regex && !field.regex.test(value))) {
                showError(input, field.message);
                isValid = false;
            } else {
                clearError(input);
            }
        });

        if (isValid) {
            alert("Formulário enviado com sucesso!");
            form.submit();
        }
    });

    function showError(input, message) {
        let errorSpan = input.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            errorSpan = document.createElement("span");
            errorSpan.className = "error-message";
            errorSpan.style.color = "red";
            errorSpan.style.fontSize = "12px";
            errorSpan.style.display = "block";
            input.parentNode.insertBefore(errorSpan, input.nextSibling);
        }
        errorSpan.innerText = message;
    }

    function clearError(input) {
        let errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains("error-message")) {
            errorSpan.innerText = "";
        }
    }

    // Limita a entrada do telefone a apenas números e no máximo 11 dígitos
    document.getElementById("telefone").addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 11);
    });

    // Valida dinamicamente os campos ao digitar
    document.getElementById("seu-nome").addEventListener("input", function () {
        validateField(this, "O nome deve ter entre 10 e 80 caracteres.", 10, 80);
    });

    document.getElementById("localidade").addEventListener("input", function () {
        validateField(this, "A localidade deve conter pelo menos 3 caracteres.", 3);
    });

    function validateField(input, message, min, max) {
        const value = input.value.trim();
        if (value.length < min || (max && value.length > max)) {
            showError(input, message);
        } else {
            clearError(input);
        }
    }
});