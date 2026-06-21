const btnAnalisar = document.getElementById('btn-analisar');

btnAnalisar.addEventListener('click', function () {
  const campoNumero = document.getElementById('numero');

  // Remove espaços e pontos
  const numeroLimpo = campoNumero.value.replace(/[\s.]/g, '');

  // Valida se contém apenas dígitos
  if (!/^\d+$/.test(numeroLimpo) || numeroLimpo === '') {
    alert('Digite apenas números (espaços e pontos são permitidos, mas serão ignorados).');
    return;
  }

  // Valida quantidade de dígitos (entre 13 e 16)
  if (numeroLimpo.length < 13 || numeroLimpo.length > 16) {
    alert('O número do cartão deve ter entre 13 e 16 dígitos.');
    return;
  }

  const valido = validarLuhn(numeroLimpo);
  const bandeira = identificarBandeira(numeroLimpo);

  exibirResultado(valido, bandeira, numeroLimpo.length);
});

/**
 * Algoritmo de Luhn, seguindo o passo a passo do professor:
 * 1. Inverte a ordem dos dígitos do cartão.
 * 2. Multiplica por 2 os dígitos nas posições pares (2ª, 4ª...).
 *    Se o resultado for > 9, subtrai 9.
 * 3. Soma todos os dígitos resultantes.
 *    Se o total for divisível por 10, o cartão é válido.
 */
function validarLuhn(numero) {
  // Passo 1: inverte a ordem dos dígitos
  const digitosInvertidos = numero.split('').reverse().map(Number);

  let soma = 0;

  for (let i = 0; i < digitosInvertidos.length; i++) {
    let digito = digitosInvertidos[i];

    // Passo 2: posições pares (índice 1, 3, 5... → 2º, 4º, 6º dígito)
    const posicaoPar = (i + 1) % 2 === 0;

    if (posicaoPar) {
      digito = digito * 2;
      if (digito > 9) {
        digito = digito - 9;
      }
    }

    // Passo 3: soma todos os dígitos resultantes
    soma += digito;
  }

  // Válido se o total for divisível por 10
  return soma % 10 === 0;
}

/**
 * Identifica a bandeira apenas pelo prefixo do número,
 * seguindo as faixas públicas de identificação (IIN/BIN ranges
 * de bandeira). Não identifica banco emissor nem dados reais do cartão.
 */
function identificarBandeira(numero) {
  if (/^4/.test(numero)) {
    return 'Visa';
  }

  if (/^5[1-5]/.test(numero) || /^2(2[2-9]|[3-6]\d|7[01]|720)/.test(numero)) {
    return 'Mastercard';
  }

  if (/^3[47]/.test(numero)) {
    return 'American Express';
  }

  if (/^6(011|5)/.test(numero)) {
    return 'Discover';
  }

  if (/^636368|^438935|^504175|^451416|^636297|^5067|^4576|^4011/.test(numero)) {
    return 'Elo';
  }

  return 'Não identificada';
}

function exibirResultado(valido, bandeira, quantidadeDigitos) {
  const resultado = document.getElementById('resultado');
  const status = document.getElementById('res-status');

  status.textContent = valido ? 'Válido' : 'Inválido';
  status.classList.remove('valido', 'invalido');
  status.classList.add(valido ? 'valido' : 'invalido');

  document.getElementById('res-bandeira').textContent = bandeira;
  document.getElementById('res-digitos').textContent = `${quantidadeDigitos} dígitos`;

  resultado.classList.remove('oculto');
}
