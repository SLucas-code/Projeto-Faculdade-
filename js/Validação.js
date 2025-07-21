function validarTodosOsCampos() {
  const cpf = document.getElementById("cpf").value;
  const cep = document.getElementById("cep").value.replace(/\D/g, '');

  if (!validarCPF(cpf)) {
    alert("CPF inválido!");
    return false;
  }

  if (cep.length !== 8) {
    alert("CEP inválido!");
    return false;
  }

  if (!validarSenha()) {
    return false; 
  }

  const nome = document.getElementById("nomeCompleto").value.trim();
  const email = document.getElementById("email").value.trim();

  if (nome === "") {
    alert("Preencha o nome completo.");
    return false;
  }

  if (email === "") {
    alert("Preencha o e-mail.");
    return false;
  }

  
  return true;
}


function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf[10]);
}

document.addEventListener("DOMContentLoaded", function () {
  const cpfInput = document.getElementById("cpf");
  const cepInput = document.getElementById("cep");

  cpfInput.addEventListener("blur", function () {
    if (!validarCPF(cpfInput.value)) {
      alert("CPF inválido!");
      return;
    }
  });

  cepInput.addEventListener("blur", function () {
    const cep = cepInput.value.replace(/\D/g, '');
    if (cep.length !== 8) {
      alert("CEP inválido!");
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (data.erro) {
          alert("CEP não encontrado!");
          return;
        }
        document.getElementById("logradouro").value = data.logradouro || '';
        document.getElementById("bairro").value = data.bairro || '';
        document.getElementById("cidade").value = data.localidade || '';
        document.getElementById("estado").value = data.uf || '';
      })
      .catch(() => alert("Erro ao buscar o CEP."));
  });
});






    function aplicarMascaraCPF(valor) {
      return valor
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    function aplicarMascaraTelefone(valor) {
      return valor
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }

    function aplicarMascaraCEP(valor) {
      return valor
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }

    
    document.getElementById('nomeCompleto').addEventListener('input', function () {
      this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    });

    document.getElementById('nomeMaterno').addEventListener('input', function () {
      this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    });

    
    document.getElementById('cpf').addEventListener('input', function () {
      this.value = aplicarMascaraCPF(this.value);
    });

    document.getElementById('celular').addEventListener('input', function () {
      this.value = aplicarMascaraTelefone(this.value);
    });

    document.getElementById('cep').addEventListener('input', function () {
      this.value = aplicarMascaraCEP(this.value);
    });

    function bloquearEspaco(campoId) {
  const campo = document.getElementById(campoId);

  if (campo) {
    campo.addEventListener('keydown', function (e) {
      if (e.key === ' ') {
        e.preventDefault(); 
      }
    });

    campo.addEventListener('input', function () {
      this.value = this.value.replace(/\s/g, ''); 
    });
  }
}


bloquearEspaco('login');
bloquearEspaco('senha');
bloquearEspaco('confirmacaoSenha');
bloquearEspaco('email');




function validarSenha() {
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmacaoSenha").value;
  const erro = document.getElementById("erroSenha");

  if (senha !== confirmarSenha) {
    erro.textContent = "As senhas não coincidem!";
    return false;
  }

  erro.textContent = "";
  return true;
}


function enviarFormulario() {
    const form = document.getElementById("cadastroForm");

    if (form.checkValidity() && validarSenha()) {
      window.location.href = "sucesso_cadastro.html";
    } else {
      form.reportValidity(); 
    }
  }

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    // Simples validação de exemplo
    if (email === 'admin@admin.com' && senha === '123456') {
      window.location.href = 'inicio.html'; // Redireciona para a página de início
    } 
    
  });
});