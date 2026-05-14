const btnCalcular = document.getElementById('btn-calcular');

btnCalcular.addEventListener('click', function () {
  const nome  = document.getElementById('nome').value.trim();
  const nota1 = Number(document.getElementById('nota1').value);
  const nota2 = Number(document.getElementById('nota2').value);
  const nota3 = Number(document.getElementById('nota3').value);

  const resultado = document.getElementById('resultado');

  // Validação básica
  if (nome === '') {
    alert('Por favor, informe o nome do aluno.');
    return;
  }

  if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) ||
      document.getElementById('nota1').value === '' ||
      document.getElementById('nota2').value === '' ||
      document.getElementById('nota3').value === '') {
    alert('Por favor, preencha todas as três notas.');
    return;
  }

  const media = (nota1 + nota2 + nota3) / 3;
  const mediaFormatada = media.toFixed(2);

  // Remove classes anteriores
  resultado.classList.remove('oculto', 'aprovado', 'exame', 'reprovado');

  let situacao = '';
  let mensagemExtra = '';

  if (media >= 7.0) {
    situacao = 'Aprovado';
    resultado.classList.add('aprovado');
  } else if (media >= 4.0) {
    situacao = 'Exame';
    resultado.classList.add('exame');

    const pontosParaDez = (10 - media).toFixed(2);
    mensagemExtra = `<br>Faltam <strong style="display:inline">${pontosParaDez} pontos</strong> para atingir média 10.`;
  } else {
    situacao = 'Reprovado';
    resultado.classList.add('reprovado');
  }

  resultado.innerHTML = `
    <strong>Aluno: ${nome}</strong>
    Média final: ${mediaFormatada}
    <br>Situação: ${situacao}
    ${mensagemExtra}
  `;
});