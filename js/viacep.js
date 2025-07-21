 document.addEventListener('DOMContentLoaded', function() {
        const cepInput = document.getElementById('cep');
        const logradouroInput = document.querySelector('input[name="logradouro"]');
        const complementoInput = document.querySelector('input[name="complemento"]');
        const bairroInput = document.querySelector('input[name="bairro"]');
        const cidadeInput = document.querySelector('input[name="cidade"]');
        const ufInput = document.querySelector('input[name="estado"]');

        cepInput.addEventListener('blur', function() {
            const cep = this.value.replace(/\D/g, '');
            if (cep.length === 8) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.erro) {
                            logradouroInput.value = data.logradouro;
                            complementoInput.value = data.complemento;
                            bairroInput.value = data.bairro;
                            cidadeInput.value = data.localidade;
                            ufInput.value = data.uf;
                        } else {
                            // Se houver erro na consulta do CEP, limpar os campos
                            logradouroInput.value = '';
                            complementoInput.value = '';
                            bairroInput.value = '';
                            cidadeInput.value = '';
                            ufInput.value = '';
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao consultar o CEP:', error);
                        // Em caso de erro na requisição, também limpar os campos
                        logradouroInput.value = '';
                        complementoInput.value = '';
                        bairroInput.value = '';
                        cidadeInput.value = '';
                        ufInput.value = '';
                    });
            } else {
                // Se o CEP não tiver 8 dígitos, limpar os campos
                logradouroInput.value = '';
                complementoInput.value = '';
                bairroInput.value = '';
                cidadeInput.value = '';
                ufInput.value = '';
            }
        });
    });