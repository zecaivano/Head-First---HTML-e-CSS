var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function () {       //Depois que meu html carregar inteiro eu executo essa função.
    atualizaTamanhoFrase();
    iniciaContadores();
    iniciaCronometro();
    coloreBordas();
    $("#botao-reiniciar").click(reiniciaJogo);
})

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numeroPalavras = frase.split(" ").length; //Função do JS. Quebra a string no parâmetro em um novo array
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numeroPalavras);
}

function iniciaContadores() {
    campo.on("input", function () {
        var conteudo = campo.val();
        var quantidadePalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(quantidadePalavras);
        var quantidadeCaracteres = conteudo.length;
        $("#contador-caracteres").text(quantidadeCaracteres);
    });
}

function iniciaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function () {     //Função on fica escutando o tempo todo. One somente uma vez
        $("#botao-reiniciar").attr("disabled",true);
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);    //impede o tempo negativo, a função setIntervel para de funcionar.
                finalizaJogo();
            }
        }, 1000)
    });
}

function finalizaJogo() {
    campo.attr("disabled", true)  //Manipulo o atributo diretamente
    $("#botao-reiniciar").attr("disabled", false);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function coloreBordas() {
    var frase = $(".frase").text();
campo.on("input", function() {
    var digitado = campo.val();
    var comparavel = frase.substr(0,digitado.length);
    if (digitado == comparavel) {
        campo.addClass("borda-verde");
        campo.removeClass("borda-vermelha");
    } else {
        campo.addClass("borda-vermelha");
        campo.removeClass("borda-verde");
    }
});
}

// Outra forma de comparar o início da string usando ECMA
// if( frase.startsWith(digitado)) {
//     campo.addClass("borda-verde");
//    } else {
//     campo.addClass("borda-vermelha");
//    }

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-caracteres").text("0");
    $("#contador-palavras").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    iniciaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}

