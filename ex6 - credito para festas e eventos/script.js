const btnCalcular = document.getElementById('btn-calcular');

btnCalcular.addEventListener('click', function () {
  const pacote  = document.getElementById('pacote').value;
  const pessoas = Number(document.getElementById('pessoas').value);

  // Validações
  if (pacote === '') {
    alert('Por favor, selecione um pacote.');
    return;
  }

  if (!pessoas || pessoas <= 0) {
    alert('Por favor, informe uma quantidade de pessoas válida.');
    return;
  }

  // Valor por pessoa de acordo com o pacote
  let valorPorPessoa = 0;
  let nomePacote = '';

  switch (pacote) {
    case 'standard':
      valorPorPessoa = 50;
      nomePacote = 'Standard';
      break;
    case 'premium':
      valorPorPessoa = 80;
      nomePacote = 'Premium';
      break;
    case 'infinity':
      valorPorPessoa = 120;
      nomePacote = 'Infinity Deluxe';
      break;
  }

  // Cálculos
  const custoBruto = valorPorPessoa * pessoas;
  const taxaServico = custoBruto * 0.10; // taxa de serviço de 10%

  // Desconto progressivo por quantidade de pessoas
  let percentualDesconto = 0;
  if (pessoas >= 50) {
    percentualDesconto = 0.10;
  } else if (pessoas >= 20) {
    percentualDesconto = 0.05;
  }

  const desconto = (custoBruto + taxaServico) * percentualDesconto;
  const totalFinal = custoBruto + taxaServico - desconto;

  // Formata em Real
  const fmt = (n) =>
    n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // Preenche os resultados
  document.getElementById('res-bruto').textContent = fmt(custoBruto);
  document.getElementById('res-taxa').textContent  = fmt(taxaServico);

  const linhaDesconto = document.getElementById('linha-desconto');
  const labelDesconto = document.getElementById('res-desconto-label');
  const valorDesconto = document.getElementById('res-desconto');

  if (desconto > 0) {
    linhaDesconto.style.display = 'flex';
    labelDesconto.textContent = `Desconto (${(percentualDesconto * 100).toFixed(0)}%)`;
    valorDesconto.textContent = `- ${fmt(desconto)}`;
  } else {
    linhaDesconto.style.display = 'none';
  }

  document.getElementById('res-total').textContent = fmt(totalFinal);

  // Exibe o bloco de resultado
  document.getElementById('resultado').classList.remove('oculto');
});
