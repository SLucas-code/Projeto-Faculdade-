let tamanhoFonte = 100;
  
  function aumentarFonte() {
    if (tamanhoFonte < 150) {
      tamanhoFonte += 10;
      document.body.style.fontSize = tamanhoFonte + "%";
    }
  }

  function diminuirFonte() {
    if (tamanhoFonte > 70) {
      tamanhoFonte -= 10;
      document.body.style.fontSize = tamanhoFonte + "%";
    }
  }

  function alternarContraste() {
    document.body.classList.toggle("contraste-alto");
  }
