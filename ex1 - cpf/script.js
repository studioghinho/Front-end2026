const botao = document.getElementById("botao");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", () => {

    const cpf = document
        .getElementById("cpf")
        .value
        .replace(/\D/g, "");

    if (validarCPF(cpf)) {
        mensagem.innerHTML = "CPF Válido";
        mensagem.style.color = "black";
    } else {
        mensagem.innerHTML = "CPF Inválido";
        mensagem.style.color = "black";
    }

});

function validarCPF(cpf) {
    if (cpf.length !== 11) {
        return false;
    }
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }
    let soma = 0;

    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }

    let digito1 = (soma * 10) % 11;

    if (digito1 === 10) {
        digito1 = 0;
    }

    if (digito1 !== parseInt(cpf[9])) {
        return false;
    }
    soma = 0;

    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }

    let digito2 = (soma * 10) % 11;

    if (digito2 === 10) {
        digito2 = 0;
    }

    if (digito2 !== parseInt(cpf[10])) {
        return false;
    }

    return true;
}