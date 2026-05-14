const btnSimular = document.getElementById('btn-simular');

btnSimular.addEventListener('click', function () {
  const bandeira  = document.getElementById('bandeira').value;
  const valor     = Number(document.getElementById('valor').value);
  const parcelas  = Number(document.getElementById('parcelas').value);

  // Validações
  if (bandeira === '') {
    alert('Por favor, selecione a bandeira do cartão.');
    return;
  }

  if (!valor || valor <= 0) {
    alert('Por favor, informe um valor de venda válido.');
    return;
  }

  // Taxa da bandeira via switch
  let percentualBandeira = 0;
  let nomeBandeira = '';

  switch (bandeira) {
    case 'visa':
      percentualBandeira = 0.02;
      nomeBandeira = 'Visa';
      break;
    case 'master':
      percentualBandeira = 0.0185;
      nomeBandeira = 'Mastercard';
      break;
    case 'elo':
      percentualBandeira = 0.03;
      nomeBandeira = 'Elo';
      break;
  }

  // Cálculos
  const taxaBandeira  = valor * percentualBandeira;
  const jurosTotais   = valor * (0.015 * parcelas);        // juros simples de 0,35%/mês (fórmula do enunciado)
  const taxaMensal    = 12.50 * parcelas;                  // R$ 12,50 por mês
  const valorTotal    = valor + taxaBandeira + jurosTotais + taxaMensal;
  const valorParcela  = valorTotal / parcelas;

  // Formata em Real
  const fmt = (n) =>
    n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // Preenche o resultado
  document.getElementById('res-venda').textContent  = fmt(valor);
  document.getElementById('res-taxa').textContent   = `${fmt(taxaBandeira)} (${nomeBandeira} ${(percentualBandeira * 100).toFixed(2)}%)`;
  document.getElementById('res-juros').textContent  = fmt(jurosTotais);

  document.getElementById('res-mensal-label').textContent =
    `Taxa mensal (R$ 12,50 × ${parcelas}x)`;
  document.getElementById('res-mensal').textContent = fmt(taxaMensal);

  document.getElementById('res-total').textContent  = fmt(valorTotal);

  document.getElementById('res-parcela-label').textContent =
    parcelas === 1 ? 'Valor à vista' : `Valor de cada parcela (${parcelas}x)`;
  document.getElementById('res-parcela').textContent =
    parcelas === 1 ? fmt(valorTotal) : `${parcelas}x de ${fmt(valorParcela)}`;

  // Exibe o bloco de resultado
  document.getElementById('resultado').classList.remove('oculto');
});