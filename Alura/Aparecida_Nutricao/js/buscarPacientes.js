var botaoAdicionar = document.querySelector('#buscar-paciente');

botaoAdicionar.addEventListener("click", function(){
    var xhr = new XMLHttpRequest(); //Objeto do Javascript responsável por fazer a requisição http
    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes")  //Abre a requisição

    xhr.addEventListener("load", function(){
        var erroAjax = document.querySelector("#erro-ajax");
        if(xhr.status == 200){
            
            erroAjax.classList.add("invisivel")
            var resposta = xhr.responseText;
            var pacientes = JSON.parse(resposta); //O arquivo JSON é uma stringona, o parser converte o JSON para um array de objetos
            
            pacientes.forEach(function(paciente) {
                adicionaPacienteNaTabela(paciente);
            });
        } else {
            console.log(xhr.status);
            console.log(xhr.responseText);
            erroAjax.classList.remove("invisivel")
        }
    })
    xhr.send();
})